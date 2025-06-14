
import { Project } from "@/data/projects";

export default function ProjectCard({ project, noOverlay }: { project: Project, noOverlay?: boolean }) {
  return (
    <div
      tabIndex={0}
      aria-label={project.title}
      className="block relative overflow-hidden rounded-lg outline-none cursor-pointer group"
      style={{
        aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
        minHeight: 180,
        width: "100%",
        marginBottom: 0,
        boxShadow: "none",
        borderRadius: 8,
        background: project.coverImage ? undefined : (project.coverColor || "#EEE"),
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {project.coverImage && (
        <>
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center rounded-lg"
            style={{
              aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
              minHeight: 180,
              width: "100%",
              height: "100%",
              display: "block",
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s ease'
            }}
            draggable={false}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent"
            style={{
              opacity: 0,
              transform: 'translateY(10px)',
              transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-medium text-black bg-white/90 px-2 py-1 rounded-sm backdrop-blur-sm">
                {project.title}
              </span>
              {project.year && (
                <span className="text-xs text-stone-600 bg-white/90 px-2 py-1 rounded-sm backdrop-blur-sm">
                  {project.year}
                </span>
              )}
            </div>
          </div>
          
          <style jsx>{`
            .group:hover img {
              transform: scale(1.03);
              filter: brightness(0.95);
            }
            .group:hover div:last-child {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>
        </>
      )}
    </div>
  );
}
