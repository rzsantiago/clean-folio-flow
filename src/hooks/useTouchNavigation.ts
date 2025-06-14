
import { useState, useEffect } from "react";
import { MainSection } from "@/components/MainContent";

export function useTouchNavigation() {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (
    main: MainSection,
    handleProjectNavigation: (direction: 'prev' | 'next') => void,
    prevProject: any,
    nextProject: any
  ) => {
    if (main.type !== 'project') return;

    const minSwipeDistance = 50;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    if (swipeDistance > 0) {
      // Swipe izquierda - Siguiente proyecto
      if (nextProject) handleProjectNavigation('next');
    } else {
      // Swipe derecha - Proyecto anterior  
      if (prevProject) handleProjectNavigation('prev');
    }
  };

  // Enhanced touch navigation with better gesture detection
  const handleCarouselTouch = (
    main: MainSection,
    navigateToProject: (id: string) => void,
    projects: any[],
    currentIndex: number
  ) => {
    if (main.type !== 'project' || !projects.length) return;

    const minSwipeDistance = 75;
    const swipeDistance = touchStart - touchEnd;
    
    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    let targetIndex = currentIndex;
    
    if (swipeDistance > 0 && currentIndex < projects.length - 1) {
      // Swipe left - next project
      targetIndex = currentIndex + 1;
    } else if (swipeDistance < 0 && currentIndex > 0) {
      // Swipe right - previous project
      targetIndex = currentIndex - 1;
    }

    if (targetIndex !== currentIndex && projects[targetIndex]) {
      navigateToProject(projects[targetIndex].id);
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleCarouselTouch
  };
}
