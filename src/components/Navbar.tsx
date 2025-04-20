
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onHome }: { onHome?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed left-0 top-0 w-full z-20 py-6 px-8 bg-transparent">
      <button
        className={`text-2xl md:text-3xl font-bold font-inter tracking-tight text-stone-700 hover:underline duration-100`}
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
        cleanfolio
      </button>
    </header>
  );
}
