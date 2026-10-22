import { Fact } from "./schema";

const FAVORITES_KEY = "ff-favs";
const RECENT_KEY = "ff-recent";
const MAX_RECENT = 30;

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