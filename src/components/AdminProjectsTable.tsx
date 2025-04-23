
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Project } from "@/data/projects";

type AdminProjectsTableProps = {
  projects: Project[];
};

const AdminProjectsTable = ({ projects }: AdminProjectsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg">
        <thead className="bg-muted">
          <tr>
            <th className="py-2 px-3 text-left text-stone-700">Título</th>
            <th className="py-2 px-3 text-left text-stone-700">Categoría</th>
            <th className="py-2 px-3 text-left text-stone-700">Año</th>
            <th className="py-2 px-3 text-center text-stone-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b last:border-b-0 hover:bg-stone-50">
              <td className="py-2 px-3">{project.title}</td>
              <td className="py-2 px-3">{project.category}</td>
              <td className="py-2 px-3">{project.year || "-"}</td>
              <td className="py-2 px-3 text-center">
                <Button size="sm" variant="secondary" className="mr-2" disabled>
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button size="sm" variant="destructive" disabled>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectsTable;
