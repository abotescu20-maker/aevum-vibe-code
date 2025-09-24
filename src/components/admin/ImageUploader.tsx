import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, Copy, ExternalLink, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// We'll create a simple file input instead of dropzone for now

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Array<{ name: string, url: string }>>([]);
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    
    try {
      const newImages: Array<{ name: string, url: string }> = [];
      
      for (const file of Array.from(files)) {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('medical-images')
          .upload(fileName, file);
          
        if (error) {
          throw error;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('medical-images')
          .getPublicUrl(fileName);
          
        newImages.push({ name: fileName, url: publicUrl });
      }
      
      setUploadedImages(prev => [...prev, ...newImages]);
      
      toast({
        title: "Success",
        description: `${files.length} imagine(i) încărcată(e) cu succes.`
      });
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "Eroare la încărcarea imaginilor.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiat",
      description: "URL-ul imaginii a fost copiat în clipboard."
    });
  };

  const deleteImage = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('medical-images')
        .remove([fileName]);
        
      if (error) throw error;
      
      setUploadedImages(prev => prev.filter(img => img.name !== fileName));
      
      toast({
        title: "Success",
        description: "Imaginea a fost ștearsă cu succes."
      });
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "Nu am putut șterge imaginea.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Upload Imagini</h2>
        <p className="text-foreground-muted">Încarcă imagini pentru produse, doctori și conținut</p>
      </div>

      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Încarcă Imagini Noi</span>
          </CardTitle>
          <CardDescription>
            Drag & drop sau click pentru a selecta imagini (JPG, PNG, WEBP, GIF)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files);
                }
              }}
              disabled={uploading}
            />
            
            {uploading && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-foreground-muted mt-2">Se încarcă...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* URL Input Alternative */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="w-5 h-5" />
            <span>Sau Adaugă prin URL</span>
          </CardTitle>
          <CardDescription>
            Adaugă imagini existente prin URL extern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="https://example.com/imagine.jpg"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  const url = input.value.trim();
                  if (url) {
                    setUploadedImages(prev => [...prev, { 
                      name: url.split('/').pop() || 'external-image', 
                      url 
                    }]);
                    input.value = '';
                    toast({
                      title: "Success",
                      description: "Imaginea a fost adăugată."
                    });
                  }
                }
              }}
            />
            <Button
              onClick={(e) => {
                const input = (e.target as HTMLElement).parentElement?.querySelector('input') as HTMLInputElement;
                const url = input?.value.trim();
                if (url) {
                  setUploadedImages(prev => [...prev, { 
                    name: url.split('/').pop() || 'external-image', 
                    url 
                  }]);
                  input.value = '';
                  toast({
                    title: "Success",
                    description: "Imaginea a fost adăugată."
                  });
                }
              }}
            >
              Adaugă
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Image className="w-5 h-5" />
              <span>Imagini Disponibile ({uploadedImages.length})</span>
            </CardTitle>
            <CardDescription>
              Click pe URL pentru a copia în clipboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{image.name}</p>
                    <button
                      onClick={() => copyToClipboard(image.url)}
                      className="text-xs text-primary hover:underline"
                    >
                      {image.url}
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(image.url)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(image.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    {!image.url.startsWith('http') && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteImage(image.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUploader;