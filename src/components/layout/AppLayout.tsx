
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MainContent, { MainSection } from "@/components/MainContent";
import DesktopSidebar from "./DesktopSidebar";
import MobileHeader from "./MobileHeader";
import { useProjects } from "@/hooks/useProjects";
import { useProjectNavigation } from "@/hooks/useProjectNavigation";
import { useTouchNavigation } from "@/hooks/useTouchNavigation";

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

type Props = {
  main: MainSection;
  setMain: (val: MainSection) => void;
};

export default function AppLayout({ main, setMain }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data: projects = [] } = useProjects();

  const {
    activeCategory,
    prevProject,
    nextProject,
    handleProjectNavigation
  } = useProjectNavigation(main, setMain, projects);

  const {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useTouchNavigation();

  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen, isMobile]);

  return (
    <div 
      className="min-h-screen bg-white flex flex-col font-helnow-regular"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => handleTouchEnd(main, handleProjectNavigation, prevProject, nextProject)}
    >
      <div className="flex-1 flex flex-row w-full overflow-hidden">
        {/* Main content */}
        <div className={`flex-1 min-w-0 ${!isMobile ? 'pr-[220px]' : ''}`}>
          <MainContent main={main} setMain={setMain} isMobile={isMobile} />
        </div>
        
        {/* Desktop sidebar */}
        {!isMobile && (
          <DesktopSidebar
            main={main}
            setMain={setMain}
            menuEntries={menuEntries}
            activeCategory={activeCategory}
            prevProject={prevProject}
            nextProject={nextProject}
            handleProjectNavigation={handleProjectNavigation}
          />
        )}

        {/* Mobile header and menu */}
        {isMobile && (
          <MobileHeader
            main={main}
            setMain={setMain}
            menuEntries={menuEntries}
            activeCategory={activeCategory}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        )}
      </div>
    </div>
  );
}
