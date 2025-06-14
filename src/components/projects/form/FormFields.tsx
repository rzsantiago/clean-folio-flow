
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/ImageUploader";
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { AddProjectFormData } from "@/types/projects";
import { ContentMixedField } from './ContentMixedField';
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
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-slate-700">
          Título del Proyecto
        </Label>
        <Input
          id="title"
          {...register("title", { required: "Título requerido" })}
          placeholder="Nombre del proyecto"
          autoFocus
          className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium text-slate-700">
          Categoría
        </Label>
        <select
          id="category"
          className="w-full h-11 border border-slate-300 rounded-md px-3 py-2 text-base bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 focus:outline-none"
          {...register("category", { required: "Seleccione una categoría" })}
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map((cat) => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="year" className="text-sm font-medium text-slate-700">
          Año
        </Label>
        <Input
          id="year"
          type="number"
          min="1900"
          max="2099"
          {...register("year", { required: "Año requerido" })}
          placeholder="ej. 2024"
          className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
        />
        {errors.year && <span className="text-red-500 text-xs">{errors.year.message}</span>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="client" className="text-sm font-medium text-slate-700">
          Cliente <span className="text-slate-400 text-xs font-normal">(opcional)</span>
        </Label>
        <Input
          id="client"
          {...register("client")}
          placeholder="Nombre del cliente"
          className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900"
        />
      </div>
    </>
  );
}

export function CoverFields({ setValue, watch }: FormFieldProps) {
  const coverImage = watch("coverImage");
  
  return (
    <div className="space-y-2 md:col-span-2">
      <Label className="text-sm font-medium text-slate-700">
        Imagen de Portada
      </Label>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
        <ImageUploader
          onChange={(url) => setValue("coverImage", url)}
          initialImage={coverImage}
        />
      </div>
    </div>
  );
}

export function ContentImagesField({ setValue, watch }: FormFieldProps) {
  return (
    <div className="space-y-4">
      <ContentMixedField setValue={setValue} watch={watch} />
    </div>
  );
}

export function DescriptionField({ register, errors }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-sm font-medium text-slate-700">
        Descripción del Proyecto
      </Label>
      <Textarea
        id="description"
        {...register("description", { required: "Descripción requerida" })}
        placeholder="Describe brevemente el proyecto, su propósito y características principales..."
        rows={4}
        className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 resize-none"
      />
      {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
    </div>
  );
}
