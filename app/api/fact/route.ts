import { NextResponse } from "next/server";
import { z } from "zod";
import { buildMessages, pickCategory } from "@/lib/prompts";
import { FactSchema, CATEGORIES } from "@/lib/schema";
import seed from "@/data/seed-facts.json";

export const maxDuration = 30;

// Daftar model fallback — diprioritaskan model yang aktif dan tersedia di akun Groq
const FALLBACK_MODELS = [
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
];

const ReqSchema = z.object({
  category: z.enum([...CATEGORIES, "mixed"]).default("mixed"),
  avoid: z.array(z.string()).default([]),
});

/**
 * GET /api/fact — Health check endpoint.
 * Cek apakah Groq API key terkonfigurasi dan model tersedia.
 */
export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  const isKeyValid =
    apiKey &&
    !apiKey.includes("isi_dengan_kunci") &&
    apiKey.trim().length > 10;

  let groqStatus = "not_configured";
  let availableModels: string[] = [];

  // Coba ping Groq untuk verifikasi API key benar-benar valid
  if (isKeyValid) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/models", {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const data = await res.json();
        availableModels = (data.data || []).map((m: any) => m.id);
        groqStatus = "connected";
      } else {
        groqStatus = `error_${res.status}`;
      }
    } catch (err) {
      groqStatus = `unreachable: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return NextResponse.json({
    status: "ok",
    groqConfigured: !!isKeyValid,
    groqStatus,
    configuredModel: process.env.GROQ_MODEL || FALLBACK_MODELS[0],
    availableModels: availableModels.length > 0 ? availableModels : "run GET /api/fact to check",
    seedCategories: Array.from(new Set((seed as any[]).map((f) => f.category))),
    seedTotal: (seed as any[]).length,
    allCategories: CATEGORIES,
  });
}

/**
 * POST /api/fact — Generate fakta baru.
 * Prioritas: AI (Groq) → retry dengan model fallback → seed data.
 */
export async function POST(req: Request) {
  let bodyJson: unknown = {};
  try {
    bodyJson = await req.json();
    if (bodyJson && typeof bodyJson === "object" && "category" in bodyJson) {
      const rawCat = (bodyJson as Record<string, unknown>).category;
      if (rawCat === "git/github" || rawCat === "git-github" || rawCat === "github")
        (bodyJson as Record<string, unknown>).category = "git";
      if (rawCat === "ci/cd" || rawCat === "ci-cd" || rawCat === "ci_cd")
        (bodyJson as Record<string, unknown>).category = "cicd";
      if (rawCat === "tailwindcss")
        (bodyJson as Record<string, unknown>).category = "tailwind";
      if (
        rawCat === "publicspeaking" ||
        rawCat === "public-speaking" ||
        rawCat === "public_speaking" ||
        rawCat === "speaking" ||
        rawCat === "diplomasi"
      )
        (bodyJson as Record<string, unknown>).category = "publicspeaking";
      if (
        rawCat === "confidence" ||
        rawCat === "percayadiri" ||
        rawCat === "percaya-diri" ||
        rawCat === "percaya_diri" ||
        rawCat === "self-confidence"
      )
        (bodyJson as Record<string, unknown>).category = "confidence";
    }
  } catch {
    bodyJson = {};
  }

  const parsed = ReqSchema.safeParse(bodyJson);
  const category = parsed.success ? parsed.data.category : "mixed";
  const avoid = parsed.success ? parsed.data.avoid : [];
  const cat = pickCategory(category);

  const apiKey = process.env.GROQ_API_KEY;
  const isKeyValid =
    apiKey &&
    !apiKey.includes("isi_dengan_kunci") &&
    apiKey.trim().length > 10;

  // ── AI Generation (Groq) dengan retry + fallback model ──────────────
  if (isKeyValid) {
    const primaryModel = process.env.GROQ_MODEL || FALLBACK_MODELS[0];
    // Buat daftar model: primary dulu, lalu fallback yang belum ada
    const modelsToTry = [
      primaryModel,
      ...FALLBACK_MODELS.filter((m) => m !== primaryModel),
    ];

    const MAX_ATTEMPTS = 3; // Maks 3 percobaan total (bisa beda model tiap attempt)
    const errors: string[] = [];

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const model = modelsToTry[Math.min(attempt, modelsToTry.length - 1)];

      try {
        // Setiap attempt menggunakan subtopik random baru (karena buildMessages panggil getRandomSubtopic)
        const messages = buildMessages(cat, avoid);

        const res = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model,
              messages,
              temperature: 0.95,
              top_p: 0.9,
              max_tokens: 2048,
              response_format: { type: "json_object" },
            }),
            signal: AbortSignal.timeout(15000),
          }
        );

        if (!res.ok) {
          const errBody = await res.text().catch(() => "unknown");
          const errMsg = `[attempt ${attempt + 1}] Groq ${res.status} (model: ${model}): ${errBody.substring(0, 300)}`;
          console.error(`[funfact] ${errMsg}`);
          errors.push(errMsg);
          continue; // Coba lagi dengan model berikutnya
        }

        const data = await res.json();
        const raw = data.choices?.[0]?.message?.content ?? "";

        if (!raw || raw.trim().length === 0) {
          const errMsg = `[attempt ${attempt + 1}] Empty AI response (model: ${model})`;
          console.error(`[funfact] ${errMsg}`);
          errors.push(errMsg);
          continue;
        }

        // Parse JSON dari AI
        let jsonData: Record<string, unknown>;
        try {
          jsonData = JSON.parse(raw);
        } catch {
          const errMsg = `[attempt ${attempt + 1}] JSON parse failed (model: ${model}): ${raw.substring(0, 200)}`;
          console.error(`[funfact] ${errMsg}`);
          errors.push(errMsg);
          continue;
        }

        // Auto-fix untuk masalah umum sebelum validasi schema
        if (jsonData.howTo && !Array.isArray(jsonData.howTo)) {
          jsonData.howTo = [String(jsonData.howTo)];
        } else if (!jsonData.howTo || !Array.isArray(jsonData.howTo) || jsonData.howTo.length === 0) {
          jsonData.howTo = ["Terapkan konsep ini dalam alur kerja atau latihan harian Anda."];
        }
        if (typeof jsonData.title === "string" && jsonData.title.length > 250) {
          jsonData.title = jsonData.title.substring(0, 247) + "...";
        }
        if (!jsonData.title) jsonData.title = `Fakta Menarik ${cat.toUpperCase()}`;
        if (!jsonData.body) jsonData.body = "Konsep esensial yang sangat berguna dipahami.";
        if (!jsonData.example) jsonData.example = "-";
        if (!jsonData.result) jsonData.result = "-";
        if (!jsonData.why) jsonData.why = String(jsonData.body || "");
        if (!jsonData.usage) jsonData.usage = "Dapat diaplikasikan langsung dalam praktik sehari-hari.";
        // Hapus field category dari AI response (kita set manual dari request)
        delete jsonData.category;

        // Validasi dengan Zod safeParse
        const validated = FactSchema.safeParse({ ...jsonData, category: cat });
        if (!validated.success) {
          const schemaErrors = validated.error.flatten();
          const errMsg = `[attempt ${attempt + 1}] Schema validation failed (model: ${model}): ${JSON.stringify(schemaErrors.fieldErrors)}`;
          console.error(`[funfact] ${errMsg}`);
          errors.push(errMsg);
          continue;
        }

        // ✅ Sukses! Return AI-generated fact
        return NextResponse.json({
          fact: validated.data,
          source: "ai" as const,
          _model: model,
        });
      } catch (err) {
        const errMsg = `[attempt ${attempt + 1}] Exception (model: ${model}): ${err instanceof Error ? err.message : String(err)}`;
        console.error(`[funfact] ${errMsg}`);
        errors.push(errMsg);
        continue;
      }
    }

    // Semua attempt AI gagal — log semua error untuk debugging
    console.error(
      `[funfact] ❌ All ${MAX_ATTEMPTS} AI attempts failed for category "${cat}". Errors:\n` +
        errors.map((e, i) => `  ${i + 1}. ${e}`).join("\n")
    );

    // Return seed dengan info error (untuk debugging di production)
    const pool = (seed as any[]).filter((f) => f.category === cat);
    const fact =
      pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : seed[Math.floor(Math.random() * seed.length)];

    return NextResponse.json({
      fact,
      source: "seed" as const,
      _fallbackReason: errors[errors.length - 1] || "unknown",
      _allErrors: errors,
    });
  }

  // ── API Key tidak ada → seed data ──────────────────────────────────
  console.warn(
    "[funfact] ⚠️ Groq API key is not configured. Set GROQ_API_KEY in environment variables."
  );

  try {
    const pool = (seed as any[]).filter((f) => f.category === cat);
    const fact =
      pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : seed[Math.floor(Math.random() * seed.length)];

    return NextResponse.json({
      fact,
      source: "seed" as const,
      _fallbackReason: "GROQ_API_KEY not configured",
    });
  } catch {
    const fallback = seed[0];
    return NextResponse.json({
      fact: fallback,
      source: "seed" as const,
      _fallbackReason: "seed pool error",
    });
  }
}
