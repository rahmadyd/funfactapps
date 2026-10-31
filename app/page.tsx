"use client";

import { useState, useEffect, useCallback } from "react";
import TopicDropdown from "@/components/TopicDropdown";
import FactCard from "@/components/FactCard";
import SessionComplete from "@/components/SessionComplete";
import Favorites from "@/components/Favorites";
import { Fact } from "@/lib/schema";
import {
  getFavorites,
  addToRecent,
  getRecent,
  getLastTopic,
  setLastTopic,
  getSessionSize,
  setSessionSize,
  getTheme,
  setTheme,
  getStreak,
  getShowAllElements,
  setShowAllElements,
  getQuickNote,
  setQuickNote,
  type ThemeOption,
} from "@/lib/storage";
import seed from "@/data/seed-facts.json";

type Source = "ai" | "seed";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("python");
  const [currentFact, setCurrentFact] = useState<Fact | null>(null);
  const [source, setSource] = useState<Source>("ai");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Fact[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Session state
  const [sessionCount, setSessionCount] = useState(0);
  const [sessionSize, setSessionSizeState] = useState(3);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Recent topics for dropdown
  const [recentTopics, setRecentTopics] = useState<string[]>([]);

  // Theme
  const [theme, setThemeState] = useState<ThemeOption>("light");

  // Streak
  const [streakDays, setStreakDays] = useState(0);
  const [isReturning, setIsReturning] = useState(false);

  // Show all elements toggle
  const [showAll, setShowAll] = useState(false);

  // Quick note
  const [quickNote, setQuickNoteState] = useState("");
  const [showQuickNote, setShowQuickNote] = useState(false);

  // Settings panel
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setFavorites(getFavorites());

    // Load from storage
    const savedTopic = getLastTopic();
    setSelectedCategory(savedTopic);

    const savedSize = getSessionSize();
    setSessionSizeState(savedSize);

    const savedTheme = getTheme();
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    const streak = getStreak();
    setStreakDays(streak.days);
    setIsReturning(streak.isReturning);

    setShowAll(getShowAllElements());
    setQuickNoteState(getQuickNote());

    // Build recent topics from recent fact titles — use localStorage topics
    const storedRecent = getRecentTopics();
    setRecentTopics(storedRecent);

    // Auto-load fact for last topic
    fetchRandomFact(savedTopic);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getRecentTopics(): string[] {
    try {
      if (typeof window === "undefined") return [];
      const val = localStorage.getItem("ff-recent-topics");
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  }

  function addRecentTopic(topic: string) {
    try {
      if (typeof window === "undefined") return;
      const existing = getRecentTopics();
      const filtered = existing.filter((t) => t !== topic);
      filtered.unshift(topic);
      if (filtered.length > 10) filtered.length = 10;
      localStorage.setItem("ff-recent-topics", JSON.stringify(filtered));
      setRecentTopics(filtered);
    } catch { /* ignore */ }
  }

  function applyTheme(t: ThemeOption) {
    const html = document.documentElement;
    html.classList.remove("theme-light", "theme-cream", "theme-dark");
    html.classList.add(`theme-${t}`);
    // Also set dark class for Tailwind dark: prefix
    if (t === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  const fetchRandomFact = useCallback(async (targetCategory?: string | unknown) => {
    if (cooldown || isLoading) return;

    const catToFetch = typeof targetCategory === "string" ? targetCategory : selectedCategory;

    setIsLoading(true);
    setCooldown(true);
    setIsRevealed(false);

    const recentTitles = getRecent().slice(0, 15);

    try {
      const response = await fetch("/api/fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: catToFetch, avoid: recentTitles }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentFact(data.fact);
        setSource(data.source);

        if (process.env.NODE_ENV === "development" || data.source === "seed") {
          console.log(
            `[funfact] source=${data.source}`,
            data._model ? `model=${data._model}` : "",
            data._fallbackReason ? `reason=${data._fallbackReason}` : ""
          );
        }

        if (data.fact?.title) {
          addToRecent(data.fact.title);
        }

        setSessionCount((prev) => prev + 1);
      } else {
        const pool = seed.filter((f) => f.category === catToFetch);
        const fallbackFact = pool.length > 0
          ? pool[Math.floor(Math.random() * pool.length)]
          : seed[Math.floor(Math.random() * seed.length)];
        setCurrentFact(fallbackFact as Fact);
        setSource("seed");
        setSessionCount((prev) => prev + 1);
      }
    } catch {
      const pool = seed.filter((f) => f.category === catToFetch);
      const fallbackFact = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : seed[Math.floor(Math.random() * seed.length)];
      setCurrentFact(fallbackFact as Fact);
      setSource("seed");
      setSessionCount((prev) => prev + 1);
    } finally {
      setIsLoading(false);
      setTimeout(() => setCooldown(false), 500);
    }
  }, [cooldown, isLoading, selectedCategory]);

  const handleNextFact = useCallback(() => {
    // Check if session will be complete after this
    if (sessionCount >= sessionSize) {
      setIsSessionComplete(true);
      return;
    }
    fetchRandomFact();
  }, [sessionCount, sessionSize, fetchRandomFact]);

  const toggleReveal = useCallback(() => {
    setIsRevealed((prev) => !prev);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        handleNextFact();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        toggleReveal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextFact, toggleReveal]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setLastTopic(category);
    addRecentTopic(category);
    setSessionCount(0);
    setIsSessionComplete(false);
    fetchRandomFact(category);
  };

  const handleFavoriteClick = (fact: Fact) => {
    setCurrentFact(fact);
    setSource("seed");
    setIsRevealed(true);
    setIsSessionComplete(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFavoritesUpdate = () => {
    setFavorites(getFavorites());
  };

  const handleSaveToggle = () => {
    setFavorites(getFavorites());
  };

  const handleSessionFinish = () => {
    // Just stay on the completion screen — user is done
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSessionContinue = () => {
    setSessionCount(0);
    setIsSessionComplete(false);
    fetchRandomFact();
  };

  const handleThemeChange = (t: ThemeOption) => {
    setThemeState(t);
    setTheme(t);
    applyTheme(t);
  };

  const handleSessionSizeChange = (size: number) => {
    setSessionSizeState(size);
    setSessionSize(size);
  };

  const handleShowAllToggle = () => {
    const next = !showAll;
    setShowAll(next);
    setShowAllElements(next);
  };

  const handleQuickNoteChange = (note: string) => {
    setQuickNoteState(note);
    setQuickNote(note);
  };

  // Focus level
  const focusLevel = sessionCount <= 3 ? "Pemula Penasaran" : sessionCount <= 7 ? "Fokus Terpacu 🔥" : "Master Micro-Learning 🚀";

  if (!currentFact && !isSessionComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent mx-auto" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Menyiapkan kartu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page text-page selection:bg-zinc-200 dark:selection:bg-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header — Minimal */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Session Progress Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Fakta <strong>{sessionCount}</strong>/{sessionSize}</span>
              <span className="text-zinc-300 dark:text-zinc-600">•</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">{focusLevel}</span>
            </div>
          </div>

          {/* Settings gear */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Pengaturan"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div className="animate-pop-in mb-6 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-4">Pengaturan</h3>

            {/* Session Size */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2 block">
                Fakta per sesi
              </label>
              <div className="flex gap-2">
                {[3, 5, 10].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSessionSizeChange(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                      sessionSize === size
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2 block">
                Tema
              </label>
              <div className="flex gap-2">
                {([
                  { id: "light" as ThemeOption, label: "Terang", icon: "☀️" },
                  { id: "cream" as ThemeOption, label: "Krem", icon: "🍂" },
                  { id: "dark" as ThemeOption, label: "Gelap Lembut", icon: "🌙" },
                ]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      theme === t.id
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Show All Elements */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Tampilkan semua elemen
              </label>
              <button
                onClick={handleShowAllToggle}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  showAll ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    showAll ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Welcome back message (no punishment) */}
        {isClient && isReturning && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-sm text-emerald-800 dark:text-emerald-300 font-medium animate-card-in">
            👋 Lanjut dari sini. Senang kamu kembali!
          </div>
        )}

        {isClient && !isReturning && streakDays > 1 && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 font-medium animate-card-in">
            🔥 Sudah {streakDays} hari belajar. Mantap!
          </div>
        )}

        {/* Topic Dropdown — replaces the 19+ chip grid */}
        <TopicDropdown
          selectedCategory={selectedCategory}
          recentTopics={recentTopics}
          onCategorySelect={handleCategorySelect}
        />

        {/* Session Complete Screen */}
        {isSessionComplete ? (
          <>
            <SessionComplete
              sessionSize={sessionSize}
              streakDays={streakDays}
              onFinish={handleSessionFinish}
              onContinue={handleSessionContinue}
            />

            {/* Quick Note */}
            <div className="max-w-2xl mx-auto mt-8">
              <button
                onClick={() => setShowQuickNote(!showQuickNote)}
                className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 font-medium transition-colors"
              >
                📝 {showQuickNote ? "Sembunyikan catatan" : "Catatan cepat"}
              </button>
              {showQuickNote && (
                <textarea
                  value={quickNote}
                  onChange={(e) => handleQuickNoteChange(e.target.value)}
                  placeholder="Pikiran yang lewat..."
                  className="mt-2 w-full h-20 p-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
                />
              )}
            </div>
          </>
        ) : (
          <>
            {/* Main Fact Card */}
            <main className="mb-6">
              {currentFact && (
                <FactCard
                  fact={currentFact}
                  source={source}
                  isLoading={isLoading}
                  onSaveToggle={handleSaveToggle}
                  isRevealed={isRevealed}
                  onToggleReveal={toggleReveal}
                  showAllElements={showAll}
                  sessionProgress={`Fakta ${sessionCount}/${sessionSize}`}
                />
              )}
            </main>

            {/* Next Fact Button */}
            <section className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <button
                onClick={handleNextFact}
                disabled={isLoading || cooldown || !isClient}
                className={`group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 min-w-[210px] shadow-sm ${
                  cooldown || isLoading
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 cursor-not-allowed"
                    : "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.98] hover:shadow"
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white dark:border-zinc-900 border-t-transparent" />
                    <span>Memuat fakta baru...</span>
                  </>
                ) : cooldown ? (
                  <span>Menyiapkan...</span>
                ) : (
                  <>
                    <span>Fakta Selanjutnya</span>
                    <svg className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </section>
          </>
        )}

        {/* Favorites Section */}
        <Favorites
          favorites={favorites}
          onFavoriteClick={handleFavoriteClick}
          onFavoritesUpdate={handleFavoritesUpdate}
        />

        {/* Footer — hidden by default unless showAll */}
        {showAll && (
          <footer className="mt-16 pt-6 border-t border-zinc-200/80 dark:border-zinc-700 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
              <span>Tekan <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 font-mono text-[10px]">R</kbd> untuk buka/tutup jawaban</span>
              <span>•</span>
              <span>Tekan <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded text-zinc-700 dark:text-zinc-300 font-mono text-[10px]">Spasi</kbd> untuk fakta berikutnya</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
