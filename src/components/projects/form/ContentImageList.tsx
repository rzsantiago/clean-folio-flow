
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

type ContentImageListProps = {
  images: string[];
  onRemove: (index: number) => void;
  onMove: (index: number, direction: "up" | "down") => void;
};

export function ContentImageList({ images, onRemove, onMove }: ContentImageListProps) {
  if (!images.length) return null;
  
  return (
    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((img, index) => (
        <div key={index} className="relative group">
          <div className="aspect-square w-full overflow-hidden rounded-md">
            <img 
              src={img} 
              alt={`Imagen de contenido ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button"
              variant="destructive" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => onRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              type="button"
              variant="secondary" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => onMove(index, "up")}
              disabled={index === 0}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button 
              type="button"
              variant="secondary" 
              size="icon" 
              className="h-7 w-7" 
              onClick={() => onMove(index, "down")}
              disabled={index === images.length - 1}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
