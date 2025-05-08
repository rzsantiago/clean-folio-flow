import React, { useEffect, useState } from "react";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import { Button } from "@/components/ui/button";
import AddProjectDialog from "@/components/projects/AddProjectDialog";
import EditProjectDialog from "@/components/projects/EditProjectDialog";
import AdminLogin from "@/components/AdminLogin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Plus, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Project } from "@/data/projects";
import { AddProjectFormData } from "@/types/projects";

// Type representing a project row as returned from Supabase
type SupabaseProject = {
  id: number;
  title: string;
  description: string;
  category: string;
  year: number | null;
  covercolor: string | null;
  coverimage: string | null;
  ratio: string | null;
  contentimages: any[] | null;
  client: string | null;
};

// Map AddProjectFormData to Supabase insert shape (DB column names)
const mapFormDataToDb = (data: AddProjectFormData) => ({
  title: data.title,
  description: data.description,
  category: data.category,
  year: data.year ? Number(data.year) : null,
  covercolor: data.coverColor || "#D6BCFA",
  coverimage: data.coverImage || "",
  ratio: data.ratio || "4x3",
  contentimages: data.contentImages
    // Si hay contenido, hacer split por saltos de línea y filtrar vacíos
    ? data.contentImages.split("\n").map(s => s.trim()).filter(Boolean)
    : [],
  client: data.client?.trim() || null,
});

// Convert DB shape to UI shape for AdminProjectsTable (map id:number -> id:string)
const mapDbToUiProject = (proj: SupabaseProject): Project => ({
  id: proj.id.toString(),
  title: proj.title,
  description: proj.description,
  category: proj.category,
  year: proj.year || undefined,
  coverColor: proj.covercolor || "#D6BCFA",
  coverImage: proj.coverimage ?? undefined,
  ratio: (proj.ratio === "3x4" || proj.ratio === "4x3") ? proj.ratio : "4x3",
  contentImages: Array.isArray(proj.contentimages) ? proj.contentimages : [],
  client: proj.client ?? undefined,
});

const AdminPage = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin, loading: authLoading, logout } = useAdminAuth();

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
    }
  }, [isAdmin]);

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
    setEditDialogOpen(true);
  }

  // Si estamos cargando o el usuario no es administrador, mostrar pantalla de login
  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 font-inter">
        <h1 className="text-3xl font-bold mb-6">Cargando...</h1>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLoginSuccess={() => fetchProjects()} />;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Administrar proyectos</h1>
        <Button 
          variant="outline" 
          className="ml-2"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-1" />
          Salir
        </Button>
      </div>
      <div className="mb-8 flex justify-end">
        <Button variant="default" onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Agregar proyecto
        </Button>
      </div>
      <AdminProjectsTable 
        projects={projects} 
        loading={loading} 
        onEdit={handleEdit}
        onDelete={handleDeleteProject}
      />
      <AddProjectDialog
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        onSubmit={handleAddProject}
      />
      <EditProjectDialog 
        project={selectedProject}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        onSubmit={handleEditProject}
      />
    </div>
  );
};

export default AdminPage;
