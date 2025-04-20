
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "Proyectos", to: "/" },
  { label: "About", to: "/about" }
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="w-full px-4 py-5 flex justify-between items-center bg-stone-100/90 sticky top-0 z-30 backdrop-blur border-b border-stone-200">
      <div className="text-xl font-bold font-inter tracking-tight text-stone-600">
        cleanfolio
      </div>
      <ul className="flex space-x-8">
        {menu.map(item => (
          <li key={item.to}>
            <Link to={item.to} className={`font-inter text-base transition-colors duration-200 hover:text-stone-900 ${location.pathname === item.to ? "font-semibold underline underline-offset-4" : "text-stone-600"}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
