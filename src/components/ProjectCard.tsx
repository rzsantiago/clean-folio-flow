
import { Project } from "@/data/projects";

export default function ProjectCard({ project, noOverlay }: { project: Project, noOverlay?: boolean }) {
  // Usar thumbnailImage si existe, sino usar coverImage como fallback
  const displayImage = project.thumbnailImage || project.coverImage;
  
  return (
    <div
      tabIndex={0}
      aria-label={project.title}
      className="block relative overflow-hidden rounded-lg outline-none transition-none cursor-pointer group"
      style={{
        aspectRatio: "4/3", // Usar aspecto fijo 4/3 para todos los proyectos
        minHeight: 180,
        width: "100%",
        marginBottom: 0,
        boxShadow: "none",
        borderRadius: 8,
        background: displayImage ? undefined : (project.coverColor || "#EEE"),
      }}
    >
      {displayImage && (
        <>
          <img
            src={displayImage}
            alt={project.title}
            className="w-full h-full object-cover object-center rounded-lg transition-all duration-500 group-hover:scale-[1.02]"
            style={{
              aspectRatio: "4/3", // Usar aspecto fijo 4/3
              minHeight: 180,
              width: "100%",
              height: "100%",
              display: "block",
            }}
            draggable={false}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-medium text-black bg-white/80 px-2 py-1 rounded-sm">
                {project.title}
              </span>
              {project.year && (
                <span className="text-xs text-stone-600 bg-white/80 px-2 py-1 rounded-sm">
                  {project.year}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
