
import React from 'react';
import ProjectView from './ProjectView';
import { Project } from '@/data/projects';
import { useInteractiveSwipe } from '@/hooks/useInteractiveSwipe';

interface Props {
  currentProject: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  onNavigate: (id: string) => void;
  fromFilter: string | null;
}

export default function InteractiveProjectSwipe({
  currentProject,
  prevProject,
  nextProject,
  onNavigate,
  fromFilter
}: Props) {
  const { swipeState, handlers } = useInteractiveSwipe({
    onSwipeComplete: (direction) => {
      if (direction === 'right' && prevProject) {
        onNavigate(prevProject.id);
      } else if (direction === 'left' && nextProject) {
        onNavigate(nextProject.id);
      }
    },
    threshold: 0.25,
    enabled: true
  });

  const getTransform = (isPreview: boolean, direction: 'left' | 'right') => {
    if (!swipeState.isActive || !swipeState.direction) return 'translateX(0)';
    
    const progress = swipeState.progress;
    const baseOffset = direction === 'left' ? 100 : -100;
    
    if (isPreview) {
      // Preview slides in from the side
      return `translateX(${baseOffset * (1 - progress)}%)`;
    } else {
      // Current project slides out
      const currentOffset = swipeState.direction === 'left' ? -progress * 100 : progress * 100;
      return `translateX(${currentOffset}%)`;
    }
  };

  const getOpacity = (isPreview: boolean) => {
    if (!swipeState.isActive) return isPreview ? 0 : 1;
    return isPreview ? swipeState.progress * 0.8 : 1 - swipeState.progress * 0.3;
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      {...handlers}
    >
      {/* Current Project */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: getTransform(false, 'left'),
          opacity: getOpacity(false),
          zIndex: swipeState.isActive ? 1 : 2
        }}
      >
        <ProjectView
          projectId={currentProject.id}
          onNavigate={onNavigate}
          showProjectHeader
        />
      </div>

      {/* Previous Project Preview (swipe right) */}
      {prevProject && swipeState.direction === 'right' && (
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: getTransform(true, 'right'),
            opacity: getOpacity(true),
            zIndex: 2
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <ProjectView
              projectId={prevProject.id}
              onNavigate={onNavigate}
              showProjectHeader
            />
          </div>
        </div>
      )}

      {/* Next Project Preview (swipe left) */}
      {nextProject && swipeState.direction === 'left' && (
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: getTransform(true, 'left'),
            opacity: getOpacity(true),
            zIndex: 2
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <ProjectView
              projectId={nextProject.id}
              onNavigate={onNavigate}
              showProjectHeader
            />
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {swipeState.isActive && swipeState.progress > 0.1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
            <div className="w-16 h-1 bg-gray-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gray-600 transition-all duration-100"
                style={{ width: `${swipeState.progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
