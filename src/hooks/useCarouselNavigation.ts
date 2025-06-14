
import { useState, useEffect } from "react";
import { MainSection } from "@/components/MainContent";
import { Project } from "@/data/projects";
import { CarouselApi } from "@/components/ui/carousel";

export function useCarouselNavigation(
  main: MainSection,
  setMain: (val: MainSection) => void,
  projects: Project[]
) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const activeCategory = (main.type === "gallery")
    ? main.filter
    : (main.type === "project" ? main.fromFilter : null);

  // Get filtered projects based on current context
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

  // Handle keyboard navigation
  useEffect(() => {
    if (main.type !== 'project') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevProject) {
        setMain({ 
          type: "project", 
          id: prevProject.id, 
          fromFilter: main.fromFilter 
        });
      } else if (e.key === 'ArrowRight' && nextProject) {
        setMain({ 
          type: "project", 
          id: nextProject.id, 
          fromFilter: main.fromFilter 
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [main, prevProject, nextProject, setMain]);

  // Carousel navigation handlers
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

  const navigateToProject = (projectId: string) => {
    if (main.type === 'project') {
      setMain({ 
        type: "project", 
        id: projectId, 
        fromFilter: main.fromFilter 
      });
    }
  };

  return {
    activeCategory,
    filteredProjects,
    currentProjectIndex,
    prevProject,
    nextProject,
    carouselApi,
    setCarouselApi,
    handleProjectNavigation,
    navigateToProject
  };
}
