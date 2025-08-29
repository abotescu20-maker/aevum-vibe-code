import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Calendar, User, TrendingUp, Award, QrCode } from "lucide-react";

interface SaleRecord {
  id: string;
  employeeName: string;
  clinicId: string;
  productName: string;
  productPrice: number;
  commission: number;
  timestamp: Date;
  qrCodeId: string;
}

interface SalesTrackingProps {
  clinics: { id: string; name: string; address: string }[];
}

const SalesTracking = ({ clinics }: SalesTrackingProps) => {
  const [selectedClinic, setSelectedClinic] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Mock sales data
  const mockSales: SaleRecord[] = [
    {
      id: "1",
      employeeName: "Dr. Maria Popescu",
      clinicId: "bucuresti",
      productName: "NAD+ Longevity Complex",
      productPrice: 320,
      commission: 16,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      qrCodeId: "QR_MP_001"
    },
    {
      id: "2", 
      employeeName: "As. Ana Ionescu",
      clinicId: "cluj",
      productName: "Ser Vitamina C Premium",
      productPrice: 189,
      commission: 9.45,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      qrCodeId: "QR_AI_002"
    },
    {
      id: "3",
      employeeName: "Dr. Radu Georgescu",
      clinicId: "iasi",
      productName: "Voucher Evaluare Longevitate",
      productPrice: 500,
      commission: 15,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      qrCodeId: "QR_RG_003"
    }
  ];

  const filteredSales = mockSales.filter(sale => {
    if (selectedClinic !== "all" && sale.clinicId !== selectedClinic) return false;
    return true;
  });

  const getTotalSales = () => filteredSales.reduce((sum, sale) => sum + sale.productPrice, 0);
  const getTotalCommission = () => filteredSales.reduce((sum, sale) => sum + sale.commission, 0);
  const getTopSeller = () => {
    const salesByEmployee = filteredSales.reduce((acc, sale) => {
      acc[sale.employeeName] = (acc[sale.employeeName] || 0) + sale.productPrice;
      return acc;
    }, {} as Record<string, number>);
    
    const topEntry = Object.entries(salesByEmployee).sort(([,a], [,b]) => b - a)[0];
    return topEntry ? topEntry[0] : "N/A";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
  };

  const getClinicName = (clinicId: string) => {
    return clinics.find(c => c.id === clinicId)?.name || clinicId;
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Evidența Vânzărilor QR Code
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Monitorizare în timp real a vânzărilor generate prin coduri QR
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate clinicile</SelectItem>
                  {clinics.map(clinic => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Astăzi</SelectItem>
                  <SelectItem value="week">Săptămâna</SelectItem>
                  <SelectItem value="month">Luna</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vânzări</p>
                <p className="text-2xl font-bold text-primary">{getTotalSales()} lei</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Comisioane</p>
                <p className="text-2xl font-bold text-accent-gold">{getTotalCommission().toFixed(2)} lei</p>
              </div>
              <Award className="h-8 w-8 text-accent-gold/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nr. Vânzări</p>
                <p className="text-2xl font-bold text-foreground">{filteredSales.length}</p>
              </div>
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Vânzător</p>
                <p className="text-lg font-semibold text-foreground truncate">{getTopSeller()}</p>
              </div>
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Vânzări Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredSales.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nu există vânzări pentru perioada selectată</p>
            </div>
          ) : (
            filteredSales.map((sale, index) => (
              <div key={sale.id}>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {sale.qrCodeId}
                      </Badge>
                      <span className="font-medium">{sale.employeeName}</span>
                      <Badge variant="secondary" className="text-xs">
                        {getClinicName(sale.clinicId)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{sale.productName}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(sale.timestamp)}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{sale.productPrice} lei</div>
                    <div className="text-sm text-accent-gold">
                      Comision: {sale.commission.toFixed(2)} lei
                    </div>
                  </div>
                </div>
                {index < filteredSales.length - 1 && <Separator className="my-2" />}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesTracking;