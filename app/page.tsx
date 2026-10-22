"use client";

import { useState, useEffect, useCallback } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import FactCard from "@/components/FactCard";
import Favorites from "@/components/Favorites";
import { Fact } from "@/lib/schema";
import { getFavorites, addToRecent, getRecent } from "@/lib/storage";
import seed from "@/data/seed-facts.json";

type Source = "ai" | "seed";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("mixed");
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [source, setSource] = useState<Source>("ai");
  const [isLoading, setIsLoading] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [favorites, setFavorites] = useState<Fact[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load initial fact from seed
    const randomSeedFact = seed[Math.floor(Math.random() * seed.length)] as Fact;
    setCurrentFact(randomSeedFact);
    setViewCount(1);
    setIsRevealed(false);

    // Load favorites
    setFavorites(getFavorites());
  }, []);

  const fetchRandomFact = useCallback(async () => {
    if (cooldown || isLoading) return;

    setIsLoading(true);
    setCooldown(true);
    setIsRevealed(false); // Reset reveal on new card!

    const recentTitles = getRecent().slice(0, 15);

    try {
      const response = await fetch("/api/fact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          avoid: recentTitles,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentFact(data.fact);
        setSource(data.source);

        if (data.fact.title) {
          addToRecent(data.fact.title);
        }

        setViewCount((prev) => prev + 1);
      } else {
        // Fallback to seed
        const pool = selectedCategory === "mixed"
          ? seed
          : seed.filter((f) => f.category === selectedCategory);
        const fallbackFact = pool.length > 0
          ? pool[Math.floor(Math.random() * pool.length)]
          : seed[Math.floor(Math.random() * seed.length)];
        setCurrentFact(fallbackFact as Fact);
        setSource("seed");
        setViewCount((prev) => prev + 1);
      }
    } catch {
      // Fallback to seed on any error
      const pool = selectedCategory === "mixed"
        ? seed
        : seed.filter((f) => f.category === selectedCategory);
      const fallbackFact = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : seed[Math.floor(Math.random() * seed.length)];
      setCurrentFact(fallbackFact as Fact);
      setSource("seed");
      setViewCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
      setTimeout(() => setCooldown(false), 500);
    }
  }, [cooldown, isLoading, selectedCategory]);

  const toggleReveal = useCallback(() => {
    setIsRevealed((prev) => !prev);
  }, []);

  // Keyboard shortcuts: Space/ArrowRight for next, R for reveal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        fetchRandomFact();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        toggleReveal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fetchRandomFact, toggleReveal]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const pool = category === "mixed"
      ? seed
      : seed.filter((f) => f.category === category);
    const nextFact = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : seed[Math.floor(Math.random() * seed.length)];
    setCurrentFact(nextFact as Fact);
    setSource("seed");
    setIsRevealed(false);
  };

  const handleFavoriteClick = (fact: Fact) => {
    setCurrentFact(fact);
    setSource("seed");
    setIsRevealed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavoritesUpdate = () => {
    setFavorites(getFavorites());
  };

  const handleSaveToggle = () => {
    setFavorites(getFavorites());
  };

  if (!currentFact) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-900 border-t-transparent mx-auto" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Menyiapkan kartu...</p>
        </div>
      </div>
    );
  }

  // Micro-gamification level based on viewCount
  const focusLevel = viewCount <= 3 ? "Pemula Penasaran" : viewCount <= 7 ? "Fokus Terpacu 🔥" : "Master Micro-Learning 🚀";

  return (
    <div className="min-h-screen bg-white text-zinc-900 bg-dot-grid selection:bg-zinc-200">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header with ADHD Streak Tracker */}
        <header className="text-center max-w-xl mx-auto mb-8">
          {/* Dopamine Streak Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 shadow-sm mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Fakta ke-<strong>{viewCount}</strong></span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-500 text-[11px]">{focusLevel}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-950 mb-2">
            Fun Fact & Konsep Esensial
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal">
            Bite-sized micro learning tanpa bikin otak lelah.
          </p>
        </header>

        {/* Category Filter Pills */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Main Fact Card (Interactive Flashcard Mode) */}
        <main className="mb-6">
          <FactCard
            fact={currentFact}
            source={source}
            isLoading={isLoading}
            onSaveToggle={handleSaveToggle}
            isRevealed={isRevealed}
            onToggleReveal={toggleReveal}
          />
        </main>

        {/* Action Controls */}
        <section className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={fetchRandomFact}
            disabled={isLoading || cooldown || !isClient}
            className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 min-w-[210px] shadow-sm ${
              cooldown || isLoading
                ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed"
                : "bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.98] hover:shadow"
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Memuat fakta baru...</span>
              </>
            ) : cooldown ? (
              <span>Menyiapkan...</span>
            ) : (
              <>
                <span>Fakta Selanjutnya</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono hidden sm:inline-block border border-zinc-700">
                  Space
                </span>
                <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </section>

        {/* Favorites Section */}
        <Favorites
          favorites={favorites}
          onFavoriteClick={handleFavoriteClick}
          onFavoritesUpdate={handleFavoritesUpdate}
        />

        {/* Footer Shortcut Tips */}
        <footer className="mt-16 pt-6 border-t border-zinc-200/80 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400">
            <span>Tekan <kbd className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-300 rounded text-zinc-700 font-mono text-[10px]">R</kbd> untuk buka/tutup jawaban</span>
            <span>•</span>
            <span>Tekan <kbd className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-300 rounded text-zinc-700 font-mono text-[10px]">Spasi</kbd> untuk fakta berikutnya</span>
          </div>
        </footer>
      </div>
    </div>
  );
}