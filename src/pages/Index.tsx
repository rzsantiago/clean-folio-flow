
import React, { useState } from "react";
import { projects } from "@/data/projects";
import { SidebarMenu } from "@/components/SidebarMenu";
import ProjectGallery from "@/components/ProjectGallery";
import Navbar from "@/components/Navbar";
import About from "./About";
import Contact from "./Contact";
import ProjectView from "@/components/ProjectView";
import { useFadeTransition } from "@/hooks/useFadeTransition";

// Todas las categorías únicas
const categories = Array.from(new Set(projects.map(p => p.category)));

type MainSection =
  | { type: "gallery"; filter: string | null }
  | { type: "about"; }
  | { type: "contact"; }
  | { type: "project"; id: string };

const Index = () => {
  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });

  let content: React.ReactNode = null;
  let fadeDeps: any[] = [];

  if (main.type === "about") {
    content = <About minimal />;
    fadeDeps = ["about"];
  } else if (main.type === "contact") {
    content = <Contact minimal />;
    fadeDeps = ["contact"];
  } else if (main.type === "project") {
    content = <ProjectView projectId={main.id} onNavigate={id => setMain({ type: "project", id })} />;
    fadeDeps = [main.id, "project"];
  } else {
    const filtered = main.filter ? projects.filter(p => p.category === main.filter) : projects;
    content = <ProjectGallery
      projects={filtered}
      onProjectClick={id => setMain({ type: "project", id })}
      noOverlay
    />;
    fadeDeps = [main.filter, "gallery"];
  }

  const { fadeClass } = useFadeTransition(fadeDeps);

  // For highlighting which static section is active in SidebarMenu
  let activeSection: "about" | "contact" | null = null;
  if (main.type === "about") activeSection = "about";
  if (main.type === "contact") activeSection = "contact";

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-inter">
      <Navbar onHome={() => setMain({ type: "gallery", filter: null })} />
      <div className="flex-1 flex flex-row w-full max-w-[1600px] mx-auto mt-20 md:mt-28 px-0 md:px-10 gap-0 md:gap-0 transition-none">
        <main className={`w-full md:w-[70%] max-w-[100%] pt-4 pb-14 md:pb-0 flex items-start justify-center transition-none`}>
          <div className={`w-full transition-none ${fadeClass}`}>
            {content}
          </div>
        </main>
        <section className="hidden md:flex w-[30%] max-w-xs min-w-[210px] flex-col items-end">
          <div className="w-full pr-0">
            <SidebarMenu
              categories={categories}
              active={main.type === "gallery" ? main.filter : null}
              activeSection={activeSection}
              onSelect={cat => setMain({ type: "gallery", filter: cat })}
              onAbout={() => setMain({ type: "about" })}
              onContact={() => setMain({ type: "contact" })}
            />
          </div>
        </section>
      </div>
      <footer className="w-full text-center py-10 text-stone-300 text-xs font-inter">
        © {new Date().getFullYear()} cleanfolio
      </footer>
    </div>
  );
};

export default Index;
