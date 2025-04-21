
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
  const [hover, setHover] = useState<'left' | 'right' | null>(null);

  return (
    <div className="relative w-full min-h-[70vh] select-none">
      {/* Flechas fijas al costado de la pantalla */}
      {prevId && (
        <div
          className="fixed left-0 top-1/2 z-40 -translate-y-1/2 group"
          style={{ width: "60px", height: 80 }}
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onNavigate(prevId)}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`flex items-center h-full justify-start pl-2 transition-opacity duration-150 ${hover === 'left' ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
          >
            <ArrowLeft className="w-9 h-9 text-stone-400 hover:text-stone-800" />
          </div>
        </div>
      )}
      {nextId && (
        <div
          className="fixed right-0 top-1/2 z-40 -translate-y-1/2 group"
          style={{ width: "60px", height: 80 }}
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onNavigate(nextId)}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`flex items-center h-full justify-end pr-2 transition-opacity duration-150 ${hover === 'right' ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
          >
            <ArrowRight className="w-9 h-9 text-stone-400 hover:text-stone-800" />
          </div>
        </div>
      )}

      {/* Contenido principal del proyecto */}
      <div className="flex flex-col gap-3 w-full pb-10 md:pl-6 md:pr-6">
        {showProjectHeader && (
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-stone-900">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-base md:text-lg text-stone-500 mt-1">
                {project.description}
              </p>
            )}
            {(project.client || project.year) && (
              <div className="text-xs text-stone-400 mt-2">
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
        {project.contentImages.map((color, i) => (
          <div
            key={i}
            style={{
              background: color,
              borderRadius: 16,
              width: "100%",
              minHeight: 260,
              aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
            }}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
