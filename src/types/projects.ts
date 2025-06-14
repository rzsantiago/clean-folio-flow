
export type ContentItem = {
  type: 'image' | 'text';
  content: string; // URL para imagen, texto para text
  id: string; // Para reordenamiento
};

export type AddProjectFormData = {
  title: string;
  description: string;
  category: string;
  year: string;
  client?: string;
  coverColor?: string;
  coverImage?: string;
  contentItems?: ContentItem[]; // Reemplaza contentImages
};
