
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";
import { useProjectTouchNavigation } from "@/hooks/useProjectTouchNavigation";
import ProjectRenderer from "./ProjectRenderer";

type Props = {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  projectId: string;
  onNavigate: (id: string) => void;
  showProjectHeader?: boolean;
};

export default function MobileProjectCarousel({
  project,
  prevProject,
  nextProject,
  projectId,
  onNavigate,
  showProjectHeader
}: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { dragOffset, touchHandlers } = useProjectTouchNavigation({
    projectId,
    prevProject,
    nextProject,
    onNavigate
  });

  const handleNavigate = (id: string) => {
    onNavigate(id);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 10);
    }
  };

  const visibleProjects = [];
  if (prevProject) visibleProjects.push(prevProject);
  visibleProjects.push(project);
  if (nextProject) visibleProjects.push(nextProject);

  return (
    <div className="relative w-full min-h-[70vh] select-none overflow-hidden">
      <div 
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(calc(-${prevProject ? 100 : 0}% + ${dragOffset}px))`,
          width: `${visibleProjects.length * 100}%`
        }}
        {...touchHandlers}
      >
        {visibleProjects.map((proj) => (
          <div key={proj.id} style={{ width: `${100 / visibleProjects.length}%` }}>
            <ProjectRenderer 
              project={proj} 
              isActive={proj.id === projectId} 
              showProjectHeader={showProjectHeader}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 px-6">
        <button
          onClick={() => prevProject && handleNavigate(prevProject.id)}
          disabled={!prevProject}
          className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Proyecto anterior"
        >
          <ArrowLeft size={22} />
        </button>
        
        <button
          onClick={() => nextProject && handleNavigate(nextProject.id)}
          disabled={!nextProject}
          className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Proyecto siguiente"
        >
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
