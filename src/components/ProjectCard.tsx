
import { Project } from "@/data/projects";

export default function ProjectCard({ project, noOverlay }: { project: Project, noOverlay?: boolean }) {
  return (
    <div
      tabIndex={0}
      aria-label={project.title}
      className="block relative overflow-hidden rounded-lg outline-none transition-none cursor-pointer"
      style={{
        aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
        minHeight: 180,
        width: "100%",
        marginBottom: 0,
        boxShadow: "none",
        borderRadius: 8,
        background: project.coverImage ? undefined : (project.coverColor || "#EEE"),
      }}
    >
      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover object-center rounded-lg transition-none"
          style={{
            aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
            minHeight: 180,
            width: "100%",
            height: "100%",
            display: "block",
          }}
          draggable={false}
        />
      )}
      {/* Si no hay coverImage, se mantiene color plano */}
    </div>
  );
}
