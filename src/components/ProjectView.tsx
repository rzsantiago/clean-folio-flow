
import React from "react";
import { useProjects } from "@/hooks/useProjects";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileProjectCarousel from "./project/MobileProjectCarousel";
import DesktopProjectView from "./project/DesktopProjectView";

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
  const project = projects.find(p => p.id === projectId);
  const isMobile = useIsMobile();
  
  if (!project) return null;

  // Find prev/next project
  const categoryProjects = projects.filter(p => p.category === project.category);
  const idx = categoryProjects.findIndex(p => p.id === projectId);
  const prevProject = idx > 0 ? categoryProjects[idx - 1] : null;
  const nextProject = idx >= 0 && idx < categoryProjects.length - 1 ? categoryProjects[idx + 1] : null;

  // Mobile carousel with peek effect
  if (isMobile) {
    return (
      <MobileProjectCarousel
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        projectId={projectId}
        onNavigate={onNavigate}
        showProjectHeader={showProjectHeader}
      />
    );
  }

  // Desktop version
  return (
    <DesktopProjectView 
      project={project} 
      showProjectHeader={showProjectHeader} 
    />
  );
}
