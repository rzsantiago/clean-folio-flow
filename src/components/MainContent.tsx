
import React, { useRef, useEffect } from "react";
import ProjectGallery from "@/components/ProjectGallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ProjectView from "@/components/ProjectView";
import { useFadeTransition } from "@/hooks/useFadeTransition";
import { projects as baseProjects } from "@/data/projects";

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

  // Scroll arriba al navegar entre proyectos
  useEffect(() => {
    if (main.type === "project") {
      mainContentRef.current?.scrollIntoView({ behavior: "auto" });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [main]);

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

  let content: React.ReactNode = null;
  let fadeDeps: any[] = [];

  if (main.type === "about") {
    content = <About minimal />;
    fadeDeps = ["about"];
  } else if (main.type === "contact") {
    content = <Contact minimal />;
    fadeDeps = ["contact"];
  } else if (main.type === "project") {
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

  return (
    <main
      ref={mainContentRef}
      className="w-full md:w-[71%] max-w-[100%] pt-4 pb-14 md:pb-0 flex items-start justify-center transition-none"
    >
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
  );
}
