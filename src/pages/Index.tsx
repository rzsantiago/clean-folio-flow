
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Instagram, ArrowLeft, ArrowRight } from "lucide-react";
import MainContent, { MainSection } from "@/components/MainContent";
import SidebarNavigation from "@/components/SidebarNavigation";
import { useProjects } from "@/hooks/useProjects";

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
  const { data: projects = [] } = useProjects();

  const activeCategory = (main.type === "gallery")
    ? main.filter
    : (main.type === "project" ? main.fromFilter : null);

  // Obtener índices para navegación
  const filteredProjects = activeCategory 
    ? projects.filter(p => p.category === activeCategory) 
    : projects;
    
  const currentProjectIndex = main.type === "project" 
    ? filteredProjects.findIndex(p => p.id === main.id) 
    : -1;
    
  const prevProject = currentProjectIndex > 0 ? filteredProjects[currentProjectIndex - 1] : null;
  const nextProject = currentProjectIndex >= 0 && currentProjectIndex < filteredProjects.length - 1 
    ? filteredProjects[currentProjectIndex + 1] 
    : null;

  // Para navegación entre proyectos
  const handleProjectNavigation = (direction: 'prev' | 'next') => {
    if (main.type !== 'project') return;
    
    const targetProject = direction === 'prev' ? prevProject : nextProject;
    if (targetProject) {
      setMain({ 
        type: "project", 
        id: targetProject.id, 
        fromFilter: main.fromFilter 
      });
    }
  };

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
        <div className="hidden md:flex flex-col w-[240px] min-w-[240px] pl-8">
          <div className="sticky top-0 flex flex-col pt-8 bg-white h-screen">
            <button
              className="text-lg font-normal tracking-wider text-stone-700 hover:underline duration-100 pb-12 text-left uppercase"
              onClick={() => setMain({ type: "gallery", filter: null })}
            >
              Santiago Ruiz
            </button>
            
            <div className="flex flex-col justify-between h-full pb-8">
              <div className="flex flex-col">
                <SidebarNavigation
                  main={main}
                  setMain={setMain}
                  menuEntries={menuEntries}
                  activeCategory={activeCategory}
                  isMobile={isMobile}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
                
                {/* Controles de navegación de proyecto */}
                {main.type === "project" && (
                  <div className="flex justify-between mt-4 mb-2 px-0">
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
              
              <a 
                href="https://www.instagram.com/ruizsantiago/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-500 hover:text-black transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
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
                <div className="flex flex-col h-full justify-between pb-8 px-4">
                  <div className="flex flex-col">
                    <SidebarNavigation
                      main={main}
                      setMain={setMain}
                      menuEntries={menuEntries}
                      activeCategory={activeCategory}
                      isMobile={isMobile}
                      menuOpen={menuOpen}
                      setMenuOpen={setMenuOpen}
                    />
                    
                    {/* Controles de navegación de proyecto en móvil */}
                    {main.type === "project" && (
                      <div className="flex justify-between mt-4 mb-2">
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
                  
                  <a 
                    href="https://www.instagram.com/ruizsantiago/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-stone-500 hover:text-black transition-colors duration-200"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
