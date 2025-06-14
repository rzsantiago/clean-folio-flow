
import type { Project } from "@/data/projects";
import { AddProjectFormData, ContentItem } from "@/types/projects";

// Type representing a project row as returned from Supabase
export type SupabaseProject = {
  id: number;
  title: string;
  description: string;
  category: string;
  year: number | null;
  covercolor: string | null;
  coverimage: string | null;
  contentitems: any[] | null; // Contenido mixto (imágenes y textos)
  client: string | null;
  display_order: number | null;
};

// Map AddProjectFormData to Supabase insert shape (DB column names)
export const mapFormDataToDb = (data: AddProjectFormData) => ({
  title: data.title,
  description: data.description,
  category: data.category,
  year: data.year ? Number(data.year) : null,
  covercolor: data.coverColor || "#D6BCFA",
  coverimage: data.coverImage || "",
  contentitems: data.contentItems || [],
  client: data.client?.trim() || null,
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
  contentItems: Array.isArray(proj.contentitems) ? proj.contentitems : [],
  client: proj.client ?? undefined,
  display_order: proj.display_order ?? undefined,
});
