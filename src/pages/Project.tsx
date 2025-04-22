
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { useEffect } from "react";

// Muestra el proyecto, navegación y galería de imágenes (con imagen de portada si existe)
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
        className={`w-full mb-8 rounded-xl overflow-hidden`}
        style={{
          aspectRatio: project.ratio === "4x3" ? "4/3" : "3/4",
          minHeight: 200,
          background: project.coverImage ? undefined : project.coverColor,
        }}
      >
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            style={{
              borderRadius: 16,
              width: "100%",
              height: "100%",
              aspectRatio: project.ratio === "4x3" ? "4/3" : "3/4",
              minHeight: 200,
              display: "block"
            }}
            draggable={false}
          />
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4 text-stone-900">{project.title}</h1>
      {/* Galería de imágenes de contenido */}
      {project.contentImages && (
        <div className="flex flex-wrap gap-6 mb-8">
          {project.contentImages.map((img, i) => (
            <div
              key={i}
              className="w-full overflow-hidden"
              style={{
                borderRadius: 16,
                aspectRatio: "4/3",
                minWidth: 120,
                minHeight: 94,
                flex: "1 0 31%",
                maxWidth: "30%",
                background: "#EEE"
              }}
            >
              <img
                src={img}
                alt={`Imagen del proyecto ${project.title} ${i + 1}`}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}
      {/* Texto u otros contenidos si lo hubiese */}
    </div>
  );
};

export default ProjectPage;
