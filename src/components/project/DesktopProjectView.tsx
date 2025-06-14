
import React from "react";
import { Project } from "@/data/projects";

type Props = {
  project: Project;
  showProjectHeader?: boolean;
};

export default function DesktopProjectView({ project, showProjectHeader }: Props) {
  return (
    <div className="relative w-full min-h-[70vh] select-none px-0">
      <div className="flex flex-col gap-3 w-full pb-10 px-0">
        {project.coverImage && (
          <div 
            className="w-full rounded-xl overflow-hidden mb-6" 
            style={{
              aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
              minHeight: 230,
              background: "#EEE"
            }}
          >
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
            <h1 className="font-helnow-regular text-3xl md:text-2xl font-normal text-stone-700">
              {project.title}
            </h1>
            {project.description && (
              <p className="font-helnow-regular text-base md:text-lg text-stone-500 mt-2">
                {project.description}
              </p>
            )}
            {(project.client || project.year) && (
              <div className="font-helnow-regular text-xs text-stone-400 mt-2 flex flex-row gap-3">
                {project.client && (
                  <span className="text-sm">
                    <span className="font-medium">Cliente:</span> {project.client}
                  </span>
                )}
                {project.client && project.year && <span className="mx-2 text-sm">|</span>}
                {project.year && (
                  <span className="text-sm">
                    <span className="font-medium">Año:</span> {project.year}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Content images - simple vertical layout */}
        <div className="flex flex-col gap-2">
          {project.contentImages.map((img, i) => (
            <div 
              key={i} 
              className="w-full overflow-hidden" 
              style={{ borderRadius: 8, background: "#EEE" }}
            >
              <img 
                src={img} 
                alt={`Imagen del proyecto ${project.title} ${i + 1}`} 
                className="w-full h-auto object-cover object-center" 
                draggable={false} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
