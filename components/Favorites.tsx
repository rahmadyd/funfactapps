"use client";

import { Fact } from "@/lib/schema";
import { removeFavorite } from "@/lib/storage";
import { useState, useEffect } from "react";

interface FavoritesProps {
  favorites: Fact[];
  onFavoriteClick: (fact: Fact) => void;
  onFavoritesUpdate: () => void;
}

const categoryDotColor: Record<Fact["category"], string> = {
  python: "bg-indigo-500",
  toefl: "bg-amber-500",
  design: "bg-purple-500",
  japanese: "bg-rose-500",
  machinelearning: "bg-emerald-500",
};

const categoryNames: Record<Fact["category"], string> = {
  python: "Python",
  toefl: "TOEFL",
  design: "Desain",
  japanese: "Jepang",
  machinelearning: "ML / Data",
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
    <section className="mt-16 max-w-3xl mx-auto pt-8 border-t border-zinc-200/80">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-zinc-900 tracking-tight">
            Fakta Tersimpan
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
            {favorites.length}
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          Klik kartu untuk meninjau kembali
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {favorites.map((fact) => (
          <div
            key={fact.title}
            onClick={() => onFavoriteClick(fact)}
            className="group cursor-pointer p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all duration-200 relative"
          >
            <div className="flex justify-between items-center mb-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200/80 px-2 py-0.5 rounded">
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

            <h4 className="font-semibold text-sm text-zinc-900 line-clamp-1 mb-1 group-hover:text-zinc-700 transition-colors">
              {fact.title}
            </h4>
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
              {fact.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}