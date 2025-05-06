
import React from "react";

const Contact = ({ minimal }: { minimal?: boolean }) => (
  <div className={`max-w-xl mx-auto font-inter text-stone-700 ${minimal ? "" : "bg-white rounded-xl shadow"} md:ml-0 md:mr-auto px-4 md:px-6`}>
    <h1 className="text-3xl font-bold mb-4">Let's Talk</h1>
    
    <div className="text-base space-y-4 pb-8">
      <p>
        Whether you have a project in mind, a question, or just want to connect — I'd love to hear from you. Feel free to reach out by email or WhatsApp:
      </p>
      
      <div className="mt-6">
        <p className="mb-2">
          <a href="mailto:santiagoruiz.rz@gmail.com" className="text-blue-600 hover:underline">
            santiagoruiz.rz@gmail.com
          </a>
        </p>
        <p>
          <a href="https://wa.me/5493816155819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            +54 9 381 6155819
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Contact;
