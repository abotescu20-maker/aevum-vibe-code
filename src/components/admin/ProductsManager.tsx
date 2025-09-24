import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Package, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_active: boolean;
}

const CATEGORIES = [
  { value: 'dermato-cosmetice', label: 'Dermato-Cosmetice' },
  { value: 'suplimente', label: 'Suplimente' },
  { value: 'vouchere', label: 'Vouchere Cadou' }
];

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    original_price: 0,
    category: '',
    image_url: '',
    rating: 0,
    review_count: 0,
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: "Nu am putut încărca lista de produse.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      original_price: 0,
      category: '',
      image_url: '',
      rating: 0,
      review_count: 0,
      is_active: true
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      original_price: product.original_price || 0,
      category: product.category,
      image_url: product.image_url || '',
      rating: product.rating,
      review_count: product.review_count,
      is_active: product.is_active
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        original_price: formData.original_price > 0 ? formData.original_price : null,
        category: formData.category as any // Type assertion for Supabase enum
      };
      
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(submitData)
          .eq('id', editingProduct.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Produsul a fost actualizat cu succes."
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([submitData]);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Produsul a fost adăugat cu succes."
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Produsul a fost șters cu succes."
      });
      
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "Nu am putut șterge produsul.",
        variant: "destructive"
      });
    }
  };

  const getCategoryLabel = (category: string) => {
    return CATEGORIES.find(cat => cat.value === category)?.label || category;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gestionare Produse</h2>
          <p className="text-foreground-muted">Adaugă și gestionează produsele din webshop</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Produs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Editează Produs' : 'Adaugă Produs Nou'}</DialogTitle>
              <DialogDescription>
                Completează informațiile produsului
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nume Produs</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label>Activ</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">URL Imagine</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/imagine.jpg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preț (RON)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Preț Original (RON)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.original_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, original_price: parseFloat(e.target.value) || 0 }))}
                    placeholder="Opțional pentru reduceri"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review_count">Număr Recenzii</Label>
                  <Input
                    id="review_count"
                    type="number"
                    min="0"
                    value={formData.review_count}
                    onChange={(e) => setFormData(prev => ({ ...prev, review_count: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anulează
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Actualizează' : 'Adaugă'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{product.name}</span>
                      {!product.is_active && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Inactiv
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span>{getCategoryLabel(product.category)}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{product.rating.toFixed(1)} ({product.review_count})</span>
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmare ștergere</AlertDialogTitle>
                        <AlertDialogDescription>
                          Ești sigur că vrei să ștergi produsul {product.name}? Această acțiune nu poate fi anulată.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Anulează</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(product.id)}>
                          Șterge
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {product.description && (
                <p className="text-sm text-foreground-muted mb-3">{product.description}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{product.price} RON</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-sm text-foreground-muted line-through">
                      {product.original_price} RON
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {products.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Package className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">Nu există produse adăugate încă.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProductsManager;