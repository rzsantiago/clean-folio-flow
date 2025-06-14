
import { MainSection } from "@/components/MainContent";
import { Project } from "@/data/projects";

export function useProjectNavigation(
  main: MainSection,
  setMain: (val: MainSection) => void,
  projects: Project[]
) {
  const activeCategory = (main.type === "gallery")
    ? main.filter
    : (main.type === "project" ? main.fromFilter : null);

  // Obtener índices para navegación
  const filteredProjects = activeCategory 
    ? projects.filter(p => p.category === activeCategory) 
    : projects;
    
  const currentProjectIndex = main.type === "project" 
    ? filteredProjects.findIndex(p => p.id === main.id) 
    : -1;
    
  const prevProject = currentProjectIndex > 0 ? filteredProjects[currentProjectIndex - 1] : null;
  const nextProject = currentProjectIndex >= 0 && currentProjectIndex < filteredProjects.length - 1 
    ? filteredProjects[currentProjectIndex + 1] 
    : null;

  // Para navegación entre proyectos
  const handleProjectNavigation = (direction: 'prev' | 'next') => {
    if (main.type !== 'project') return;
    
    const targetProject = direction === 'prev' ? prevProject : nextProject;
    if (targetProject) {
      setMain({ 
        type: "project", 
        id: targetProject.id, 
        fromFilter: main.fromFilter 
      });
    }
  };

  return {
    activeCategory,
    prevProject,
    nextProject,
    handleProjectNavigation
  };
}
