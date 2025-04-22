
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useEffect } from "react";

// Muestra el proyecto, navegación y galería de imágenes (colores sólidos)
const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  // Adjacent by category
  const categoryProjects = project
    ? projects.filter(p => p.category === project.category)
    : [];
  const idx = categoryProjects.findIndex(p => p.id === id);

  const prev = idx > 0 ? categoryProjects[idx - 1] : null;
  const next = idx >= 0 && idx < categoryProjects.length - 1 ? categoryProjects[idx + 1] : null;

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [id]);

  // Agrega eventos de teclado para navegar con flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prev) {
        navigate(`/project/${prev.id}`);
      } else if (e.key === "ArrowRight" && next) {
        navigate(`/project/${next.id}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, navigate]);

  if (!project)
    return (
      <div className="py-16 text-center text-stone-500 font-inter">
        Proyecto no encontrado.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto pt-28 pb-12 font-inter px-4">
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          disabled={!prev}
          onClick={() => prev && navigate(`/project/${prev.id}`)}
          className="text-stone-400 hover:text-stone-800 px-1 py-0 bg-none font-inter text-base disabled:opacity-40 transition-none"
        >
          ← Anterior
        </button>
        <span className="text-stone-400 font-light text-sm">{project.category}</span>
        <button
          disabled={!next}
          onClick={() => next && navigate(`/project/${next.id}`)}
          className="text-stone-400 hover:text-stone-800 px-1 py-0 bg-none font-inter text-base disabled:opacity-40 transition-none"
        >
          Siguiente →
        </button>
      </div>
      <div
        className={`w-full mb-8 rounded-xl`}
        style={{
          background: project.coverColor,
          aspectRatio: project.ratio === "4x3" ? "4/3" : "3/4",
          minHeight: 200,
        }}
      />
      <h1 className="text-3xl font-bold mb-4 text-stone-900">{project.title}</h1>
      {/* Galería de imágenes de contenido */}
      {project.contentImages && (
        <div className="flex flex-wrap gap-6 mb-8">
          {project.contentImages.map((color, i) => (
            <div
              key={i}
              style={{
                background: color,
                aspectRatio: "4/3",
                borderRadius: 16,
                minWidth: 120,
                minHeight: 94,
                flex: "1 0 31%",
                maxWidth: "30%",
              }}
              className="w-full"
            />
          ))}
        </div>
      )}
      {/* Texto u otros contenidos si lo hubiese */}
    </div>
  );
};

export default ProjectPage;
