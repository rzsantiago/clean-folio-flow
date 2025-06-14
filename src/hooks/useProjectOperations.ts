
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AddProjectFormData } from "@/types/projects";
import { mapFormDataToDb, mapDbToUiProject, SupabaseProject } from "@/utils/projectMappers";
import type { Project } from "@/data/projects";

export function useProjectOperations(initialProjects: Project[] = []) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
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
    
    // Cast the data to SupabaseProject type since we know the structure
    const uiProjects = (data as unknown as SupabaseProject[]).map(mapDbToUiProject);
    setProjects(uiProjects);
    setLoading(false);
    return uiProjects;
  }, []);

  async function handleAddProject(data: AddProjectFormData) {
    const payload = mapFormDataToDb(data);

    // Determine the next display_order
    const maxOrder = projects.reduce((max, p) => Math.max(max, p.display_order || 0), 0);
    const nextDisplayOrder = maxOrder + 1;

    const payloadWithOrder = { ...payload, display_order: nextDisplayOrder };

    const { data: createdArr, error } = await supabase
      .from("projects")
      .insert([payloadWithOrder])
      .select();

    if (error) {
      toast({
        title: "Error al agregar proyecto",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    const created = (createdArr && createdArr[0]) as unknown as SupabaseProject | undefined;

    if (!created) {
      toast({
        title: "Error al agregar proyecto",
        description: "No se pudo recibir el proyecto creado.",
        variant: "destructive"
      });
      return;
    }
    
    setProjects((prev) => [...prev, mapDbToUiProject(created)].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
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
        contentItems: data.contentItems || [],
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

  async function handleReorderProjects(reorderedProjects: Project[]) {
    setLoading(true);
    try {
      const updates = reorderedProjects.map((project, index) => 
        supabase
          .from("projects")
          .update({ display_order: index })
          .eq("id", parseInt(project.id, 10))
      );
      
      const results = await Promise.all(updates.map(p => p.then(res => res.error ? res : null)));
      const firstError = results.find(res => res && res.error);

      if (firstError) {
        throw firstError.error;
      }

      setProjects(reorderedProjects.map((p, index) => ({ ...p, display_order: index })));
      toast({
        title: "Orden de proyectos actualizado",
        description: "El orden de los proyectos se guardó correctamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al reordenar proyectos",
        description: error.message,
        variant: "destructive",
      });
      // Optionally refetch or revert local state
      await fetchProjects(); // Refetch to ensure consistency
    } finally {
      setLoading(false);
    }
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
    handleEdit,
    handleReorderProjects
  };
}
