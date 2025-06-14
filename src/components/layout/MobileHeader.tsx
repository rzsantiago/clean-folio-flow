
import React from "react";
import { Menu } from "lucide-react";
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
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export default function MobileHeader({
  main,
  setMain,
  menuEntries,
  activeCategory,
  menuOpen,
  setMenuOpen
}: Props) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-between items-start px-4 py-3 bg-white z-30" style={{ height: '75px' }}>
        <button
          className="font-helnow-bold text-[30px] leading-none tracking-wider text-black hover:text-[#cc3300] uppercase transition-colors pb-2"
          onClick={() => setMain({ type: "gallery", filter: null })}
        >
          <div className="flex flex-col items-start">
            <span>Santiago</span>
            <span className="-mt-1">Ruiz</span>
          </div>
        </button>
        
        <button
          className="p-2 rounded-md mt-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-black" />
        </button>
      </div>

      <SidebarNavigation
        main={main}
        setMain={setMain}
        menuEntries={menuEntries}
        activeCategory={activeCategory}
        isMobile={true}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </>
  );
}
