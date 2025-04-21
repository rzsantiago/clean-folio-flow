
import { Project } from "@/data/projects";

export default function ProjectCard({ project, noOverlay }: { project: Project, noOverlay?: boolean }) {
  return (
    <div
      tabIndex={0}
      aria-label={project.title}
      className="block relative overflow-hidden rounded-xl outline-none transition-none cursor-pointer"
      style={{
        background: project.coverColor || "#EEE",
        aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
        minHeight: 180,
        width: "100%",
        marginBottom: 0,
        boxShadow: "none"
      }}
    >
      {/* Título y descripción en galería, centrados en la parte superior */}
      <div className="absolute top-2 left-2 right-2 bg-white/[.86] rounded-lg px-2 py-1 flex flex-col z-10">
        <span className="font-bold text-base text-stone-900">{project.title}</span>
        <span className="text-xs text-stone-500">{project.description}</span>
      </div>
      {/* Overlay podría ir aquí si noOverlay es falso */}
    </div>
  );
}
