
export type Project = {
  id: string,
  title: string,
  description: string,
  category: string,
  coverColor: string,
  ratio: "3x4" | "4x3",
  contentImages: string[],
  client?: string,
  year?: string | number,
};

// Simple deterministic "random" color generator
function randomColor(seed: string) {
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
    title: "Modular Chair",
    description: "A modular chair designed for both comfort and flexibility in modern spaces.",
    category: "Industrial Design",
    coverColor: randomColor("industrial-1-cover"),
    ratio: "4x3",
    client: "Acme Corp",
    year: 2023,
    contentImages: [
      randomColor("industrial-1-1"),
      randomColor("industrial-1-2"),
      randomColor("industrial-1-3"),
    ],
  },
  {
    id: "graphics-1",
    title: "Design Fair Poster",
    description: "Poster concept for annual design fair with geometric shapes and vibrant colors.",
    category: "Graphics",
    coverColor: randomColor("graphics-1-cover"),
    ratio: "3x4",
    client: "City Fair",
    year: 2022,
    contentImages: [
      randomColor("graphics-1-1"),
      randomColor("graphics-1-2"),
    ],
  },
  {
    id: "cgi-1",
    title: "Lighting & Shadow Render",
    description: "3D render focusing on realistic lighting and shadows to emphasize product details.",
    category: "CGI",
    coverColor: randomColor("cgi-1-cover"),
    ratio: "4x3",
    client: "Studio 3D",
    year: 2024,
    contentImages: [
      randomColor("cgi-1-1"),
      randomColor("cgi-1-2"),
      randomColor("cgi-1-3"),
    ],
  },
  {
    id: "graphics-2",
    title: "NGO Visual Identity",
    description: "Complete rebranding and identity kit for a non-profit organization.",
    category: "Graphics",
    coverColor: randomColor("graphics-2-cover"),
    ratio: "4x3",
    client: "Hope NGO",
    year: 2023,
    contentImages: [
      randomColor("graphics-2-1"),
      randomColor("graphics-2-2"),
      randomColor("graphics-2-3"),
      randomColor("graphics-2-4"),
    ],
  },
  {
    id: "industrial-2",
    title: "Desk Lamp",
    description: "A modern desk lamp with sustainable materials and smart features.",
    category: "Industrial Design",
    coverColor: randomColor("industrial-2-cover"),
    ratio: "3x4",
    client: "LightWorks",
    year: 2024,
    contentImages: [
      randomColor("industrial-2-1"),
      randomColor("industrial-2-2"),
      randomColor("industrial-2-3"),
    ],
  },
  {
    id: "cgi-2",
    title: "Cosmetic Product CGI",
    description: "Product visualization for marketing campaigns of a premium cosmetic line.",
    category: "CGI",
    coverColor: randomColor("cgi-2-cover"),
    ratio: "3x4",
    client: "Luxe Cosmetics",
    year: 2023,
    contentImages: [
      randomColor("cgi-2-1"),
      randomColor("cgi-2-2"),
      randomColor("cgi-2-3"),
      randomColor("cgi-2-4"),
    ],
  },
  {
    id: "graphics-3",
    title: "Book Cover Illustration",
    description: "Illustrative book cover blending traditional and digital media.",
    category: "Graphics",
    coverColor: randomColor("graphics-3-cover"),
    ratio: "3x4",
    client: "Editions Aurora",
    year: 2024,
    contentImages: [
      randomColor("graphics-3-1"),
      randomColor("graphics-3-2"),
    ],
  },
  {
    id: "industrial-3",
    title: "Kitchen Stools Set",
    description: "Minimalist kitchen stools with ergonomic wood seats.",
    category: "Industrial Design",
    coverColor: randomColor("industrial-3-cover"),
    ratio: "4x3",
    client: "GastroForma",
    year: 2023,
    contentImages: [
      randomColor("industrial-3-1"),
      randomColor("industrial-3-2"),
      randomColor("industrial-3-3"),
    ],
  },
  {
    id: "cgi-3",
    title: "Architectural Interior CGI",
    description: "Photorealistic CGI showing interior spaces with natural lighting.",
    category: "CGI",
    coverColor: randomColor("cgi-3-cover"),
    ratio: "4x3",
    client: "Arq3D",
    year: 2022,
    contentImages: [
      randomColor("cgi-3-1"),
      randomColor("cgi-3-2"),
    ],
  },
  {
    id: "graphics-4",
    title: "Festival Branding",
    description: "Bold branding for an urban festival.",
    category: "Graphics",
    coverColor: randomColor("graphics-4-cover"),
    ratio: "4x3",
    client: "FestCity",
    year: 2024,
    contentImages: [
      randomColor("graphics-4-1"),
      randomColor("graphics-4-2"),
      randomColor("graphics-4-3"),
    ],
  },
  // ... puedes agregar más si lo deseas ...
];
