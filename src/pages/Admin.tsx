
import React, { useEffect, useState } from "react";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import { Button } from "@/components/ui/button";
import AddProjectDialog, { AddProjectFormData } from "@/components/AddProjectDialog";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import type { Project } from "@/data/projects";
import { toast } from "@/components/ui/sonner";

// Adaptar los datos del formulario al formato de Supabase
const mapFormDataToDb = (data: AddProjectFormData) => ({
  title: data.title,
  description: data.description,
  category: data.category,
  year: data.year ? Number(data.year) : null,
  // Puedes agregar más campos aquí si tu tabla los tiene
  coverColor: "#D6BCFA",
  coverImage: "",
  ratio: "4x3",
  contentImages: [],
  client: null,
});

const AdminPage = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Carga los proyectos desde Supabase al montar el componente
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
      setProjects(data || []);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  // Añadir proyecto a Supabase
  async function handleAddProject(data: AddProjectFormData) {
    const payload = mapFormDataToDb(data);

    const { data: created, error } = await supabase
      .from("projects")
      .insert([payload])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error al agregar proyecto",
        description: error.message,
      });
      return;
    }

    setProjects((prev) => [...prev, created]);
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
