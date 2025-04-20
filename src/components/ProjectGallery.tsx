
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";

// Galería responsive tipo masonry/feed
type Props = {
  projects: Project[]
}

export default function ProjectGallery({ projects }: Props) {
  const isMobile = useIsMobile();

  // Masonry flex para desktop, feed vertical para móvil
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 w-full">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    );
  }

  // Masonry manual: dos/tres columnas con fallbacks
  return (
    <div className="w-full flex flex-row gap-6">
      {[0,1,2].map(colIdx => (
        <div className="flex flex-col flex-1 gap-6" key={colIdx}>
          {projects.filter((_, i) => i % 3 === colIdx).map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ))}
    </div>
  );
}
