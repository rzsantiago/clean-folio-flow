
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

// Galería en masonry/fila simple mobile
type Props = {
  projects: Project[]
}

export default function ProjectGallery({ projects }: Props) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-6 w-full">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    );
  }

  // 3 columnas manual
  return (
    <div className="w-full flex gap-8 h-max">
      {[0,1,2].map(col => (
        <div className="flex flex-col flex-1 gap-8" key={col}>
          {projects.filter((_, i) => i % 3 === col).map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ))}
    </div>
  );
}
