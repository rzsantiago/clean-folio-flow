
import { projects as allProjects } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

// Props extendidas para navegación personalizada
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
  const project = allProjects.find(p => p.id === projectId);
  if (!project) return null;

  // Hover para flechas (en desktop, para opacidad)
  const [hover, setHover] = useState<"left" | "right" | null>(null);

  return (
    <div className="relative w-full min-h-[70vh] select-none">
      {/* Flechas fijas al costado del area de imagenes */}
      {prevId && (
        <div
          className="fixed left-3 md:left-4 top-1/2 z-40 -translate-y-1/2 group"
          style={{ width: 48, height: 60 }} // align arrow in
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onNavigate(prevId)}
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
          className="fixed right-[28vw] md:right-[30vw] top-1/2 z-40 -translate-y-1/2 group"
          style={{ width: 48, height: 60 }} // para que quede entre galeria y sidebar
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onNavigate(nextId)}
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
        {showProjectHeader && (
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-base md:text-lg text-stone-500 mt-1">
                {project.description}
              </p>
            )}
            {(project.client || project.year) && (
              <div className="text-xs text-stone-400 mt-2 flex flex-row gap-3">
                {project.client && (
                  <span>
                    <span className="font-medium">Client:</span> {project.client}
                  </span>
                )}
                {project.client && project.year && <span className="mx-2">|</span>}
                {project.year && (
                  <span>
                    <span className="font-medium">Year:</span> {project.year}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        {/* Imágenes, con menos gap */}
        <div className="flex flex-col gap-2">
          {project.contentImages.map((color, i) => (
            <div
              key={i}
              style={{
                background: color,
                borderRadius: 12,
                width: "100%",
                minHeight: 220,
                aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
                margin: "0"
              }}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
