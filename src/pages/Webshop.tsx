import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, QrCode, Gift, MapPin, Star, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartModal from "@/components/webshop/CartModal";
import QRScanner from "@/components/webshop/QRScanner";

// Import product images
import vitaminCSerum from "@/assets/products/vitamin-c-serum.jpg";
import nightCream from "@/assets/products/night-cream.jpg";
import sunscreen from "@/assets/products/sunscreen.jpg";
import nadSupplement from "@/assets/products/nad-supplement.jpg";
import omega3 from "@/assets/products/omega3.jpg";
import probiotics from "@/assets/products/probiotics.jpg";
import longevityVoucher from "@/assets/products/longevity-voucher.jpg";
import ivTherapyVoucher from "@/assets/products/iv-therapy-voucher.jpg";

const clinics = [
  { id: "cluj", name: "Cluj-Napoca", address: "Str. Memorandumului 28" },
  { id: "iasi", name: "Iași", address: "Bd. Ștefan cel Mare 15" },
  { id: "galati", name: "Galați", address: "Str. Brăilei 101" },
  { id: "bucuresti", name: "București", address: "Calea Victoriei 120" }
];

const products = {
  "dermato-cosmetice": [
    {
      id: 1,
      name: "Ser Vitamina C Premium",
      price: 189,
      originalPrice: 220,
      category: "Îngrijire facială",
      image: vitaminCSerum,
      rating: 4.8,
      reviews: 127,
      stock: { cluj: 12, iasi: 8, galati: 5, bucuresti: 15 },
      description: "Ser concentrat cu vitamina C stabilizată pentru luminozitate și anti-aging"
    },
    {
      id: 2,
      name: "Cremă Regenerantă Nocturnă",
      price: 245,
      category: "Îngrijire facială",
      image: nightCream,
      rating: 4.9,
      reviews: 89,
      stock: { cluj: 7, iasi: 12, galati: 9, bucuresti: 20 },
      description: "Cremă avansată cu retinol și peptide pentru regenerare nocturnă"
    },
    {
      id: 3,
      name: "Protecție Solară SPF 50+",
      price: 95,
      category: "Protecție solară",
      image: sunscreen,
      rating: 4.7,
      reviews: 203,
      stock: { cluj: 25, iasi: 18, galati: 15, bucuresti: 30 },
      description: "Protecție UV avansată cu antioxidanți și acid hialuronic"
    }
  ],
  "suplimente": [
    {
      id: 4,
      name: "NAD+ Longevity Complex",
      price: 320,
      category: "Longevitate",
      image: nadSupplement,
      rating: 4.9,
      reviews: 156,
      stock: { cluj: 15, iasi: 10, galati: 8, bucuresti: 25 },
      description: "Complex avansat NAD+ pentru longevitate și energie celulară"
    },
    {
      id: 5,
      name: "Omega-3 Premium",
      price: 145,
      category: "Cardiovascular",
      image: omega3,
      rating: 4.6,
      reviews: 98,
      stock: { cluj: 20, iasi: 15, galati: 12, bucuresti: 18 },
      description: "Omega-3 purificat cu EPA și DHA de înaltă concentrație"
    },
    {
      id: 6,
      name: "Probiotice Avansate",
      price: 185,
      category: "Digestiv",
      image: probiotics,
      rating: 4.8,
      reviews: 234,
      stock: { cluj: 18, iasi: 22, galati: 14, bucuresti: 28 },
      description: "Complex probiotic cu 15 tulpini pentru sănătatea intestinală"
    }
  ],
  "vouchere": [
    {
      id: 7,
      name: "Voucher Evaluare Longevitate",
      price: 500,
      category: "Servicii",
      image: longevityVoucher,
      rating: 5.0,
      reviews: 45,
      stock: { cluj: 999, iasi: 999, galati: 999, bucuresti: 999 },
      description: "Voucher cadou pentru evaluare completă longevitate"
    },
    {
      id: 8,
      name: "Pachet Terapie IV Premium",
      price: 1200,
      originalPrice: 1400,
      category: "Servicii",
      image: ivTherapyVoucher,
      rating: 4.9,
      reviews: 67,
      stock: { cluj: 999, iasi: 999, galati: 999, bucuresti: 999 },
      description: "Voucher pentru 3 ședințe de terapie IV personalizată"
    }
  ]
};

const Webshop = () => {
  const [selectedClinic, setSelectedClinic] = useState("bucuresti");
  const [activeCategory, setActiveCategory] = useState("dermato-cosmetice");
  const [cart, setCart] = useState<any[]>([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id && item.clinic === selectedClinic);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.clinic === selectedClinic
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, clinic: selectedClinic }]);
    }
  };

  const getAllProducts = () => {
    return Object.values(products).flat();
  };

  const getStockForClinic = (product: any) => {
    return product.stock[selectedClinic] || 0;
  };

  const filteredProducts = products[activeCategory as keyof typeof products]?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AEVUM Webshop
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Produse premium pentru longevitate și wellness
          </p>
          
          {/* Clinic Selector */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">Ridică din clinica:</span>
            </div>
            <Select value={selectedClinic} onValueChange={setSelectedClinic}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {clinics.map(clinic => (
                  <SelectItem key={clinic.id} value={clinic.id}>
                    {clinic.name} - {clinic.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* QR Code Scanner */}
          <div className="flex gap-4 justify-center items-center">
            <Button
              variant="outline"
              onClick={() => setShowQRScanner(!showQRScanner)}
              className="flex items-center gap-2"
            >
              <QrCode className="h-4 w-4" />
              Scanează QR Produs
            </Button>
            
            <CartModal 
              cart={cart} 
              setCart={setCart} 
              clinics={clinics}
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Caută produse..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtre
          </Button>
        </div>

        {/* QR Scanner */}
        <QRScanner
          isActive={showQRScanner}
          onClose={() => setShowQRScanner(false)}
          onProductFound={addToCart}
          products={getAllProducts()}
        />

        {/* Product Categories */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dermato-cosmetice">Dermato-Cosmetice</TabsTrigger>
            <TabsTrigger value="suplimente">Suplimente</TabsTrigger>
            <TabsTrigger value="vouchere">
              <Gift className="h-4 w-4 mr-2" />
              Vouchere Cadou
            </TabsTrigger>
          </TabsList>

          {/* Products Grid */}
          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="aspect-square bg-muted rounded-lg mb-4 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {(product as any).originalPrice && (
                        <Badge className="absolute top-2 right-2 bg-destructive">
                          -{Math.round((1 - product.price / (product as any).originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{product.price} lei</span>
                        {(product as any).originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            {(product as any).originalPrice} lei
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        Stoc {clinics.find(c => c.id === selectedClinic)?.name}: {getStockForClinic(product)}
                      </span>
                      {getStockForClinic(product) > 0 ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Disponibil
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          Indisponibil
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => addToCart(product)}
                      disabled={getStockForClinic(product) === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {getStockForClinic(product) > 0 ? "Adaugă în Coș" : "Indisponibil"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Sales Incentives Info */}
        <Card className="mt-8 bg-gradient-subtle border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Program Incentive Vânzări
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Pentru personalul clinicilor: Câștigă comision la fiecare vânzare generată prin codul tău QR!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">5%</div>
                <div className="text-sm text-muted-foreground">Comision Produse</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">3%</div>
                <div className="text-sm text-muted-foreground">Comision Vouchere</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">500 lei</div>
                <div className="text-sm text-muted-foreground">Bonus lunar &gt;10 vânzări</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Webshop;