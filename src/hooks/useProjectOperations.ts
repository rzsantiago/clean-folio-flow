
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AddProjectFormData } from "@/types/projects";
import { mapFormDataToDb, mapDbToUiProject, SupabaseProject } from "@/utils/projectMappers";
import type { Project } from "@/data/projects";

export function useProjectOperations(initialProjects: Project[] = []) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      toast({
        title: "Error al cargar proyectos",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    const uiProjects = (data as SupabaseProject[]).map(mapDbToUiProject);
    setProjects(uiProjects);
    setLoading(false);
    return uiProjects;
  }

  async function handleAddProject(data: AddProjectFormData) {
    const payload = mapFormDataToDb(data);

    const { data: createdArr, error } = await supabase
      .from("projects")
      .insert([payload])
      .select();

    if (error) {
      toast({
        title: "Error al agregar proyecto",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    // The response is an array; grab the first item.
    const created = (createdArr && createdArr[0]) as SupabaseProject | undefined;

    if (!created) {
      toast({
        title: "Error al agregar proyecto",
        description: "No se pudo recibir el proyecto creado.",
        variant: "destructive"
      });
      return;
    }

    setProjects((prev) => [...prev, mapDbToUiProject(created)]);
    toast({
      title: "Proyecto agregado",
      description: `El proyecto "${created.title}" fue agregado correctamente.`,
    });
  }

  async function handleEditProject(data: AddProjectFormData, projectId: string) {
    const payload = mapFormDataToDb(data);

    // Convert the string projectId to a number for the database query
    const numericProjectId = parseInt(projectId, 10);
    if (isNaN(numericProjectId)) {
      toast({
        title: "Error al actualizar proyecto",
        description: "ID del proyecto inválido",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", numericProjectId);

    if (error) {
      toast({
        title: "Error al actualizar proyecto",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    // Actualizar el estado local
    setProjects(prev => 
      prev.map(p => p.id === projectId ? {
        ...p,
        ...data,
        id: projectId,
        coverColor: data.coverColor || p.coverColor,
        coverImage: data.coverImage || p.coverImage,
        contentImages: data.contentImages ? data.contentImages.split("\n").filter(Boolean) : p.contentImages,
      } : p)
    );

    toast({
      title: "Proyecto actualizado",
      description: `El proyecto "${data.title}" fue actualizado correctamente.`,
    });
  }

  async function handleDeleteProject(projectId: string) {
    // Convert the string projectId to a number for the database query
    const numericProjectId = parseInt(projectId, 10);
    if (isNaN(numericProjectId)) {
      toast({
        title: "Error al eliminar proyecto",
        description: "ID del proyecto inválido",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", numericProjectId);

    if (error) {
      toast({
        title: "Error al eliminar proyecto",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    // Actualizar el estado local
    setProjects(prev => prev.filter(p => p.id !== projectId));
    
    toast({
      title: "Proyecto eliminado",
      description: "El proyecto fue eliminado correctamente.",
    });
  }

  function handleEdit(project: Project) {
    setSelectedProject(project);
  }

  return {
    projects,
    loading,
    selectedProject,
    setSelectedProject,
    fetchProjects,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleEdit
  };
}
