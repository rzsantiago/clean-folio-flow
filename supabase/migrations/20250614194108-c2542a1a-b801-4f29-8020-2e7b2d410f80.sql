
-- Renombrar la columna contentimages a contentitems para que coincida con el código
ALTER TABLE public.projects 
RENAME COLUMN contentimages TO contentitems;
