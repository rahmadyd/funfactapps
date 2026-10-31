import { Fact } from "./schema";

const FAVORITES_KEY = "ff-favs";
const RECENT_KEY = "ff-recent";
const MAX_RECENT = 30;
const LAST_TOPIC_KEY = "ff-last-topic";
const SESSION_SIZE_KEY = "ff-session-size";
const THEME_KEY = "ff-theme";
const STREAK_KEY = "ff-streak";
const LAST_VISIT_KEY = "ff-last-visit";
const QUICK_NOTE_KEY = "ff-quick-note";
const SHOW_ALL_ELEMENTS_KEY = "ff-show-all";

export type ThemeOption = "light" | "cream" | "dark";


export function getFavorites(): Fact[] {
  try {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveFavorite(fact: Fact): void {
  try {
    if (typeof window === "undefined") return;
    const favorites = getFavorites();
    const exists = favorites.some(f => f.title === fact.title);
    if (!exists) {
      favorites.push(fact);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch {
    // Silently fail
  }
}

export function removeFavorite(title: string): void {
  try {
    if (typeof window === "undefined") return;
    const favorites = getFavorites();
    const filtered = favorites.filter(f => f.title !== title);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch {
    // Silently fail
  }
}

export function addToRecent(title: string): void {
  try {
    if (typeof window === "undefined") return;
    const recent = getRecent();
    const filtered = recent.filter(t => t !== title);
    filtered.unshift(title);
    if (filtered.length > MAX_RECENT) {
      filtered.length = MAX_RECENT;
    }
    localStorage.setItem(RECENT_KEY, JSON.stringify(filtered));
  } catch {
    // Silently fail
  }
}

export function getRecent(): string[] {
  try {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearStorage(): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(FAVORITES_KEY);
    localStorage.removeItem(RECENT_KEY);
  } catch {
    // Silently fail
  }
}


// ── Last Topic ─────────────────────────────────────────────
export function getLastTopic(): string {
  try {
    if (typeof window === "undefined") return "python";
    return localStorage.getItem(LAST_TOPIC_KEY) || "python";
  } catch {
    return "python";
  }
}

export function setLastTopic(topic: string): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(LAST_TOPIC_KEY, topic);
  } catch {
    // Silently fail
  }
}

// ── Session Size ───────────────────────────────────────────
export function getSessionSize(): number {
  try {
    if (typeof window === "undefined") return 3;
    const val = localStorage.getItem(SESSION_SIZE_KEY);
    return val ? parseInt(val, 10) : 3;
  } catch {
    return 3;
  }
}

export function setSessionSize(size: number): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(SESSION_SIZE_KEY, String(size));
  } catch {
    // Silently fail
  }
}

// ── Theme ──────────────────────────────────────────────────
export function getTheme(): ThemeOption {
  try {
    if (typeof window === "undefined") return "light";
    const val = localStorage.getItem(THEME_KEY);
    if (val === "cream" || val === "dark") return val;
    return "light";
  } catch {
    return "light";
  }
}

export function setTheme(theme: ThemeOption): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Silently fail
  }
}

// ── Streak (positive framing) ──────────────────────────────
export function getStreak(): { days: number; isReturning: boolean } {
  try {
    if (typeof window === "undefined") return { days: 0, isReturning: false };
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
    const today = new Date().toDateString();

    if (!lastVisit) {
      localStorage.setItem(LAST_VISIT_KEY, today);
      localStorage.setItem(STREAK_KEY, "1");
      return { days: 1, isReturning: false };
    }

    if (lastVisit === today) {
      return { days: streak, isReturning: false };
    }

    const lastDate = new Date(lastVisit);
    const todayDate = new Date(today);
    const diffMs = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      const newStreak = streak + 1;
      localStorage.setItem(LAST_VISIT_KEY, today);
      localStorage.setItem(STREAK_KEY, String(newStreak));
      return { days: newStreak, isReturning: false };
    }

    // Absent > 1 day — reset streak, mark as returning
    localStorage.setItem(LAST_VISIT_KEY, today);
    localStorage.setItem(STREAK_KEY, "1");
    return { days: 1, isReturning: diffDays > 1 };
  } catch {
    return { days: 0, isReturning: false };
  }
}

// ── Quick Note ─────────────────────────────────────────────
export function getQuickNote(): string {
  try {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(QUICK_NOTE_KEY) || "";
  } catch {
    return "";
  }
}

export function setQuickNote(note: string): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(QUICK_NOTE_KEY, note);
  } catch {
    // Silently fail
  }
}

// ── Show All Elements Toggle ───────────────────────────────
export function getShowAllElements(): boolean {
  try {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SHOW_ALL_ELEMENTS_KEY) === "true";
  } catch {
    return false;
  }
}

export function setShowAllElements(show: boolean): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(SHOW_ALL_ELEMENTS_KEY, String(show));
  } catch {
    // Silently fail
  }
}
