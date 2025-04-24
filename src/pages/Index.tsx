
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
      <div className="flex-1 flex flex-row w-full max-w-[1600px] mx-auto">
        <MainContent main={main} setMain={setMain} isMobile={isMobile} />
        
        {/* Container lateral derecho para header + navegación */}
        <div className="hidden md:flex flex-col w-[29%] max-w-xs min-w-[180px]">
          <button
            className="text-2xl font-bold font-inter tracking-tight text-stone-700 hover:underline duration-100 pt-8 pb-12 text-left"
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

        {/* Mobile: mantenemos el header y menu hamburguesa */}
        {isMobile && (
          <>
            <button
              className="fixed top-3 right-3 p-2 z-40 rounded-md bg-white border border-stone-200"
              onClick={() => setMenuOpen(v => !v)}
              style={{ top: 22, boxShadow: "none" }}
              aria-label="Menu"
            >
              <Menu className="w-7 h-7 text-stone-700" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
