
import React from "react";

// Sección About sencilla, personalizable

const About = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto py-12 px-4 font-inter text-stone-700 text-lg ${minimal ? "" : "bg-white rounded-xl shadow"} md:ml-0 md:mr-auto md:px-0 flex flex-col items-start`}>
    {/* Imagen cuadrada centrada arriba, será tu foto (ida de referencia) */}
    <div className="w-40 h-40 bg-stone-200 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
      <img 
        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=cover&auto=format"
        alt="Foto personal"
        className="w-full h-full object-cover"
      />
    </div>
    <p>
      ¡Hola! Soy un/a diseñador/a multidisciplinar con pasión por el diseño industrial, artes gráficas y el CGI. 
      Este portfolio es una selección de mis proyectos favoritos.
    </p>
    <p className="mt-4 text-stone-500 text-base">
      Puedes personalizar esta sección en <b>src/pages/About.tsx</b>.<br />
      Contacto, info, redes, etc.
    </p>
  </div>
);

export default About;
