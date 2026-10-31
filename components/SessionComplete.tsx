"use client";

interface SessionCompleteProps {
  sessionSize: number;
  streakDays: number;
  onFinish: () => void;
  onContinue: () => void;
}

export default function SessionComplete({
  sessionSize,
  streakDays,
  onFinish,
  onContinue,
}: SessionCompleteProps) {
  return (
    <div className="animate-card-in max-w-2xl mx-auto text-center py-12 px-6">
      {/* Big Check */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 text-3xl">
          ✓
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
        Selesai hari ini 🎉
      </h2>

      <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mb-2 font-normal leading-relaxed">
        Cukup untuk hari ini. Sampai besok.
      </p>

      {streakDays > 1 && (
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-8">
          Sudah <strong className="text-zinc-600 dark:text-zinc-300">{streakDays} hari</strong> belajar 💪
        </p>
      )}

      {streakDays <= 1 && <div className="mb-8" />}

      {/* Primary: Finish */}
      <button
        onClick={onFinish}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.98] transition-all min-w-[200px] mb-4"
      >
        Selesai
      </button>

      {/* Secondary: Continue */}
      <div>
        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 font-medium transition-colors"
        >
          Lanjut {sessionSize} lagi →
        </button>
      </div>
    </div>
  );
}
