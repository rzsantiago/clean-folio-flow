
import { createClient } from "@supabase/supabase-js";

// Usa las variables de entorno que Lovable gestiona automáticamente (puedes verlas/configurarlas en la UI de Integraciones)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
