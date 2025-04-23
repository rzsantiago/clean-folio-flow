
import React, { useState } from "react";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import { Button } from "@/components/ui/button";
import AddProjectDialog, { AddProjectFormData } from "@/components/AddProjectDialog";
import { projects as defaultProjects, Project } from "@/data/projects";
import { Plus } from "lucide-react";

// !! No persistente (solo frontend), se integrará con Supabase más tarde
const mapFormDataToProject = (data: AddProjectFormData): Project => ({
  id: "local-" + Date.now(),
  title: data.title,
  category: data.category,
  year: isNaN(+data.year) ? undefined : +data.year, // Convert to number, fallback to undefined
  description: data.description,
  coverColor: "#D6BCFA",
  coverImage: "",
  ratio: "4x3", // Use literal type
  contentImages: [],
  client: undefined, // Explicit for type safety
});

const AdminPage = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  // Mezclamos proyectos de ejemplo con nuevos agregados
  const [localProjects, setLocalProjects] = useState<Project[]>(defaultProjects);

  function handleAddProject(data: AddProjectFormData) {
    setLocalProjects((projects) => [
      ...projects,
      mapFormDataToProject(data),
    ]);
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
      <AdminProjectsTable projects={localProjects} />
      <AddProjectDialog
        open={addDialogOpen}
        setOpen={setAddDialogOpen}
        onSubmit={handleAddProject}
      />
    </div>
  );
};

export default AdminPage;
