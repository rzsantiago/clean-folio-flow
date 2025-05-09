
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ImageUploader";
import { ContentImageList } from './ContentImageList';
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddProjectFormData } from "@/types/projects";

type ContentImagesFieldProps = {
  setValue: UseFormSetValue<AddProjectFormData>;
  watch: UseFormWatch<AddProjectFormData>;
  register: any; // Using any for simplicity
};

export function ContentImagesField({ register, setValue, watch }: ContentImagesFieldProps) {
  const contentImagesString = watch("contentImages") || "";
  const contentImagesList = contentImagesString.split("\n").filter(Boolean);
  
  // Function to add a new image to the list
  const handleAddImage = (url: string) => {
    const current = watch("contentImages") || "";
    const images = current ? current.split("\n").filter(Boolean) : [];
    
    // Avoid duplicates
    if (!images.includes(url)) {
      images.push(url);
      setValue("contentImages", images.join("\n"));
    }
  };

  // Function to remove an image from the list
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...contentImagesList];
    updatedImages.splice(index, 1);
    setValue("contentImages", updatedImages.join("\n"));
  };

  // Function to reorder images
  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const updatedImages = [...contentImagesList];
    
    if (direction === "up" && index > 0) {
      // Swap with previous image
      [updatedImages[index], updatedImages[index - 1]] = 
      [updatedImages[index - 1], updatedImages[index]];
    } else if (direction === "down" && index < updatedImages.length - 1) {
      // Swap with next image
      [updatedImages[index], updatedImages[index + 1]] = 
      [updatedImages[index + 1], updatedImages[index]];
    }
    
    setValue("contentImages", updatedImages.join("\n"));
  };
  
  return (
    <div>
      <Label>Imágenes de contenido</Label>
      <ImageUploader 
        onChange={handleAddImage}
      />
      
      {contentImagesList.length > 0 && (
        <ContentImageList 
          images={contentImagesList}
          onRemove={handleRemoveImage}
          onMove={handleMoveImage}
        />
      )}
      
      {/* Hidden textarea to store the images as string */}
      <Textarea
        {...register("contentImages")}
        className="hidden"
      />
    </div>
  );
}
