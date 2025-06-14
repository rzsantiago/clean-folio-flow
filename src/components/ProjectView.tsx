
import React, { useState, useRef, useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  // Touch navigation states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Touch handlers for swipe navigation with peek effect
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    
    // Limit drag distance to prevent excessive movement
    const maxDrag = 100;
    const limitedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    
    setDragOffset(limitedDiff);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && nextProject) {
        // Swipe left - next project
        handleNavigate(nextProject.id);
      } else if (distance < 0 && prevProject) {
        // Swipe right - previous project
        handleNavigate(prevProject.id);
      }
    }
    
    // Reset drag offset
    setDragOffset(0);
  };

  // Reset drag offset when project changes
  useEffect(() => {
    setDragOffset(0);
    setIsDragging(false);
  }, [projectId]);

  // Render project content
  const renderProject = (proj: typeof project, isActive: boolean = false) => {
    if (!proj) return null;
    
    return (
      <div className={`flex-shrink-0 w-full px-4 ${isActive ? '' : 'opacity-50'}`}>
        <div className="flex flex-col gap-3 w-full pb-10">
          {proj.coverImage && (
            <div 
              className="w-full rounded-xl overflow-hidden mb-6" 
              style={{
                aspectRatio: proj.ratio === "3x4" ? "3/4" : "4/3",
                minHeight: 230,
                background: "#EEE"
              }}
            >
              <img 
                src={proj.coverImage} 
                alt={`Portada de ${proj.title}`} 
                className="w-full h-full object-cover object-center" 
                draggable={false} 
              />
            </div>
          )}
          
          {showProjectHeader && isActive && (
            <div className="mb-6">
              <h1 className="font-helnow-regular text-3xl md:text-2xl font-normal text-stone-700">
                {proj.title}
              </h1>
              {proj.description && (
                <p className="font-helnow-regular text-base md:text-lg text-stone-500 mt-2">
                  {proj.description}
                </p>
              )}
              {(proj.client || proj.year) && (
                <div className="font-helnow-regular text-xs text-stone-400 mt-2 flex flex-row gap-3">
                  {proj.client && (
                    <span className="text-sm">
                      <span className="font-medium">Cliente:</span> {proj.client}
                    </span>
                  )}
                  {proj.client && proj.year && <span className="mx-2 text-sm">|</span>}
                  {proj.year && (
                    <span className="text-sm">
                      <span className="font-medium">Año:</span> {proj.year}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Content images - only show for active project */}
          {isActive && (
            <div className="flex flex-col gap-2">
              {proj.contentImages.map((img, i) => (
                <div 
                  key={i} 
                  className="w-full overflow-hidden" 
                  style={{ borderRadius: 8, background: "#EEE" }}
                >
                  <img 
                    src={img} 
                    alt={`Imagen del proyecto ${proj.title} ${i + 1}`} 
                    className="w-full h-auto object-cover object-center" 
                    draggable={false} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Mobile carousel with peek effect
  if (isMobile) {
    const visibleProjects = [];
    if (prevProject) visibleProjects.push(prevProject);
    visibleProjects.push(project);
    if (nextProject) visibleProjects.push(nextProject);

    return (
      <div className="relative w-full min-h-[70vh] select-none overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${prevProject ? 100 : 0}% + ${dragOffset}px))`,
            width: `${visibleProjects.length * 100}%`
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {visibleProjects.map((proj) => (
            <div key={proj.id} style={{ width: `${100 / visibleProjects.length}%` }}>
              {renderProject(proj, proj.id === projectId)}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 px-6">
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
      </div>
    );
  }

  // Desktop version (unchanged)
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
