
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

export type AddProjectFormData = {
  title: string;
  description: string;
  category: string;
  year: string;
};

type AddProjectDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: AddProjectFormData) => void;
};

const CATEGORIES = [
  "Industrial Design",
  "Graphics",
  "CGI",
  "Other"
];

export default function AddProjectDialog({
  open,
  setOpen,
  onSubmit,
}: AddProjectDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AddProjectFormData>();

  function internalSubmit(data: AddProjectFormData) {
    onSubmit(data);
    toast({
      title: "Proyecto agregado",
      description: `El proyecto "${data.title}" ha sido agregado.`,
    });
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(internalSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Agregar nuevo proyecto</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              {...register("title", { required: "Título requerido" })}
              placeholder="Escribe el título"
              autoFocus
            />
            {errors.title && <span className="text-destructive text-xs">{errors.title.message}</span>}
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <select
              id="category"
              className="w-full border border-input rounded-md px-3 py-2 text-base bg-background"
              {...register("category", { required: "Seleccione una categoría" })}
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map((cat) => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="text-destructive text-xs">{errors.category.message}</span>}
          </div>
          <div>
            <Label htmlFor="year">Año</Label>
            <Input
              id="year"
              type="number"
              min="1900"
              max="2099"
              {...register("year", { required: "Año requerido" })}
              placeholder="ej. 2024"
            />
            {errors.year && <span className="text-destructive text-xs">{errors.year.message}</span>}
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Descripción requerida" })}
              placeholder="Describe brevemente el proyecto"
              rows={3}
            />
            {errors.description && <span className="text-destructive text-xs">{errors.description.message}</span>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
