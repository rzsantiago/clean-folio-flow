
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortField = "title" | "category" | "year";

type TableHeaderProps = {
  sortField: SortField;
  sortDirection: "asc" | "desc";
  handleSort: (field: SortField) => void;
};

export const ProjectTableHeader = ({ sortField, sortDirection, handleSort }: TableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className="cursor-pointer"
          onClick={() => handleSort("title")}
        >
          <div className="flex items-center">
            Título
            {sortField === "title" && (
              sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => handleSort("category")}
        >
          <div className="flex items-center">
            Categoría
            {sortField === "category" && (
              sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => handleSort("year")}
        >
          <div className="flex items-center">
            Año
            {sortField === "year" && (
              sortDirection === "asc" ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead className="text-center">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};
