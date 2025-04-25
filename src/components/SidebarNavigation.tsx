import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const menuPart1 = menuEntries.slice(0, 4);
  const menuPart2 = menuEntries.slice(4);

  function isActive(entry: MenuEntry) {
    if (entry.type === "gallery") {
      if (entry.label === "Overview") {
        return main.type === "gallery" && !main.filter;
      }
      return activeCategory === entry.filter;
    }
    return main.type === entry.type;
  }

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (main.type === 'project' && Array.isArray(menuEntries)) {
      const filteredProjects = projects.filter(p => !activeCategory || p.category === activeCategory);
      const currentIndex = filteredProjects.findIndex(p => p.id === main.id);
      
      if (direction === 'prev' && currentIndex > 0) {
        setMain({ type: 'project', id: filteredProjects[currentIndex - 1].id, fromFilter: activeCategory });
      } else if (direction === 'next' && currentIndex < filteredProjects.length - 1) {
        setMain({ type: 'project', id: filteredProjects[currentIndex + 1].id, fromFilter: activeCategory });
      }
    }
  };

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
              <nav className="flex flex-col gap-0.5">
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
            </div>
          </div>
        )}
      </>
    );
  }

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
          
          <div className="flex justify-start gap-4 mt-4 mb-4">
            <button 
              className="text-stone-500 hover:text-black transition-colors"
              aria-label="Previous"
              onClick={() => handleNavigateProject('prev')}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              className="text-stone-500 hover:text-black transition-colors"
              aria-label="Next"
              onClick={() => handleNavigateProject('next')}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
}
