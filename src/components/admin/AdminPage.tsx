
import React, { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminActionBar } from "./AdminActionBar";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import AddProjectDialog from "@/components/projects/AddProjectDialog";
import EditProjectDialog from "@/components/projects/EditProjectDialog";
import AdminLogin from "@/components/AdminLogin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useProjectOperations } from "@/hooks/useProjectOperations";
import type { Project } from "@/data/projects";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { isAdmin, loading: authLoading, logout } = useAdminAuth();
  
  const {
    projects,
    loading,
    selectedProject,
    fetchProjects,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleEdit,
    handleReorderProjects,
  } = useProjectOperations();

  const stableFetchProjects = useCallback(fetchProjects, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
    }
  }, [isAdmin, fetchProjects]);

  const handleProjectEdit = (project: Project) => {
    handleEdit(project);
    setEditDialogOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="text-slate-600 text-lg">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminLogin onLoginSuccess={() => fetchProjects()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-8">
          <AdminHeader onLogout={logout} />
          
          <Card className="p-6 bg-white shadow-sm border-slate-200">
            <AdminActionBar onAddProject={() => setAddDialogOpen(true)} />
          </Card>

          <Card className="bg-white shadow-sm border-slate-200 overflow-hidden">
            <AdminProjectsTable 
              projects={projects} 
              loading={loading} 
              onEdit={handleProjectEdit}
              onDelete={handleDeleteProject}
              onReorder={handleReorderProjects}
            />
          </Card>
        </div>

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
    </div>
  );
}
