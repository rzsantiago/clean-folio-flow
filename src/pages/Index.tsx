
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CategoryFilter from "@/components/CategoryFilter";
import ProjectGallery from "@/components/ProjectGallery";
import { projects } from "@/data/projects";

// Extrae todas las categorías únicas
const categories = Array.from(new Set(projects.map(p => p.category)));

const Index = () => {
  const [catFilter, setCatFilter] = useState<string | null>(null);

  const filteredProjects = catFilter
    ? projects.filter(p => p.category === catFilter)
    : projects;

  return (
    <div className="min-h-screen bg-stone-100 font-inter flex flex-col items-center">
      <Navbar />
      <main className="w-full max-w-6xl px-4 mt-10">
        <CategoryFilter
          categories={categories}
          active={catFilter}
          onSelect={setCatFilter}
        />
        <ProjectGallery projects={filteredProjects} />
      </main>
      <footer className="w-full text-center py-10 text-stone-400 text-sm font-inter">
        © {new Date().getFullYear()} cleanfolio — Puedes modificar este pie de página en <b>src/pages/Index.tsx</b>
      </footer>
    </div>
  );
};

export default Index;
