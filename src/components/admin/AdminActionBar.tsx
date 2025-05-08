
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AdminActionBarProps = {
  onAddProject: () => void;
};

export function AdminActionBar({ onAddProject }: AdminActionBarProps) {
  return (
    <div className="mb-8 flex justify-end">
      <Button variant="default" onClick={onAddProject}>
        <Plus className="w-4 h-4 mr-1" />
        Agregar proyecto
      </Button>
    </div>
  );
}
