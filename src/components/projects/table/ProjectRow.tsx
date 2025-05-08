
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
};

export const ProjectRow = ({ project, onEdit, onDelete }: ProjectRowProps) => {
  return (
    <TableRow key={project.id} className="border-b last:border-b-0 hover:bg-stone-50">
      <TableCell>{project.title}</TableCell>
      <TableCell>{project.category}</TableCell>
      <TableCell>{project.year || "-"}</TableCell>
      <TableCell className="text-center">
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
