
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

type Props = {
  projects: Project[];
  onProjectClick?: (id: string) => void;
  noOverlay?: boolean;
};

export default function ProjectGallery({
  projects,
  onProjectClick,
  noOverlay
}: Props) {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[40vh] text-stone-500 px-4 pb-8">
        No hay proyectos para mostrar en esta categoría.
      </div>
    );
  }

  // Mobile: columna única
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3 w-full pt-2 pb-8 px-0">
        {projects.map(p => (
          <div key={p.id} onClick={() => onProjectClick?.(p.id)} className="w-full">
            <ProjectCard project={p} noOverlay={noOverlay} />
          </div>
        ))}
      </div>
    );
  }

  // Tablet: 2 columnas
  if (isTablet) {
    return (
      <div className="w-full flex gap-[10px] h-max pt-2 pb-8 px-0">
        {[0, 1].map(col => (
          <div className="flex flex-col flex-1 gap-[10px]" key={col}>
            {projects.filter((_, i) => i % 2 === col).map(p => (
              <div key={p.id} onClick={() => onProjectClick?.(p.id)} className="w-full">
                <ProjectCard project={p} noOverlay={noOverlay} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Desktop: 3 columnas masonry layout - sin padding horizontal aquí
  return (
    <div className="w-full flex gap-[10px] h-max pt-2 pb-8 px-0">
      {[0, 1, 2].map(col => (
        <div className="flex flex-col flex-1 gap-[10px]" key={col}>
          {projects.filter((_, i) => i % 3 === col).map(p => (
            <div key={p.id} onClick={() => onProjectClick?.(p.id)} className="w-full">
              <ProjectCard project={p} noOverlay={noOverlay} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
