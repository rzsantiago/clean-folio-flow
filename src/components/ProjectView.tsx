
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
  showProjectHeader
}: Props) {
  const { data: projects = [] } = useProjects();
  const isMobile = useIsMobile();
  const [api, setApi] = React.useState<CarouselApi>();
  
  const project = projects.find(p => p.id === projectId);
  
  // Now it's safe to have the early return AFTER all hooks are declared
  if (!project) return null;

  // Find category projects and current index
  const categoryProjects = projects.filter(p => p.category === project.category);
  const currentIndex = categoryProjects.findIndex(p => p.id === projectId);
  const prevProject = currentIndex > 0 ? categoryProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < categoryProjects.length - 1 ? categoryProjects[currentIndex + 1] : null;

  // Set carousel to current project when API is ready
  useEffect(() => {
    if (api && currentIndex >= 0) {
      api.scrollTo(currentIndex, false);
    }
  }, [api, currentIndex]);

  // Handle carousel selection changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const selectedProject = categoryProjects[selectedIndex];
      if (selectedProject && selectedProject.id !== projectId) {
        onNavigate(selectedProject.id);
      }
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, categoryProjects, projectId, onNavigate]);

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

  return (
    <div className="relative w-full min-h-[70vh] select-none px-0">
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
          {categoryProjects.map((proj, index) => (
            <CarouselItem key={proj.id} className="pl-4 basis-full">
              <div className="flex flex-col gap-3 w-full pb-10 px-0">
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
                
                {showProjectHeader && (
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

                <div className="flex flex-col gap-2">
                  {proj.contentImages.map((img, i) => (
                    <div key={i} className="w-full overflow-hidden" style={{ borderRadius: 8, background: "#EEE" }}>
                      <img 
                        src={img} 
                        alt={`Imagen del proyecto ${proj.title} ${i + 1}`} 
                        className="w-full h-auto object-cover object-center" 
                        draggable={false} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation indicators */}
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

      {/* Mobile navigation buttons */}
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
  );
}
