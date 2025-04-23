
import React, { useEffect, useState } from "react";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import { Button } from "@/components/ui/button";
import AddProjectDialog, { AddProjectFormData } from "@/components/AddProjectDialog";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Project } from "@/data/projects";

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        });
        setLoading(false);
        return;
      }
      const uiProjects = (data as SupabaseProject[]).map(mapDbToUiProject);
      setProjects(uiProjects);
      setLoading(false);
    }

    fetchProjects();
  }, []);

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
      });
      return;
    }

    // The response is an array; grab the first item.
    const created = (createdArr && createdArr[0]) as SupabaseProject | undefined;

    if (!created) {
      toast({
        title: "Error al agregar proyecto",
        description: "No se pudo recibir el proyecto creado.",
      });
      return;
    }

    setProjects((prev) => [...prev, mapDbToUiProject(created)]);
    toast({
      title: "Proyecto agregado",
      description: `El proyecto "${created.title}" fue agregado correctamente.`,
    });
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 font-inter">
      <h1 className="text-3xl font-bold mb-6">Administrar proyectos</h1>
      <div className="mb-8 flex justify-end">
        <Button variant="default" onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Agregar proyecto
        </Button>
      </div>
      <AdminProjectsTable projects={projects} loading={loading} />
      <AddProjectDialog
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        onSubmit={handleAddProject}
      />
    </div>
  );
};

export default AdminPage;
