import React from "react";

const PHOTO_URL = "/lovable-uploads/fe43cc7a-4a41-4d42-863a-db719dbb6c7d.png";

const About = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto font-helnow-regular text-stone-700 ${minimal ? "" : "bg-white rounded-xl shadow"} md:ml-0 md:mr-auto ${minimal ? "" : "px-4 md:px-6"}`}>
    <div className="w-full mb-8 rounded-xl overflow-hidden" style={{ height: 500, maxHeight: "60vw", minHeight: 240, background: "#eee" }}>
      <img
        src={PHOTO_URL}
        alt="Santiago Ruiz"
        className="w-full h-full object-cover object-center"
        style={{ height: "100%", width: "100%", display: "block" }}
        draggable={false}
      />
    </div>
    
    <div className="text-base space-y-4 pb-8">
      <p>
        I'm an industrial designer with a solid technical background in machinery, tools, and manufacturing processes. I'm passionate not only about the creative process of bringing new ideas to life, but also about the research and conceptual development that builds a strong foundation for any project.
      </p>
      
      <p>
        Currently, I work part-time as a designer at <a href="https://sich.design" target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:text-stone-600 transition-colors underline">sich.design</a> studio, where I lead and execute projects from their earliest stages — from research and ideation to the creation of all the technical materials required for final production. I collaborate closely with professionals from different fields to develop efficient, accelerated solutions with meaningful results. I also have advanced skills in 3D modeling and visualization, which I integrate seamlessly into my workflow.
      </p>
      
      <p>
        Outside of my professional work, I enjoy creating products and objects tailored to my everyday needs or personal challenges. This hands-on approach constantly pushes me to explore new tools and technologies — from basic electronics and programming to rapid prototyping.
      </p>
      
      <div className="mt-6">
        <h2 className="text-base mb-2">Academic Background</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mechanical-Electrical Technician (2006–2013) — Instituto Técnico U.N.T.</li>
          <li>Industrial Engineering (2014) — Universidad Nacional de Tucumán</li>
          <li>Industrial Design (2015–2021) — Universidad de San Pablo Tucumán</li>
        </ul>
      </div>
      
      <p className="mt-6">
        Whether you're looking for collaboration, creative insight, or technical expertise — feel free to get in touch. I'm always open to new conversations and exciting projects.
      </p>
    </div>
  </div>
);

export default About;
