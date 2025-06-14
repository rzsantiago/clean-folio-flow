
-- Crear nuevas políticas RLS para la tabla projects

-- Permitir acceso público de lectura (para mostrar proyectos en el portafolio)
CREATE POLICY "Enable read access for all users" ON "public"."projects"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Permitir inserción sin restricciones (para agregar nuevos proyectos)
CREATE POLICY "Enable insert for all users" ON "public"."projects"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Permitir actualización sin restricciones (para editar proyectos)
CREATE POLICY "Enable update for all users" ON "public"."projects"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Permitir eliminación sin restricciones (para borrar proyectos)
CREATE POLICY "Enable delete for all users" ON "public"."projects"
AS PERMISSIVE FOR DELETE
TO public
USING (true);
