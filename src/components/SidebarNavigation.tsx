
import React from "react";

type MenuEntry =
  | { type: "gallery"; label: string; filter?: string | null }
  | { type: "about"; label: string }
  | { type: "contact"; label: string };

type Props = {
  main: any;
  setMain: (m: any) => void;
  menuEntries: MenuEntry[];
};

export default function SidebarNavigation({ main, setMain, menuEntries }: Props) {
  // Separación menú
  const menuPart1 = menuEntries.slice(0, 4);
  const menuPart2 = menuEntries.slice(4);

  return (
    <section
      className="hidden md:flex w-[29%] max-w-xs min-w-[180px] flex-col items-end"
      style={{
        position: "sticky",
        top: 88,
        height: "fit-content",
        marginLeft: "0px"
      }}
    >
      <div className="w-full pr-0">
        <nav className="flex flex-col gap-0.5 mt-0 select-none">
          {/* Parte 1: Overview + categorias */}
          {menuPart1.map(entry => (
            <button
              key={entry.label}
              className={`px-0 py-0.5 text-lg font-medium text-left transition-none ${
                main.type === entry.type &&
                (entry.type === "gallery"
                  ? (main.type === "gallery" &&
                    ((main.filter == null && "filter" in entry && entry.filter == null) ||
                    (main.filter === (("filter" in entry ? entry.filter : undefined))))
                  )
                  : false
                )
                  ? "text-black"
                  : "text-stone-500"
              } hover:text-black`}
              onClick={() => {
                if (entry.type === "gallery") {
                  setMain({
                    type: "gallery",
                    filter: "filter" in entry ? entry.filter ?? null : null
                  });
                } else if (entry.type === "about") {
                  setMain({ type: "about" });
                } else if (entry.type === "contact") {
                  setMain({ type: "contact" });
                }
              }}
            >
              {entry.label}
            </button>
          ))}
          <div className="border-t border-stone-200 my-2 md:my-3" /> 
          {/* Parte 2: About + Contact */}
          {menuPart2.map(entry => (
            <button
              key={entry.label}
              className={`px-0 py-0.5 text-lg font-medium text-left transition-none ${
                main.type === entry.type
                  ? "text-black"
                  : "text-stone-500"
              } hover:text-black`}
              onClick={() => {
                if (entry.type === "about") {
                  setMain({ type: "about" });
                } else if (entry.type === "contact") {
                  setMain({ type: "contact" });
                }
              }}
            >
              {entry.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
