
import { projects } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";

type Props = {
  projectId: string;
  onNavigate: (id: string) => void;
};

export default function ProjectView({ projectId, onNavigate }: Props) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  // Buscar proyectos hermanos en la misma categoría
  const siblings = projects.filter(p => p.category === project.category);
  const idx = siblings.findIndex(p => p.id === projectId);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  // Hover lateral
  const [hover, setHover] = useState<'left' | 'right' | null>(null);

  return (
    <div className="w-full min-h-[70vh] relative select-none">
      {/* Flecha prev */}
      {prev && (
        <div
          className="absolute left-0 top-0 h-full group z-10"
          style={{ width: "60px" }}
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onNavigate(prev.id)}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`flex items-center h-full justify-start pl-2 transition-opacity duration-150 ${hover === 'left' ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`}
          >
            <ArrowLeft className="w-9 h-9 text-stone-400 hover:text-stone-800" />
          </div>
        </div>
      )}
      {/* Flecha sig */}
      {next && (
        <div
          className="absolute right-0 top-0 h-full group z-10"
          style={{ width: "60px" }}
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onNavigate(next.id)}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`flex items-center h-full justify-end pr-2 transition-opacity duration-150 ${hover === 'right' ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`}
          >
            <ArrowRight className="w-9 h-9 text-stone-400 hover:text-stone-800" />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 w-full pb-10">
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
  )
}
