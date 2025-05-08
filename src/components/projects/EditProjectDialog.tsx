
import React from "react";
import { toast } from "@/hooks/use-toast";
import { ProjectForm } from "./ProjectForm";
import { ProjectDialog } from "./ProjectDialog";
import { AddProjectFormData } from "@/types/projects";
import type { Project } from "@/data/projects";

type EditProjectDialogProps = {
  project: Project | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: AddProjectFormData, projectId: string) => void;
};

export default function EditProjectDialog({
  project,
  open,
  setOpen,
  onSubmit,
}: EditProjectDialogProps) {
  if (!project) return null;

  function handleSubmit(data: AddProjectFormData) {
    onSubmit(data, project.id);
    toast({
      title: "Proyecto actualizado",
      description: `El proyecto "${data.title}" ha sido actualizado.`,
    });
    setOpen(false);
  }

  // Convert Project to AddProjectFormData for form
  const defaultValues: AddProjectFormData = {
    title: project.title,
    description: project.description,
    category: project.category,
    year: project.year?.toString() || "",
    ratio: project.ratio,
    client: project.client || "",
    coverColor: project.coverColor || "#D6BCFA",
    coverImage: project.coverImage || "",
    contentImages: project.contentImages.join("\n"),
  };

  return (
    <ProjectDialog
      title="Editar proyecto"
      open={open}
      setOpen={setOpen}
      onSubmit={() => {}} // Form handles submission
      submitButtonText="Guardar cambios"
    >
      <ProjectForm 
        defaultValues={defaultValues} 
        onSubmit={handleSubmit} 
      />
    </ProjectDialog>
  );
}
