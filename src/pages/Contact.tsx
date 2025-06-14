import React from "react";

const Contact = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto font-helnow-regular text-stone-700 ${minimal ? "" : "bg-white rounded-xl shadow px-4 md:px-6"} md:ml-0 md:mr-auto`}>
    <h1 className="font-helnow-regular text-3xl md:text-2xl text-stone-700 mb-4">LET'S TALK</h1>
    
    <div className="text-base space-y-4 pb-8">
      <p>
        Whether you have a project in mind, a question, or just want to connect — I'd love to hear from you. Feel free to reach out by email or WhatsApp:
      </p>
      
      <div className="mt-6">
        <p className="mb-2">
          <a href="mailto:santiagoruiz.rz@gmail.com" className="text-stone-900 hover:text-stone-600 transition-colors underline">
            santiagoruiz.rz@gmail.com
          </a>
        </p>
        <p>
          <a href="https://wa.me/5493816155819" target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:text-stone-600 transition-colors underline">
            +54 9 381 6155819
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Contact;
