
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, GripVertical } from "lucide-react"; // Added GripVertical
import { TableCell, TableRow } from "@/components/ui/table";
import type { Project } from "@/data/projects";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type ProjectRowProps = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
};

export const ProjectRow = ({ project, onEdit, onDelete }: ProjectRowProps) => {
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
    position: 'relative' as 'relative', // Added to ensure zIndex works
  };

  return (
    <TableRow 
      ref={setNodeRef}
      style={style}
      className={`border-b last:border-b-0 hover:bg-stone-50 ${isDragging ? 'shadow-lg' : ''}`}
      data-testid={`project-row-${project.id}`}
    >
      <TableCell className="w-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="cursor-grab p-1"
          {...attributes} 
          {...listeners}
          aria-label="Reordenar proyecto"
        >
          <GripVertical className="w-5 h-5 text-stone-400" />
        </Button>
      </TableCell>
      <TableCell>{project.title}</TableCell>
      <TableCell>{project.category}</TableCell>
      <TableCell>{project.year || "-"}</TableCell>
      <TableCell className="text-right"> {/* Changed to text-right for consistency */}
        <Button 
          size="sm" 
          variant="secondary" 
          className="mr-2"
          onClick={() => onEdit(project)}
        >
          <Edit className="w-4 h-4 mr-1" />
          Editar
        </Button>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Borrar
        </Button>
      </TableCell>
    </TableRow>
  );
};
