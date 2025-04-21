
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onHome }: { onHome?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed left-0 top-0 w-full z-30 py-4 px-0 md:px-0 bg-white border-b border-stone-200 drop-shadow-sm">
      <div className="mx-auto flex items-center justify-between max-w-[1600px] px-3 md:px-10">
        <button
          className="text-2xl md:text-3xl font-bold font-inter tracking-tight text-stone-700 hover:underline duration-100 bg-white rounded-xl px-4 py-2"
          onClick={() => {
            if (onHome) {
              onHome();
            } else {
              navigate("/");
            }
          }}
          aria-current={location.pathname === "/" ? "page" : undefined}
          tabIndex={0}
          style={{
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}
        >
          cleanfolio
        </button>
        {/* Aquí deberías agregar el botón de menú hamburguesa en mobile,
          el menú real lo implementaremos en Index.tsx para tener el control */}
      </div>
    </header>
  );
}

