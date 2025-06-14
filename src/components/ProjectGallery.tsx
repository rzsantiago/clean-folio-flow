
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

type Props = {
  projects: Project[],
  onProjectClick?: (id: string) => void,
  noOverlay?: boolean;
}

export default function ProjectGallery({ projects, onProjectClick, noOverlay }: Props) {
  const isMobile = useIsMobile();
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);

  useEffect(() => {
    // Reset visible projects when projects change
    setVisibleProjects([]);
    
    // Stagger the appearance of projects
    projects.forEach((project, index) => {
      setTimeout(() => {
        setVisibleProjects(prev => [...prev, project.id]);
      }, index * 100); // 100ms delay between each project
    });
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[40vh] text-stone-500 pl-4">
        No hay proyectos para mostrar en esta categoría.
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 w-full pt-2">
        {projects.map((p, index) => (
          <div 
            key={p.id} 
            onClick={() => onProjectClick?.(p.id)}
            className="w-full"
            style={{
              opacity: visibleProjects.includes(p.id) ? 1 : 0,
              transform: visibleProjects.includes(p.id) ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <ProjectCard project={p} noOverlay={noOverlay} />
          </div>
        ))}
      </div>
    );
  }

  // 3 columnas masonry layout con animaciones escalonadas
  return (
    <div className="w-full flex gap-[10px] h-max pt-2 pl-4">
      {[0,1,2].map(col => (
        <div className="flex flex-col flex-1 gap-[10px]" key={col}>
          {projects.filter((_, i) => i % 3 === col).map((p, index) => (
            <div 
              key={p.id} 
              onClick={() => onProjectClick?.(p.id)}
              className="w-full"
              style={{
                opacity: visibleProjects.includes(p.id) ? 1 : 0,
                transform: visibleProjects.includes(p.id) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              <ProjectCard project={p} noOverlay={noOverlay} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
