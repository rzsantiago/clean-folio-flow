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
  const [main, setMain] = useState<MainSection>({ type: "gallery", filter: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
        <MainContent main={main} setMain={setMain} isMobile={isMobile} />
        <SidebarNavigation main={main} setMain={setMain} menuEntries={menuEntries} />
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
            {menuOpen && (
              <div
                className="fixed z-50 inset-0 bg-black/30"
                onClick={() => setMenuOpen(false)}
              >
                <div
                  className="fixed right-0 top-0 bg-white h-full w-64 flex flex-col p-6 gap-1"
                  style={{
                    paddingTop: 90,
                    zIndex: 100,
                    boxShadow: "none"
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  {menuEntries.map(entry => (
                    <button
                      key={entry.label}
                      className={`text-left w-full py-2 px-2 rounded-md text-lg ${
                        main.type === entry.type &&
                        (entry.type === "gallery"
                          ? (main.type === "gallery" &&
                            ((main.filter == null && 'filter' in entry && entry.filter == null) ||
                            (main.filter === ('filter' in entry ? entry.filter : undefined)))
                          )
                          : false
                        )
                          ? "text-black bg-stone-100"
                          : "text-stone-500"
                      } hover:bg-stone-100`}
                      onClick={() => {
                        setMenuOpen(false);
                        if (entry.type === "gallery") {
                          setMain({
                            type: "gallery",
                            filter: 'filter' in entry ? entry.filter ?? null : null
                          });
                        } else if (entry.type === "about") {
                          setMain({ type: "about" });
                        } else if (entry.type === "contact") {
                          setMain({ type: "contact" });
                        }
                      }}
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
