
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ProjectForm } from "./projects/ProjectForm";
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Editar proyecto</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-10rem)] pr-4">
          <ProjectForm 
            defaultValues={defaultValues} 
            onSubmit={handleSubmit} 
          />
        </ScrollArea>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="project-form">
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
