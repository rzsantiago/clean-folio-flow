
import React from "react";
import { useProjects } from "@/hooks/useProjects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useImprovedFadeTransition } from "@/hooks/useImprovedFadeTransition"; // Import the hook

type Props = {
  projectId: string;
  onNavigate: (id: string) => void;
  prevId?: string | null; // This prop seems unused, consider removing if not needed later
  nextId?: string | null; // This prop seems unused, consider removing if not needed later
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

  // Use the fade transition hook
  const { transitionStyle } = useImprovedFadeTransition([projectId], 600);

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
          behavior: "smooth" // Changed to smooth for navigation, can be 'auto' if instant is preferred
        });
    }, 10); // Small delay to allow content to start rendering
    }
  };

  return (
    <div 
      className={`relative w-full min-h-[70vh] select-none px-0 ${isMobile ? '' : 'pl-4'}`}
      style={transitionStyle} // Apply transition style
    >
      <div className="flex flex-col gap-3 w-full pb-10 md:pl-6 md:pr-6">
        {project.coverImage && <div className="w-full rounded-xl overflow-hidden mb-6" style={{
        aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3",
        minHeight: 230,
        background: "#EEE"
      }}>
            <img src={project.coverImage} alt={`Portada de ${project.title}`} className="w-full h-full object-cover object-center" draggable={false} />
          </div>}
        
        {showProjectHeader && <div className="mb-6">
            <h1 className="font-helnow-regular text-3xl md:text-2xl font-normal text-stone-700">
              {project.title}
            </h1>
            {project.description && <p className="font-helnow-regular text-base text-stone-500 mt-2"> {/* Adjusted md:text-lg to text-base to match client/year */}
                {project.description}
              </p>}
            {(project.client || project.year) && <div className="font-helnow-regular text-xs text-stone-400 mt-2 flex flex-row gap-3 items-baseline"> {/* Added items-baseline */}
                {project.client && <span className="text-sm">
                    <span className="font-medium">Cliente:</span> {project.client}
                  </span>}
                {project.client && project.year && <span className="mx-1 text-sm">|</span>} {/* Adjusted margin */}
                {project.year && <span className="text-sm">
                    <span className="font-medium">Año:</span> {project.year}
                  </span>}
              </div>}
          </div>}

        <div className="flex flex-col gap-2">
          {project.contentImages.map((img, i) => <div key={i} style={{
          borderRadius: 8,
          width: "100%",
          minHeight: 220,
          aspectRatio: project.ratio === "3x4" ? "3/4" : "4/3", // Consider making this dynamic based on image metadata if available
          margin: "0",
          background: "#EEE"
        }} className="w-full overflow-hidden">
              <img src={img} alt={`Imagen del proyecto ${project.title} ${i + 1}`} className="w-full h-full object-cover object-center" draggable={false} />
            </div>)}
        </div>

        {/* Botones de navegación para mobile */}
        {isMobile && (prevProject || nextProject) && <div className="flex justify-between mt-8 px-2"> {/* Conditionally render if there's a prev or next */}
            <button onClick={() => prevProject && handleNavigate(prevProject.id)} disabled={!prevProject} className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed p-2" aria-label="Proyecto anterior"> {/* Added padding for better touch target */}
              <ArrowLeft size={22} />
            </button>
            
            <button onClick={() => nextProject && handleNavigate(nextProject.id)} disabled={!nextProject} className="text-stone-500 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed p-2" aria-label="Proyecto siguiente"> {/* Added padding */}
              <ArrowRight size={22} />
            </button>
          </div>}
      </div>
    </div>
  );
}

