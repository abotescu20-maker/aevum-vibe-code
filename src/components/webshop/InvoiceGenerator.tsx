import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Printer, CreditCard, Banknote } from 'lucide-react';

// Helper function to convert numbers to words (simplified version)
const numberToWords = (num: number): string => {
  const ones = ['', 'unu', 'doi', 'trei', 'patru', 'cinci', 'șase', 'șapte', 'opt', 'nouă'];
  const tens = ['', '', 'douăzeci', 'treizeci', 'patruzeci', 'cincizeci', 'șaizeci', 'șaptezeci', 'optzeci', 'nouăzeci'];
  const hundreds = ['', 'una sută', 'două sute', 'trei sute', 'patru sute', 'cinci sute', 'șase sute', 'șapte sute', 'opt sute', 'nouă sute'];
  
  if (num === 0) return 'zero';
  if (num < 10) return ones[num];
  if (num < 20) {
    const teens = ['zece', 'unsprezece', 'doisprezece', 'treisprezece', 'paisprezece', 'cincisprezece', 'șaisprezece', 'șaptesprezece', 'optsprezece', 'nouăsprezece'];
    return teens[num - 10];
  }
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 > 0 ? ' și ' + ones[num % 10] : '');
  if (num < 1000) {
    const hundredPart = hundreds[Math.floor(num / 100)];
    const remainder = num % 100;
    return hundredPart + (remainder > 0 ? ' ' + numberToWords(remainder) : '');
  }
  
  // Simplified for larger numbers
  return Math.floor(num).toString();
};

interface InvoiceGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  seller: any;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export const InvoiceGenerator = ({ isOpen, onClose, seller }: InvoiceGeneratorProps) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card');
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: 'Ser Vitamina C Premium', quantity: 1, price: 189, total: 189 }
  ]);
  const [showPreview, setShowPreview] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tva = subtotal * 0.19;
  const total = subtotal + tva;
  const commission = total * (seller.commission / 100);

  const generateInvoice = () => {
    setShowPreview(true);
  };

  const downloadInvoice = () => {
    // Simulate download
    console.log('Downloading invoice...');
  };

  const printInvoice = () => {
    // Simulate print
    window.print();
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0, total: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  if (showPreview) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Previzualizare {paymentMethod === 'cash' ? 'Chitanță' : 'Factură'}
            </DialogTitle>
          </DialogHeader>

          <div className="bg-white text-black p-8 rounded-lg border">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-primary">AEVUM MEDICAL</h1>
                <p className="text-sm text-gray-600 mt-2">
                  Str. Exemplu Nr. 123<br />
                  București, România<br />
                  Tel: +40 XXX XXX XXX<br />
                  Email: contact@aevum.ro
                </p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold">
                  {paymentMethod === 'cash' ? 'CHITANȚĂ' : 'FACTURĂ'}
                </h2>
                <p className="text-sm text-gray-600">
                  Nr: {paymentMethod === 'cash' ? 'CHT' : 'INV'}-2024-{Date.now().toString().slice(-3)}<br />
                  Data: {new Date().toLocaleDateString('ro-RO')}<br />
                  {paymentMethod === 'card' && (
                    <>Scadența: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ro-RO')}<br /></>
                  )}
                </p>
              </div>
            </div>

            {paymentMethod === 'card' ? (
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold mb-2">Furnizor:</h3>
                  <p className="text-sm">
                    AEVUM MEDICAL SRL<br />
                    CUI: RO12345678<br />
                    Reg. Com.: J40/1234/2024
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Client:</h3>
                  <p className="text-sm">
                    {customerName}<br />
                    {customerEmail}<br />
                    {customerPhone}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold mb-2">Am primit de la:</h3>
                    <p className="text-sm">
                      {customerName}<br />
                      {customerPhone}
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold mb-2">Suma:</h3>
                    <p className="text-xl font-bold">{total.toFixed(2)} RON</p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' ? (
              <table className="w-full mb-8 border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Produs/Serviciu</th>
                    <th className="border border-gray-300 p-2 text-center">Cant.</th>
                    <th className="border border-gray-300 p-2 text-right">Preț unitar</th>
                    <th className="border border-gray-300 p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{item.name}</td>
                      <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 p-2 text-right">{item.price.toFixed(2)} RON</td>
                      <td className="border border-gray-300 p-2 text-right">{item.total.toFixed(2)} RON</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="mb-8">
                <h3 className="font-bold mb-4">Pentru:</h3>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-bold">{item.total.toFixed(2)} RON</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Badge variant={paymentMethod === 'cash' ? 'destructive' : 'default'}>
                  {paymentMethod === 'cash' ? (
                    <>
                      <Banknote className="h-4 w-4 mr-1" />
                      Plată Numerar
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-1" />
                      Plată Card
                    </>
                  )}
                </Badge>
              </div>
              
              <div className="text-right">
                {paymentMethod === 'card' ? (
                  <>
                    <div className="flex justify-between w-48 mb-2">
                      <span>Subtotal:</span>
                      <span>{subtotal.toFixed(2)} RON</span>
                    </div>
                    <div className="flex justify-between w-48 mb-2">
                      <span>TVA (19%):</span>
                      <span>{tva.toFixed(2)} RON</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between w-48 font-bold text-lg">
                      <span>TOTAL:</span>
                      <span>{total.toFixed(2)} RON</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-sm mb-2">Suma totală încasată:</p>
                    <div className="text-3xl font-bold border-2 border-black p-4 rounded">
                      {total.toFixed(2)} RON
                    </div>
                    <p className="text-xs mt-2 italic">cu litere: {numberToWords(total)} lei</p>
                  </div>
                )}
                <div className="flex justify-between w-48 text-sm text-primary mt-2">
                  <span>Comision vânzător:</span>
                  <span>{commission.toFixed(2)} RON</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-sm text-gray-600">
              <div className="flex justify-between items-end">
                <div>
                  <p><strong>Vânzător:</strong> {seller.firstName} {seller.lastName}</p>
                  <p><strong>Data/Ora:</strong> {new Date().toLocaleString('ro-RO')}</p>
                </div>
                {paymentMethod === 'cash' && (
                  <div className="text-right">
                    <p className="mb-8">Semnătura:</p>
                    <div className="border-b border-gray-400 w-32"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={downloadInvoice} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Descarcă PDF
            </Button>
            <Button onClick={printInvoice} variant="outline" className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Tipărește
            </Button>
            <Button onClick={() => setShowPreview(false)} variant="secondary">
              Înapoi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generare {paymentMethod === 'cash' ? 'Chitanță' : 'Factură'} Nouă
            </DialogTitle>
          </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informații Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerName">Nume Client</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nume complet"
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="client@email.com"
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Telefon</Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+40 XXX XXX XXX"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Produse/Servicii</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <Label>Produs</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        placeholder="Nume produs"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Cant.</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Preț</Label>
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Total</Label>
                      <Input value={`${item.total.toFixed(2)} RON`} disabled />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                <Button onClick={addItem} variant="outline" className="w-full">
                  + Adaugă Produs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalii Plată</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Metoda de Plată</Label>
                <Select value={paymentMethod} onValueChange={(value: 'cash' | 'card') => setPaymentMethod(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Plată cu Card
                      </div>
                    </SelectItem>
                    <SelectItem value="cash">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Plată Cash
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>{subtotal.toFixed(2)} RON</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>TVA (19%):</span>
                  <span>{tva.toFixed(2)} RON</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>TOTAL:</span>
                  <span>{total.toFixed(2)} RON</span>
                </div>
                <div className="flex justify-between text-sm text-primary mt-2">
                  <span>Comisionul tău ({seller.commission}%):</span>
                  <span>{commission.toFixed(2)} RON</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={generateInvoice} className="flex-1" disabled={!customerName || items.some(item => !item.name)}>
              Generează {paymentMethod === 'cash' ? 'Chitanță' : 'Factură'}
            </Button>
            <Button onClick={onClose} variant="outline">
              Anulează
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};