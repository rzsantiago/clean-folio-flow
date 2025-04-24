
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

type Props = {
  projectId: string;
  onNavigate: (id: string) => void;
  prevId?: string | null;
  nextId?: string | null;
  showProjectHeader?: boolean;
};

export default function ProjectView({
  projectId,
  onNavigate,
  prevId,
  nextId,
  showProjectHeader,
}: Props) {
  const { data: projects = [] } = useProjects();
  const project = projects.find(p => p.id === projectId);
  const [hover, setHover] = useState<"left" | "right" | null>(null);

  if (!project) return null;

  const handleNavigate = (id: string) => {
    onNavigate(id);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 10);
    }
  };

  return (
    <div className="relative w-full min-h-[70vh] select-none">
      {/* Botones de navegación */}
      {prevId && (
        <div
          className="fixed left-3 md:left-4 top-1/2 z-40 -translate-y-1/2 group"
          style={{ width: 48, height: 60 }}
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onClick={() => handleNavigate(prevId)}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`flex items-center h-full justify-start pl-2 transition-opacity duration-150 ${hover === "left" ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
          >
            <ArrowLeft className="w-8 h-8 text-stone-400 hover:text-stone-800" />
          </div>
        </div>
      )}
      {nextId && (
        <div
          className="fixed right-0 md:right-[31vw] top-1/2 z-40 -translate-y-1/2 group"
          style={{ width: 48, height: 60 }}
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => handleNavigate(nextId)}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`flex items-center h-full justify-end pr-2 transition-opacity duration-150 ${hover === "right" ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
          >
            <ArrowRight className="w-8 h-8 text-stone-400 hover:text-stone-800" />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full pb-10 md:pl-6 md:pr-6">
        {/* Imagen de portada principal */}
        {project.coverImage && (
          <div className="w-full rounded-xl overflow-hidden mb-6" style={{
            aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
            minHeight: 230,
            background: "#EEE"
          }}>
            <img
              src={project.coverImage}
              alt={`Portada de ${project.title}`}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
        )}
        
        {showProjectHeader && (
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-base md:text-lg text-stone-500 mt-2">
                {project.description}
              </p>
            )}
            {(project.client || project.year) && (
              <div className="text-xs text-stone-400 mt-2 flex flex-row gap-3">
                {project.client && (
                  <span>
                    <span className="font-medium">Cliente:</span> {project.client}
                  </span>
                )}
                {project.client && project.year && <span className="mx-2">|</span>}
                {project.year && (
                  <span>
                    <span className="font-medium">Año:</span> {project.year}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Galería de imágenes */}
        <div className="flex flex-col gap-2">
          {project.contentImages.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: 8,
                width: "100%",
                minHeight: 220,
                aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
                margin: "0",
                background: "#EEE"
              }}
              className="w-full overflow-hidden"
            >
              <img
                src={img}
                alt={`Imagen del proyecto ${project.title} ${i + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
