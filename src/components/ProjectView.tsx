
import React from "react";
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
  showProjectHeader,
}: Props) {
  const { data: projects = [] } = useProjects();
  const project = projects.find(p => p.id === projectId);

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
      <div className="flex flex-col gap-3 w-full pb-10 md:pl-6 md:pr-6">
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
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
