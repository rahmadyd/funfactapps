"use client";

import { Fact } from "@/lib/schema";
import { saveFavorite, removeFavorite, getFavorites } from "@/lib/storage";
import { useState, useEffect } from "react";

interface FactCardProps {
  fact: Fact;
  source?: "ai" | "seed";
  isLoading?: boolean;
  onSaveToggle?: (saved: boolean) => void;
  isRevealed?: boolean;
  onToggleReveal?: () => void;
  showAllElements?: boolean;
  sessionProgress?: string; // e.g. "Fakta 2/3"
}

const categoryMeta: Record<string, { name: string; tagClass: string; dotClass: string }> = {
  python: {
    name: "Python",
    tagClass: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    dotClass: "bg-indigo-500",
  },
  toefl: {
    name: "TOEFL & Grammar",
    tagClass: "bg-amber-50 text-amber-800 border-amber-200/60",
    dotClass: "bg-amber-500",
  },
  design: {
    name: "Desain",
    tagClass: "bg-purple-50 text-purple-700 border-purple-200/60",
    dotClass: "bg-purple-500",
  },
  japanese: {
    name: "Bahasa Jepang",
    tagClass: "bg-rose-50 text-rose-700 border-rose-200/60",
    dotClass: "bg-rose-500",
  },
  machinelearning: {
    name: "Data & ML",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    dotClass: "bg-emerald-500",
  },
  react: {
    name: "React.js",
    tagClass: "bg-cyan-50 text-cyan-800 border-cyan-200/60",
    dotClass: "bg-cyan-500",
  },
  nodejs: {
    name: "Node.js",
    tagClass: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
    dotClass: "bg-emerald-600",
  },
  sql: {
    name: "Database SQL",
    tagClass: "bg-blue-50 text-blue-800 border-blue-200/60",
    dotClass: "bg-blue-500",
  },
  nosql: {
    name: "Database NoSQL",
    tagClass: "bg-teal-50 text-teal-800 border-teal-200/60",
    dotClass: "bg-teal-500",
  },
  excel: {
    name: "Excel (Admin)",
    tagClass: "bg-green-50 text-green-800 border-green-200/60",
    dotClass: "bg-green-600",
  },
  ielts: {
    name: "IELTS Prep",
    tagClass: "bg-orange-50 text-orange-800 border-orange-200/60",
    dotClass: "bg-orange-500",
  },
  affirmation: {
    name: "Afirmasi Diri",
    tagClass: "bg-violet-50 text-violet-800 border-violet-200/60",
    dotClass: "bg-violet-500",
  },
  linux: {
    name: "Linux",
    tagClass: "bg-amber-50 text-amber-800 border-amber-200/60",
    dotClass: "bg-amber-600",
  },
  git: {
    name: "Git & GitHub",
    tagClass: "bg-orange-50 text-orange-800 border-orange-200/60",
    dotClass: "bg-orange-600",
  },
  cicd: {
    name: "CI/CD",
    tagClass: "bg-sky-50 text-sky-800 border-sky-200/60",
    dotClass: "bg-sky-600",
  },
  docker: {
    name: "Docker",
    tagClass: "bg-blue-50 text-blue-800 border-blue-200/60",
    dotClass: "bg-blue-600",
  },
  tailwind: {
    name: "Tailwind CSS",
    tagClass: "bg-teal-50 text-teal-800 border-teal-200/60",
    dotClass: "bg-teal-500",
  },
  publicspeaking: {
    name: "Public Speaking",
    tagClass: "bg-sky-50 text-sky-800 border-sky-200/60",
    dotClass: "bg-sky-600",
  },
  confidence: {
    name: "Percaya Diri",
    tagClass: "bg-rose-50 text-rose-800 border-rose-200/60",
    dotClass: "bg-rose-500",
  },
  // Fase 1 — Software Engineering
  javascript: {
    name: "JavaScript & TypeScript",
    tagClass: "bg-yellow-50 text-yellow-800 border-yellow-200/60",
    dotClass: "bg-yellow-500",
  },
  htmlcss: {
    name: "HTML & CSS",
    tagClass: "bg-orange-50 text-orange-700 border-orange-200/60",
    dotClass: "bg-orange-500",
  },
  dsa: {
    name: "DSA",
    tagClass: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/60",
    dotClass: "bg-fuchsia-500",
  },
  networking: {
    name: "Networking & HTTP",
    tagClass: "bg-sky-50 text-sky-700 border-sky-200/60",
    dotClass: "bg-sky-500",
  },
  restapi: {
    name: "REST API & Auth",
    tagClass: "bg-lime-50 text-lime-800 border-lime-200/60",
    dotClass: "bg-lime-600",
  },
  testing: {
    name: "Testing",
    tagClass: "bg-pink-50 text-pink-700 border-pink-200/60",
    dotClass: "bg-pink-500",
  },
};

// Helper to render furigana for Japanese text
function renderWithFurigana(text: string): React.ReactNode {
  if (!text.includes('{') || !text.includes('}')) {
    return text;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = /(\[[^\]]+\]\{[^}]+\}|[^\[]\{[^}]+\})/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const matchText = match[0];
    let kanji = '';
    let hiragana = '';

    if (matchText.startsWith('[')) {
      const kanjiMatch = matchText.match(/\[([^\]]+)\]\{([^}]+)\}/);
      if (kanjiMatch) {
        kanji = kanjiMatch[1];
        hiragana = kanjiMatch[2];
      }
    } else {
      const kanjiMatch = matchText.match(/([^\{]+)\{([^}]+)\}/);
      if (kanjiMatch) {
        kanji = kanjiMatch[1];
        hiragana = kanjiMatch[2];
      }
    }

    if (kanji && hiragana) {
      parts.push(
        <span key={match.index} className="furigana-container">
          <span className="furigana-text">{hiragana}</span>
          <span className="kanji-text">{kanji}</span>
        </span>
      );
    } else {
      parts.push(matchText);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

// Helper to format inline markdown like **bold** and `code`
function formatInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-semibold text-zinc-950 dark:text-zinc-100">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs border border-zinc-200/60 dark:border-zinc-700"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

// Helper to bold the first few words of a step for ADHD scannability
function formatScannableStep(step: string): React.ReactNode {
  if (step.includes(':')) {
    const [heading, ...restParts] = step.split(':');
    const rest = restParts.join(':');
    return (
      <>
        <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{heading}:</strong>
        {formatInlineMarkdown(rest)}
      </>
    );
  }

  const words = step.split(' ');
  if (words.length <= 3) {
    return <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{step}</strong>;
  }

  const boldPart = words.slice(0, 2).join(' ');
  const normalPart = ' ' + words.slice(2).join(' ');

  return (
    <>
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{boldPart}</strong>
      {formatInlineMarkdown(normalPart)}
    </>
  );
}

// Structured formatter for Example content
function renderFormattedExample(
  example: string,
  category: string,
  isCodeExample: boolean
): React.ReactNode {
  if (isCodeExample) {
    return (
      <pre className="font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {example}
      </pre>
    );
  }

  // Japanese with furigana/romaji
  if (category === "japanese") {
    const lines = example.split("\n").map((l) => l.trim()).filter(Boolean);
    const japaneseLine = lines[0] || example;
    const romajiLine = lines.slice(1).join("\n");
    return (
      <div className="space-y-3 py-1">
        <div className="text-lg sm:text-2xl font-japanese text-zinc-950 dark:text-zinc-50 leading-loose">
          {renderWithFurigana(japaneseLine)}
        </div>
        {romajiLine && (
          <div className="pt-2 border-t border-rose-100/80 dark:border-rose-900/30 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100/80 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
              Romaji
            </span>
            <span className="text-xs sm:text-sm font-mono text-zinc-700 dark:text-zinc-300">
              {romajiLine}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Comparison pattern (❌ vs ✔)
  if (example.includes("❌") && example.includes("✔")) {
    const xIndex = example.indexOf("❌");
    const vIndex = example.indexOf("✔");
    if (xIndex < vIndex) {
      const intro = example.substring(0, xIndex).trim();
      const avoid = example.substring(xIndex, vIndex).trim();
      const recommended = example.substring(vIndex).trim();
      const cleanAvoid = avoid.replace(/^❌\s*(Hindari[^:]*:\s*)?/i, "");
      const cleanRecommended = recommended.replace(/^✔\s*(Script[^:]*:\s*)?/i, "");

      return (
        <div className="space-y-3">
          {intro && <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{intro}</div>}
          <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/90 dark:border-rose-800/50 text-rose-950 dark:text-rose-200">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              <span>Hindari</span>
            </div>
            <div className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed whitespace-pre-wrap font-medium pl-0.5">
              {formatInlineMarkdown(cleanAvoid)}
            </div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/50 text-emerald-950 dark:text-emerald-200 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Script Rekomendasi</span>
            </div>
            <div className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed whitespace-pre-wrap font-semibold pl-0.5">
              {formatInlineMarkdown(cleanRecommended)}
            </div>
          </div>
        </div>
      );
    }
  }

  // Original vs Paraphrase (TOEFL / IELTS)
  if (example.includes("Original:") && example.includes("Paraphrase:")) {
    const origIndex = example.indexOf("Original:");
    const paraIndex = example.indexOf("Paraphrase:");
    const intro = example.substring(0, origIndex).trim();
    const original = example.substring(origIndex, paraIndex).trim().replace(/^Original:\s*/i, "");
    const paraphrase = example.substring(paraIndex).trim().replace(/^Paraphrase:\s*/i, "");

    return (
      <div className="space-y-3">
        {intro && <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{intro}</div>}
        <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-200/80 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <span>Kalimat Asli (Original)</span>
          </div>
          <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap font-medium">
            {formatInlineMarkdown(original)}
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/50 text-amber-950 dark:text-amber-200 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <span>Parafrase Rekomendasi</span>
          </div>
          <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed whitespace-pre-wrap font-semibold">
            {formatInlineMarkdown(paraphrase)}
          </div>
        </div>
      </div>
    );
  }

  // Numbered or Bulleted list
  const lines = example.split("\n").map((l) => l.trim()).filter(Boolean);
  const isNumbered = lines.some((l) => /^\d+\.\s+/.test(l));
  const isBulleted = lines.some((l) => /^[•\-\*]\s+/.test(l));

  if (isNumbered || isBulleted) {
    const introLines: string[] = [];
    const items: { mark: string; text: string }[] = [];

    lines.forEach((l) => {
      const matchNum = l.match(/^(\d+)\.\s+(.*)$/);
      const matchBullet = l.match(/^[•\-\*]\s+(.*)$/);
      if (matchNum) {
        items.push({ mark: matchNum[1], text: matchNum[2] });
      } else if (matchBullet) {
        items.push({ mark: "•", text: matchBullet[1] });
      } else if (items.length === 0) {
        introLines.push(l);
      } else {
        if (items.length > 0) {
          items[items.length - 1].text += " " + l;
        }
      }
    });

    if (items.length > 0) {
      return (
        <div className="space-y-3">
          {introLines.length > 0 && (
            <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1">
              {introLines.join(" ")}
            </div>
          )}
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-zinc-50/90 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-[11px] font-bold inline-flex items-center justify-center mt-0.5">
                  {item.mark}
                </span>
                <span className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal">
                  {formatInlineMarkdown(item.text)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  // Fallback prose
  return (
    <div className="text-zinc-800 dark:text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal space-y-2.5">
      {example.split("\n\n").map((paragraph, pIdx) => (
        <p key={pIdx}>{formatInlineMarkdown(paragraph)}</p>
      ))}
    </div>
  );
}

// Structured formatter for Result / Response
function renderFormattedResult(
  result: string,
  isCodeExample: boolean
): React.ReactNode {
  if (isCodeExample) {
    return (
      <div className="font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed bg-white/95 dark:bg-zinc-800/80 p-3.5 rounded-lg border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs overflow-x-auto">
        {result}
      </div>
    );
  }

  const lines = result.split("\n").map((l) => l.trim()).filter(Boolean);

  if (lines.length > 1) {
    return (
      <div className="space-y-2 font-sans bg-white/95 dark:bg-zinc-800/80 p-3.5 sm:p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs">
        {lines.map((line, idx) => {
          const isCheck = line.startsWith("✔") || line.startsWith("✓");
          const cleanLine = isCheck ? line.replace(/^[✔✓]\s*/, "") : line;
          return (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold inline-flex items-center justify-center mt-0.5">
                ✓
              </span>
              <div className="leading-relaxed font-medium">
                {formatInlineMarkdown(cleanLine)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="font-sans text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed bg-white/95 dark:bg-zinc-800/80 p-3.5 sm:p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs font-normal whitespace-pre-line">
      {formatInlineMarkdown(result)}
    </div>
  );
}

export default function FactCard({
  fact,
  source = "ai",
  isLoading = false,
  onSaveToggle,
  isRevealed = false,
  onToggleReveal,
  showAllElements = false,
  sessionProgress,
}: FactCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedFact, setCopiedFact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  // Reset on new fact
  useEffect(() => {
    setShowDetails(false);
    setBodyExpanded(false);
    setShowMoreActions(false);
  }, [fact.title]);

  useEffect(() => {
    setIsClient(true);
    const favorites = getFavorites();
    setIsSaved(favorites.some((f) => f.title === fact.title));
  }, [fact.title]);

  const handleSaveToggle = () => {
    if (!isClient) return;
    if (isSaved) {
      removeFavorite(fact.title);
      setIsSaved(false);
      onSaveToggle?.(false);
    } else {
      saveFavorite(fact);
      setIsSaved(true);
      onSaveToggle?.(true);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(fact.example);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch { /* ignore */ }
  };

  const handleCopyFact = async () => {
    try {
      const shareText = `💡 ${fact.title}\n\n${fact.body}\n\nContoh:\n${fact.example}\n\n${fact.result}\n\nVia Fun Fact Acak`;
      await navigator.clipboard.writeText(shareText);
      setCopiedFact(true);
      setTimeout(() => setCopiedFact(false), 2000);
    } catch { /* ignore */ }
  };

  const isCodeExample = [
    "python", "machinelearning", "react", "nodejs", "sql", "nosql",
    "excel", "linux", "git", "cicd", "docker", "tailwind",
    "javascript", "htmlcss", "dsa", "networking", "restapi", "testing",
  ].includes(fact.category);

  const getExampleHeader = () => {
    switch (fact.category) {
      case "excel": return "Kasus & Rumus Excel";
      case "sql": return "Query SQL";
      case "nosql": return "Query / Dokumen NoSQL";
      case "react": return "Kode Komponen / Hook";
      case "nodejs": return "Kode Runtime Node.js";
      case "python": return "Kode Python";
      case "machinelearning": return "Pseudocode / Kode ML";
      case "linux": return "Perintah Terminal Linux";
      case "git": return "Perintah Git / Skenario";
      case "cicd": return "Konfigurasi CI/CD (YAML)";
      case "docker": return "Dockerfile / Perintah Docker";
      case "tailwind": return "Markup Class Tailwind";
      case "affirmation": return "Afirmasi Harian";
      case "publicspeaking": return "Script Percakapan & Cara Praktik Langsung";
      case "confidence": return "Latihan Aksi & Teknik Fisik/Mental";
      case "ielts": case "toefl": return "Contoh Frasa / Kalimat";
      case "javascript": return "Kode JavaScript / TypeScript";
      case "htmlcss": return "Markup HTML & CSS";
      case "dsa": return "Pseudocode / Algoritma";
      case "networking": return "Contoh Request / Protokol";
      case "restapi": return "Endpoint & Konfigurasi API";
      case "testing": return "Kode Test / Assertion";
      default: return "Contoh";
    }
  };

  const getResultHeader = () => {
    switch (fact.category) {
      case "excel": return "Hasil Sel / Output";
      case "sql": case "nosql": return "Hasil Query / Output";
      case "python": case "machinelearning": case "react": case "nodejs": return "Hasil Eksekusi";
      case "linux": return "Output Terminal / Efek";
      case "git": return "Status / Output Git";
      case "cicd": return "Hasil Eksekusi Pipeline";
      case "docker": return "Hasil Container / Image";
      case "tailwind": return "Efek Tampilan & Styling";
      case "affirmation": return "Refleksi & Mindset Shift";
      case "publicspeaking": return "Respon Lawan Bicara & Efek Diplomatis";
      case "confidence": return "Sensasi Fisik & Hasil Latihan";
      case "ielts": case "toefl": return "Arti & Analisa";
      case "javascript": case "htmlcss": case "dsa": case "testing": return "Hasil Eksekusi";
      case "networking": case "restapi": return "Response / Efek";
      default: return "Arti / Hasil";
    }
  };

  const getWhyHeader = () => {
    switch (fact.category) {
      case "publicspeaking": return "Kenapa Trik Ini Meluluhkan Lawan Bicara?";
      case "confidence": return "Mekanisme Otak & Tubuh di Balik Latihan Ini";
      default: return "Mengapa Bisa Begini?";
    }
  };

  const getHowToHeader = () => {
    switch (fact.category) {
      case "publicspeaking": return "Latihan Harian Agar Spontan Bisa (Action Drills)";
      case "confidence": return "Langkah Latihan Harian Agar Terbiasa";
      default: return "Langkah Praktis";
    }
  };

  const getUsageHeader = () => {
    switch (fact.category) {
      case "publicspeaking": case "confidence": return "Kapan Harus Dipakai";
      default: return "Penerapan";
    }
  };

  const currentCategory = categoryMeta[fact.category] || {
    name: fact.category,
    tagClass: "bg-zinc-100 text-zinc-700 border-zinc-200",
    dotClass: "bg-zinc-500",
  };

  // Body text: limit to 2 lines (~120 chars) unless expanded
  const bodyText = fact.body;
  const isBodyLong = bodyText.length > 120;
  const displayBody = bodyExpanded || !isBodyLong ? bodyText : bodyText.slice(0, 120) + "...";

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-7 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>
        <div className="h-8 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded-md mb-3 animate-pulse" />
        <div className="h-5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md mb-6 animate-pulse" />
        <div className="h-28 w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-4 animate-pulse" />
        <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <article className="animate-card-in bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-700 rounded-2xl p-5 sm:p-8 max-w-2xl mx-auto card-shadow hover:card-shadow-hover transition-all duration-300">
      {/* Top Meta Bar — Clean default: only category tag + session progress */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          {/* Category Tag */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${currentCategory.tagClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${currentCategory.dotClass}`} />
            {currentCategory.name}
          </span>

          {/* Session Progress */}
          {sessionProgress && (
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
              {sessionProgress}
            </span>
          )}
        </div>

        {/* More actions button (⋯) — hidden elements revealed here */}
        <div className="relative">
          <button
            onClick={() => setShowMoreActions(!showMoreActions)}
            className="p-1.5 text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400 rounded-lg transition-colors"
            title="Opsi lainnya"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>

          {/* Popup with hidden elements */}
          {showMoreActions && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg z-40 py-1 animate-pop-in">
              {/* Timer */}
              <div className="px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span>⏱️</span> <span>~20 dtk baca</span>
              </div>
              {/* AI Badge */}
              <div className="px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${source === "ai" ? "bg-emerald-500" : "bg-amber-400"}`} />
                <span>{source === "ai" ? "AI Generated" : "Offline"}</span>
              </div>
              {/* Copy */}
              <button
                onClick={handleCopyFact}
                className="w-full px-3 py-2 text-[11px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2 text-left transition-colors"
              >
                <span>{copiedFact ? "✓" : "📋"}</span>
                <span>{copiedFact ? "Tersalin!" : "Salin fakta"}</span>
              </button>
              {/* Bookmark */}
              <button
                onClick={() => { handleSaveToggle(); setShowMoreActions(false); }}
                className="w-full px-3 py-2 text-[11px] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2 text-left transition-colors"
              >
                <span>{isSaved ? "⭐" : "☆"}</span>
                <span>{isSaved ? "Hapus dari simpanan" : "Simpan fakta"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Elements shown when showAllElements is true */}
      {showAllElements && (
        <div className="flex items-center gap-2 mb-3 -mt-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded text-zinc-500 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700">
            ⏱️ 20 dtk
          </span>
          {source === "ai" ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AI Generated
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Offline
            </span>
          )}
          <button onClick={handleCopyFact} title="Salin fakta" className="p-1.5 text-zinc-400 hover:text-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg border border-zinc-200/70 dark:border-zinc-700 transition-colors">
            {copiedFact ? (
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            )}
          </button>
          <button onClick={handleSaveToggle} title={isSaved ? "Hapus dari simpanan" : "Simpan fakta"} className={`p-1.5 rounded-lg border transition-all ${isSaved ? "bg-amber-50 text-amber-600 border-amber-300" : "bg-white dark:bg-zinc-800 text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 hover:text-zinc-600"}`}>
            <svg className={`w-4 h-4 ${isSaved ? "fill-amber-500 text-amber-500" : "fill-none text-current"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      )}

      {/* 1. Title (The Big Hook) */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-snug mb-4">
        {fact.title}
      </h2>

      {/* 2. Code / Example */}
      <div className="mb-5 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-zinc-50/70 dark:bg-zinc-800/50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100/90 dark:bg-zinc-800 border-b border-zinc-200/80 dark:border-zinc-700 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span className="uppercase tracking-wider font-semibold text-[11px] text-zinc-600 dark:text-zinc-400">
            {getExampleHeader()}
          </span>
          {isCodeExample && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              {copiedCode ? "Tersalin" : "Salin"}
            </button>
          )}
        </div>
        <div className="p-4 sm:p-5">
          {renderFormattedExample(fact.example, fact.category, isCodeExample)}
        </div>
      </div>

      {/* 3. Tebak & Lihat Hasilnya */}
      <div className="mb-5 border border-zinc-200/90 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
        {isRevealed ? (
          <div className="animate-pop-in p-4 sm:p-5 bg-emerald-50/40 dark:bg-emerald-950/20 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {getResultHeader()}
              </span>
              <button onClick={onToggleReveal} className="text-[11px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 underline">
                Sembunyikan
              </button>
            </div>
            <div className="mt-1">
              {renderFormattedResult(fact.result, isCodeExample)}
            </div>
          </div>
        ) : (
          <button
            onClick={onToggleReveal}
            className="w-full py-4 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-50/80 dark:bg-zinc-800/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 transition-colors group text-center"
          >
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
              <span className="text-base group-hover:scale-110 transition-transform">👁️</span>
              <span>Tebak & Lihat Hasilnya</span>
            </div>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">
              (Klik untuk memicu rasa ingin tahu otakmu!)
            </span>
          </button>
        )}
      </div>

      {/* 4. Penjelasan Singkat — limited to 2 lines by default */}
      <div className="mb-5 p-4 sm:p-5 bg-gradient-to-br from-amber-50/50 via-zinc-50 to-amber-50/20 dark:from-amber-950/20 dark:via-zinc-900 dark:to-amber-950/10 border border-amber-200/70 dark:border-amber-800/40 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs shadow-xs">💡</span>
          <span>Penjelasan Singkat</span>
        </div>
        <p className="text-zinc-800 dark:text-zinc-200 text-sm sm:text-base font-normal leading-relaxed whitespace-pre-line pl-0.5">
          {formatInlineMarkdown(displayBody)}
        </p>
        {isBodyLong && !bodyExpanded && (
          <button
            onClick={() => setBodyExpanded(true)}
            className="mt-1 text-xs text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium underline underline-offset-2"
          >
            Baca selengkapnya
          </button>
        )}
      </div>

      {/* 5. Bedah Logika & Langkah Praktis — collapsed by default */}
      <div className="pt-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors shadow-sm"
        >
          <span className="inline-flex items-center gap-2">
            <span>{showDetails ? "📖 Sembunyikan Pembahasan" : "📖 Bedah Logika & Langkah Praktis"}</span>
            {!showDetails && (
              <span className="text-[10px] font-normal text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                + Detail
              </span>
            )}
          </span>
          <svg
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDetails && (
          <div className="animate-pop-in mt-4 space-y-4 pt-1">
            <div className="p-4 bg-zinc-50/70 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2">
                <span className="text-zinc-500">❓</span>
                <span>{getWhyHeader()}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {formatInlineMarkdown(fact.why)}
              </p>
            </div>

            <div className="p-4 bg-zinc-50/70 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-2.5">
                <span className="text-zinc-500">⚡</span>
                <span>{getHowToHeader()}</span>
              </div>
              <ul className="space-y-2">
                {fact.howTo.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-[10px] font-bold inline-flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{formatScannableStep(step)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {fact.quote && (
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 border-l-2 border-l-zinc-900 dark:border-l-zinc-400">
                <p className="text-xs italic text-zinc-700 dark:text-zinc-300 mb-1 leading-relaxed">
                  &ldquo;{fact.quote.split(" - ")[0]}&rdquo;
                </p>
                {fact.quote.includes(" - ") && (
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 text-right">
                    — {fact.quote.split(" - ").slice(1).join(" - ")}
                  </p>
                )}
              </div>
            )}

            <div className="p-3 bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase text-[10px] tracking-wide px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-700 rounded flex-shrink-0">
                {getUsageHeader()}
              </span>
              <span className="leading-relaxed whitespace-pre-line">{formatInlineMarkdown(fact.usage)}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
