"use client";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

interface CategoryConfig {
  id: string;
  label: string;
  icon: string;
  activeClass: string;
  inactiveClass: string;
  ariaLabel: string;
}

const categories: CategoryConfig[] = [
  {
    id: "mixed",
    label: "Semua Topik",
    icon: "✦",
    activeClass: "bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-zinc-900/20 scale-[1.03]",
    inactiveClass: "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 shadow-sm",
    ariaLabel: "Fakta acak dari semua topik",
  },
  {
    id: "python",
    label: "Python",
    icon: "🐍",
    activeClass: "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500/25 scale-[1.03]",
    inactiveClass: "bg-indigo-50/80 text-indigo-700 border-indigo-200/90 hover:bg-indigo-100/80 hover:border-indigo-300 shadow-sm",
    ariaLabel: "Fakta tentang pemrograman Python",
  },
  {
    id: "toefl",
    label: "TOEFL & Grammar",
    icon: "📘",
    activeClass: "bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/25 scale-[1.03]",
    inactiveClass: "bg-amber-50/80 text-amber-800 border-amber-200/90 hover:bg-amber-100/80 hover:border-amber-300 shadow-sm",
    ariaLabel: "Fakta persiapan tes TOEFL dan grammar",
  },
  {
    id: "design",
    label: "Desain",
    icon: "🎨",
    activeClass: "bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-500/25 scale-[1.03]",
    inactiveClass: "bg-purple-50/80 text-purple-700 border-purple-200/90 hover:bg-purple-100/80 hover:border-purple-300 shadow-sm",
    ariaLabel: "Fakta prinsip desain dan tipografi",
  },
  {
    id: "japanese",
    label: "Bahasa Jepang",
    icon: "🌸",
    activeClass: "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/25 scale-[1.03]",
    inactiveClass: "bg-rose-50/80 text-rose-700 border-rose-200/90 hover:bg-rose-100/80 hover:border-rose-300 shadow-sm",
    ariaLabel: "Fakta kosakata dan tata bahasa Jepang",
  },
  {
    id: "machinelearning",
    label: "Data & ML",
    icon: "🤖",
    activeClass: "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/25 scale-[1.03]",
    inactiveClass: "bg-emerald-50/80 text-emerald-700 border-emerald-200/90 hover:bg-emerald-100/80 hover:border-emerald-300 shadow-sm",
    ariaLabel: "Fakta algoritma machine learning dan data science",
  },
];

export default function CategoryTabs({ selectedCategory, onCategorySelect }: CategoryTabsProps) {
  return (
    <div
      className="w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8"
      role="tablist"
      aria-label="Pilih kategori topik"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={isActive}
            aria-label={category.ariaLabel}
            onClick={() => onCategorySelect(category.id)}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-900 cursor-pointer ${
              isActive ? category.activeClass : category.inactiveClass
            }`}
          >
            <span className="text-sm">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}