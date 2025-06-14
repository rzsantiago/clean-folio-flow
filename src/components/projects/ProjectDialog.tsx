
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
      <DialogContent className="max-w-4xl max-h-[95vh] w-[95vw] p-0 bg-gradient-to-br from-slate-50 to-white">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="py-2">
            {children}
          </div>
        </ScrollArea>
        
        <div className="sticky bottom-0 z-10 bg-white/80 backdrop-blur-sm border-t border-slate-200 p-6">
          <DialogFooter className="gap-3">
            <DialogClose asChild>
              <Button 
                type="button" 
                variant="outline"
                className="px-6 hover:bg-slate-50"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              form="project-form"
              className="px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
            >
              {submitButtonText}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
