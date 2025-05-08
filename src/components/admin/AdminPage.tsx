
import React, { useState, useEffect } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminActionBar } from "./AdminActionBar";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import AddProjectDialog from "@/components/projects/AddProjectDialog";
import EditProjectDialog from "@/components/projects/EditProjectDialog";
import AdminLogin from "@/components/AdminLogin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useProjectOperations } from "@/hooks/useProjectOperations";

export default function AdminPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { isAdmin, loading: authLoading, logout } = useAdminAuth();
  
  const {
    projects,
    loading,
    selectedProject,
    setSelectedProject,
    fetchProjects,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleEdit
  } = useProjectOperations();

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
    }
  }, [isAdmin]);

  const handleProjectEdit = (project: any) => {
    handleEdit(project);
    setEditDialogOpen(true);
  };

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
      <AdminHeader onLogout={logout} />
      <AdminActionBar onAddProject={() => setAddDialogOpen(true)} />
      <AdminProjectsTable 
        projects={projects} 
        loading={loading} 
        onEdit={handleProjectEdit}
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
}
