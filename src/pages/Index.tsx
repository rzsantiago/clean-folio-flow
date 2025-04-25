
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import MainContent, { MainSection } from "@/components/MainContent";
import SidebarNavigation from "@/components/SidebarNavigation";

const categories = [
  "Industrial Design",
  "Graphics",
  "CGI"
];

const menuEntries = [
  { type: "gallery", label: "Overview", filter: null } as const,
  ...categories.map(c => ({ type: "gallery", label: c, filter: c } as const)),
  { type: "about", label: "About" } as const,
  { type: "contact", label: "Contact" } as const,
];

const Index = () => {
  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const activeCategory = (main.type === "gallery")
    ? main.filter
    : (main.type === "project" ? main.fromFilter : null);

  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen, isMobile]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <div className="flex-1 flex flex-row w-full max-w-screen-2xl mx-auto">
        <MainContent main={main} setMain={setMain} isMobile={isMobile} />
        
        {/* Right sidebar container with header */}
        <div className="hidden md:flex flex-col w-[240px] min-w-[240px]">
          <div className="sticky top-0 flex flex-col pt-8 bg-white">
            <button
              className="text-lg font-normal tracking-wider text-stone-700 hover:underline duration-100 pb-12 text-left uppercase"
              onClick={() => setMain({ type: "gallery", filter: null })}
            >
              Santiago Ruiz
            </button>
            
            <SidebarNavigation
              main={main}
              setMain={setMain}
              menuEntries={menuEntries}
              activeCategory={activeCategory}
              isMobile={isMobile}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          </div>
        </div>

        {/* Mobile: header and hamburger menu */}
        {isMobile && (
          <>
            <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-5 bg-white z-30">
              <button
                className="text-lg tracking-wider text-stone-700 uppercase"
                onClick={() => setMain({ type: "gallery", filter: null })}
              >
                Santiago Ruiz
              </button>
              <button
                className="p-2 rounded-md"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-stone-700" />
              </button>
            </div>

            {menuOpen && (
              <div 
                className="fixed inset-0 bg-white z-40 pt-20"
                onClick={() => setMenuOpen(false)}
              >
                <SidebarNavigation
                  main={main}
                  setMain={setMain}
                  menuEntries={menuEntries}
                  activeCategory={activeCategory}
                  isMobile={isMobile}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
