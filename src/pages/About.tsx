
import React from "react";

const PHOTO_URL = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=1100&h=900&q=80";

const About = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto font-inter text-stone-700 text-lg ${minimal ? "" : "bg-white rounded-xl shadow"} md:ml-0 md:mr-auto pl-4 md:px-0`}>
    <div className="w-full mb-8 rounded-xl overflow-hidden" style={{ height: 500, maxHeight: "60vw", minHeight: 240, background: "#eee" }}>
      <img
        src={PHOTO_URL}
        alt="Foto personal"
        className="w-full h-full object-cover object-center"
        style={{ height: "100%", width: "100%", display: "block" }}
        draggable={false}
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
