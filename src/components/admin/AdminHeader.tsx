
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";

type AdminHeaderProps = {
  onLogout: () => void;
};

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Panel de Administración
        </h1>
        <p className="text-slate-600 text-lg">
          Gestiona tus proyectos de manera eficiente
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
          <User className="h-4 w-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Administrador</span>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
