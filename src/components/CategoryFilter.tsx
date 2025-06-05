
import React from "react";

type Props = {
  categories: string[]
  active: string | null
  onSelect: (category: string | null) => void
}

export default function CategoryFilter({ categories, active, onSelect }: Props) {
  return (
    <div className="flex flex-row flex-wrap gap-2 md:gap-4 my-6 justify-center md:justify-start">
      <button
        className={`px-4 py-1.5 rounded-full font-fustat text-sm md:text-base shadow-sm border bg-white transition-all hover:bg-stone-200 hover:scale-105 duration-150 ${!active ? "bg-stone-200 text-stone-900 font-semibold" : "text-stone-600"}`}
        onClick={() => onSelect(null)}
        aria-pressed={!active}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          className={`px-4 py-1.5 rounded-full font-fustat text-sm md:text-base shadow-sm border bg-white transition-all hover:bg-stone-200 hover:scale-105 duration-150 ${active === cat ? "bg-stone-200 text-stone-900 font-semibold" : "text-stone-600"}`}
          onClick={() => onSelect(cat)}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
