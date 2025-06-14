
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

// Contraseña hardcodeada para acceso administrativo (en producción deberías usar algo más seguro)
const ADMIN_PASSWORD = "admin123";

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si ya está autenticado en localStorage
    const checkAuth = () => {
      const isAdminAuth = localStorage.getItem('isAdminAuth');
      const authValue = isAdminAuth === 'true';
      setIsAdmin(authValue);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminAuth', 'true');
      setIsAdmin(true);
      toast({
        title: "Autenticación exitosa",
        description: "Has iniciado sesión como administrador",
      });
      return true;
    } else {
      toast({
        title: "Error de autenticación",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('isAdminAuth');
    setIsAdmin(false);
    navigate('/admin');
    toast({
      title: "Sesión finalizada",
      description: "Has cerrado sesión como administrador",
    });
  };

  return { isAdmin, loading, login, logout };
}
