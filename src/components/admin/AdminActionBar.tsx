
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, FolderPlus, BarChart3 } from "lucide-react";

type AdminActionBarProps = {
  onAddProject: () => void;
};

export function AdminActionBar({ onAddProject }: AdminActionBarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          Gestión de Proyectos
        </h2>
        <p className="text-slate-600 text-sm">
          Organiza, edita y administra tu portafolio
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-md">
          <BarChart3 className="h-4 w-4" />
          <span>Modo Administrador Activo</span>
        </div>
        
        <Button 
          onClick={onAddProject} 
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-md"
        >
          <Plus className="h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>
    </div>
  );
}
