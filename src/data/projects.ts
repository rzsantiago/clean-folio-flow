
export type Project = {
  id: string
  title: string
  category: "Diseño Industrial" | "Graphics" | "CGI"
  ratio: "4x3" | "3x4"
  coverColor?: string
  excerpt?: string
  contentImages?: string[] // solid backgrounds
  content?: string
}

const solidColors = [
  "#FEF7CD", "#D3E4FD", "#FDE1D3", "#E5DEFF", "#FFDEE2",
  "#FEC6A1", "#9b87f5", "#F2FCE2", "#8B5CF6", "#F97316", "#0EA5E9", "#D946EF"
];

function randomColor(idx: number) {
  return solidColors[idx % solidColors.length];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Silla Minimalista",
    category: "Diseño Industrial",
    ratio: "4x3",
    coverColor: randomColor(0),
    excerpt: "",
    content: "",
    contentImages: [solidColors[1], solidColors[4], solidColors[7]]
  },
  {
    id: "2",
    title: "Poster Festival 2023",
    category: "Graphics",
    ratio: "3x4",
    coverColor: randomColor(1),
    excerpt: "",
    content: "",
    contentImages: [solidColors[5], solidColors[2]]
  },
  {
    id: "3",
    title: "Render 3D Concept",
    category: "CGI",
    ratio: "4x3",
    coverColor: randomColor(2),
    excerpt: "",
    content: "",
    contentImages: [solidColors[6], solidColors[10], solidColors[3]]
  },
  {
    id: "4",
    title: "Identidad CoffeeCo",
    category: "Graphics",
    ratio: "3x4",
    coverColor: randomColor(3),
    excerpt: "",
    content: "",
    contentImages: [solidColors[1], solidColors[9], solidColors[0], solidColors[8]]
  },
  {
    id: "5",
    title: "Lámpara Modular",
    category: "Diseño Industrial",
    ratio: "4x3",
    coverColor: randomColor(4),
    excerpt: "",
    content: "",
    contentImages: [solidColors[4], solidColors[10]]
  },
  {
    id: "6",
    title: "Escultura Digital",
    category: "CGI",
    ratio: "3x4",
    coverColor: randomColor(5),
    excerpt: "",
    content: "",
    contentImages: [solidColors[1], solidColors[3], solidColors[7]]
  },
  // Más proyectos...
  {
    id: "7",
    title: "Mesa Abstracta",
    category: "Diseño Industrial",
    ratio: "3x4",
    coverColor: randomColor(6),
    content: "",
    contentImages: [solidColors[3], solidColors[0]]
  },
  {
    id: "8",
    title: "Cartel Tipografía",
    category: "Graphics",
    ratio: "4x3",
    coverColor: randomColor(7),
    content: "",
    contentImages: [solidColors[8], solidColors[7], solidColors[2]]
  },
  {
    id: "9",
    title: "Escena CGI Luz",
    category: "CGI",
    ratio: "4x3",
    coverColor: randomColor(8),
    content: "",
    contentImages: [solidColors[9], solidColors[4], solidColors[6]]
  },
  {
    id: "10",
    title: "Gráfica Minimal",
    category: "Graphics",
    ratio: "4x3",
    coverColor: randomColor(9),
    content: "",
    contentImages: [solidColors[11], solidColors[1]]
  },
  {
    id: "11",
    title: "Lámpara Prisma",
    category: "Diseño Industrial",
    ratio: "3x4",
    coverColor: randomColor(10),
    content: "",
    contentImages: [solidColors[10], solidColors[6], solidColors[0]]
  },
  {
    id: "12",
    title: "Composición Color",
    category: "CGI",
    ratio: "3x4",
    coverColor: randomColor(11),
    content: "",
    contentImages: [solidColors[2], solidColors[11], solidColors[7], solidColors[0]]
  },
];
