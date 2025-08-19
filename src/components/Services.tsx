import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Brain, ArrowRight } from "lucide-react";

const Services = () => {
  const pillars = [
    {
      icon: Eye,
      title: "LOOK WELL",
      subtitle: "Dermatologie & Estetică",
      description: "Dermatologie estetică integrată cu planul de longevitate pentru rezultate holistice.",
      features: [
        "Tratamente laser avansate",
        "Injectabile premium",
        "Red light therapy",
        "Protecție anti-aging"
      ],
      color: "primary"
    },
    {
      icon: Heart,
      title: "FEEL WELL",
      subtitle: "Longevitate & Wellness",
      description: "Terapii personalizate bazate pe biomarkeri și profilul genetic individual.",
      features: [
        "IV personalizate (NAD+, Glutation)",
        "Teste epigenetice",
        "Saună IR & PEMF",
        "Monitorizare biomarkeri"
      ],
      color: "accent-gold"
    },
    {
      icon: Brain,
      title: "GET WELL",
      subtitle: "Genetică & Neuromodulare",
      description: "Optimizarea funcțiilor cognitive și emoționale prin tehnologii avansate.",
      features: [
        "Neuromodulare EEG/VR",
        "Teste genetice complete",
        "Analiza microbiomului",
        "Planuri personalizate"
      ],
      color: "accent-silver"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Trei Piloni ai <span className="text-primary">Longevității</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Abordarea noastră integrativă combină știința genetică cu terapii personalizate 
            pentru rezultate măsurabile în longevitate și wellness.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Card 
                key={pillar.title} 
                className="medical-card group hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${pillar.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${pillar.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-display">{pillar.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-foreground-muted">
                    {pillar.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground-muted mb-6">{pillar.description}</p>
                  <ul className="space-y-3 mb-6">
                    {pillar.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group">
                    Află Mai Mult
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-foreground-muted mb-6">
            Fiecare program este personalizat în funcție de rezultatele testelor genetice și evaluărilor medicale
          </p>
          <Button variant="medical" size="lg">
            Programează Consultația Integrativă
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;