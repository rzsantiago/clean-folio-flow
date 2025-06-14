
import { useState, useEffect } from "react";
import { Project } from "@/data/projects";

type Props = {
  projectId: string;
  prevProject: Project | null;
  nextProject: Project | null;
  onNavigate: (id: string) => void;
};

export function useProjectTouchNavigation({ 
  projectId, 
  prevProject, 
  nextProject, 
  onNavigate 
}: Props) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

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

  return {
    dragOffset,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
}
