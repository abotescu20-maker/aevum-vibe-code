import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  patient: Patient | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (data: SignupData) => Promise<{ error?: string }>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            
            if (profile) {
              setPatient({
                id: profile.id,
                email: profile.email,
                firstName: profile.first_name || '',
                lastName: profile.last_name || '',
                phone: profile.phone || '',
                dateOfBirth: profile.date_of_birth || '',
                role: profile.role || 'patient'
              });
            }
            setLoading(false); // Set loading to false after profile is fetched
          }, 0);
        } else {
          setPatient(null);
          setLoading(false); // Set loading to false if no user
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        setLoading(false); // Only set loading to false if no session
      }
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

  const signup = async (data: SignupData) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            date_of_birth: data.dateOfBirth
          }
        }
      });
      
      setLoading(false);
      return { error: error?.message };
    } catch (err) {
      setLoading(false);
      return { error: 'A apărut o eroare la înregistrare' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setPatient(null);
  };

  const value = {
    user,
    session,
    patient,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};