
// Estructura básica de proyectos. Personalizable fácilmente.

// type: '4x3' | '3x4'
export type Project = {
  id: string
  title: string
  category: "Diseño Industrial" | "Graphics" | "CGI"
  image: string // url o import
  ratio: "4x3" | "3x4"
  excerpt?: string
  content?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Silla Minimalista",
    category: "Diseño Industrial",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    ratio: "4x3",
    excerpt: "Silla de madera minimalista con curvas orgánicas.",
    content: "Descripción y detalles completos del proyecto 'Silla Minimalista'...",
  },
  {
    id: "2",
    title: "Poster Festival 2023",
    category: "Graphics",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80",
    ratio: "3x4",
    excerpt: "Póster experimental para festival de música.",
    content: "Descripción y detalles completos del proyecto de póster gráfico...",
  },
  {
    id: "3",
    title: "Render 3D Concept",
    category: "CGI",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    ratio: "4x3",
    excerpt: "Render CGI para arquitectura conceptual.",
    content: "Descripción larga del render 3D...",
  },
  {
    id: "4",
    title: "Identidad CoffeeCo",
    category: "Graphics",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=400&q=80",
    ratio: "3x4",
    excerpt: "Rediseño de branding para una cafetería local.",
    content: "Descripción completa de la identidad visual de CoffeeCo...",
  },
  {
    id: "5",
    title: "Lámpara Modular",
    category: "Diseño Industrial",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
    ratio: "4x3",
    excerpt: "Luminaria modular de fácil ensamblaje.",
    content: "Texto extendido sobre lámpara modular...",
  },
  {
    id: "6",
    title: "Escultura Digital",
    category: "CGI",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    ratio: "3x4",
    excerpt: "Obra de arte digital esculpida en 3D.",
    content: "Texto completo sobre la escultura digital...",
  },
];
