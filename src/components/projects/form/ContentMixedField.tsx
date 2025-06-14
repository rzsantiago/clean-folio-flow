
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ImageUploader";
import { ContentItem } from "@/types/projects";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AddProjectFormData } from "@/types/projects";
import { Plus, X, MoveUp, MoveDown, Image, Type } from "lucide-react";

type ContentMixedFieldProps = {
  setValue: UseFormSetValue<AddProjectFormData>;
  watch: UseFormWatch<AddProjectFormData>;
};

export function ContentMixedField({ setValue, watch }: ContentMixedFieldProps) {
  const contentItems = watch("contentItems") || [];
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [newText, setNewText] = useState("");

  const addImage = (url: string) => {
    const newItem: ContentItem = {
      type: 'image',
      content: url,
      id: `item-${Date.now()}-${Math.random()}`
    };
    setValue("contentItems", [...contentItems, newItem]);
    setShowImageUpload(false);
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
        <div className="border rounded-lg p-4 bg-slate-50">
          <Label className="text-sm text-slate-600 mb-2 block">Subir nueva imagen</Label>
          <ImageUploader onChange={addImage} />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowImageUpload(false)}
            className="mt-2"
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
