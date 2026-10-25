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
  {
    id: "react",
    label: "React.js",
    icon: "⚛️",
    activeClass: "bg-cyan-600 text-white border-cyan-600 shadow-md ring-2 ring-cyan-500/25 scale-[1.03]",
    inactiveClass: "bg-cyan-50/80 text-cyan-700 border-cyan-200/90 hover:bg-cyan-100/80 hover:border-cyan-300 shadow-sm",
    ariaLabel: "Fakta React.js, hooks, dan frontend modern",
  },
  {
    id: "nodejs",
    label: "Node.js",
    icon: "🟢",
    activeClass: "bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-600/25 scale-[1.03]",
    inactiveClass: "bg-emerald-50/80 text-emerald-800 border-emerald-200/90 hover:bg-emerald-100/80 hover:border-emerald-300 shadow-sm",
    ariaLabel: "Fakta runtime Node.js dan arsitektur backend",
  },
  {
    id: "sql",
    label: "SQL Database",
    icon: "🗄️",
    activeClass: "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/25 scale-[1.03]",
    inactiveClass: "bg-blue-50/80 text-blue-700 border-blue-200/90 hover:bg-blue-100/80 hover:border-blue-300 shadow-sm",
    ariaLabel: "Fakta database SQL relasional dan optimasi query",
  },
  {
    id: "nosql",
    label: "NoSQL Database",
    icon: "🍃",
    activeClass: "bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/25 scale-[1.03]",
    inactiveClass: "bg-teal-50/80 text-teal-700 border-teal-200/90 hover:bg-teal-100/80 hover:border-teal-300 shadow-sm",
    ariaLabel: "Fakta database NoSQL seperti MongoDB dan Redis",
  },
  {
    id: "excel",
    label: "Excel (Admin)",
    icon: "📊",
    activeClass: "bg-green-700 text-white border-green-700 shadow-md ring-2 ring-green-600/25 scale-[1.03]",
    inactiveClass: "bg-green-50/80 text-green-800 border-green-200/90 hover:bg-green-100/80 hover:border-green-300 shadow-sm",
    ariaLabel: "Fakta rumus dan trik Excel produktivitas admin",
  },
  {
    id: "ielts",
    label: "IELTS Prep",
    icon: "🎯",
    activeClass: "bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-500/25 scale-[1.03]",
    inactiveClass: "bg-orange-50/80 text-orange-800 border-orange-200/90 hover:bg-orange-100/80 hover:border-orange-300 shadow-sm",
    ariaLabel: "Fakta persiapan tes IELTS dan kosakata akademis",
  },
  {
    id: "affirmation",
    label: "Afirmasi Diri",
    icon: "✨",
    activeClass: "bg-violet-600 text-white border-violet-600 shadow-md ring-2 ring-violet-500/25 scale-[1.03]",
    inactiveClass: "bg-violet-50/80 text-violet-700 border-violet-200/90 hover:bg-violet-100/80 hover:border-violet-300 shadow-sm",
    ariaLabel: "Afirmasi percaya diri dan motivasi pola pikir",
  },
  {
    id: "linux",
    label: "Linux",
    icon: "🐧",
    activeClass: "bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/25 scale-[1.03]",
    inactiveClass: "bg-amber-50/80 text-amber-800 border-amber-200/90 hover:bg-amber-100/80 hover:border-amber-300 shadow-sm",
    ariaLabel: "Fakta perintah terminal Linux dan manajemen server",
  },
  {
    id: "git",
    label: "Git & GitHub",
    icon: "🐙",
    activeClass: "bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-500/25 scale-[1.03]",
    inactiveClass: "bg-orange-50/80 text-orange-800 border-orange-200/90 hover:bg-orange-100/80 hover:border-orange-300 shadow-sm",
    ariaLabel: "Fakta version control Git dan alur kerja GitHub",
  },
  {
    id: "cicd",
    label: "CI/CD",
    icon: "🚀",
    activeClass: "bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-500/25 scale-[1.03]",
    inactiveClass: "bg-sky-50/80 text-sky-800 border-sky-200/90 hover:bg-sky-100/80 hover:border-sky-300 shadow-sm",
    ariaLabel: "Fakta otomatisasi pipeline CI/CD dan deployment",
  },
  {
    id: "docker",
    label: "Docker",
    icon: "🐳",
    activeClass: "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/25 scale-[1.03]",
    inactiveClass: "bg-blue-50/80 text-blue-700 border-blue-200/90 hover:bg-blue-100/80 hover:border-blue-300 shadow-sm",
    ariaLabel: "Fakta containerization Docker dan Docker Compose",
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    icon: "🌊",
    activeClass: "bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/25 scale-[1.03]",
    inactiveClass: "bg-teal-50/80 text-teal-800 border-teal-200/90 hover:bg-teal-100/80 hover:border-teal-300 shadow-sm",
    ariaLabel: "Fakta styling utility-first modern Tailwind CSS",
  },
  {
    id: "publicspeaking",
    label: "Public Speaking",
    icon: "🎙️",
    activeClass: "bg-sky-700 text-white border-sky-700 shadow-md ring-2 ring-sky-600/25 scale-[1.03]",
    inactiveClass: "bg-sky-50/80 text-sky-800 border-sky-200/90 hover:bg-sky-100/80 hover:border-sky-300 shadow-sm",
    ariaLabel: "Fakta teknik public speaking, komunikasi diplomatis, dan presentasi",
  },
  {
    id: "confidence",
    label: "Percaya Diri",
    icon: "🦁",
    activeClass: "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/25 scale-[1.03]",
    inactiveClass: "bg-rose-50/80 text-rose-800 border-rose-200/90 hover:bg-rose-100/80 hover:border-rose-300 shadow-sm",
    ariaLabel: "Fakta membangun rasa percaya diri, keberanian berbicara, dan mengatasi grogi",
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