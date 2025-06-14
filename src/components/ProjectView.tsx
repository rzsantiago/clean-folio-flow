
import React, { useEffect } from "react";
import { useProjects } from "@/hooks/useProjects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";

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
  showProjectHeader = false
}: Props) {
  const { data: projects = [] } = useProjects();
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  
  console.log("ProjectView render:", { projectId, projectsLength: projects.length });
  
  // Always call all hooks first
  const project = React.useMemo(() => {
    return projects.find(p => p.id === projectId) || null;
  }, [projects, projectId]);
  
  const categoryProjects = React.useMemo(() => {
    if (!project) return [];
    return projects.filter(p => p.category === project.category);
  }, [project, projects]);
  
  const currentIndex = React.useMemo(() => {
    if (!project) return -1;
    return categoryProjects.findIndex(p => p.id === projectId);
  }, [project, categoryProjects, projectId]);
  
  const prevProject = React.useMemo(() => {
    return currentIndex > 0 ? categoryProjects[currentIndex - 1] : null;
  }, [categoryProjects, currentIndex]);
  
  const nextProject = React.useMemo(() => {
    return currentIndex >= 0 && currentIndex < categoryProjects.length - 1 
      ? categoryProjects[currentIndex + 1] 
      : null;
  }, [categoryProjects, currentIndex]);

  // Set carousel to current project when API is ready
  useEffect(() => {
    if (api && currentIndex >= 0) {
      console.log("Setting carousel to index:", currentIndex);
      api.scrollTo(currentIndex, false);
    }
  }, [api, currentIndex]);

  // Handle carousel selection changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const selectedProject = categoryProjects[selectedIndex];
      console.log("Carousel selected:", { selectedIndex, projectId: selectedProject?.id });
      
      if (selectedProject && selectedProject.id !== projectId) {
        onNavigate(selectedProject.id);
      }
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, categoryProjects, projectId, onNavigate]);

  const handleNavigate = React.useCallback((id: string) => {
    console.log("Navigate to project:", id);
    onNavigate(id);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 10);
    }
  }, [onNavigate]);

  // Only return after all hooks have been called
  if (!project) {
    console.log("Project not found:", projectId);
    return (
      <div className="relative w-full min-h-[70vh] flex items-center justify-center text-stone-500">
        <p>Proyecto no encontrado</p>
      </div>
    );
  }

  console.log("Rendering project:", { 
    projectTitle: project.title, 
    categoryProjectsCount: categoryProjects.length,
    currentIndex 
  });

  return (
    <div className="relative w-full min-h-[70vh] select-none px-0">
      {categoryProjects.length > 1 ? (
        <Carousel 
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: false,
            skipSnaps: false
          }}
        >
          <CarouselContent className="-ml-4">
            {categoryProjects.map((proj) => (
              <CarouselItem key={proj.id} className="pl-4 basis-full">
                <ProjectContent project={proj} showProjectHeader={showProjectHeader} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <ProjectContent project={project} showProjectHeader={showProjectHeader} />
      )}

      {/* Navigation indicators - only show if more than one project */}
      {categoryProjects.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {categoryProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? "bg-stone-700 scale-125" 
                  : "bg-stone-300 hover:bg-stone-400"
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile navigation buttons - only show if more than one project */}
      {isMobile && categoryProjects.length > 1 && (
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
  );
}

// Separate component for project content to avoid repetition
function ProjectContent({ project, showProjectHeader }: { 
  project: any; 
  showProjectHeader: boolean; 
}) {
  return (
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

      <div className="flex flex-col gap-2">
        {project.contentImages?.map((img: string, i: number) => (
          <div key={i} className="w-full overflow-hidden" style={{ borderRadius: 8, background: "#EEE" }}>
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
  );
}
