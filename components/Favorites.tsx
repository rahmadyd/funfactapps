"use client";

import { Fact } from "@/lib/schema";
import { removeFavorite } from "@/lib/storage";
import { useState, useEffect } from "react";

interface FavoritesProps {
  favorites: Fact[];
  onFavoriteClick: (fact: Fact) => void;
  onFavoritesUpdate: () => void;
}

const categoryDotColor: Record<string, string> = {
  python: "bg-indigo-500",
  toefl: "bg-amber-500",
  design: "bg-purple-500",
  japanese: "bg-rose-500",
  machinelearning: "bg-emerald-500",
  react: "bg-cyan-500",
  nodejs: "bg-emerald-600",
  sql: "bg-blue-500",
  nosql: "bg-teal-500",
  excel: "bg-green-600",
  ielts: "bg-orange-500",
  affirmation: "bg-violet-500",
  linux: "bg-amber-600",
  git: "bg-orange-600",
  cicd: "bg-sky-600",
  docker: "bg-blue-600",
  tailwind: "bg-teal-500",
  publicspeaking: "bg-sky-600",
  confidence: "bg-rose-500",
  javascript: "bg-yellow-500",
  htmlcss: "bg-orange-500",
  dsa: "bg-fuchsia-500",
  networking: "bg-sky-500",
  restapi: "bg-lime-600",
  testing: "bg-pink-500",
};

const categoryNames: Record<string, string> = {
  python: "Python",
  toefl: "TOEFL",
  design: "Desain",
  japanese: "Jepang",
  machinelearning: "ML / Data",
  react: "React.js",
  nodejs: "Node.js",
  sql: "SQL",
  nosql: "NoSQL",
  excel: "Excel",
  ielts: "IELTS",
  affirmation: "Afirmasi",
  linux: "Linux",
  git: "Git/GitHub",
  cicd: "CI/CD",
  docker: "Docker",
  tailwind: "Tailwind",
  publicspeaking: "Public Speaking",
  confidence: "Percaya Diri",
  javascript: "JS/TS",
  htmlcss: "HTML/CSS",
  dsa: "DSA",
  networking: "Network",
  restapi: "REST API",
  testing: "Testing",
};

export default function Favorites({ favorites, onFavoriteClick, onFavoritesUpdate }: FavoritesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || favorites.length === 0) {
    return null;
  }

  const handleRemoveFavorite = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavorite(title);
    onFavoritesUpdate();
  };

  return (
    <section className="mt-16 max-w-3xl mx-auto pt-8 border-t border-zinc-200/80 dark:border-zinc-700">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Fakta Tersimpan
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            {favorites.length}
          </span>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Klik kartu untuk meninjau kembali
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {favorites.map((fact) => (
          <div
            key={fact.title}
            onClick={() => onFavoriteClick(fact)}
            className="group cursor-pointer p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm transition-all duration-200 relative"
          >
            <div className="flex justify-between items-center mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 px-2 py-0.5 rounded">
                <span className={`w-1.5 h-1.5 rounded-full ${categoryDotColor[fact.category] || "bg-zinc-400"}`} />
                {categoryNames[fact.category] || fact.category}
              </span>

              <button
                onClick={(e) => handleRemoveFavorite(fact.title, e)}
                title="Hapus dari tersimpan"
                className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-500 rounded transition-opacity"
                aria-label={`Hapus ${fact.title}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {fact.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {fact.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}