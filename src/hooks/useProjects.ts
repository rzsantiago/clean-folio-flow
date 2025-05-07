
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/data/projects";
import { toast } from "@/hooks/use-toast";

// Supabase → UI mapping
function mapDbToUiProject(proj: any): Project {
  return {
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
  };
}

async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  if (!data || data.length === 0) {
    console.log("No projects found or empty response from Supabase");
    return [];
  }

  return data.map(mapDbToUiProject) as Project[];
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    onError: (err: Error) => {
      console.error("Project query error:", err);
      toast({
        title: "Error loading projects",
        description: err.message,
        variant: "destructive"
      });
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
