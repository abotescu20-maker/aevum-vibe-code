import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSellerAuth } from '@/contexts/SellerAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useSellerAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/seller-dashboard');
    } else {
      setError('Email sau parola incorrectă');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la site
          </Link>
          <h1 className="text-3xl font-bold text-foreground">AEVUM</h1>
          <p className="text-muted-foreground mt-2">Portal Vânzători</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Autentificare Vânzător</CardTitle>
            <CardDescription>
              Intră în contul tău pentru a accesa dashboard-ul de vânzări
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maria.popescu@aevum.ro"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parola</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Se autentifică...' : 'Intră în cont'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Conturi demo:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>maria.popescu@aevum.ro (București)</div>
                <div>ion.ionescu@aevum.ro (Cluj)</div>
                <div>ana.georgescu@aevum.ro (Timișoara)</div>
                <div className="mt-2 font-medium">Parola: orice (min. 6 caractere)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerLogin;