
import { useState, useEffect } from "react";

export function useFadeTransition(deps: any[], fadeMs = 350) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, deps);

  return {
    fadeClass: visible ? "animate-fade-in" : "opacity-0 pointer-events-none", // Tailwind anima fade-in
  }
}
