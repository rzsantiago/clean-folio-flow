
import React, { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ImageZoomModal } from "./ImageZoomModal";

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
  showProjectHeader
}: Props) {
  const {
    data: projects = []
  } = useProjects();
  const project = projects.find(p => p.id === projectId);
  const isMobile = useIsMobile();
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  if (!project) return null;

  // Find prev/next project
  const categoryProjects = projects.filter(p => p.category === project.category);
  const idx = categoryProjects.findIndex(p => p.id === projectId);
  const prevProject = idx > 0 ? categoryProjects[idx - 1] : null;
  const nextProject = idx >= 0 && idx < categoryProjects.length - 1 ? categoryProjects[idx + 1] : null;
  
  const handleNavigate = (id: string) => {
    onNavigate(id);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 10);
    }
  };

  const handleImageClick = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  const isPngImage = (src: string) => {
    return src.toLowerCase().includes('.png');
  };

  return (
    <div className={`relative w-full min-h-[70vh] select-none px-0`}>
      <div className="flex flex-col gap-3 w-full pb-10 px-0">
        {project.coverImage && (
          <div 
            className="w-full rounded-xl overflow-hidden mb-6" 
            style={{
              aspectRatio: "4/3",
              minHeight: 230,
              background: isPngImage(project.coverImage) ? "#fbfbfb" : "#EEE"
            }}
          >
            <img 
              src={project.coverImage} 
              alt={`Portada de ${project.title}`} 
              className="w-full h-full object-cover object-center cursor-pointer" 
              draggable={false}
              onClick={() => handleImageClick(project.coverImage!, `Portada de ${project.title}`)}
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

        {/* Contenido mixto (imágenes y textos) */}
        <div className="flex flex-col gap-4">
          {project.contentItems && project.contentItems.map((item, i) => (
            <div key={item.id || i}>
              {item.type === 'image' ? (
                <div 
                  className="w-full overflow-hidden cursor-pointer" 
                  style={{ 
                    borderRadius: 8, 
                    background: isPngImage(item.content) ? "#fbfbfb" : "#EEE" 
                  }}
                  onClick={() => handleImageClick(item.content, `Imagen del proyecto ${project.title} ${i + 1}`)}
                >
                  <img 
                    src={item.content} 
                    alt={`Imagen del proyecto ${project.title} ${i + 1}`} 
                    className="w-full h-auto object-cover object-center" 
                    draggable={false} 
                  />
                </div>
              ) : (
                <div className="w-full">
                  <p className="font-helnow-regular text-base md:text-lg text-stone-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botones de navegación para mobile */}
        {isMobile && (
          <div className="flex justify-between mt-8 px-2">
            <button 
              onClick={() => prevProject && handleNavigate(prevProject.id)} 
              disabled={!prevProject} 
              className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed" 
              aria-label="Proyecto anterior"
            >
              <ArrowLeft size={22} />
            </button>
            
            <button 
              onClick={() => nextProject && handleNavigate(nextProject.id)} 
              disabled={!nextProject} 
              className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed" 
              aria-label="Proyecto siguiente"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        )}
      </div>

      <ImageZoomModal
        src={zoomedImage?.src || ""}
        alt={zoomedImage?.alt || ""}
        isOpen={!!zoomedImage}
        onClose={() => setZoomedImage(null)}
      />
    </div>
  );
}
