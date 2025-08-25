import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  FileText, 
  Calendar, 
  MessageCircle, 
  CreditCard, 
  Download,
  Phone,
  Video,
  Send,
  LogOut,
  ArrowLeft,
  Activity,
  Heart,
  Brain,
  Zap
} from "lucide-react";

const Dashboard = () => {
  const { patient, logout } = useAuth();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message: "Bună ziua! Sunt AEVA, asistentul tău virtual pentru longevitate. Cum te pot ajuta astăzi?",
      timestamp: new Date()
    }
  ]);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Trebuie să te autentifici pentru a accesa dashboard-ul.</p>
            <Link to="/login">
              <Button className="mt-4">Autentificare</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mockAnalyses = [
    {
      id: 1,
      type: "Test Genetic Longevitate",
      date: "2024-01-15",
      status: "finalizat",
      score: 85,
      recommendations: ["Suplimentare Vitamina D", "Terapie IV NAD+", "Optimizare somn"]
    },
    {
      id: 2,
      type: "Biomarkeri Antiaging",
      date: "2024-01-10",
      status: "finalizat", 
      score: 78,
      recommendations: ["Terapie antioxidantă", "Modulare inflamație", "Suport mitocondrial"]
    },
    {
      id: 3,
      type: "Evaluare Neurologică",
      date: "2024-01-20",
      status: "în procesare",
      score: null,
      recommendations: []
    }
  ];

  const mockAppointments = [
    {
      id: 1,
      type: "Consultație Longevitate",
      date: "2024-02-15",
      time: "10:00",
      doctor: "Dr. Marina Ionescu",
      mode: "online"
    },
    {
      id: 2,
      type: "Sesiune Terapie IV",
      date: "2024-02-18",
      time: "14:30",
      doctor: "Dr. Andrei Popov",
      mode: "clinică"
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      id: chatHistory.length + 1,
      type: "user",
      message: chatMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatHistory.length + 2,
        type: "bot",
        message: "Mulțumesc pentru întrebare! Pe baza analizelor tale recente, îți recomand să discuți cu medicul despre optimizarea nivelului de Vitamina D și considerarea unei terapii IV NAD+ pentru îmbunătățirea energiei celulare. Dorești să programezi o consultație?",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, botResponse]);
    }, 1500);

    setChatMessage("");
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md border-b border-card-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-foreground-muted hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Acasă
              </Link>
              <div className="text-2xl font-display font-bold text-primary">AEVUM</div>
              <Badge variant="secondary">Portal Pacient</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{getInitials(patient.firstName, patient.lastName)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                <p className="text-sm text-foreground-muted">{patient.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Ieșire
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">
            Bună ziua, {patient.firstName}!
          </h1>
          <p className="text-foreground-muted">
            Bine ai venit în portalul tău personalizat de longevitate și wellness
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Privire generală
            </TabsTrigger>
            <TabsTrigger value="analyses" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Analize
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              AEVA Assistant
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Programări
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Plăți
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Health Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    Scor Longevitate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">85/100</div>
                  <Progress value={85} className="mb-2" />
                  <p className="text-sm text-foreground-muted">Foarte bun - păstrează-ți rutina actuală</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="w-5 h-5 mr-2 text-accent" />
                    Wellness Mental
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent mb-2">78/100</div>
                  <Progress value={78} className="mb-2" />
                  <p className="text-sm text-foreground-muted">Bun - recomandăm optimizări</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="w-5 h-5 mr-2 text-secondary" />
                    Nivel Energie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary mb-2">82/100</div>
                  <Progress value={82} className="mb-2" />
                  <p className="text-sm text-foreground-muted">Foarte bun - energie optimă</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activitate recentă</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-primary/5 rounded-lg">
                  <FileText className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Analize noi disponibile</p>
                    <p className="text-sm text-foreground-muted">Test Genetic Longevitate - rezultate finalizate</p>
                    <p className="text-xs text-foreground-muted">acum 2 zile</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-accent/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium">Programare confirmată</p>
                    <p className="text-sm text-foreground-muted">Consultație longevitate - 15 februarie, 10:00</p>
                    <p className="text-xs text-foreground-muted">acum 1 zi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyses" className="space-y-6">
            <div className="grid gap-6">
              {mockAnalyses.map((analysis) => (
                <Card key={analysis.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{analysis.type}</CardTitle>
                        <CardDescription>Efectuat la {analysis.date}</CardDescription>
                      </div>
                      <Badge variant={analysis.status === "finalizat" ? "default" : "secondary"}>
                        {analysis.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {analysis.status === "finalizat" && (
                      <>
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Scor total:</span>
                            <span className="text-2xl font-bold text-primary">{analysis.score}/100</span>
                          </div>
                          <Progress value={analysis.score} className="mb-4" />
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Recomandări personalizate:</h4>
                          <ul className="space-y-1">
                            {analysis.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-foreground-muted flex items-center">
                                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descarcă raport PDF
                        </Button>
                      </>
                    )}
                    {analysis.status === "în procesare" && (
                      <p className="text-foreground-muted">Rezultatele vor fi disponibile în 2-3 zile lucrătoare.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  AEVA - Asistent Longevitate
                </CardTitle>
                <CardDescription>
                  Întreabă-mă despre analizele tale, recomandări personalizate sau programări
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                  {chatHistory.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-background border border-card-border"
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString('ro-RO', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Scrie întrebarea ta aici..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-card-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Programările tale</h2>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Programează consultație
              </Button>
            </div>

            <div className="grid gap-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{appointment.type}</h3>
                        <p className="text-foreground-muted">{appointment.doctor}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {appointment.date}
                          </span>
                          <span>{appointment.time}</span>
                          {appointment.mode === "online" ? (
                            <Badge variant="secondary" className="flex items-center">
                              <Video className="w-3 h-3 mr-1" />
                              Online
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              Clinică
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {appointment.mode === "online" && (
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-2" />
                            Intră în consultație
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          Reprogramează
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Istoric plăți</CardTitle>
                <CardDescription>
                  Facturile și plățile pentru serviciile AEVUM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-card-border rounded-lg">
                    <div>
                      <p className="font-medium">Program Discovery</p>
                      <p className="text-sm text-foreground-muted">15 ianuarie 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€950</p>
                      <Badge variant="default">Plătit</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-card-border rounded-lg">
                    <div>
                      <p className="font-medium">Terapie IV NAD+</p>
                      <p className="text-sm text-foreground-muted">20 ianuarie 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€180</p>
                      <Badge variant="secondary">În procesare</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;