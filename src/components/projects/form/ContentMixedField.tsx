
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ImageUploader";
import { ContentItem } from "@/types/projects";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddProjectFormData } from "@/types/projects";
import { Plus, X, MoveUp, MoveDown, Image, Type, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ContentMixedFieldProps = {
  setValue: UseFormSetValue<AddProjectFormData>;
  watch: UseFormWatch<AddProjectFormData>;
};

export function ContentMixedField({ setValue, watch }: ContentMixedFieldProps) {
  const contentItems = watch("contentItems") || [];
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [newText, setNewText] = useState("");
  const [uploading, setUploading] = useState(false);

  const addImage = (url: string) => {
    const newItem: ContentItem = {
      type: 'image',
      content: url,
      id: `item-${Date.now()}-${Math.random()}`
    };
    setValue("contentItems", [...contentItems, newItem]);
  };

  const handleMultipleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);

        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      const newItems: ContentItem[] = uploadedUrls.map(url => ({
        type: 'image',
        content: url,
        id: `item-${Date.now()}-${Math.random()}`
      }));

      setValue("contentItems", [...contentItems, ...newItems]);
      setShowImageUpload(false);
      
      toast({
        title: "Imágenes subidas",
        description: `${uploadedUrls.length} imágenes fueron subidas correctamente.`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error al subir imágenes",
        description: "Ocurrió un error al subir las imágenes. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const addText = () => {
    if (!newText.trim()) return;
    
    const newItem: ContentItem = {
      type: 'text',
      content: newText.trim(),
      id: `item-${Date.now()}-${Math.random()}`
    };
    setValue("contentItems", [...contentItems, newItem]);
    setNewText("");
    setShowTextInput(false);
  };

  const removeItem = (id: string) => {
    setValue("contentItems", contentItems.filter(item => item.id !== id));
  };

  const moveItem = (id: string, direction: "up" | "down") => {
    const index = contentItems.findIndex(item => item.id === id);
    if (index === -1) return;

    const newItems = [...contentItems];
    if (direction === "up" && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === "down" && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    
    setValue("contentItems", newItems);
  };

  return (
    <div className="space-y-4">
      <Label>Contenido del proyecto</Label>
      
      {/* Botones para agregar contenido */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowImageUpload(!showImageUpload)}
        >
          <Image className="w-4 h-4 mr-2" />
          Agregar imagen
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowTextInput(!showTextInput)}
        >
          <Type className="w-4 h-4 mr-2" />
          Agregar texto
        </Button>
      </div>

      {/* Upload de imagen */}
      {showImageUpload && (
        <div className="border rounded-lg p-4 bg-slate-50 space-y-4">
          <div>
            <Label className="text-sm text-slate-600 mb-2 block">Subir imagen individual</Label>
            <ImageUploader onChange={addImage} />
          </div>
          
          <div className="border-t pt-4">
            <Label className="text-sm text-slate-600 mb-2 block">O subir múltiples imágenes</Label>
            <Button
              variant="outline"
              className="gap-2"
              disabled={uploading}
              asChild
            >
              <label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImageUpload}
                  className="hidden"
                />
                {uploading ? (
                  "Subiendo..."
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Subir múltiples imágenes
                  </>
                )}
              </label>
            </Button>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowImageUpload(false)}
          >
            Cancelar
          </Button>
        </div>
      )}

      {/* Input de texto */}
      {showTextInput && (
        <div className="border rounded-lg p-4 bg-slate-50">
          <Label className="text-sm text-slate-600 mb-2 block">Agregar texto</Label>
          <Textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Escribe el texto aquí..."
            rows={3}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={addText}>
              Agregar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowTextInput(false);
                setNewText("");
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de contenido */}
      {contentItems.length > 0 && (
        <div className="space-y-3">
          {contentItems.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-3 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  {item.type === 'image' ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Image className="w-4 h-4" />
                        Imagen
                      </div>
                      <img
                        src={item.content}
                        alt={`Imagen ${index + 1}`}
                        className="w-32 h-24 object-cover rounded border"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Type className="w-4 h-4" />
                        Texto
                      </div>
                      <p className="text-sm bg-slate-50 p-2 rounded border">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Controles */}
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(item.id, "up")}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(item.id, "down")}
                    disabled={index === contentItems.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
