
import React from "react";
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

type AddProjectDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: AddProjectFormData) => void;
};

export type { AddProjectFormData } from "@/types/projects";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo proyecto</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-10rem)] pr-4">
          <ProjectForm onSubmit={handleSubmit} />
        </ScrollArea>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="project-form">
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
