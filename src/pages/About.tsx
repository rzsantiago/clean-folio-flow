
// Sección About sencilla, personalizable

const About = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto py-12 px-4 font-inter text-stone-700 text-lg ${minimal ? "" : "bg-white rounded-xl shadow"} md:ml-0 md:mr-auto md:px-0`}>
    <h1 className="text-3xl font-bold mb-4">Sobre mí</h1>
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
