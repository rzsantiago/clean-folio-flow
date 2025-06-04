
import { useState, useEffect } from "react";

export function useFadeTransition(deps: any[], fadeMs = 400) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, deps);

  return {
    fadeClass: visible 
      ? "animate-fade-in" 
      : "opacity-0 pointer-events-none animate-fade-out",
  }
}
