import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, User, Mail, Phone, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  phone: string | null;
  experience_years: number;
  education: string | null;
  is_active: boolean;
}

const DoctorsManager = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    bio: '',
    image_url: '',
    email: '',
    phone: '',
    experience_years: 0,
    education: '',
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: "Nu am putut încărca lista de doctori.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialization: '',
      bio: '',
      image_url: '',
      email: '',
      phone: '',
      experience_years: 0,
      education: '',
      is_active: true
    });
    setEditingDoctor(null);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      bio: doctor.bio || '',
      image_url: doctor.image_url || '',
      email: doctor.email || '',
      phone: doctor.phone || '',
      experience_years: doctor.experience_years,
      education: doctor.education || '',
      is_active: doctor.is_active
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDoctor) {
        const { error } = await supabase
          .from('doctors')
          .update(formData)
          .eq('id', editingDoctor.id);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Doctorul a fost actualizat cu succes."
        });
      } else {
        const { error } = await supabase
          .from('doctors')
          .insert([formData]);
          
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Doctorul a fost adăugat cu succes."
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchDoctors();
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
        .from('doctors')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Doctorul a fost șters cu succes."
      });
      
      fetchDoctors();
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "Nu am putut șterge doctorul.",
        variant: "destructive"
      });
    }
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
          <h2 className="text-2xl font-semibold">Gestionare Doctori</h2>
          <p className="text-foreground-muted">Adaugă și gestionează echipa medicală</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Adaugă Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDoctor ? 'Editează Doctor' : 'Adaugă Doctor Nou'}</DialogTitle>
              <DialogDescription>
                Completează informațiile doctorului
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nume</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specializare</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biografie</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                />
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience_years">Ani Experiență</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                  />
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
                <Label htmlFor="education">Educație</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  rows={2}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anulează
                </Button>
                <Button type="submit">
                  {editingDoctor ? 'Actualizează' : 'Adaugă'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {doctor.image_url ? (
                    <img 
                      src={doctor.image_url} 
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{doctor.name}</span>
                      {!doctor.is_active && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Inactiv
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>{doctor.specialization}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(doctor)}>
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
                          Ești sigur că vrei să ștergi doctorul {doctor.name}? Această acțiune nu poate fi anulată.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Anulează</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(doctor.id)}>
                          Șterge
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {doctor.bio && (
                <p className="text-sm text-foreground-muted mb-3">{doctor.bio}</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {doctor.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{doctor.email}</span>
                  </div>
                )}
                {doctor.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{doctor.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span>{doctor.experience_years} ani experiență</span>
                </div>
              </div>
              {doctor.education && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-foreground-muted">
                    <strong>Educație:</strong> {doctor.education}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {doctors.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <User className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
              <p className="text-foreground-muted">Nu există doctori adăugați încă.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorsManager;