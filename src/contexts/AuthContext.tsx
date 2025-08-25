import React, { createContext, useContext, useState, useEffect } from 'react';

interface Patient {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
}

interface AuthContextType {
  patient: Patient | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
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
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedPatient = localStorage.getItem('aevum_patient');
    if (savedPatient) {
      setPatient(JSON.parse(savedPatient));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app this would call your API
    if (email && password.length >= 6) {
      const mockPatient: Patient = {
        id: '1',
        email,
        firstName: 'Ion',
        lastName: 'Popescu',
        phone: '+40 XXX XXX XXX',
        dateOfBirth: '1985-03-15'
      };
      
      setPatient(mockPatient);
      localStorage.setItem('aevum_patient', JSON.stringify(mockPatient));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPatient: Patient = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth
    };
    
    setPatient(newPatient);
    localStorage.setItem('aevum_patient', JSON.stringify(newPatient));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setPatient(null);
    localStorage.removeItem('aevum_patient');
  };

  const value = {
    patient,
    isAuthenticated: !!patient,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};