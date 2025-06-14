
import { ContentItem } from "@/types/projects";

export type Project = {
  id: string,
  title: string,
  description: string,
  category: string,
  coverColor: string,
  coverImage?: string,
  thumbnailImage?: string, // Nueva imagen de miniatura
  contentItems: ContentItem[], // Reemplaza contentImages y ratio
  client?: string,
  year?: string | number,
  display_order?: number;
};

// Simple deterministic "random" color generator (por compatiblidad durante la transición)
function randomColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (v: number) => ("00" + ((hash >> v) & 0xFF).toString(16)).slice(-2);
  return `#${c(0)}${c(8)}${c(16)}`;
}

// Ejemplos de contenido mixto (imágenes y textos):
export const projects: Project[] = [
  {
    id: "industrial-1",
    title: "Modular Chair",
    description: "A modular chair designed for both comfort and flexibility in modern spaces.",
    category: "Industrial Design",
    coverColor: randomColor("industrial-1-cover"),
    coverImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80",
    client: "Acme Corp",
    year: 2023,
    contentItems: [
      { type: "image", content: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", id: "img-1" },
      { type: "text", content: "Este proyecto se enfocó en crear una pieza versátil que se adapte a diferentes espacios de trabajo modernos.", id: "text-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", id: "img-2" },
      { type: "image", content: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=600&q=80", id: "img-3" },
    ],
  },
  {
    id: "graphics-1",
    title: "Design Fair Poster",
    description: "Poster concept for annual design fair with geometric shapes and vibrant colors.",
    category: "Graphics",
    coverColor: randomColor("graphics-1-cover"),
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
    client: "City Fair",
    year: 2022,
    contentItems: [
      { type: "text", content: "El concepto visual se basó en formas geométricas que representan la diversidad del diseño contemporáneo.", id: "text-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", id: "img-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", id: "img-2" },
    ],
  },
  {
    id: "cgi-1",
    title: "Lighting & Shadow Render",
    description: "3D render focusing on realistic lighting and shadows to emphasize product details.",
    category: "CGI",
    coverColor: randomColor("cgi-1-cover"),
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    client: "Studio 3D",
    year: 2024,
    contentItems: [
      { type: "image", content: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80", id: "img-1" },
      { type: "text", content: "La iluminación fue cuidadosamente diseñada para resaltar cada detalle del producto final.", id: "text-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", id: "img-2" },
      { type: "image", content: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80", id: "img-3" },
    ],
  },
  {
    id: "graphics-2",
    title: "NGO Visual Identity",
    description: "Complete rebranding and identity kit for a non-profit organization.",
    category: "Graphics",
    coverColor: randomColor("graphics-2-cover"),
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    client: "Hope NGO",
    year: 2023,
    contentItems: [
      { type: "image", content: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80", id: "img-1" },
      { type: "text", content: "La nueva identidad visual refleja los valores de esperanza y cambio social de la organización.", id: "text-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=600&q=80", id: "img-2" },
      { type: "image", content: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80", id: "img-3" },
      { type: "image", content: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80", id: "img-4" },
    ],
  },
  {
    id: "industrial-2",
    title: "Desk Lamp",
    description: "A modern desk lamp with sustainable materials and smart features.",
    category: "Industrial Design",
    coverColor: randomColor("industrial-2-cover"),
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    client: "LightWorks",
    year: 2024,
    contentItems: [
      { type: "text", content: "Diseñada con materiales sostenibles y tecnología inteligente para el hogar moderno.", id: "text-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80", id: "img-1" },
      { type: "image", content: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80", id: "img-2" },
      { type: "image", content: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", id: "img-3" },
    ],
  },
];
