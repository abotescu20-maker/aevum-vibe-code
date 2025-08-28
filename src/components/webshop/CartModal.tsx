import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, MapPin } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
  clinic: string;
}

interface CartModalProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  clinics: { id: string; name: string; address: string }[];
}

const CartModal = ({ cart, setCart, clinics }: CartModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getClinicName = (clinicId: string) => {
    return clinics.find(c => c.id === clinicId)?.name || clinicId;
  };

  const groupedByClinic = cart.reduce((groups, item) => {
    const clinic = item.clinic;
    if (!groups[clinic]) {
      groups[clinic] = [];
    }
    groups[clinic].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);

  const handleCheckout = () => {
    // Simulate checkout process
    alert(`Comandă plasată! Total: ${getTotalPrice()} lei\n\nProdusele vor fi pregătite pentru ridicare din clinicile selectate.`);
    setCart([]);
    setIsOpen(false);
  };

  if (cart.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Coș (0)
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Coșul de cumpărături</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Coșul tău este gol</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 relative">
          <ShoppingCart className="h-4 w-4" />
          Coș ({cart.length})
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {cart.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Coșul de cumpărături</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {Object.entries(groupedByClinic).map(([clinicId, items]) => (
            <div key={clinicId}>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Ridicare din: {getClinicName(clinicId)}</h3>
              </div>
              
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={`${item.id}-${item.clinic}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="secondary" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right min-w-[80px]">
                            <div className="font-bold text-primary">
                              {(item.price * item.quantity)} lei
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.price} lei/buc
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {Object.keys(groupedByClinic).length > 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
          
          {/* Total and Actions */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total comandă:</span>
                <span className="text-2xl font-bold text-primary">{getTotalPrice()} lei</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setCart([])}
                  className="w-full"
                >
                  Golește coșul
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="w-full flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Finalizează comanda
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Produsele vor fi pregătite pentru ridicare din clinicile selectate
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;