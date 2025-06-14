
import { useState } from "react";
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
    if (touchStart - touchEnd > minSwipeDistance) {
      // Swipe izquierda - Siguiente proyecto
      if (nextProject) handleProjectNavigation('next');
    }
    
    if (touchEnd - touchStart > minSwipeDistance) {
      // Swipe derecha - Proyecto anterior
      if (prevProject) handleProjectNavigation('prev');
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
}
