import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, TrendingUp, AlertTriangle, BarChart3, MapPin, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const clinics = [
  { id: "cluj", name: "Cluj-Napoca", manager: "Dr. Popescu Ana" },
  { id: "iasi", name: "Iași", manager: "Dr. Ionescu Mihai" },
  { id: "galati", name: "Galați", manager: "Dr. Stanciu Elena" },
  { id: "bucuresti", name: "București", manager: "Dr. Marinescu Radu" }
];

const inventoryData = [
  {
    id: 1,
    name: "Ser Vitamina C Premium",
    category: "Dermato-Cosmetice",
    price: 189,
    stock: { cluj: 12, iasi: 8, galati: 5, bucuresti: 15 },
    minStock: 10,
    sales7days: { cluj: 3, iasi: 2, galati: 1, bucuresti: 8 },
    supplier: "DermaLux SRL"
  },
  {
    id: 2,
    name: "NAD+ Longevity Complex",
    category: "Suplimente",
    price: 320,
    stock: { cluj: 15, iasi: 10, galati: 8, bucuresti: 25 },
    minStock: 15,
    sales7days: { cluj: 5, iasi: 3, galati: 2, bucuresti: 12 },
    supplier: "Longevity Labs"
  },
  {
    id: 3,
    name: "Cremă Regenerantă Nocturnă",
    category: "Dermato-Cosmetice",
    price: 245,
    stock: { cluj: 7, iasi: 12, galati: 9, bucuresti: 20 },
    minStock: 8,
    sales7days: { cluj: 2, iasi: 4, galati: 1, bucuresti: 6 },
    supplier: "DermaLux SRL"
  },
  {
    id: 4,
    name: "Probiotice Avansate",
    category: "Suplimente",
    price: 185,
    stock: { cluj: 18, iasi: 22, galati: 14, bucuresti: 28 },
    minStock: 20,
    sales7days: { cluj: 7, iasi: 8, galati: 4, bucuresti: 15 },
    supplier: "BioSupp International"
  }
];

const salesData = [
  { clinic: "bucuresti", employee: "Popescu Maria", sales: 23, commission: 456 },
  { clinic: "cluj", employee: "Ionescu Andrei", sales: 18, commission: 378 },
  { clinic: "iasi", employee: "Stanciu Ioana", sales: 15, commission: 312 },
  { clinic: "galati", employee: "Marinescu Alex", sales: 12, commission: 267 }
];

const InventoryManagement = () => {
  const [selectedClinic, setSelectedClinic] = useState("all");
  const [activeTab, setActiveTab] = useState("inventory");

  const getStockStatus = (current: number, min: number) => {
    if (current === 0) return { status: "out", color: "destructive", text: "Epuizat" };
    if (current <= min * 0.5) return { status: "critical", color: "destructive", text: "Critic" };
    if (current <= min) return { status: "low", color: "secondary", text: "Scăzut" };
    return { status: "ok", color: "default", text: "OK" };
  };

  const filteredInventory = selectedClinic === "all" 
    ? inventoryData 
    : inventoryData.filter(item => 
        item.stock[selectedClinic as keyof typeof item.stock] !== undefined
      );

  const getTotalSales = () => {
    return salesData.reduce((sum, sale) => sum + sale.sales, 0);
  };

  const getTotalCommission = () => {
    return salesData.reduce((sum, sale) => sum + sale.commission, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Gestionare Stocuri
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitorizare și control centralizat - Operațional București
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Select value={selectedClinic} onValueChange={setSelectedClinic}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate Clinicile</SelectItem>
                {clinics.map(clinic => (
                  <SelectItem key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualizează
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vânzări 7 zile</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalSales()}</div>
              <p className="text-xs text-muted-foreground">+12% față de săptămâna trecută</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comisioane Total</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalCommission()} lei</div>
              <p className="text-xs text-muted-foreground">Toate clinicile</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produse Stoc Critic</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">Necesită reaprovizionare</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clinici Active</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Cluj, Iași, Galați, București</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Stocuri</TabsTrigger>
            <TabsTrigger value="sales">Vânzări & Incentive</TabsTrigger>
            <TabsTrigger value="analytics">Analize</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Inventar Produse
                </CardTitle>
                <CardDescription>
                  Status stocuri în timp real pentru toate clinicile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produs</TableHead>
                      <TableHead>Categorie</TableHead>
                      <TableHead>Preț</TableHead>
                      <TableHead>Cluj</TableHead>
                      <TableHead>Iași</TableHead>
                      <TableHead>Galați</TableHead>
                      <TableHead>București</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map(item => {
                      const worstStock = Math.min(...Object.values(item.stock));
                      const stockStatus = getStockStatus(worstStock, item.minStock);
                      
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category}</Badge>
                          </TableCell>
                          <TableCell>{item.price} lei</TableCell>
                          <TableCell>
                            <Badge 
                              variant={getStockStatus(item.stock.cluj, item.minStock).color as any}
                              className="text-xs"
                            >
                              {item.stock.cluj}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getStockStatus(item.stock.iasi, item.minStock).color as any}
                              className="text-xs"
                            >
                              {item.stock.iasi}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getStockStatus(item.stock.galati, item.minStock).color as any}
                              className="text-xs"
                            >
                              {item.stock.galati}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={getStockStatus(item.stock.bucuresti, item.minStock).color as any}
                              className="text-xs"
                            >
                              {item.stock.bucuresti}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stockStatus.color as any}>
                              {stockStatus.text}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Vânzători (7 zile)</CardTitle>
                  <CardDescription>
                    Performanța echipei și comisioanele câștigate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Angajat</TableHead>
                        <TableHead>Clinica</TableHead>
                        <TableHead>Vânzări</TableHead>
                        <TableHead>Comision</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.map((sale, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{sale.employee}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {clinics.find(c => c.id === sale.clinic)?.name}
                            </Badge>
                          </TableCell>
                          <TableCell>{sale.sales}</TableCell>
                          <TableCell className="text-primary font-semibold">
                            {sale.commission} lei
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheme de Incentive</CardTitle>
                  <CardDescription>
                    Configurare comisioane și bonusuri
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Comisioane Produse</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Dermato-Cosmetice:</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Suplimente:</span>
                        <span className="font-medium">4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vouchere:</span>
                        <span className="font-medium">3%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Bonusuri Lunare</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>&gt;10 vânzări:</span>
                        <span className="font-medium">500 lei</span>
                      </div>
                      <div className="flex justify-between">
                        <span>&gt;20 vânzări:</span>
                        <span className="font-medium">1000 lei</span>
                      </div>
                      <div className="flex justify-between">
                        <span>&gt;30 vânzări:</span>
                        <span className="font-medium">1500 lei</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vânzări pe Clinică (7 zile)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clinics.map(clinic => {
                      const clinicSales = salesData.find(s => s.clinic === clinic.id)?.sales || 0;
                      const percentage = (clinicSales / getTotalSales()) * 100;
                      
                      return (
                        <div key={clinic.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{clinic.name}</span>
                            <span>{clinicSales} vânzări</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produse cu Rotație Mare</CardTitle>
                  <CardDescription>
                    Ultimele 7 zile - toate clinicile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventoryData.map(item => {
                      const totalSales = Object.values(item.sales7days).reduce((a, b) => a + b, 0);
                      return (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.category}</div>
                          </div>
                          <Badge variant="outline">{totalSales} vândute</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default InventoryManagement;