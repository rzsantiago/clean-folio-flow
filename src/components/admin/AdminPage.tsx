
import React, { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminActionBar } from "./AdminActionBar";
import { SiteConfigSection } from "./SiteConfigSection";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import AdminProjectsGrid from "./AdminProjectsGrid";
import AddProjectDialog from "@/components/projects/AddProjectDialog";
import EditProjectDialog from "@/components/projects/EditProjectDialog";
import AdminLogin from "@/components/AdminLogin";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useProjectOperations } from "@/hooks/useProjectOperations";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";
import type { Project } from "@/data/projects";

export default function AdminPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900 mx-auto"></div>
          <div className="space-y-2">
            <p className="text-slate-900 text-xl font-medium">Cargando panel de administración</p>
            <p className="text-slate-500">Verificando credenciales...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <AdminLogin onLoginSuccess={() => fetchProjects()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="space-y-8">
          {/* Header con estilo mejorado */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm p-8">
            <AdminHeader onLogout={logout} />
          </div>
          
          {/* Site Configuration Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="p-6">
              <SiteConfigSection />
            </div>
          </div>
          
          {/* Action Bar con toggle de vista */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm p-6">
            <div className="flex justify-between items-center">
              <AdminActionBar onAddProject={() => setAddDialogOpen(true)} />
              
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-3"
                >
                  <Grid3x3 className="w-4 h-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="h-8 px-3"
                >
                  <List className="w-4 h-4 mr-1" />
                  Tabla
                </Button>
              </div>
            </div>
          </div>

          {/* Projects View */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="p-6">
              {viewMode === 'grid' ? (
                <AdminProjectsGrid 
                  projects={projects} 
                  loading={loading} 
                  onEdit={handleProjectEdit}
                  onDelete={handleDeleteProject}
                  onReorder={handleReorderProjects}
                />
              ) : (
                <AdminProjectsTable 
                  projects={projects} 
                  loading={loading} 
                  onEdit={handleProjectEdit}
                  onDelete={handleDeleteProject}
                  onReorder={handleReorderProjects}
                />
              )}
            </div>
          </div>
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
