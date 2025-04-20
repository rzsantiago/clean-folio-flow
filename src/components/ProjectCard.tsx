
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

// Galería utiliza este componente para un bloque visual de proyecto
function getAspect(ratio: Project["ratio"]) {
  return ratio === "3x4" ? "aspect-[3/4]" : "aspect-[4/3]";
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group block relative overflow-hidden bg-stone-200 rounded-lg shadow hover:shadow-lg transition-shadow border"
    >
      <div
        className={`w-full ${getAspect(project.ratio)} transition-all duration-300 group-hover:scale-105 group-hover:opacity-90`}
        style={{ background: "#F1F1F1" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`object-cover w-full h-full ${getAspect(project.ratio)} transition-transform duration-300`}
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white/80 py-2 px-3 text-stone-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200">
        {project.title} <span className="text-xs text-stone-500"> — {project.category}</span>
      </div>
    </Link>
  );
}
