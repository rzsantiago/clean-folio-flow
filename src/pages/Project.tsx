
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useEffect, useState } from "react";
import { ImageZoomModal } from "@/components/ImageZoomModal";

// Muestra el proyecto, navegación y contenido mixto (imágenes y textos)
const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: projects = [] } = useProjects();
  const project = projects.find(p => p.id === id);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

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

  const handleImageClick = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const isPngImage = (src: string) => {
    return src.toLowerCase().includes('.png');
  };

  if (!project)
    return (
      <div className="py-16 text-center text-stone-500 font-fustat">
        Proyecto no encontrado.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto pt-28 pb-12 font-helnow-regular px-4">
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          disabled={!prev}
          onClick={() => prev && navigate(`/project/${prev.id}`)}
          className="text-stone-400 hover:text-stone-800 px-1 py-0 bg-none font-helnow-regular text-base disabled:opacity-40 transition-none"
        >
          ← Anterior
        </button>
        <span className="text-stone-400 font-helnow-light text-sm">{project.category}</span>
        <button
          disabled={!next}
          onClick={() => next && navigate(`/project/${next.id}`)}
          className="text-stone-400 hover:text-stone-800 px-1 py-0 bg-none font-helnow-regular text-base disabled:opacity-40 transition-none"
        >
          Siguiente →
        </button>
      </div>
      
      {/* Imagen de portada */}
      <div
        className={`w-full mb-8 rounded-xl overflow-hidden cursor-pointer`}
        style={{
          aspectRatio: "4/3",
          minHeight: 200,
          background: project.coverImage ? (isPngImage(project.coverImage) ? "#fbfbfb" : undefined) : project.coverColor,
        }}
        onClick={() => project.coverImage && handleImageClick(project.coverImage, project.title)}
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
              aspectRatio: "4/3",
              minHeight: 200,
              display: "block"
            }}
            draggable={false}
          />
        )}
      </div>
      
      <h1 className="font-helnow-bold text-3xl mb-4 text-stone-900">{project.title}</h1>
      
      {/* Contenido mixto (imágenes y textos) */}
      {project.contentItems && project.contentItems.length > 0 && (
        <div className="flex flex-col gap-6 mb-8">
          {project.contentItems.map((item, i) => (
            <div key={item.id || i}>
              {item.type === 'image' ? (
                <div
                  className="w-full overflow-hidden cursor-pointer"
                  style={{
                    borderRadius: 16,
                    aspectRatio: "4/3",
                    minWidth: 120,
                    minHeight: 94,
                    background: isPngImage(item.content) ? "#fbfbfb" : "#EEE"
                  }}
                  onClick={() => handleImageClick(item.content, `Imagen del proyecto ${project.title} ${i + 1}`)}
                >
                  <img
                    src={item.content}
                    alt={`Imagen del proyecto ${project.title} ${i + 1}`}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <p className="font-helnow-regular text-base text-stone-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ImageZoomModal
        src={zoomedImage?.src || ""}
        alt={zoomedImage?.alt || ""}
        isOpen={!!zoomedImage}
        onClose={() => setZoomedImage(null)}
      />
    </div>
  );
}

export default ProjectPage;
