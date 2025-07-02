
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageZoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
};

export function ImageZoomModal({ isOpen, onClose, imageSrc, imageAlt }: ImageZoomModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/30 text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain rounded-lg"
          style={{
            backgroundColor: imageSrc.endsWith('.png') ? '#fbfbfb' : 'transparent'
          }}
        />
      </div>
    </div>
  );
}
