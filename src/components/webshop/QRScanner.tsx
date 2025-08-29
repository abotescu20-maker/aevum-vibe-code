import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Camera, CheckCircle, AlertCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface QRScannerProps {
  isActive: boolean;
  onClose: () => void;
  onProductFound: (product: Product) => void;
  products: Product[];
}

const QRScanner = ({ isActive, onClose, onProductFound, products }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Product | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'found' | 'error'>('idle');

  useEffect(() => {
    if (isActive) {
      setIsScanning(false);
      setScanResult(null);
      setScanStatus('idle');
    }
  }, [isActive]);

  const startScan = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    setScanResult(null);

    // Simulate QR scanning process
    setTimeout(() => {
      // Randomly select a product to simulate QR scan result
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      
      if (Math.random() > 0.1) { // 90% success rate
        setScanResult(randomProduct);
        setScanStatus('found');
        setIsScanning(false);
      } else {
        setScanStatus('error');
        setIsScanning(false);
        setTimeout(() => setScanStatus('idle'), 2000);
      }
    }, 3000);
  };

  const addToCart = () => {
    if (scanResult) {
      onProductFound(scanResult);
      setScanResult(null);
      setScanStatus('idle');
      onClose();
    }
  };

  if (!isActive) return null;

  return (
    <Card className="mb-6 bg-gradient-subtle border-primary/20">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-48 h-48 bg-background rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center">
            {scanStatus === 'idle' && (
              <div className="text-center">
                <QrCode className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Gata pentru scanare</p>
              </div>
            )}
            
            {scanStatus === 'scanning' && (
              <div className="text-center">
                <div className="relative">
                  <Camera className="h-12 w-12 mx-auto mb-2 text-primary animate-pulse" />
                  <div className="absolute inset-0 border-2 border-primary animate-pulse rounded-lg"></div>
                </div>
                <p className="text-sm text-primary font-medium">Scanez...</p>
              </div>
            )}
            
            {scanStatus === 'found' && scanResult && (
              <div className="text-center p-4">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <img 
                  src={scanResult.image} 
                  alt={scanResult.name}
                  className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="text-sm font-medium truncate">{scanResult.name}</p>
                <p className="text-xs text-muted-foreground">{scanResult.price} lei</p>
              </div>
            )}
            
            {scanStatus === 'error' && (
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto mb-2 text-destructive" />
                <p className="text-sm text-destructive">Cod QR invalid</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Scanner QR Produse</h3>
            <p className="text-muted-foreground mb-2">
              {scanStatus === 'idle' && "Îndreptează camera către codul QR de pe produs"}
              {scanStatus === 'scanning' && "Scanez codul QR..."}
              {scanStatus === 'found' && "Produs găsit! Adaugă în coș?"}
              {scanStatus === 'error' && "Cod QR invalid. Încearcă din nou."}
            </p>
            <div className="text-xs text-primary bg-primary/10 rounded-lg p-2 mb-4 border border-primary/20">
              <strong>📊 Monitorizare:</strong> Această scanare va fi înregistrată și asociată cu angajatul din clinică pentru raportarea vânzărilor.
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {scanStatus === 'idle' && (
              <Button onClick={startScan} className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Începe scanarea
              </Button>
            )}
            
            {scanStatus === 'scanning' && (
              <Button variant="outline" onClick={() => {
                setIsScanning(false);
                setScanStatus('idle');
              }}>
                Oprește scanarea
              </Button>
            )}
            
            {scanStatus === 'found' && scanResult && (
              <>
                <Button onClick={addToCart} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Adaugă în coș
                </Button>
                <Button variant="outline" onClick={() => setScanStatus('idle')}>
                  Scanează alt produs
                </Button>
              </>
            )}
            
            {scanStatus === 'error' && (
              <Button onClick={startScan} variant="outline">
                Încearcă din nou
              </Button>
            )}
            
            <Button variant="outline" onClick={onClose}>
              Închide Scanner
            </Button>
          </div>
          
          {/* Demo QR Codes */}
          <div className="mt-6 p-4 bg-background rounded-lg">
            <h4 className="font-medium mb-3">Coduri QR Demo:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {products.slice(0, 4).map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto p-2 flex-col gap-1"
                  onClick={() => {
                    setScanResult(product);
                    setScanStatus('found');
                  }}
                >
                  <QrCode className="h-4 w-4" />
                  {product.name.split(' ').slice(0, 2).join(' ')}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click pe un QR pentru a simula scanarea
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;