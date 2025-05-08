
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { AddProjectFormData } from "@/types/projects";

export const CATEGORIES = [
  "Industrial Design",
  "Graphics",
  "CGI",
  "Other",
];

type ProjectFormProps = {
  defaultValues?: Partial<AddProjectFormData>;
  onSubmit: (data: AddProjectFormData) => void;
  isSubmitting?: boolean;
};

export function ProjectForm({ defaultValues, onSubmit, isSubmitting = false }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<AddProjectFormData>({
    defaultValues: defaultValues || {
      ratio: "4x3",
      coverColor: "#D6BCFA",
    }
  });

  const coverImage = watch("coverImage");
  const contentImagesString = watch("contentImages") || "";
  const contentImagesList = contentImagesString.split("\n").filter(Boolean);
  
  function internalSubmit(data: AddProjectFormData) {
    onSubmit(data);
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...contentImagesList];
    updatedImages.splice(index, 1);
    setValue("contentImages", updatedImages.join("\n"));
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const updatedImages = [...contentImagesList];
    if (direction === "up" && index > 0) {
      // Intercambiar con la imagen anterior
      [updatedImages[index], updatedImages[index - 1]] = [updatedImages[index - 1], updatedImages[index]];
    } else if (direction === "down" && index < updatedImages.length - 1) {
      // Intercambiar con la imagen siguiente
      [updatedImages[index], updatedImages[index + 1]] = [updatedImages[index + 1], updatedImages[index]];
    }
    setValue("contentImages", updatedImages.join("\n"));
  };
  
  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-4">
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
        <Label>Imágenes de contenido</Label>
        <ImageUploader
          onChange={(url) => {
            const current = watch("contentImages") || "";
            const images = current ? current.split("\n").filter(Boolean) : [];
            images.push(url);
            setValue("contentImages", images.join("\n"));
          }}
        />
        
        <ContentImageList 
          images={contentImagesList}
          onRemove={handleRemoveImage}
          onMove={handleMoveImage}
        />
        
        {/* Mantener el textarea original pero oculto visualmente */}
        <Textarea
          {...register("contentImages")}
          className="hidden"
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
      
      <Button type="submit" className="hidden" disabled={isSubmitting}>
        {isSubmitting ? "Procesando..." : "Enviar"}
      </Button>
    </form>
  );
}

type ContentImageListProps = {
  images: string[];
  onRemove: (index: number) => void;
  onMove: (index: number, direction: "up" | "down") => void;
};

function ContentImageList({ images, onRemove, onMove }: ContentImageListProps) {
  if (!images.length) return null;
  
  return (
    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((img, index) => (
        <div key={index} className="relative group">
          <div className="aspect-square w-full overflow-hidden rounded-md">
            <img 
              src={img} 
              alt={`Imagen de contenido ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button"
              variant="destructive" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button"
              variant="secondary" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => onMove(index, "up")}
              disabled={index === 0}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button 
              type="button"
              variant="secondary" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => onMove(index, "down")}
              disabled={index === images.length - 1}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
