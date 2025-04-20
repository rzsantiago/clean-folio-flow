
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useEffect } from "react";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  // Para la navegación lateral solo dentro de la misma categoría:
  const categoryProjects = project
    ? projects.filter(p => p.category === project.category)
    : [];
  const idx = categoryProjects.findIndex(p => p.id === id);

  const prev = idx > 0 ? categoryProjects[idx - 1] : null;
  const next = idx >= 0 && idx < categoryProjects.length - 1 ? categoryProjects[idx + 1] : null;

  const navigate = useNavigate();

  // Auto-scroll arriba al cambiar de proyecto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id]);

  if (!project) 
    return (
      <div className="py-16 text-center text-stone-500 font-inter">
        Proyecto no encontrado.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto py-10 font-inter px-4">
      <div className="flex items-center justify-between gap-2 mb-8">
        <button 
          disabled={!prev}
          onClick={() => prev && navigate(`/project/${prev.id}`)}
          className={`px-3 py-2 rounded bg-stone-100 disabled:opacity-40 hover:scale-105 transition-all shadow border font-inter text-stone-600`}
        >
          ← Anterior
        </button>
        <span className="text-stone-500">{project.category}</span>
        <button
          disabled={!next}
          onClick={() => next && navigate(`/project/${next.id}`)}
          className={`px-3 py-2 rounded bg-stone-100 disabled:opacity-40 hover:scale-105 transition-all shadow border font-inter text-stone-600`}
        >
          Siguiente →
        </button>
      </div>
      <div className={`w-full mb-6 ${project.ratio === "4x3" ? "aspect-[4/3]" : "aspect-[3/4]"} bg-stone-200 rounded-lg overflow-hidden`}>
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-stone-600 text-lg mb-4">{project.excerpt}</p>
      <div className="text-stone-700 leading-relaxed">{project.content}</div>
    </div>
  );
};

export default ProjectPage;
