"use client";

import { useState, useRef, useEffect } from "react";

interface TopicDropdownProps {
  selectedCategory: string;
  recentTopics: string[];
  onCategorySelect: (category: string) => void;
}

interface TopicItem {
  id: string;
  label: string;
  icon: string;
}

interface TopicGroup {
  name: string;
  items: TopicItem[];
}

const allTopics: TopicItem[] = [
  { id: "python", label: "Python", icon: "🐍" },
  { id: "javascript", label: "JavaScript & TypeScript", icon: "⚡" },
  { id: "htmlcss", label: "HTML & CSS", icon: "🌐" },
  { id: "react", label: "React.js", icon: "⚛️" },
  { id: "tailwind", label: "Tailwind CSS", icon: "🌊" },
  { id: "nodejs", label: "Node.js", icon: "🟢" },
  { id: "sql", label: "Database SQL", icon: "🗄️" },
  { id: "nosql", label: "Database NoSQL", icon: "🍃" },
  { id: "machinelearning", label: "Data & ML", icon: "🤖" },
  { id: "dsa", label: "Data Structures & Algorithms", icon: "🧩" },
  { id: "networking", label: "Networking & HTTP", icon: "🌍" },
  { id: "restapi", label: "REST API & Auth", icon: "🔐" },
  { id: "testing", label: "Testing", icon: "🧪" },
  { id: "git", label: "Git & GitHub", icon: "🐙" },
  { id: "linux", label: "Linux", icon: "🐧" },
  { id: "docker", label: "Docker", icon: "🐳" },
  { id: "cicd", label: "CI/CD", icon: "🚀" },
  { id: "toefl", label: "TOEFL & Grammar", icon: "📘" },
  { id: "ielts", label: "IELTS Prep", icon: "🎯" },
  { id: "japanese", label: "Bahasa Jepang", icon: "🌸" },
  { id: "design", label: "Desain", icon: "🎨" },
  { id: "publicspeaking", label: "Public Speaking", icon: "🎙️" },
  { id: "confidence", label: "Percaya Diri", icon: "🦁" },
  { id: "affirmation", label: "Afirmasi Diri", icon: "✨" },
  { id: "excel", label: "Excel (Admin)", icon: "📊" },
];

const topicGroups: TopicGroup[] = [
  {
    name: "Pemrograman",
    items: [
      { id: "python", label: "Python", icon: "🐍" },
      { id: "javascript", label: "JavaScript & TypeScript", icon: "⚡" },
      { id: "htmlcss", label: "HTML & CSS", icon: "🌐" },
      { id: "react", label: "React.js", icon: "⚛️" },
      { id: "tailwind", label: "Tailwind CSS", icon: "🌊" },
      { id: "nodejs", label: "Node.js", icon: "🟢" },
    ],
  },
  {
    name: "Data",
    items: [
      { id: "sql", label: "Database SQL", icon: "🗄️" },
      { id: "nosql", label: "Database NoSQL", icon: "🍃" },
      { id: "machinelearning", label: "Data & ML", icon: "🤖" },
    ],
  },
  {
    name: "Fundamental CS",
    items: [
      { id: "dsa", label: "Data Structures & Algorithms", icon: "🧩" },
      { id: "networking", label: "Networking & HTTP", icon: "🌍" },
      { id: "restapi", label: "REST API & Auth", icon: "🔐" },
      { id: "testing", label: "Testing", icon: "🧪" },
    ],
  },
  {
    name: "Tools & DevOps",
    items: [
      { id: "git", label: "Git & GitHub", icon: "🐙" },
      { id: "linux", label: "Linux", icon: "🐧" },
      { id: "docker", label: "Docker", icon: "🐳" },
      { id: "cicd", label: "CI/CD", icon: "🚀" },
    ],
  },
  {
    name: "Bahasa & Desain",
    items: [
      { id: "toefl", label: "TOEFL & Grammar", icon: "📘" },
      { id: "ielts", label: "IELTS Prep", icon: "🎯" },
      { id: "japanese", label: "Bahasa Jepang", icon: "🌸" },
      { id: "design", label: "Desain", icon: "🎨" },
    ],
  },
  {
    name: "Pengembangan Diri",
    items: [
      { id: "publicspeaking", label: "Public Speaking", icon: "🎙️" },
      { id: "confidence", label: "Percaya Diri", icon: "🦁" },
      { id: "affirmation", label: "Afirmasi Diri", icon: "✨" },
      { id: "excel", label: "Excel (Admin)", icon: "📊" },
    ],
  },
];

function getTopicLabel(id: string): { label: string; icon: string } {
  const found = allTopics.find((t) => t.id === id);
  return found || { label: id, icon: "📚" };
}

export default function TopicDropdown({
  selectedCategory,
  recentTopics,
  onCategorySelect,
}: TopicDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const current = getTopicLabel(selectedCategory);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [isOpen]);

  const handleSelect = (id: string) => {
    onCategorySelect(id);
    setIsOpen(false);
  };

  // Build recent/favorite topics (up to 5, excluding current)
  const recentItems = recentTopics
    .filter((id) => id !== selectedCategory)
    .slice(0, 4)
    .map((id) => getTopicLabel(id));

  return (
    <div ref={dropdownRef} className="relative inline-block mb-6">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{current.icon}</span>
        <span>Topik: {current.label}</span>
        <svg
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-h-[70vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl z-50 animate-pop-in">
          {/* Recent / Favorites */}
          {recentItems.length > 0 && (
            <div className="px-3 pt-3 pb-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-1">
                Terakhir dipakai
              </p>
              <div className="space-y-0.5">
                {recentItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(allTopics.find((t) => t.label === item.label)?.id || "")}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left"
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {recentItems.length > 0 && (
            <div className="mx-3 my-1 border-t border-zinc-100 dark:border-zinc-800" />
          )}

          {/* All Topics (grouped) */}
          <div className="px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 px-1">
              Semua topik
            </p>
            {topicGroups.map((group) => (
              <div key={group.name} className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-300 dark:text-zinc-600 px-1 mb-1">
                  {group.name}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = selectedCategory === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                          isActive
                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium"
                        }`}
                      >
                        <span className="text-sm">{item.icon}</span>
                        <span>{item.label}</span>
                        {isActive && (
                          <svg className="w-3.5 h-3.5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
