export type Project = {
  id: string,
  title: string,
  category: string,
  coverColor: string,
  ratio: "3x4" | "4x3",
  contentImages: string[],
};

function randomColor(seed: string) {
  // Simple deterministic "random" color generator
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (v: number) => ("00" + ((hash >> v) & 0xFF).toString(16)).slice(-2);
  return `#${c(0)}${c(8)}${c(16)}`;
}

export const projects: Project[] = [
  {
    id: "industrial-1",
    title: "Silla Modular",
    category: "Diseño Industrial",
    coverColor: randomColor("industrial-1-cover"),
    ratio: "4x3",
    contentImages: [
      randomColor("industrial-1-1"),
      randomColor("industrial-1-2"),
      randomColor("industrial-1-3"),
      randomColor("industrial-1-4"),
    ],
  },
  {
    id: "graphics-1",
    title: "Poster Feria de Diseño",
    category: "Graphics",
    coverColor: randomColor("graphics-1-cover"),
    ratio: "3x4",
    contentImages: [
      randomColor("graphics-1-1"),
      randomColor("graphics-1-2"),
      randomColor("graphics-1-3"),
    ],
  },
  {
    id: "cgi-1",
    title: "Render Luz y Sombra",
    category: "CGI",
    coverColor: randomColor("cgi-1-cover"),
    ratio: "4x3",
    contentImages: [
      randomColor("cgi-1-1"),
      randomColor("cgi-1-2"),
    ],
  },
  {
    id: "graphics-2",
    title: "Identidad Visual ONG",
    category: "Graphics",
    coverColor: randomColor("graphics-2-cover"),
    ratio: "4x3",
    contentImages: [
      randomColor("graphics-2-1"),
      randomColor("graphics-2-2"),
      randomColor("graphics-2-3"),
      randomColor("graphics-2-4"),
      randomColor("graphics-2-5"),
    ],
  },
  {
    id: "industrial-2",
    title: "Luminaria de escritorio",
    category: "Diseño Industrial",
    coverColor: randomColor("industrial-2-cover"),
    ratio: "3x4",
    contentImages: [
      randomColor("industrial-2-1"),
      randomColor("industrial-2-2"),
    ],
  },
  {
    id: "cgi-2",
    title: "CGI Producto Cosmético",
    category: "CGI",
    coverColor: randomColor("cgi-2-cover"),
    ratio: "3x4",
    contentImages: [
      randomColor("cgi-2-1"),
      randomColor("cgi-2-2"),
      randomColor("cgi-2-3"),
    ],
  },
  // Puedes seguir sumando más proyectos aquí...
];
