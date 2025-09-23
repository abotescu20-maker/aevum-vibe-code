import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Activity, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Neuromodulare = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "neurofeedback",
      icon: Brain,
      title: "Neurofeedback EEG",
      subtitle: "Optimizarea ondelor cerebrale",
      description: "Tehnologie avansată de monitorizare și optimizare a activității cerebrale prin feedback în timp real.",
      benefits: [
        "Îmbunătățirea concentrării și atenției",
        "Reducerea stresului și anxietății", 
        "Optimizarea performanței cognitive",
        "Reglarea ciclurilor de somn"
      ],
      duration: "60 minute",
      price: "450 lei",
      sessions: "8-12 ședințe recomandate"
    },
    {
      id: "vr-therapy",
      icon: Activity,
      title: "Terapie VR",
      subtitle: "Realitate virtuală terapeutică",
      description: "Programe de realitate virtuală personalizate pentru relaxare, meditație și antrenament cognitiv.",
      benefits: [
        "Reducerea durerii cronice",
        "Tratamentul fobiilor și anxietății",
        "Antrenament de mindfulness",
        "Stimularea neuroplasticității"
      ],
      duration: "45 minute",
      price: "350 lei",
      sessions: "6-10 ședințe recomandate"
    },
    {
      id: "pemf",
      icon: Zap,
      title: "Terapie PEMF",
      subtitle: "Câmpuri electromagnetice pulsate",
      description: "Stimularea celulară prin câmpuri electromagnetice pentru regenerare și echilibrare neurovegetativă.",
      benefits: [
        "Accelerarea proceselor de vindecare",
        "Îmbunătățirea circulației sanguine",
        "Reducerea inflamației",
        "Optimizarea energiei celulare"
      ],
      duration: "30 minute", 
      price: "280 lei",
      sessions: "10-15 ședințe recomandate"
    },
    {
      id: "biofeedback",
      icon: TrendingUp,
      title: "Biofeedback HRV",
      subtitle: "Monitorizarea variabilității cardiace",
      description: "Antrenament pentru controlul sistemului nervos autonom prin monitorizarea ritmului cardiac.",
      benefits: [
        "Îmbunătățirea rezistenței la stres",
        "Optimizarea funcțiilor cardiovasculare",
        "Creșterea performanței sportive",
        "Echilibrarea sistemului nervos"
      ],
      duration: "45 minute",
      price: "320 lei",
      sessions: "8-12 ședințe recomandate"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Brain className="w-4 h-4 mr-2" />
            Neuromodulare Avansată
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Tehnologii de <span className="text-primary">Neuromodulare</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-8">
            Optimizează funcțiile cognitive și emoționale prin tehnologii avansate de neuromodulare, 
            personalizate în funcție de profilul tău neurobiologic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="medical" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Programează Evaluare
            </Button>
            <Button variant="outline" size="lg">
              Consultație Gratuită
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.id;
            
            return (
              <Card 
                key={service.id}
                className={`medical-card group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedService(isSelected ? null : service.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-foreground-muted">{service.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-display">{service.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-foreground-muted">
                    {service.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-foreground-muted mb-6">{service.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Beneficii principale:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-card-border">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-foreground-muted">{service.sessions}</span>
                        <Badge variant="outline">Personalizat</Badge>
                      </div>
                      
                      <Button className="w-full group">
                        Programează Ședință
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="bg-background-subtle rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Procesul de <span className="text-primary">Neuromodulare</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Evaluare Neurobiologică",
                description: "Analiză completă a funcțiilor cognitive și a stării neurovegetative"
              },
              {
                step: "02", 
                title: "Plan Personalizat",
                description: "Selecția tehnologiilor optime în funcție de obiectivele individuale"
              },
              {
                step: "03",
                title: "Sesiuni Monitorizate",
                description: "Aplicarea tehnologiilor cu monitorizare continuă a progresului"
              },
              {
                step: "04",
                title: "Optimizare Continuă",
                description: "Ajustarea parametrilor pentru rezultate maxime și durabile"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {step.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-foreground-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-subtle rounded-3xl p-8">
          <h2 className="text-3xl font-display font-bold mb-4">
            Începe Transformarea Neurologică
          </h2>
          <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
            Descoperă potențialul complet al creierului tău prin tehnologii avansate de neuromodulare, 
            adaptate nevoilor tale specifice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="medical" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Programează Evaluarea Completă
            </Button>
            <Button variant="outline" size="lg">
              Consultație Telefonică Gratuită
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Neuromodulare;