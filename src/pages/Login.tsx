import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Eroare",
        description: "Completează toate câmpurile",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      toast({
        title: "Bun venit!",
        description: "Te-ai conectat cu succes"
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Eroare",
        description: "Email sau parolă incorectă",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Eroare",
        description: "Parolele nu coincid",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Eroare",
        description: "Parola trebuie să aibă cel puțin 6 caractere",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await signup({
      email: signupData.email,
      password: signupData.password,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      phone: signupData.phone,
      dateOfBirth: signupData.dateOfBirth
    });

    if (success) {
      toast({
        title: "Cont creat!",
        description: "Te-ai înregistrat cu succes"
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la înregistrare",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header cu back button */}
      <div className="p-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-foreground-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Înapoi la pagina principală
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">AEVUM</h1>
            <p className="text-foreground-muted">Portal Pacient - Longevitate & Wellness</p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Contul tău AEVUM</CardTitle>
              <CardDescription>
                Accesează analizele, recomandările și programează consultații
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Autentificare</TabsTrigger>
                  <TabsTrigger value="signup">Cont nou</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemplu@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Parola</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Se conectează...
                        </>
                      ) : (
                        "Intră în cont"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prenume</Label>
                        <Input
                          id="firstName"
                          placeholder="Ion"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData(prev => ({...prev, firstName: e.target.value}))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nume</Label>
                        <Input
                          id="lastName"
                          placeholder="Popescu"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData(prev => ({...prev, lastName: e.target.value}))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="exemplu@email.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData(prev => ({...prev, email: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        placeholder="+40 XXX XXX XXX"
                        value={signupData.phone}
                        onChange={(e) => setSignupData(prev => ({...prev, phone: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Data nașterii</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={signupData.dateOfBirth}
                        onChange={(e) => setSignupData(prev => ({...prev, dateOfBirth: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Parola</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({...prev, password: e.target.value}))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmă parola</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData(prev => ({...prev, confirmPassword: e.target.value}))}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Se înregistrează...
                        </>
                      ) : (
                        "Creează cont"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-foreground-muted">
                <p>Demo: folosește orice email și parola cu min. 6 caractere</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;