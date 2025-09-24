import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';

interface Stats {
  totalDoctors: number;
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalDoctors: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch doctors count
      const { count: doctorsCount } = await supabase
        .from('doctors')
        .select('*', { count: 'exact', head: true });

      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch sales stats
      const { data: salesData, count: salesCount } = await supabase
        .from('sales')
        .select('total_amount', { count: 'exact' });

      const totalRevenue = salesData?.reduce((sum, sale) => sum + parseFloat(sale.total_amount.toString()), 0) || 0;

      setStats({
        totalDoctors: doctorsCount || 0,
        totalProducts: productsCount || 0,
        totalSales: salesCount || 0,
        totalRevenue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: 'RON'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-foreground-muted/20 rounded w-3/4"></div>
                <div className="h-8 bg-foreground-muted/20 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Doctori</CardTitle>
          <Users className="h-4 w-4 text-foreground-muted" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalDoctors}</div>
          <p className="text-xs text-foreground-muted">
            Membri ai echipei medicale
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produse</CardTitle>
          <Package className="h-4 w-4 text-foreground-muted" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-foreground-muted">
            Produse în catalogul webshop
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vânzări</CardTitle>
          <ShoppingCart className="h-4 w-4 text-foreground-muted" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSales}</div>
          <p className="text-xs text-foreground-muted">
            Total comenzi procesate
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Venituri</CardTitle>
          <TrendingUp className="h-4 w-4 text-foreground-muted" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <p className="text-xs text-foreground-muted">
            Total venituri generate
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;