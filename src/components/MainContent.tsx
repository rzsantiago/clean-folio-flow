
import React, { useRef, useEffect } from "react";
import ProjectGallery from "@/components/ProjectGallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ProjectView from "@/components/ProjectView";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

export type MainSection =
  | { type: "gallery"; filter: string | null }
  | { type: "about" }
  | { type: "contact" }
  | { type: "project"; id: string; fromFilter: string | null };

type Props = {
  main: MainSection;
  setMain: (val: MainSection) => void;
  isMobile: boolean;
};

export default function MainContent({ main, setMain, isMobile }: Props) {
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { data: projects = [], isLoading, error } = useProjects();

  useEffect(() => {
    if (main.type === "project") {
      mainContentRef.current?.scrollIntoView({ behavior: "auto" });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [main]);

  let filteredProjects = projects;
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

  let content: React.ReactNode = null;
  let fadeDeps: any[] = [];

  if (isLoading) {
    content = (
      <div className="w-full min-h-[40vh] flex flex-col items-center justify-center text-stone-400 text-lg font-fustat pl-4 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
        <span>Cargando proyectos...</span>
      </div>
    );
    fadeDeps = ["loading"];
  } else if (error) {
    content = (
      <div className="w-full min-h-[40vh] flex items-center justify-center text-red-500 text-lg font-fustat pl-4">
        Error al cargar proyectos: {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
    fadeDeps = ["error"];
  } else if (main.type === "about") {
    content = <About minimal />;
    fadeDeps = ["about"];
  } else if (main.type === "contact") {
    content = <Contact minimal />;
    fadeDeps = ["contact"];
  } else if (main.type === "project") {
    content = (
      <ProjectView
        projectId={main.id}
        onNavigate={id => setMain({ type: "project", id, fromFilter: main.fromFilter })}
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

  const { fadeClass } = useFadeTransition(fadeDeps, 800);

  return (
    <main
      ref={mainContentRef}
      className="w-full pb-14 md:pb-0 flex items-start justify-center transition-none"
    >
      <div
        className={`w-full transition-all duration-800 ease-in-out ${fadeClass} ${
          isMobile ? "px-4 pt-24" : "pr-12 pt-8 pl-4 xl:pl-4"
        }`}
        style={{
          minHeight: "75vh",
          marginBottom: 0,
        }}
      >
        {content}
      </div>
    </main>
  );
}
