
import type { Project } from "@/data/projects";
import { AddProjectFormData } from "@/types/projects";

// Type representing a project row as returned from Supabase
export type SupabaseProject = {
  id: number;
  title: string;
  description: string;
  category: string;
  year: number | null;
  covercolor: string | null;
  coverimage: string | null;
  ratio: string | null;
  contentimages: any[] | null;
  client: string | null;
  display_order: number | null; // Added display_order
};

// Map AddProjectFormData to Supabase insert shape (DB column names)
export const mapFormDataToDb = (data: AddProjectFormData) => ({
  title: data.title,
  description: data.description,
  category: data.category,
  year: data.year ? Number(data.year) : null,
  covercolor: data.coverColor || "#D6BCFA",
  coverimage: data.coverImage || "",
  ratio: data.ratio || "4x3",
  contentimages: data.contentImages
    // Si hay contenido, hacer split por saltos de línea y filtrar vacíos
    ? data.contentImages.split("\n").map(s => s.trim()).filter(Boolean)
    : [],
  client: data.client?.trim() || null,
  // display_order will be set after insert or by a trigger/default in DB
  // For now, we handle it in useProjectOperations after insert.
});

// Convert DB shape to UI shape for AdminProjectsTable (map id:number -> id:string)
export const mapDbToUiProject = (proj: SupabaseProject): Project => ({
  id: proj.id.toString(),
  title: proj.title,
  description: proj.description,
  category: proj.category,
  year: proj.year || undefined,
  coverColor: proj.covercolor || "#D6BCFA",
  coverImage: proj.coverimage ?? undefined,
  ratio: (proj.ratio === "3x4" || proj.ratio === "4x3") ? proj.ratio : "4x3",
  contentImages: Array.isArray(proj.contentimages) ? proj.contentimages : [],
  client: proj.client ?? undefined,
  display_order: proj.display_order ?? undefined, // Added display_order
});
