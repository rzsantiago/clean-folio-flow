
import React, { useState } from "react";
import { projects } from "@/data/projects";
import { SidebarMenu } from "@/components/SidebarMenu";
import ProjectGallery from "@/components/ProjectGallery";
import Navbar from "@/components/Navbar";

// Todas las categorías únicas
const categories = Array.from(new Set(projects.map(p => p.category)));

const Index = () => {
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const filtered = catFilter ? projects.filter(p => p.category === catFilter) : projects;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-inter">
      <Navbar />
      <div className="flex-1 flex flex-row w-full max-w-[1600px] mx-auto mt-20 md:mt-28 px-0 md:px-10 gap-0 md:gap-2">
        <main className="w-[100vw] md:w-[70%] max-w-[100%] md:pr-6 pt-4 pb-14 md:pb-0 flex items-start justify-center">
          <ProjectGallery projects={filtered} />
        </main>
        <div className="hidden md:flex w-[30%] max-w-xs min-w-[210px]">
          <SidebarMenu categories={categories} active={catFilter} onSelect={setCatFilter} />
        </div>
      </div>
      <footer className="w-full text-center py-10 text-stone-300 text-xs font-inter">
        © {new Date().getFullYear()} cleanfolio — Puedes modificar este pie de página en <b>src/pages/Index.tsx</b>
      </footer>
    </div>
  );
};

export default Index;
