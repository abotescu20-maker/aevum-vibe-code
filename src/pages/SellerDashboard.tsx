import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellerAuth } from '@/contexts/SellerAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  LogOut, 
  QrCode, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Package,
  FileText,
  CreditCard,
  Banknote
} from 'lucide-react';
import QRScanner from '@/components/webshop/QRScanner';
import { InvoiceGenerator } from '@/components/webshop/InvoiceGenerator';

interface Sale {
  id: string;
  productName: string;
  price: number;
  commission: number;
  date: string;
  type: 'qr' | 'online' | 'in-store';
  paymentMethod: 'cash' | 'card';
  invoiceNumber?: string;
}

// Mock sales data
const mockSales: Sale[] = [
  {
    id: '1',
    productName: 'Ser Vitamina C Premium',
    price: 189,
    commission: 18.9,
    date: '2024-01-15 14:30',
    type: 'qr',
    paymentMethod: 'card',
    invoiceNumber: 'INV-2024-001'
  },
  {
    id: '2',
    productName: 'Omega 3 Supreme',
    price: 149,
    commission: 14.9,
    date: '2024-01-15 11:20',
    type: 'in-store',
    paymentMethod: 'cash',
    invoiceNumber: 'INV-2024-002'
  },
  {
    id: '3',
    productName: 'Voucher Terapie IV Longevitate',
    price: 450,
    commission: 45,
    date: '2024-01-14 16:45',
    type: 'online',
    paymentMethod: 'card',
    invoiceNumber: 'INV-2024-003'
  }
];

const mockProducts = [
  { 
    id: 1, 
    name: 'Ser Vitamina C Premium', 
    price: 189, 
    image: '/src/assets/products/vitamin-c-serum.jpg',
    category: 'dermato-cosmetice',
    description: 'Ser premium cu vitamina C pentru îngrijirea pielii'
  },
  { 
    id: 2, 
    name: 'Omega 3 Supreme', 
    price: 149, 
    image: '/src/assets/products/omega3.jpg',
    category: 'suplimente',
    description: 'Supliment cu acizi grași Omega 3'
  },
  { 
    id: 3, 
    name: 'Probiotice Advanced', 
    price: 99, 
    image: '/src/assets/products/probiotics.jpg',
    category: 'suplimente',
    description: 'Probiotice avansate pentru sănătatea digestivă'
  }
];

const SellerDashboard = () => {
  const { seller, logout } = useSellerAuth();
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
  const [sales, setSales] = useState<Sale[]>(mockSales);

  if (!seller) {
    navigate('/seller-login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/seller-login');
  };

  const handleProductFound = (product: any) => {
    // Simulate adding a QR sale
    const newSale: Sale = {
      id: Date.now().toString(),
      productName: product.name,
      price: product.price,
      commission: product.price * (seller.commission / 100),
      date: new Date().toLocaleString('ro-RO'),
      type: 'qr',
      paymentMethod: 'card',
      invoiceNumber: `INV-2024-${String(sales.length + 4).padStart(3, '0')}`
    };
    setSales([newSale, ...sales]);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'qr': return 'QR Code';
      case 'online': return 'Online';
      case 'in-store': return 'În clinică';
      default: return type;
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'qr': return 'default';
      case 'online': return 'secondary';
      case 'in-store': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-foreground">AEVUM Seller Portal</h1>
            <Badge variant="secondary">
              {seller.firstName} {seller.lastName}
            </Badge>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Ieșire
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vânzări Totale</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{seller.totalSales} RON</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comision Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{seller.totalCommission} RON</div>
              <p className="text-xs text-muted-foreground">
                {seller.commission}% comision
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vânzări Astăzi</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sales.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comision Astăzi</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sales.reduce((sum, sale) => sum + sale.commission, 0).toFixed(2)} RON
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Button onClick={() => setShowQRScanner(true)} className="h-24 flex-col">
            <QrCode className="h-8 w-8 mb-2" />
            Scanare QR Produs
          </Button>
          
          <Button variant="secondary" onClick={() => setShowInvoiceGenerator(true)} className="h-24 flex-col">
            <FileText className="h-8 w-8 mb-2" />
            Generare Factură
          </Button>
          
          <Button variant="outline" onClick={() => navigate('/webshop')} className="h-24 flex-col">
            <ShoppingCart className="h-8 w-8 mb-2" />
            Magazin Online
          </Button>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Vânzări Recente</TabsTrigger>
            <TabsTrigger value="analytics">Analiză</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Vânzări Recente</CardTitle>
                <CardDescription>
                  Istoricul vânzărilor tale din ultimele zile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{sale.productName}</h4>
                          <Badge variant={getTypeVariant(sale.type)}>
                            {getTypeLabel(sale.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{sale.date}</p>
                        {sale.invoiceNumber && (
                          <p className="text-xs text-muted-foreground">
                            Factură: {sale.invoiceNumber}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {sale.paymentMethod === 'cash' ? (
                            <Banknote className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium">{sale.price} RON</span>
                        </div>
                        <p className="text-sm text-primary">
                          Comision: {sale.commission.toFixed(2)} RON
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tipuri de Vânzări</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>QR Code</span>
                      <span>{sales.filter(s => s.type === 'qr').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Online</span>
                      <span>{sales.filter(s => s.type === 'online').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>În clinică</span>
                      <span>{sales.filter(s => s.type === 'in-store').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metode de Plată</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Card</span>
                      <span>{sales.filter(s => s.paymentMethod === 'card').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash</span>
                      <span>{sales.filter(s => s.paymentMethod === 'cash').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {showQRScanner && (
        <QRScanner
          isActive={showQRScanner}
          onClose={() => setShowQRScanner(false)}
          onProductFound={handleProductFound}
          products={mockProducts}
        />
      )}

      {showInvoiceGenerator && (
        <InvoiceGenerator
          isOpen={showInvoiceGenerator}
          onClose={() => setShowInvoiceGenerator(false)}
          seller={seller}
        />
      )}
    </div>
  );
};

export default SellerDashboard;