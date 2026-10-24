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
}

const categoryMeta: Record<Fact["category"], { name: string; tagClass: string; dotClass: string }> = {
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
};

// Helper function to render furigana for Japanese text
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

// Helper to bold the first few words of a step for ADHD scannability
function formatScannableStep(step: string): React.ReactNode {
  if (step.includes(':')) {
    const [heading, rest] = step.split(':');
    return (
      <>
        <strong className="font-semibold text-zinc-900">{heading}:</strong>
        {rest}
      </>
    );
  }

  const words = step.split(' ');
  if (words.length <= 3) {
    return <strong className="font-semibold text-zinc-900">{step}</strong>;
  }

  const boldPart = words.slice(0, 2).join(' ');
  const normalPart = ' ' + words.slice(2).join(' ');

  return (
    <>
      <strong className="font-semibold text-zinc-900">{boldPart}</strong>
      {normalPart}
    </>
  );
}

export default function FactCard({
  fact,
  source = "ai",
  isLoading = false,
  onSaveToggle,
  isRevealed = false,
  onToggleReveal,
}: FactCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedFact, setCopiedFact] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Reset showDetails whenever a new fact loads so it stays bite-sized!
  useEffect(() => {
    setShowDetails(false);
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
    } catch {
      // ignore
    }
  };

  const handleCopyFact = async () => {
    try {
      const shareText = `💡 ${fact.title}\n\n${fact.body}\n\nContoh:\n${fact.example}\n\n${fact.result}\n\nVia Fun Fact Acak`;
      await navigator.clipboard.writeText(shareText);
      setCopiedFact(true);
      setTimeout(() => setCopiedFact(false), 2000);
    } catch {
      // ignore
    }
  };

  const isCodeExample = [
    "python",
    "machinelearning",
    "react",
    "nodejs",
    "sql",
    "nosql",
    "excel",
    "linux",
    "git",
    "cicd",
    "docker",
    "tailwind",
  ].includes(fact.category);

  const getExampleHeader = () => {
    switch (fact.category) {
      case "excel":
        return "Kasus & Rumus Excel";
      case "sql":
        return "Query SQL";
      case "nosql":
        return "Query / Dokumen NoSQL";
      case "react":
        return "Kode Komponen / Hook";
      case "nodejs":
        return "Kode Runtime Node.js";
      case "python":
        return "Kode Python";
      case "machinelearning":
        return "Pseudocode / Kode ML";
      case "linux":
        return "Perintah Terminal Linux";
      case "git":
        return "Perintah Git / Skenario";
      case "cicd":
        return "Konfigurasi CI/CD (YAML)";
      case "docker":
        return "Dockerfile / Perintah Docker";
      case "tailwind":
        return "Markup Class Tailwind";
      case "affirmation":
        return "Afirmasi Harian";
      case "ielts":
      case "toefl":
        return "Contoh Frasa / Kalimat";
      default:
        return "Contoh";
    }
  };

  const getResultHeader = () => {
    switch (fact.category) {
      case "excel":
        return "Hasil Sel / Output";
      case "sql":
      case "nosql":
        return "Hasil Query / Output";
      case "python":
      case "machinelearning":
      case "react":
      case "nodejs":
        return "Hasil Eksekusi";
      case "linux":
        return "Output Terminal / Efek";
      case "git":
        return "Status / Output Git";
      case "cicd":
        return "Hasil Eksekusi Pipeline";
      case "docker":
        return "Hasil Container / Image";
      case "tailwind":
        return "Efek Tampilan & Styling";
      case "affirmation":
        return "Refleksi & Mindset Shift";
      case "ielts":
      case "toefl":
        return "Arti & Analisa";
      default:
        return "Arti / Hasil";
    }
  };

  const hasFurigana = fact.category === "japanese" && (fact.example.includes('{') || fact.example.includes('['));
  const currentCategory = categoryMeta[fact.category] || {
    name: fact.category,
    tagClass: "bg-zinc-100 text-zinc-700 border-zinc-200",
    dotClass: "bg-zinc-500",
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-28 bg-zinc-100 rounded-full animate-pulse" />
          <div className="h-7 w-20 bg-zinc-100 rounded-lg animate-pulse" />
        </div>
        <div className="h-8 w-3/4 bg-zinc-100 rounded-md mb-3 animate-pulse" />
        <div className="h-5 w-full bg-zinc-100 rounded-md mb-6 animate-pulse" />
        <div className="h-28 w-full bg-zinc-100 rounded-xl mb-4 animate-pulse" />
        <div className="h-10 w-full bg-zinc-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <article className="animate-card-in bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-8 max-w-2xl mx-auto card-shadow hover:card-shadow-hover transition-all duration-300">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          {/* Category Tag */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border ${currentCategory.tagClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${currentCategory.dotClass}`} />
            {currentCategory.name}
          </span>

          {/* Quick Read Time Tag (ADHD Anchor) */}
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded text-zinc-500 bg-zinc-50 border border-zinc-200/60">
            <span>⏱️ 20 dtk</span>
          </span>
        </div>

        {/* Right Actions: Copy & Bookmark */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyFact}
            title="Salin fakta ini"
            className="p-1.5 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-lg border border-zinc-200/70 transition-colors"
          >
            {copiedFact ? (
              <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>

          <button
            onClick={handleSaveToggle}
            title={isSaved ? "Hapus dari simpanan" : "Simpan fakta"}
            className={`p-1.5 rounded-lg border transition-all ${
              isSaved
                ? "bg-amber-50 text-amber-600 border-amber-300"
                : "bg-white text-zinc-400 border-zinc-200 hover:border-zinc-300 hover:text-zinc-600"
            }`}
          >
            <svg
              className={`w-4 h-4 ${isSaved ? "fill-amber-500 text-amber-500" : "fill-none text-current"}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Headline (The Big Hook) */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-snug mb-3">
        {fact.title}
      </h2>

      {/* Bite-sized TL;DR Callout (Visual Anchor) */}
      <div className="mb-6 p-3.5 bg-zinc-50 border border-zinc-200/90 rounded-xl flex items-start gap-2.5">
        <span className="text-amber-500 text-sm mt-0.5 flex-shrink-0">💡</span>
        <p className="text-zinc-700 text-sm sm:text-base font-medium leading-relaxed">
          {fact.body}
        </p>
      </div>

      {/* Example & Interactive Reveal Container */}
      <div className="mb-6 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50/70 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100/90 border-b border-zinc-200/80 text-xs font-medium text-zinc-500">
          <span className="uppercase tracking-wider font-semibold text-[11px] text-zinc-600">
            {getExampleHeader()}
          </span>
          {isCodeExample && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {copiedCode ? "Tersalin" : "Salin"}
            </button>
          )}
        </div>

        {/* Example Content */}
        <div className="p-4 sm:p-5">
          {isCodeExample ? (
            <pre className="font-mono text-xs sm:text-sm text-zinc-900 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {fact.example}
            </pre>
          ) : (
            <div className="text-zinc-800 text-sm sm:text-base leading-relaxed font-normal">
              {hasFurigana ? renderWithFurigana(fact.example) : fact.example}
            </div>
          )}
        </div>

        {/* Interactive Result Reveal (The Dopamine Hook!) */}
        <div className="border-t border-zinc-200/90 bg-white">
          {isRevealed ? (
            <div className="animate-pop-in p-4 sm:p-5 bg-emerald-50/40 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {getResultHeader()}
                </span>
                <button
                  onClick={onToggleReveal}
                  className="text-[11px] text-zinc-400 hover:text-zinc-600 underline"
                >
                  Sembunyikan
                </button>
              </div>
              <div className="font-mono text-xs sm:text-sm text-zinc-900 whitespace-pre-wrap leading-relaxed bg-white/80 p-3 rounded-lg border border-emerald-200/60 shadow-sm">
                {fact.result}
              </div>
            </div>
          ) : (
            <button
              onClick={onToggleReveal}
              className="w-full py-4 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-zinc-700 hover:text-zinc-950 bg-zinc-50/80 hover:bg-zinc-100/80 transition-colors group text-center"
            >
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
                <span className="text-base group-hover:scale-110 transition-transform">👁️</span>
                <span>Tebak & Lihat Hasilnya</span>
                <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono font-normal">
                  R
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-normal">
                (Klik untuk memicu rasa ingin tahu otakmu!)
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Progressive Disclosure Toggle (Bedah Logika & Cara Pakai) */}
      <div className="pt-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 flex items-center justify-between transition-colors shadow-sm"
        >
          <span className="inline-flex items-center gap-2">
            <span>{showDetails ? "📖 Sembunyikan Pembahasan" : "📖 Bedah Logika & Langkah Praktis"}</span>
            {!showDetails && (
              <span className="text-[10px] font-normal text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
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

        {/* Expandable Bento Insight */}
        {showDetails && (
          <div className="animate-pop-in mt-4 space-y-4 pt-1">
            {/* Mengapa Terjadi */}
            <div className="p-4 bg-zinc-50/70 rounded-xl border border-zinc-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                <span className="text-zinc-500">❓</span>
                <span>Mengapa Bisa Begini?</span>
              </div>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                {fact.why}
              </p>
            </div>

            {/* Langkah Praktis (Scannable Steps) */}
            <div className="p-4 bg-zinc-50/70 rounded-xl border border-zinc-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2.5">
                <span className="text-zinc-500">⚡</span>
                <span>Langkah Praktis</span>
              </div>
              <ul className="space-y-2">
                {fact.howTo.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-zinc-200 text-zinc-800 text-[10px] font-bold inline-flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{formatScannableStep(step)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote (if any) */}
            {fact.quote && (
              <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 border-l-2 border-l-zinc-900">
                <p className="text-xs italic text-zinc-700 mb-1 leading-relaxed">
                  "{fact.quote.split(" - ")[0]}"
                </p>
                {fact.quote.includes(" - ") && (
                  <p className="text-[11px] font-medium text-zinc-500 text-right">
                    — {fact.quote.split(" - ").slice(1).join(" - ")}
                  </p>
                )}
              </div>
            )}

            {/* Real World Scenario */}
            <div className="p-3 bg-white rounded-lg border border-zinc-200 text-xs flex items-start gap-2 text-zinc-600">
              <span className="font-semibold text-zinc-900 uppercase text-[10px] tracking-wide px-1.5 py-0.5 bg-zinc-100 rounded flex-shrink-0">
                Penerapan
              </span>
              <span className="leading-relaxed">{fact.usage}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}