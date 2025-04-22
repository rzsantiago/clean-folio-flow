
import { Project } from "@/data/projects";

export default function ProjectCard({ project, noOverlay }: { project: Project, noOverlay?: boolean }) {
  return (
    <div
      tabIndex={0}
      aria-label={project.title}
      className="block relative overflow-hidden rounded-lg outline-none transition-none cursor-pointer"
      style={{
        background: project.coverColor || "#EEE",
        aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
        minHeight: 180,
        width: "100%",
        marginBottom: 0,
        boxShadow: "none",
        borderRadius: 8 // Antes era probablemente 16 o 12
      }}
    >
      {/* Imagen o color limpio, sin overlay de título ni descripción */}
    </div>
  );
}
