
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/ImageUploader";
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { AddProjectFormData } from "@/types/projects";
import { ContentImageList } from './ContentImageList';
import { ContentImagesField as ContentImagesComponent } from './ContentImagesField';
import { CATEGORIES } from "../ProjectForm";

type FormFieldProps = {
  register: UseFormRegister<AddProjectFormData>;
  watch: UseFormWatch<AddProjectFormData>;
  setValue: UseFormSetValue<AddProjectFormData>;
  errors: FieldErrors<AddProjectFormData>;
};

export function BasicInfoFields({ register, errors }: FormFieldProps) {
  return (
    <>
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
    </>
  );
}

export function CoverFields({ register, setValue, watch }: FormFieldProps) {
  const coverImage = watch("coverImage");
  
  return (
    <>
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
    </>
  );
}

export function ContentImagesField({ register, setValue, watch }: FormFieldProps) {
  return <ContentImagesComponent register={register} setValue={setValue} watch={watch} />;
}

export function DescriptionField({ register, errors }: FormFieldProps) {
  return (
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
  );
}
