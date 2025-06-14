
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AddProjectFormData } from "@/types/projects";
import {
  BasicInfoFields,
  CoverFields,
  ContentImagesField,
  DescriptionField
} from "./form/FormFields";

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
      coverColor: "#D6BCFA",
      contentItems: []
    }
  });
  
  function internalSubmit(data: AddProjectFormData) {
    onSubmit(data);
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <form id="project-form" onSubmit={handleSubmit(internalSubmit)} className="space-y-8">
        {/* Información básica en grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Información del Proyecto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BasicInfoFields 
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          </div>
        </div>

        {/* Portada en grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Portada del Proyecto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CoverFields 
              register={register}
              watch={watch}
              setValue={setValue}
              errors={errors}
            />
          </div>
        </div>

        {/* Contenido del proyecto */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Contenido del Proyecto
          </h3>
          <ContentImagesField 
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>

        {/* Descripción */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            Descripción
          </h3>
          <DescriptionField 
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>
        
        <Button type="submit" className="hidden" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Enviar"}
        </Button>
      </form>
    </div>
  );
}
