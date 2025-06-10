
import { useState, useRef, useCallback } from 'react';

export interface SwipeState {
  isActive: boolean;
  progress: number; // 0 to 1
  direction: 'left' | 'right' | null;
  velocity: number;
}

interface UseInteractiveSwipeProps {
  onSwipeComplete: (direction: 'left' | 'right') => void;
  threshold?: number; // Percentage of screen width to trigger
  enabled?: boolean;
}

export function useInteractiveSwipe({
  onSwipeComplete,
  threshold = 0.3,
  enabled = true
}: UseInteractiveSwipeProps) {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isActive: false,
    progress: 0,
    direction: null,
    velocity: 0
  });

  const startX = useRef(0);
  const currentX = useRef(0);
  const startTime = useRef(0);
  const screenWidth = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;
    
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    startTime.current = Date.now();
    screenWidth.current = window.innerWidth;
    
    setSwipeState({
      isActive: true,
      progress: 0,
      direction: null,
      velocity: 0
    });
  }, [enabled]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || !swipeState.isActive) return;
    
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    const progress = Math.abs(deltaX) / screenWidth.current;
    const direction = deltaX > 0 ? 'right' : 'left';
    
    // Limit progress to 1
    const clampedProgress = Math.min(progress, 1);
    
    setSwipeState(prev => ({
      ...prev,
      progress: clampedProgress,
      direction: Math.abs(deltaX) > 10 ? direction : null
    }));
  }, [enabled, swipeState.isActive]);

  const handleTouchEnd = useCallback(() => {
    if (!enabled || !swipeState.isActive) return;
    
    const deltaX = currentX.current - startX.current;
    const progress = Math.abs(deltaX) / screenWidth.current;
    const velocity = Math.abs(deltaX) / (Date.now() - startTime.current);
    
    // Determine if swipe should complete based on progress or velocity
    const shouldComplete = progress >= threshold || velocity > 0.5;
    
    if (shouldComplete && swipeState.direction) {
      onSwipeComplete(swipeState.direction);
    }
    
    // Reset state
    setSwipeState({
      isActive: false,
      progress: 0,
      direction: null,
      velocity: 0
    });
  }, [enabled, swipeState.isActive, swipeState.direction, threshold, onSwipeComplete]);

  return {
    swipeState,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
}
