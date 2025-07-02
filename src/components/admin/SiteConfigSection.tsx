
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/ImageUploader';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Settings, Image as ImageIcon } from 'lucide-react';

export function SiteConfigSection() {
  const { config, updateConfig, isUpdating } = useSiteConfig();
  const [aboutImageUrl, setAboutImageUrl] = useState(config.about_image_url || '');

  React.useEffect(() => {
    setAboutImageUrl(config.about_image_url || '');
  }, [config.about_image_url]);

  const handleImageChange = (imageUrl: string) => {
    setAboutImageUrl(imageUrl);
  };

  const handleSave = () => {
    updateConfig({ key: 'about_image_url', value: aboutImageUrl });
  };

  const hasChanges = aboutImageUrl !== (config.about_image_url || '');

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Settings className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <CardTitle className="text-xl">Configuración del Sitio</CardTitle>
          <CardDescription>
            Gestiona los elementos visuales de tu portafolio
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-medium">Imagen de About</h3>
          </div>
          
          <div className="border rounded-lg p-4 bg-slate-50">
            <ImageUploader
              onChange={handleImageChange}
              initialImage={aboutImageUrl}
              accept="image/*"
            />
          </div>
          
          {hasChanges && (
            <div className="flex justify-end pt-4 border-t">
              <Button 
                onClick={handleSave} 
                disabled={isUpdating}
                className="bg-slate-900 hover:bg-slate-800"
              >
                {isUpdating ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
