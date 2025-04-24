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
import { ImageUploader } from "./ImageUploader";

export type AddProjectFormData = {
  title: string;
  description: string;
  category: string;
  year: string;
  ratio: "3x4" | "4x3";
  client?: string;
  coverColor?: string;
  coverImage?: string;
  contentImages?: string; // Usaremos un textarea de URLs separadas por salto de línea
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
  "Other",
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
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<AddProjectFormData>({
    defaultValues: {
      ratio: "4x3",
      coverColor: "#D6BCFA",
    }
  });

  const coverImage = watch("coverImage");
  
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
            <Label htmlFor="ratio">Ratio</Label>
            <select
              id="ratio"
              className="w-full border border-input rounded-md px-3 py-2 text-base bg-background"
              {...register("ratio", { required: "Selecciona el ratio" })}
            >
              <option value="4x3">4x3</option>
              <option value="3x4">3x4</option>
            </select>
            {errors.ratio && <span className="text-destructive text-xs">{errors.ratio.message}</span>}
          </div>
          <div>
            <Label htmlFor="client">Cliente <span className="text-muted-foreground text-xs">(opcional)</span></Label>
            <Input
              id="client"
              {...register("client")}
              placeholder="Nombre del cliente (opcional)"
            />
          </div>
          <div>
            <Label htmlFor="coverColor">Color de portada <span className="text-muted-foreground text-xs">(hex ej. #D6BCFA)</span></Label>
            <Input
              id="coverColor"
              type="color"
              {...register("coverColor")}
              className="h-10 w-16 p-1"
              defaultValue="#D6BCFA"
              title="Color de portada"
            />
          </div>
          <div>
            <Label>Imagen de portada</Label>
            <ImageUploader
              onChange={(url) => setValue("coverImage", url)}
              initialImage={coverImage}
            />
          </div>
          <div>
            <Label>Imágenes de contenido <span className="text-muted-foreground text-xs">(sube las imágenes y las URLs se agregarán automáticamente)</span></Label>
            <ImageUploader
              onChange={(url) => {
                const current = watch("contentImages") || "";
                const images = current ? current.split("\n").filter(Boolean) : [];
                images.push(url);
                setValue("contentImages", images.join("\n"));
              }}
            />
            <Textarea
              {...register("contentImages")}
              placeholder="Las URLs de las imágenes aparecerán aquí"
              rows={3}
              className="mt-2"
            />
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Agregando..." : "Agregar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
