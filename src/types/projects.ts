
export type AddProjectFormData = {
  title: string;
  description: string;
  category: string;
  year: string;
  ratio: "3x4" | "4x3";
  client?: string;
  coverColor?: string;
  coverImage?: string;
  contentImages?: string; // Usaremos un textarea de URLs separadas por salto de línea
};
