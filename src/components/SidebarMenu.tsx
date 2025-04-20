
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  categories: string[];
  active: string | null;
  onSelect: (c: string | null) => void;
};

export function SidebarMenu({ categories, active, onSelect }: Props) {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col gap-8 pt-32 md:pt-36 px-6 md:px-10 w-full text-left text-lg text-stone-700 font-inter">
      <div className="flex flex-col gap-2">
        <span className="uppercase text-xs text-stone-400">Categorías</span>
        <button
          className={`bg-none text-left px-0 py-1 font-inter text-lg ${active === null ? "font-semibold" : ""} hover:underline`}
          onClick={() => onSelect(null)}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`bg-none text-left px-0 py-1 font-inter text-lg ${active === cat ? "font-semibold" : ""} hover:underline`}
            onClick={() => onSelect(cat)}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        <span className="uppercase text-xs text-stone-400 mb-1 block">About</span>
        <button
          className="text-left px-0 py-1 font-inter text-lg hover:underline"
          onClick={() => navigate("/about")}
        >
          Sobre mí
        </button>
      </div>
    </aside>
  );
}
