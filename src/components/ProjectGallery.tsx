
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  projects: Project[],
  onProjectClick?: (id: string) => void,
  noOverlay?: boolean;
}

export default function ProjectGallery({ projects, onProjectClick, noOverlay }: Props) {
  const isMobile = useIsMobile();

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
        {projects.map(p => (
          <div 
            key={p.id} 
            onClick={() => onProjectClick?.(p.id)}
            className="w-full"
          >
            <ProjectCard project={p} noOverlay={noOverlay} />
          </div>
        ))}
      </div>
    );
  }

  // 3 columnas masonry layout con margenes consistentemente pequeños y parejos
  return (
    <div className="w-full flex gap-[10px] h-max pt-2 pl-4">
      {[0,1,2].map(col => (
        <div className="flex flex-col flex-1 gap-[10px]" key={col}>
          {projects.filter((_, i) => i % 3 === col).map(p => (
            <div 
              key={p.id} 
              onClick={() => onProjectClick?.(p.id)}
              className="w-full"
            >
              <ProjectCard project={p} noOverlay={noOverlay} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
