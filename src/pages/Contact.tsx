
const Contact = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto py-12 px-4 font-inter text-stone-700 text-lg ${minimal ? "" : "bg-white rounded-xl shadow"} md:ml-0 md:mr-auto md:px-0`}>
    <h1 className="text-3xl font-bold mb-4">Contacto</h1>
    <p>
      ¿Querés contactarme o saber más? Podés escribirme a <a href="mailto:contacto@email.com" className="underline">contacto@email.com</a> o buscarme en mis redes.
    </p>
    <p className="mt-4 text-stone-500 text-base">
      Personalizá esta sección en <b>src/pages/Contact.tsx</b>.<br />
      Links a redes, formas de contacto, etc.
    </p>
  </div>
);

export default Contact;
