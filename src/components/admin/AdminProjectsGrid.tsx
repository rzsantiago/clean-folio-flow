import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, GripVertical } from "lucide-react";
import type { Project } from "@/data/projects";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteConfirmDialog } from "@/components/projects/table";

type AdminProjectsGridProps = {
  projects: Project[];
  loading?: boolean;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onReorder: (projects: Project[]) => void;
};

const ProjectGridItem = ({ 
  project, 
  onEdit, 
  onDelete 
}: { 
  project: Project; 
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  // Usar thumbnailImage si existe, sino usar coverImage como fallback
  const displayImage = project.thumbnailImage || project.coverImage;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ${
        isDragging ? 'shadow-lg scale-105' : ''
      }`}
    >
      {/* Drag Handle */}
      <div 
        className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-md p-1">
          <GripVertical className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      {/* Project Image/Color */}
      <div 
        className="w-full h-32 relative"
        style={{
          background: displayImage ? undefined : (project.coverColor || "#E2E8F0"),
        }}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={project.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            <span className="text-sm font-medium">Sin imagen</span>
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="secondary" 
              className="bg-white/90 hover:bg-white text-slate-900"
              onClick={() => onEdit(project)}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              className="bg-red-500/90 hover:bg-red-500"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">
          {project.title}
        </h3>
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="bg-slate-100 px-2 py-1 rounded-md">
            {project.category}
          </span>
          {project.year && (
            <span>{project.year}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminProjectsGrid = ({ 
  projects: initialProjects, 
  loading, 
  onEdit, 
  onDelete,
  onReorder 
}: AdminProjectsGridProps) => {
  const [localProjects, setLocalProjects] = useState<Project[]>(initialProjects);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  React.useEffect(() => {
    setLocalProjects(initialProjects);
  }, [initialProjects]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLocalProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items;
        const reordered = arrayMove(items, oldIndex, newIndex);
        onReorder(reordered.map((p, index) => ({ ...p, display_order: index })));
        return reordered;
      });
    }
  };

  const handleDeleteClick = (projectId: string) => setDeleteConfirm(projectId);
  
  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  if (loading && localProjects.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-slate-200 rounded-xl h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!loading && localProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-slate-400 text-6xl mb-4">📁</div>
        <h3 className="text-lg font-semibold text-slate-600 mb-2">
          No hay proyectos
        </h3>
        <p className="text-slate-500">
          Agrega tu primer proyecto para comenzar
        </p>
      </div>
    );
  }

  const projectIds = localProjects.map(p => p.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={projectIds} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {localProjects.map((project) => (
            <ProjectGridItem
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      </SortableContext>

      <DeleteConfirmDialog 
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
      />
    </DndContext>
  );
};

export default AdminProjectsGrid;
