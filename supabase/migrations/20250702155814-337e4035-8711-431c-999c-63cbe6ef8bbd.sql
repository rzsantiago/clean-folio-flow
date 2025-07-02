
-- Crear tabla para configuración del sitio
CREATE TABLE public.site_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir acceso completo (ya que es administración)
CREATE POLICY "Enable read access for all users" 
  ON public.site_config 
  FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for all users" 
  ON public.site_config 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update for all users" 
  ON public.site_config 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Enable delete for all users" 
  ON public.site_config 
  FOR DELETE 
  USING (true);

-- Insertar la configuración inicial para la imagen del About
INSERT INTO public.site_config (key, value) 
VALUES ('about_image_url', '/lovable-uploads/fe43cc7a-4a41-4d42-863a-db719dbb6c7d.png')
ON CONFLICT (key) DO NOTHING;
