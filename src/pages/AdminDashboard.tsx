import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Package, Upload, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import DoctorsManager from '@/components/admin/DoctorsManager';
import ProductsManager from '@/components/admin/ProductsManager';
import ImageUploader from '@/components/admin/ImageUploader';
import AdminStats from '@/components/admin/AdminStats';

const AdminDashboard = () => {
  const { patient, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (loading) return;
      
      if (!patient) {
        toast({
          title: "Acces restricționat",
          description: "Trebuie să te autentifici pentru a accesa panoul admin.",
          variant: "destructive"
        });
        navigate('/auth');
        return;
      }

      if (patient.role !== 'admin') {
        toast({
          title: "Acces interzis",
          description: "Nu ai permisiunea să accesezi panoul de administrare.",
          variant: "destructive"
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      setCheckingAuth(false);
    };

    checkAdminAccess();
  }, [patient, loading, navigate, toast]);

  if (loading || checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-32">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la Site
            </Button>
            <div>
              <h1 className="text-3xl font-display font-bold">Panou Administrare</h1>
              <p className="text-foreground-muted">Gestionează conținutul clinicii AEVUM</p>
            </div>
          </div>
        </div>

        <AdminStats />

        <Tabs defaultValue="doctors" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="doctors" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Doctori</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Produse</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Imagini</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Setări</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="space-y-6">
            <DoctorsManager />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductsManager />
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <ImageUploader />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Setări Generale</h3>
              <p className="text-foreground-muted">
                Setările generale vor fi disponibile în curând.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;