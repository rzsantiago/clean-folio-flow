
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MainSection } from "@/components/MainContent";
import SidebarNavigation from "@/components/SidebarNavigation";

type MenuEntry =
  | { type: "gallery"; label: string; filter?: string | null }
  | { type: "about"; label: string }
  | { type: "contact"; label: string };

type Props = {
  main: MainSection;
  setMain: (val: MainSection) => void;
  menuEntries: MenuEntry[];
  activeCategory: string | null;
  prevProject: any;
  nextProject: any;
  handleProjectNavigation: (direction: 'prev' | 'next') => void;
};

export default function DesktopSidebar({
  main,
  setMain,
  menuEntries,
  activeCategory,
  prevProject,
  nextProject,
  handleProjectNavigation
}: Props) {
  return (
    <div className="fixed right-0 top-0 w-[220px] h-screen bg-white z-10">
      <div className="flex flex-col pt-8 px-4 h-full">
        <button
          className="font-helnow-bold text-[30px] leading-none tracking-wider text-black hover:text-[#cc3300] duration-100 pb-12 text-left uppercase transition-colors"
          onClick={() => setMain({ type: "gallery", filter: null })}
        >
          <div className="flex flex-col">
            <span>Santiago</span>
            <span className="-mt-1">Ruiz</span>
          </div>
        </button>
        
        <div className="flex flex-col justify-between h-full pb-8">
          <div className="flex flex-col">
            <SidebarNavigation
              main={main}
              setMain={setMain}
              menuEntries={menuEntries}
              activeCategory={activeCategory}
              isMobile={false}
              menuOpen={false}
              setMenuOpen={() => {}}
            />
            
            {/* Controles de navegación de proyecto */}
            {main.type === "project" && (
              <div className="flex justify-between mt-8 mb-2 px-0">
                <button
                  onClick={() => handleProjectNavigation('prev')}
                  disabled={!prevProject}
                  className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Proyecto anterior"
                >
                  <ArrowLeft size={18} />
                </button>
                
                <button
                  onClick={() => handleProjectNavigation('next')}
                  disabled={!nextProject}
                  className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Proyecto siguiente"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
          
          {/* Instagram en desktop */}
          <a 
            href="https://www.instagram.com/ruizsantiago/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-black transition-colors duration-200"
          >
            <span className="text-base">Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
