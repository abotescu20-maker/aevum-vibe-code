import React, { createContext, useContext, useState, useEffect } from 'react';

interface Seller {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  clinicId: string;
  commission: number; // percentage
  totalSales: number;
  totalCommission: number;
}

interface SellerAuthContextType {
  seller: Seller | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const SellerAuthContext = createContext<SellerAuthContextType | undefined>(undefined);

export const useSellerAuth = () => {
  const context = useContext(SellerAuthContext);
  if (context === undefined) {
    throw new Error('useSellerAuth must be used within a SellerAuthProvider');
  }
  return context;
};

// Mock sellers data
const mockSellers: Seller[] = [
  {
    id: '1',
    email: 'maria.popescu@aevum.ro',
    firstName: 'Maria',
    lastName: 'Popescu',
    clinicId: 'bucharest',
    commission: 10,
    totalSales: 15420,
    totalCommission: 1542
  },
  {
    id: '2',
    email: 'ion.ionescu@aevum.ro',
    firstName: 'Ion',
    lastName: 'Ionescu',
    clinicId: 'cluj',
    commission: 12,
    totalSales: 23100,
    totalCommission: 2772
  },
  {
    id: '3',
    email: 'ana.georgescu@aevum.ro',
    firstName: 'Ana',
    lastName: 'Georgescu',
    clinicId: 'timisoara',
    commission: 8,
    totalSales: 9800,
    totalCommission: 784
  }
];

export const SellerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedSeller = localStorage.getItem('aevum_seller');
    if (savedSeller) {
      setSeller(JSON.parse(savedSeller));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find seller by email
    const foundSeller = mockSellers.find(s => s.email === email);
    
    if (foundSeller && password.length >= 6) {
      setSeller(foundSeller);
      localStorage.setItem('aevum_seller', JSON.stringify(foundSeller));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setSeller(null);
    localStorage.removeItem('aevum_seller');
  };

  const value = {
    seller,
    isAuthenticated: !!seller,
    login,
    logout,
    loading
  };

  return <SellerAuthContext.Provider value={value}>{children}</SellerAuthContext.Provider>;
};