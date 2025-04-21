
import React, { useState, useEffect } from "react";
import { projects as baseProjects } from "@/data/projects";
import ProjectGallery from "@/components/ProjectGallery";
import Navbar from "@/components/Navbar";
import About from "./About";
import Contact from "./Contact";
import ProjectView from "@/components/ProjectView";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

// --- CATEGORIAS ---
const categories = [
  "Industrial Design",
  "Graphics",
  "CGI"
];

// Menu y estructura textual
const menuEntries = [
  { type: "gallery", label: "Overview", filter: null },
  ...categories.map(c => ({ type: "gallery", label: c, filter: c })),
  { type: "about", label: "About" },
  { type: "contact", label: "Contact" },
];

type MainSection =
  | { type: "gallery"; filter: string | null }
  | { type: "about"; }
  | { type: "contact"; }
  | { type: "project"; id: string; fromFilter: string | null };

// -------- COMPONENTE PRINCIPAL --------
const Index = () => {
  // Eliminar el padding global del body al abrir el menú mobile
  useEffect(() => {
    if (!isMobile) document.body.style.overflow = "";
  });

  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Bloquear scroll body cuando menu está abierto
  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen, isMobile]);

  // Determinar proyectos filtrados según contexto actual
  let filteredProjects = baseProjects;
  let filterLabel: string | null = null;

  if (main.type === "gallery") {
    filteredProjects = main.filter ? baseProjects.filter(p => p.category === main.filter) : baseProjects;
    filterLabel = main.filter || null;
  } else if (main.type === "project") {
    filteredProjects = main.fromFilter
      ? baseProjects.filter(p => p.category === main.fromFilter)
      : baseProjects;
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
  } else if (main.type === "gallery") {
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

  // SEPARACIÓN MENU LATERAL
  // Compute menuPart1 and menuPart2 without assuming filter always present
  const menuPart1 = menuEntries.slice(0, 4);
  const menuPart2 = menuEntries.slice(4);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <Navbar onHome={() => setMain({ type: "gallery", filter: null })} />
      <div className="flex-1 flex flex-row w-full max-w-[1600px] mx-auto mt-20 md:mt-28 px-0 md:px-10 gap-10 md:gap-10 transition-none">
        <main className="w-full md:w-[70%] max-w-[100%] pt-4 pb-14 md:pb-0 flex items-start justify-center transition-none">
          <div
            className={`w-full transition-none ${fadeClass} ${isMobile ? "px-3" : ""}`}
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
            <nav className="flex flex-col gap-2 mt-0 select-none">
              {/* Parte 1: Overview + categorias */}
              {menuPart1.map(entry => (
                <button
                  key={entry.label}
                  className={`px-0 py-1 text-lg font-medium text-left transition-none ${
                    main.type === entry.type &&
                    (entry.type === "gallery"
                      // Check 'filter' in both main and entry!
                      ? (main.type === "gallery" &&
                        ((main.filter == null && 'filter' in entry && entry.filter == null) ||
                        (main.filter === ('filter' in entry ? entry.filter : undefined)))
                      )
                      : false // only highlight if type is not gallery in other branch
                    )
                      ? "text-black"
                      : "text-stone-500"
                  } hover:text-black`}
                  onClick={() => {
                    if (entry.type === "gallery") {
                      setMain({
                        type: "gallery",
                        filter: 'filter' in entry ? entry.filter ?? null : null
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
              <div className="border-t border-stone-200 my-4" />
              {/* Parte 2: About + Contact */}
              {menuPart2.map(entry => (
                <button
                  key={entry.label}
                  className={`px-0 py-1 text-lg font-medium text-left transition-none ${
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
        {/* Mobile Menu: hamburguesa */}
        {isMobile && (
          <>
            <button
              className="fixed z-40 top-3 right-3 p-2 rounded-md bg-white border border-stone-200"
              onClick={() => setMenuOpen(v => !v)}
              style={{ top: 22, boxShadow: "none" }}
              aria-label="Menu"
            >
              <Menu className="w-7 h-7 text-stone-700" />
            </button>
            {menuOpen && (
              <div
                className="fixed z-50 inset-0 bg-black/30"
                onClick={() => setMenuOpen(false)}
              >
                <div
                  className="fixed right-0 top-0 bg-white h-full w-64 flex flex-col p-6 gap-1"
                  style={{
                    paddingTop: 90,
                    zIndex: 100,
                    boxShadow: "none"
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {menuEntries.map(entry => (
                    <button
                      key={entry.label}
                      className={`text-left w-full py-2 px-2 rounded-md text-lg ${
                        main.type === entry.type &&
                        (entry.type === "gallery"
                          ? (main.type === "gallery" &&
                            ((main.filter == null && 'filter' in entry && entry.filter == null) ||
                            (main.filter === ('filter' in entry ? entry.filter : undefined)))
                          )
                          : false
                        )
                          ? "text-black bg-stone-100"
                          : "text-stone-500"
                      } hover:bg-stone-100`}
                      onClick={() => {
                        setMenuOpen(false);
                        if (entry.type === "gallery") {
                          setMain({
                            type: "gallery",
                            filter: 'filter' in entry ? entry.filter ?? null : null
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
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <footer className="w-full text-center py-10 text-stone-300 text-xs font-inter"
        style={{ background: "#fff", boxShadow: "none" }}>
        © {new Date().getFullYear()} Santiago Ruiz
      </footer>
    </div>
  );
};

export default Index;

