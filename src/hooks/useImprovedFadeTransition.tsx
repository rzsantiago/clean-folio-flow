
import { useState, useEffect } from "react";

export function useImprovedFadeTransition(deps: any[], fadeMs = 500) {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    setIsVisible(false);
    
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
      setIsTransitioning(false);
    }, 50);

    return () => clearTimeout(showTimeout);
    // eslint-disable-next-line
  }, deps);

  const transitionStyle = {
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${fadeMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    pointerEvents: isTransitioning ? 'none' as const : 'auto' as const
  };

  return {
    transitionStyle,
    isVisible,
    isTransitioning
  };
}
