
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type AdminHeaderProps = {
  onLogout: () => void;
};

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Administrar proyectos</h1>
      <Button 
        variant="outline" 
        className="ml-2"
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4 mr-1" />
        Salir
      </Button>
    </div>
  );
}
