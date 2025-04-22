
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import Navbar from "@/components/Navbar";
import MainContent, { MainSection } from "@/components/MainContent";
import SidebarNavigation from "@/components/SidebarNavigation";

// --- CATEGORIAS ---
const categories = [
  "Industrial Design",
  "Graphics",
  "CGI"
];

// Menu y estructura textual
const menuEntries = [
  { type: "gallery", label: "Overview", filter: null } as const,
  ...categories.map(c => ({ type: "gallery", label: c, filter: c } as const)),
  { type: "about", label: "About" } as const,
  { type: "contact", label: "Contact" } as const,
];

const Index = () => {
  // Guardar tanto sección principal como "filtro/categoría de origen"
  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Trackea la categoría activa para resaltar en Sidebar (persistente al entrar a proyectos)
  const activeCategory = (main.type === "gallery")
    ? main.filter
    : (main.type === "project" ? main.fromFilter : null);

  // Bloquear scroll body cuando menu está abierto
  useEffect(() => {
    if (isMobile && menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen, isMobile]);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <Navbar onHome={() => setMain({ type: "gallery", filter: null })} />
      <div className="flex-1 flex flex-row w-full max-w-[1600px] mx-auto mt-20 md:mt-28 px-0 md:px-10 gap-4 md:gap-8 transition-none">
        {/* Sidebar a la izquierda, para todos los casos mantiene su min/max width */}
        <SidebarNavigation
          main={main}
          setMain={setMain}
          menuEntries={menuEntries}
          activeCategory={activeCategory}
          isMobile={isMobile}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <MainContent main={main} setMain={setMain} isMobile={isMobile} />
        {/* Mobile Menu: hamburguesa */}
        {isMobile && (
          <>
            <button
              className="fixed z-40 top-3 right-3 p-2 rounded-md bg-white border border-stone-200"
              onClick={() => setMenuOpen(v => !v)}
              style={{ top: 22, boxShadow: "none" }}
              aria-label="Menu"
            >
              <Menu className="w-7 h-7 text-stone-700" />
            </button>
          </>
        )}
      </div>
      <footer className="w-full text-center py-10 text-stone-300 text-xs font-inter"
        style={{ background: "#fff", boxShadow: "none" }}>
        © {new Date().getFullYear()} Santiago Ruiz
      </footer>
    </div>
  );
};

export default Index;
