
import React from "react";

type SidebarMenuProps = {
  categories: string[];
  active: string | null;
  onSelect: (cat: string | null) => void;
  onAbout?: () => void;
  onContact?: () => void;
  activeSection?: "about" | "contact" | null;
};

export function SidebarMenu({ categories, active, activeSection, onSelect, onAbout, onContact }: SidebarMenuProps) {
  return (
    <nav className="flex flex-col gap-2 mt-10 select-none">
      <h2 className="font-light text-stone-600 mb-2 text-base">Categorías</h2>
      <button
        className={`text-stone-900 px-0 py-1 text-lg font-medium text-left transition-none hover:text-stone-500 ${active === null && !activeSection ? "underline" : ""}`}
        onClick={() => onSelect(null)}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          className={`text-stone-900 px-0 py-1 text-lg text-left font-medium transition-none hover:text-stone-500 ${active === cat ? "underline" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
      <div className="border-t border-stone-200 my-4" />
      <button
        className={`text-stone-500 px-0 py-1 text-lg text-left font-medium hover:text-stone-900 transition-none ${activeSection === "about" ? "underline" : ""}`}
        onClick={onAbout}
      >
        Sobre mí
      </button>
      <button
        className={`text-stone-500 px-0 py-1 text-lg text-left font-medium hover:text-stone-900 transition-none ${activeSection === "contact" ? "underline" : ""}`}
        onClick={onContact}
      >
        Contacto
      </button>
    </nav>
  );
}
