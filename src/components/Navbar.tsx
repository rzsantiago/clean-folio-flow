
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onHome }: { onHome?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed left-0 top-0 w-full z-30 py-4 px-0 md:px-0 bg-white border-b border-stone-200"
      style={{ boxShadow: "none", background: "#fff" }}
    >
      <div className="mx-auto flex items-center justify-between max-w-[1600px] px-3 md:px-10">
        <button
          className="text-2xl md:text-3xl font-bold font-inter tracking-tight text-stone-700 hover:underline duration-100 bg-white rounded-xl px-0 md:px-0"
          style={{
            marginLeft: "0px",        // mobile alineado a borde
            paddingLeft: "0px",
            // margin izquierdo grande para desktop igual que galería/textos
            // 40px = md:px-10, pero usamos px-10 que son 2.5rem = 40px para mantenerlo parejo
            ...(window.innerWidth >= 768 ? { marginLeft: "0px" } : {})
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
      </div>
    </header>
  );
}
