
import React, { useState, useMemo, useEffect } from "react"; // Added useEffect
import {
  Table,
  TableBody,
  TableHeader as UiTableHeader, // Using Shadcn TableHeader
  TableHead,
  TableRow as UiTableRow,
} from "@/components/ui/table";
import type { Project } from "@/data/projects";
import {
  ProjectRow,
  DeleteConfirmDialog,
  EmptyState
} from "./projects/table"; // ProjectTableHeader is removed from here
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowUpDown, GripVertical } from "lucide-react"; // For sort icons
import { Button } from "@/components/ui/button"; // For sort buttons

type SortField = "title" | "category" | "year" | "display_order";

type AdminProjectsTableProps = {
  projects: Project[];
  loading?: boolean;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onReorder: (projects: Project[]) => void;
};

// Helper for sortable header cells
const SortableHeaderCell = ({
  children,
  field,
  currentSortField,
  currentSortDirection,
  onClick,
}: {
  children: React.ReactNode;
  field: SortField;
  currentSortField: SortField;
  currentSortDirection: "asc" | "desc";
  onClick: (field: SortField) => void;
}) => (
  <TableHead onClick={() => onClick(field)} className="cursor-pointer">
    <div className="flex items-center">
      {children}
      {currentSortField === field && (
        <ArrowUpDown className={`ml-2 h-4 w-4 ${currentSortDirection === "asc" ? "" : "transform rotate-180"}`} />
      )}
    </div>
  </TableHead>
);


const AdminProjectsTable = ({ 
  projects: initialProjects, 
  loading, 
  onEdit, 
  onDelete,
  onReorder 
}: AdminProjectsTableProps) => {
  const [sortField, setSortField] = useState<SortField>("display_order");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [localProjects, setLocalProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    // Ensure localProjects is updated when initialProjects changes,
    // and maintain the current sort order.
    const newSortedProjects = [...initialProjects].sort((a, b) => {
        const orderA = a.display_order ?? Infinity;
        const orderB = b.display_order ?? Infinity;
        if (sortField === "display_order") {
            return sortDirection === "asc" ? orderA - orderB : orderB - orderA;
        }
        // Add other sort fields if necessary, though display_order is primary for DND
        let valueA: string | number, valueB: string | number;
        switch (sortField) {
            case "title": valueA = a.title.toLowerCase(); valueB = b.title.toLowerCase(); break;
            case "category": valueA = a.category.toLowerCase(); valueB = b.category.toLowerCase(); break;
            case "year": valueA = a.year || 0; valueB = b.year || 0; break;
            default: return 0;
        }
        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
    setLocalProjects(newSortedProjects);
  }, [initialProjects, sortField, sortDirection]);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLocalProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return items; // Should not happen
        const reordered = arrayMove(items, oldIndex, newIndex);
        onReorder(reordered.map((p, index) => ({ ...p, display_order: index })));
        return reordered;
      });
    }
  };
  
  const projectIds = useMemo(() => localProjects.map(p => p.id), [localProjects]);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDeleteClick = (projectId: string) => setDeleteConfirm(projectId);
  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  // Use localProjects for rendering, as it reflects optimistic updates from D&D
  const projectsToRender = localProjects;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <Table>
          <UiTableHeader>
            <UiTableRow>
              <TableHead className="w-12 px-2 text-center">
                 <GripVertical className="w-5 h-5 text-stone-400 inline-block" />
              </TableHead>
              <SortableHeaderCell field="title" currentSortField={sortField} currentSortDirection={sortDirection} onClick={handleSort}>
                Título
              </SortableHeaderCell>
              <SortableHeaderCell field="category" currentSortField={sortField} currentSortDirection={sortDirection} onClick={handleSort}>
                Categoría
              </SortableHeaderCell>
              <SortableHeaderCell field="year" currentSortField={sortField} currentSortDirection={sortDirection} onClick={handleSort}>
                Año
              </SortableHeaderCell>
              <TableHead className="text-right">Acciones</TableHead>
            </UiTableRow>
          </UiTableHeader>
          <SortableContext items={projectIds} strategy={verticalListSortingStrategy}>
            <TableBody>
              {loading && projectsToRender.length === 0 ? (
                <EmptyState loading={true} colSpan={5} />
              ) : !loading && projectsToRender.length === 0 ? (
                <EmptyState loading={false} colSpan={5} />
              ) : (
                projectsToRender.map((project) => (
                  <ProjectRow 
                    key={project.id} 
                    project={project} 
                    onEdit={onEdit}
                    onDelete={handleDeleteClick}
                  />
                ))
              )}
            </TableBody>
          </SortableContext>
        </Table>

        <DeleteConfirmDialog 
          open={!!deleteConfirm}
          onOpenChange={() => setDeleteConfirm(null)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </DndContext>
  );
};

export default AdminProjectsTable;
