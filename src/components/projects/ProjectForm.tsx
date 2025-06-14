
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
    <form id="project-form" onSubmit={handleSubmit(internalSubmit)} className="space-y-4">
      <BasicInfoFields 
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
      
      <CoverFields 
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
      
      <ContentImagesField 
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
      
      <DescriptionField 
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
      
      <Button type="submit" className="hidden" disabled={isSubmitting}>
        {isSubmitting ? "Procesando..." : "Enviar"}
      </Button>
    </form>
  );
}
