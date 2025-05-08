
import React from "react";
import { toast } from "@/hooks/use-toast";
import { ProjectForm } from "./ProjectForm";
import { ProjectDialog } from "./ProjectDialog";
import { AddProjectFormData } from "@/types/projects";

type AddProjectDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: AddProjectFormData) => void;
};

export default function AddProjectDialog({
  open,
  setOpen,
  onSubmit,
}: AddProjectDialogProps) {
  function handleSubmit(data: AddProjectFormData) {
    onSubmit(data);
    toast({
      title: "Proyecto agregado",
      description: `El proyecto "${data.title}" ha sido agregado.`,
    });
    setOpen(false);
  }

  return (
    <ProjectDialog
      title="Agregar nuevo proyecto"
      open={open}
      setOpen={setOpen}
      onSubmit={() => {}} // Form handles submission
      submitButtonText="Agregar"
    >
      <ProjectForm onSubmit={handleSubmit} />
    </ProjectDialog>
  );
}
