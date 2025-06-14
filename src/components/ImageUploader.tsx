
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  onChange: (imageUrl: string) => void;
  initialImage?: string;
  accept?: string;
};

export function ImageUploader({ onChange, initialImage, accept = "image/*" }: Props) {
  const [loading, setLoading] = React.useState(false);
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('projects')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {initialImage && (
        <div className="relative w-full max-w-[200px] aspect-square rounded-lg overflow-hidden bg-gray-100 group">
          <img 
            src={initialImage} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button 
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="bg-red-500/90 hover:bg-red-500"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      <Button 
        variant="outline" 
        className="gap-2" 
        disabled={loading}
        asChild
      >
        <label>
          <input
            type="file"
            accept={accept}
            onChange={handleUpload}
            className="hidden"
          />
          {loading ? (
            "Subiendo..."
          ) : (
            <>
              {initialImage ? <Image className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
              {initialImage ? "Cambiar imagen" : "Subir imagen"}
            </>
          )}
        </label>
      </Button>
    </div>
  );
}
