import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface Seller {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  clinicId: string;
  commission: number;
  totalSales: number;
  totalCommission: number;
}

interface SellerAuthContextType {
  user: User | null;
  session: Session | null;
  seller: Seller | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
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

export const SellerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch seller profile
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select(`
                *,
                clinics (
                  id,
                  name
                )
              `)
              .eq('user_id', session.user.id)
              .eq('role', 'seller')
              .single();
            
            if (profile) {
              setSeller({
                id: profile.id,
                email: profile.email,
                firstName: profile.first_name || '',
                lastName: profile.last_name || '',
                clinicId: profile.clinic_id,
                commission: profile.commission_rate || 0,
                totalSales: parseFloat(String(profile.total_sales || '0')),
                totalCommission: parseFloat(String(profile.total_commission || '0'))
              });
            }
          }, 0);
        } else {
          setSeller(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      setLoading(false);
      return { error: error?.message };
    } catch (err) {
      setLoading(false);
      return { error: 'A apărut o eroare la autentificare' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setSeller(null);
  };

  const value = {
    user,
    session,
    seller,
    isAuthenticated: !!user && !!seller,
    login,
    logout,
    loading
  };

  return <SellerAuthContext.Provider value={value}>{children}</SellerAuthContext.Provider>;
};