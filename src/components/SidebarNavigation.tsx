
import React from "react";
import { useProjects } from "@/hooks/useProjects";

type MenuEntry =
  | { type: "gallery"; label: string; filter?: string | null }
  | { type: "about"; label: string }
  | { type: "contact"; label: string };

type Props = {
  main: any;
  setMain: (m: any) => void;
  menuEntries: MenuEntry[];
  activeCategory?: string | null;
  isMobile?: boolean;
  menuOpen?: boolean;
  setMenuOpen?: (open: boolean) => void;
};

export default function SidebarNavigation({
  main, setMain, menuEntries,
  activeCategory,
  isMobile,
  menuOpen,
  setMenuOpen
}: Props) {
  const { data: projects = [] } = useProjects();
  
  // Separación menú
  const menuPart1 = menuEntries.slice(0, 4);
  const menuPart2 = menuEntries.slice(4);

  // Determina si esta activo segun la sección/categoría activa
  function isActive(entry: MenuEntry) {
    if (entry.type === "gallery") {
      // Solo activar "Overview" si estamos en galería y no hay filtro
      if (entry.label === "Overview") {
        return main.type === "gallery" && !main.filter;
      }
      // Para otras entradas de galería, usar activeCategory
      return activeCategory === entry.filter;
    }
    // About/Contact
    return main.type === entry.type;
  }

  // Menú mobile: panel lateral sobre fondo
  if (isMobile) {
    return (
      <>
        {menuOpen && (
          <div
            className="fixed z-50 inset-0 bg-black/30"
            onClick={() => setMenuOpen && setMenuOpen(false)}
          >
            <div
              className="fixed right-0 top-0 bg-white h-full w-64 flex flex-col p-6 gap-1"
              style={{
                paddingTop: 90,
                zIndex: 100,
                boxShadow: "none",
              }}
              onClick={e => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-0.5 flex-grow">
                {menuEntries.map(entry => (
                  <button
                    key={entry.label}
                    className={`text-left w-full py-2 px-2 rounded-md text-base font-normal ${
                      isActive(entry)
                        ? "text-black bg-stone-100"
                        : "text-stone-500"
                    } hover:bg-stone-100`}
                    onClick={() => {
                      setMenuOpen && setMenuOpen(false);
                      if (entry.type === "gallery") {
                        setMain({
                          type: "gallery",
                          filter: "filter" in entry ? entry.filter ?? null : null,
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
              </nav>
              
              {/* Instagram en mobile - solo texto */}
              <div className="mt-auto pb-8">
                <a 
                  href="https://www.instagram.com/ruizsantiago/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-500 hover:text-black transition-colors duration-200"
                >
                  <span className="text-base">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar - ancho fijo más consistente
  return (
    <section
      className="hidden md:flex w-[220px] min-w-[220px] flex-col items-end"
      style={{
        position: "sticky",
        top: 88,
        height: "fit-content",
        marginLeft: "0px",
        paddingRight: "15px",
      }}
    >
      <div className="w-full pr-0">
        <nav className="flex flex-col gap-0.5 mt-0 select-none">
          {/* Parte 1: Overview + categorias */}
          {menuPart1.map(entry => (
            <button
              key={entry.label}
              className={`px-0 py-0.5 text-base font-normal text-left transition-none ${
                isActive(entry)
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
              className={`px-0 py-0.5 text-base font-normal text-left transition-none ${
                isActive(entry)
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
