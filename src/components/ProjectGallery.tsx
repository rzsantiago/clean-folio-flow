
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

  if (isMobile) {
    return (
      <div className="flex flex-col gap-1 w-full">
        {projects.map(p => (
          <div key={p.id} onClick={() => onProjectClick?.(p.id)}>
            <ProjectCard project={p} noOverlay={noOverlay} />
          </div>
        ))}
      </div>
    );
  }

  // 3 columnas masonry layout con menos espacio
  return (
    <div className="w-full flex gap-2 h-max">
      {[0,1,2].map(col => (
        <div className="flex flex-col flex-1 gap-1" key={col}>
          {projects.filter((_, i) => i % 3 === col).map(p => (
            <div key={p.id} onClick={() => onProjectClick?.(p.id)}>
              <ProjectCard project={p} noOverlay={noOverlay} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
