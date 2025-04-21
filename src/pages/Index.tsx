
import React, { useState } from "react";
import { projects as baseProjects } from "@/data/projects";
import { SidebarMenu } from "@/components/SidebarMenu";
import ProjectGallery from "@/components/ProjectGallery";
import Navbar from "@/components/Navbar";
import About from "./About";
import Contact from "./Contact";
import ProjectView from "@/components/ProjectView";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

// Simular más proyectos para probar la navegación
const extraProjects = Array.from({ length: 10 }).map((_, i) => ({
  ...baseProjects[0],
  id: `extra-${i}`,
  title: `Proyecto Extra ${i + 1}`,
}));
const projects = [...baseProjects, ...extraProjects];

// Todas las categorías únicas
const categories = Array.from(new Set(projects.map(p => p.category)));

// Menú para sidebar y mobile
const menuEntries = [
  { type: "gallery", label: "Overview", filter: null },
  ...categories.map(c => ({ type: "gallery", label: c, filter: c })),
  { type: "about", label: "Sobre mí" },
  { type: "contact", label: "Contacto" }
];

type MainSection =
  | { type: "gallery"; filter: string | null }
  | { type: "about"; }
  | { type: "contact"; }
  | { type: "project"; id: string; fromFilter: string | null };

const Index = () => {
  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Determinar proyectos filtrados según contexto actual
  let filteredProjects: typeof projects = projects;
  let filterLabel: string | null = null;

  if (main.type === "gallery") {
    filteredProjects = main.filter ? projects.filter(p => p.category === main.filter) : projects;
    filterLabel = main.filter || null;
  } else if (main.type === "project") {
    filteredProjects = main.fromFilter
      ? projects.filter(p => p.category === main.fromFilter)
      : projects;
    filterLabel = main.fromFilter || null;
  }

  // Contenido principal
  let content: React.ReactNode = null;
  let fadeDeps: any[] = [];

  if (main.type === "about") {
    content = <About minimal />;
    fadeDeps = ["about"];
  } else if (main.type === "contact") {
    content = <Contact minimal />;
    fadeDeps = ["contact"];
  } else if (main.type === "project") {
    // Pasar la lógica de navegación y los límites correctos
    const filtered = filteredProjects;
    const idx = filtered.findIndex(p => p.id === main.id);
    const prev = idx > 0 ? filtered[idx - 1] : null;
    const next = idx >= 0 && idx < filtered.length - 1 ? filtered[idx + 1] : null;
    content = (
      <ProjectView
        projectId={main.id}
        onNavigate={id => setMain({ type: "project", id, fromFilter: main.fromFilter })}
        prevId={prev?.id}
        nextId={next?.id}
        showProjectHeader
      />
    );
    fadeDeps = [main.id, "project"];
  } else {
    content = (
      <ProjectGallery
        projects={filteredProjects}
        onProjectClick={id =>
          setMain({
            type: "project",
            id,
            fromFilter: filterLabel
          })
        }
        noOverlay
      />
    );
    fadeDeps = [main.filter, "gallery"];
  }

  const { fadeClass } = useFadeTransition(fadeDeps);

  // For highlighting which static section is active in SidebarMenu
  let activeSection: "about" | "contact" | null = null;
  if (main.type === "about") activeSection = "about";
  if (main.type === "contact") activeSection = "contact";

  // SidebarMenu styles updates: all gray, except black when active
  // Y quitar "Categorías"

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-inter">
      <Navbar onHome={() => setMain({ type: "gallery", filter: null })} />
      <div className="flex-1 flex flex-row w-full max-w-[1600px] mx-auto mt-20 md:mt-28 px-0 md:px-10 gap-0 md:gap-14 transition-none">
        <main className="w-full md:w-[70%] max-w-[100%] pt-4 pb-14 md:pb-0 flex items-start justify-center transition-none">
          <div
            className={`w-full transition-none ${fadeClass} ${
              isMobile ? "px-2" : ""
            }`}
            style={{
              minHeight: "75vh",
              marginBottom: 0,
            }}
          >
            {content}
          </div>
        </main>
        {/* Sidebar en desktop, sticky */}
        <section
          className="hidden md:flex w-[30%] max-w-xs min-w-[210px] flex-col items-end"
          style={{ position: "sticky", top: 88, height: "fit-content" }}
        >
          <div className="w-full pr-0">
            <nav className="flex flex-col gap-1 mt-0 select-none">
              {menuEntries.map(entry => (
                <button
                  key={entry.label}
                  className={`px-0 py-1 text-lg font-medium text-left transition-none ${
                    main.type === entry.type &&
                    ((entry.type === "gallery" &&
                      ((main.filter == null && entry.filter == null) ||
                        main.filter === entry.filter)) ||
                      (entry.type !== "gallery")) // non-gallery exact match
                      ? "text-black"
                      : "text-stone-500"
                  } hover:text-black`}
                  onClick={() => {
                    if (entry.type === "gallery") {
                      setMain({ type: "gallery", filter: entry.filter ?? null });
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
        </section>
        {/* Mobile Menu: hamburguesa */}
        {isMobile && (
          <>
            <button
              className="fixed z-40 top-3 right-3 p-2 rounded-md bg-white shadow-md border border-stone-200"
              onClick={() => setMenuOpen(v => !v)}
              style={{ top: 22 }}
              aria-label="Menú"
            >
              <Menu className="w-7 h-7 text-stone-700" />
            </button>
            {menuOpen && (
              <div
                className="fixed z-50 inset-0 bg-black/30"
                onClick={() => setMenuOpen(false)}
              >
                <div
                  className="fixed right-0 top-0 bg-white h-full w-64 shadow-xl flex flex-col p-6 gap-2"
                  style={{
                    paddingTop: 90,
                    zIndex: 100,
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {menuEntries.map(entry => (
                    <button
                      key={entry.label}
                      className={`text-left w-full py-2 px-2 rounded-md text-lg ${
                        main.type === entry.type &&
                        ((entry.type === "gallery" &&
                          ((main.filter == null && entry.filter == null) ||
                            main.filter === entry.filter)) ||
                          (entry.type !== "gallery"))
                          ? "text-black bg-stone-100"
                          : "text-stone-500"
                      } hover:bg-stone-100`}
                      onClick={() => {
                        setMenuOpen(false);
                        if (entry.type === "gallery") {
                          setMain({ type: "gallery", filter: entry.filter ?? null });
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
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <footer className="w-full text-center py-10 text-stone-300 text-xs font-inter">
        © {new Date().getFullYear()} cleanfolio
      </footer>
    </div>
  );
};

export default Index;

