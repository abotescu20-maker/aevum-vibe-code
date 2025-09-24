import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SellerAuthProvider } from "./contexts/SellerAuthContext";
import Index from "./pages/Index";
import IVTherapy from "./pages/IVTherapy";
import Dermatology from "./pages/Dermatology";
import Neuromodulare from "./pages/Neuromodulare";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Webshop from "./pages/Webshop";
import InventoryManagement from "./pages/InventoryManagement";
import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SellerAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/terapii-iv" element={<IVTherapy />} />
              <Route path="/dermatologie" element={<Dermatology />} />
              <Route path="/neuromodulare" element={<Neuromodulare />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/webshop" element={<Webshop />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/seller-login" element={<SellerLogin />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SellerAuthProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
