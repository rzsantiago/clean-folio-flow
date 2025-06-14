
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/data/projects";
import { toast } from "@/hooks/use-toast";
import { mapDbToUiProject, SupabaseProject } from "@/utils/projectMappers";

async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  if (!data || data.length === 0) {
    console.log("No projects found or empty response from Supabase");
    return [];
  }

  console.log("Raw project data from Supabase:", data);

  // Cast the data to SupabaseProject type since we know the structure
  const mappedProjects = (data as unknown as SupabaseProject[]).map(proj => {
    console.log(`Mapping project ${proj.title}:`, {
      id: proj.id,
      contentitems: proj.contentitems
    });
    return mapDbToUiProject(proj);
  });

  console.log("Mapped projects:", mappedProjects);
  return mappedProjects;
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: (err: Error) => {
        console.error("Project query error:", err);
        toast({
          title: "Error loading projects",
          description: err.message,
          variant: "destructive"
        });
      }
    }
  });
}
