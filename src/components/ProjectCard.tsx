import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="block relative overflow-hidden rounded-xl"
      tabIndex={0}
      aria-label={project.title}
      style={{
        background: project.coverColor || "#EEE",
        aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
        minHeight: 180,
        width: "100%",
        transition: "none"
      }}
    >
      
    </Link>
  );
}
