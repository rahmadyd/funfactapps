import { NextResponse } from "next/server";
import { z } from "zod";
import { buildMessages, pickCategory } from "@/lib/prompts";
import { FactSchema, CATEGORIES } from "@/lib/schema";
import seed from "@/data/seed-facts.json";

export const maxDuration = 30;

const ReqSchema = z.object({
  category: z.enum([...CATEGORIES, "mixed"]).default("mixed"),
  avoid: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  let bodyJson: unknown = {};
  try {
    bodyJson = await req.json();
    if (bodyJson && typeof bodyJson === "object" && "category" in bodyJson) {
      const rawCat = (bodyJson as Record<string, unknown>).category;
      if (rawCat === "git/github" || rawCat === "git-github" || rawCat === "github") (bodyJson as Record<string, unknown>).category = "git";
      if (rawCat === "ci/cd" || rawCat === "ci-cd" || rawCat === "ci_cd") (bodyJson as Record<string, unknown>).category = "cicd";
      if (rawCat === "tailwindcss") (bodyJson as Record<string, unknown>).category = "tailwind";
      if (rawCat === "publicspeaking" || rawCat === "public-speaking" || rawCat === "public_speaking" || rawCat === "speaking" || rawCat === "diplomasi") (bodyJson as Record<string, unknown>).category = "publicspeaking";
      if (rawCat === "confidence" || rawCat === "percayadiri" || rawCat === "percaya-diri" || rawCat === "percaya_diri" || rawCat === "self-confidence") (bodyJson as Record<string, unknown>).category = "confidence";
    }
  } catch {
    bodyJson = {};
  }

  const parsed = ReqSchema.safeParse(bodyJson);
  const category = parsed.success ? parsed.data.category : "mixed";
  const avoid = parsed.success ? parsed.data.avoid : [];
  const cat = pickCategory(category);

  const apiKey = process.env.GROQ_API_KEY;
  const isKeyValid = apiKey && !apiKey.includes("isi_dengan_kunci") && apiKey.trim().length > 10;

  // Try Groq API only if a real API key is configured
  if (isKeyValid) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          messages: buildMessages(cat, avoid),
          temperature: 0.9,
          max_tokens: 1500,
          response_format: { type: "json_object" },
        }),
        signal: AbortSignal.timeout(15000),
      });

      if (res.ok) {
        const data = await res.json();
        const raw = data.choices?.[0]?.message?.content ?? "";
        const jsonData = JSON.parse(raw);
        const fact = FactSchema.parse({ ...jsonData, category: cat });
        return NextResponse.json({ fact, source: "ai" });
      }
    } catch {
      // Fall through silently to seed data
    }
  }

  // Robust fallback to seed facts
  try {
    const pool = (seed as any[]).filter((f) => f.category === cat);
    const fact = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : seed[Math.floor(Math.random() * seed.length)];

    return NextResponse.json({ fact, source: "seed" });
  } catch {
    const fallback = seed[0];
    return NextResponse.json({ fact: fallback, source: "seed" });
  }
}