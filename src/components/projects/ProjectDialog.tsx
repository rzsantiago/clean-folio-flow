
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

type ProjectDialogProps = {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
  children: React.ReactNode;
  submitButtonText: string;
};

export function ProjectDialog({
  title,
  open,
  setOpen,
  onSubmit,
  children,
  submitButtonText,
}: ProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-screen sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-10rem)] pr-4">
          {children}
        </ScrollArea>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="project-form">
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
