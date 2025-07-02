
import React from "react";
import { X } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ImageZoomModal({ src, alt, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
          style={{ background: "#fbfbfb" }}
        />
      </div>
    </div>
  );
}
