
import React, { useState } from "react";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import type { Project } from "@/data/projects";
import {
  ProjectTableHeader,
  ProjectRow,
  DeleteConfirmDialog,
  EmptyState
} from "./projects/table";

type SortField = "title" | "category" | "year";

type AdminProjectsTableProps = {
  projects: Project[];
  loading?: boolean;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onReorder?: (projects: Project[]) => void;
};

const AdminProjectsTable = ({ 
  projects, 
  loading, 
  onEdit, 
  onDelete,
  onReorder 
}: AdminProjectsTableProps) => {
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let valueA, valueB;

    switch (sortField) {
      case "title":
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;
      case "category":
        valueA = a.category.toLowerCase();
        valueB = b.category.toLowerCase();
        break;
      case "year":
        valueA = a.year || 0;
        valueB = b.year || 0;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleDeleteClick = (projectId: string) => {
    setDeleteConfirm(projectId);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <ProjectTableHeader 
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />
        <TableBody>
          {loading || sortedProjects.length === 0 ? (
            <EmptyState loading={loading} />
          ) : (
            sortedProjects.map((project) => (
              <ProjectRow 
                key={project.id} 
                project={project} 
                onEdit={onEdit}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </TableBody>
      </Table>

      <DeleteConfirmDialog 
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AdminProjectsTable;
