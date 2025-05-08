
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

type EmptyStateProps = {
  loading?: boolean;
  colSpan?: number;
};

export const EmptyState = ({ loading = false, colSpan = 4 }: EmptyStateProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-8 text-muted-foreground">
        {loading ? "Cargando proyectos..." : "No hay proyectos registrados."}
      </TableCell>
    </TableRow>
  );
};
