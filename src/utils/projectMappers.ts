
import type { Project } from "@/data/projects";
import { AddProjectFormData, ContentItem } from "@/types/projects";

// Type representing a project row as returned from Supabase (actualizado)
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

// Helper function to normalize content items
const normalizeContentItems = (contentitems: any[] | null): ContentItem[] => {
  if (!contentitems || !Array.isArray(contentitems)) {
    return [];
  }

  return contentitems.map((item, index) => {
    // Si el item es solo una string (formato anterior), convertirlo al nuevo formato
    if (typeof item === 'string') {
      return {
        type: 'image' as const,
        content: item,
        id: `migrated-${index}-${Date.now()}`
      };
    }
    
    // Si ya está en el nuevo formato, asegurar que tenga todas las propiedades
    if (typeof item === 'object' && item !== null) {
      return {
        type: item.type || 'image',
        content: item.content || item.url || item, // Fallback para diferentes formatos
        id: item.id || `migrated-${index}-${Date.now()}`
      };
    }
    
    // Fallback para casos inesperados
    return {
      type: 'image' as const,
      content: String(item),
      id: `fallback-${index}-${Date.now()}`
    };
  });
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
  contentItems: normalizeContentItems(proj.contentitems),
  client: proj.client ?? undefined,
  display_order: proj.display_order ?? undefined,
});
