
import React from "react";
import AdminProjectsTable from "@/components/AdminProjectsTable";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 font-inter">
      <h1 className="text-3xl font-bold mb-6">Administrar proyectos</h1>
      <div className="mb-8">
        <Button variant="default" className="ml-auto" /* onClick pendiente para modal/formulario */>
          + Agregar proyecto
        </Button>
      </div>
      <AdminProjectsTable />
    </div>
  );
};

export default AdminPage;
