
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar({ onHome }: { onHome?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <header className="fixed left-0 top-0 w-full z-30 py-4 px-0 md:px-0 bg-white"
      style={{ boxShadow: "none", background: "#fff" }}
    >
      <div className="mx-auto flex items-center justify-between max-w-[1600px] px-3 md:px-10 h-12" style={{ minHeight: 48 }}>
        <button
          className="text-2xl md:text-3xl font-bold font-inter tracking-tight text-stone-700 hover:underline duration-100 bg-white rounded-xl px-0 md:px-0 flex items-center"
          style={{
            marginLeft: "0px",
            paddingLeft: "0px",
            ...(window.innerWidth >= 768 ? { marginLeft: "0px" } : {}),
            // Quita border y centra verticalmente
            border: "none"
          }}
          onClick={() => {
            if (onHome) {
              onHome();
            } else {
              navigate("/");
            }
          }}
          aria-current={location.pathname === "/" ? "page" : undefined}
          tabIndex={0}
        >
          Santiago Ruiz
        </button>
        {/* Hacemos space entre logo y hamburguesa, vertical y horizontal centrados */}
        {isMobile && (
          <button
            className="p-2 rounded-md bg-white border border-stone-200"
            style={{ boxShadow: "none", height: 40, width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Menu"
            tabIndex={0}
          >
            <Menu className="w-7 h-7 text-stone-700" />
          </button>
        )}
      </div>
    </header>
  );
}
