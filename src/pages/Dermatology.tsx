import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Zap, Syringe, Lightbulb, Clock, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dermatology = () => {
  const treatments = [
    {
      name: "Rejuvenare cu Laser CO2",
      price: "€380-580",
      duration: "45-60 min",
      icon: Zap,
      description: "Tehnologie fractională avansată pentru resurface și regenerare profundă",
      benefits: [
        "Reducerea ridurilor fine și profunde",
        "Îmbunătățirea texturii pielii",
        "Stimularea colagenului natural",
        "Uniformizarea pigmentației"
      ],
      recovery: "5-7 zile",
      sessions: "1-3 ședințe",
      suitableFor: ["Riduri", "Cicatrici acnee", "Pigmentări", "Textura pielii"]
    },
    {
      name: "Injectabile Premium",
      price: "€250-450",
      duration: "30-45 min",
      icon: Syringe,
      description: "Acid hialuronic și neuromodulatoare de cea mai înaltă calitate",
      benefits: [
        "Volumizare naturală",
        "Relaxarea ridurilor de expresie",
        "Hidratare profundă",
        "Rezultate imediate"
      ],
      recovery: "0-2 zile",
      sessions: "1 ședință",
      suitableFor: ["Volume", "Riduri expresie", "Hidratare", "Contur facial"]
    },
    {
      name: "Red Light Therapy",
      price: "€80-120",
      duration: "20-30 min",
      icon: Lightbulb,
      description: "Terapie cu lumină roșie pentru regenerare celulară și anti-aging",
      benefits: [
        "Stimularea producției de colagen",
        "Reducerea inflamației",
        "Accelerarea vindecării",
        "Îmbunătățirea circulației"
      ],
      recovery: "Fără",
      sessions: "6-12 ședințe",
      suitableFor: ["Anti-aging", "Acnee", "Cicatrizare", "Wellness general"]
    },
    {
      name: "Tratamente Acnee Avansate",
      price: "€150-280",
      duration: "60-90 min",
      icon: Eye,
      description: "Protocol integrat pentru acnee cu laser, peeling și terapie fotodinamică",
      benefits: [
        "Controlul sebumului",
        "Reducerea inflamației",
        "Prevenirea cicatricilor",
        "Îmbunătățirea texturii"
      ],
      recovery: "3-5 zile",
      sessions: "4-8 ședințe",
      suitableFor: ["Acnee activă", "Comedoane", "Pori dilatați", "Piele grasă"]
    }
  ];

  const packages = [
    {
      name: "Skin Renewal Basic",
      price: "€680",
      treatments: [
        "Consultație dermatologică completă",
        "2 ședințe Red Light Therapy",
        "1 peeling medical mediu",
        "Protocoale home care personalizate"
      ],
      duration: "2 luni",
      popular: false
    },
    {
      name: "Advanced Rejuvenation",
      price: "€1,280", 
      treatments: [
        "Tot ce include Basic",
        "1 ședință Laser CO2 fractional",
        "2 ședințe injectabile (HA + toxină)",
        "4 ședințe Red Light suplimentare",
        "Monitorizare 3 luni"
      ],
      duration: "3 luni",
      popular: true
    },
    {
      name: "Premium Transformation",
      price: "€2,150",
      treatments: [
        "Tot ce include Advanced",
        "2 ședințe Laser CO2 suplimentare",
        "Tratament acnee personalizat",
        "Plan nutrițional pentru piele",
        "6 luni follow-up complet"
      ],
      duration: "6 luni",
      popular: false
    }
  ];

  const integration = [
    {
      title: "Analiza Genetică a Pielii",
      description: "Identificăm predispoziția genetică pentru îmbătrânire, sensibilitate și producția de colagen"
    },
    {
      title: "Terapii IV Complementare", 
      description: "Combinăm tratamentele externe cu perfuzii de Glutation și Vitamina C pentru rezultate superioare"
    },
    {
      title: "Monitorizare Biomarkeri",
      description: "Urmărim markerii inflamatori și oxidativi pentru optimizarea tratamentelor"
    },
    {
      title: "Skin Longevity Kit",
      description: "Creme personalizate create în funcție de profilul genetic și nevoile pielii tale"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link to="/" className="inline-flex items-center text-primary hover:text-primary-glow mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Înapoi la pagina principală
              </Link>
              
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6">
                LOOK WELL
                <br />
                <span className="text-primary">Dermatologie Integrativă</span>
              </h1>
              
              <p className="text-xl text-foreground-muted mb-8 leading-relaxed max-w-3xl mx-auto">
                Prima clinică din România care integrează dermatologia estetică cu testele genetice și 
                terapiile de longevitate pentru rezultate holistice și de durată.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="medical" size="xl">
                  Consultație Dermatologică
                </Button>
                <Button variant="outline" size="xl">
                  Analiza Genetică Piele
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-background-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                Abordare <span className="text-primary">Integrativă</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Nu tratăm doar suprafața. Combinăm dermatologia cu analiza genetică și 
                terapiile sistemice pentru rezultate superioare și de lungă durată.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {integration.map((item, index) => (
                <Card key={item.title} className="medical-card hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-foreground-muted">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Treatments Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                Tratamente <span className="text-primary">Avansate</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Tehnologii de ultimă generație combinate cu expertiza medicală pentru 
                rezultate excepționale în siguranță completă.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {treatments.map((treatment, index) => {
                const Icon = treatment.icon;
                return (
                  <Card key={treatment.name} className="medical-card hover:scale-[1.02] transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">{treatment.price}</div>
                          <div className="text-sm text-foreground-muted">{treatment.duration}</div>
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-display">{treatment.name}</CardTitle>
                      <CardDescription className="text-base">
                        {treatment.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Beneficii:</h4>
                        <ul className="space-y-2">
                          {treatment.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm text-foreground-muted">Recuperare</div>
                          <div className="font-semibold">{treatment.recovery}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground-muted">Ședințe</div>
                          <div className="font-semibold">{treatment.sessions}</div>
                        </div>
                        <div>
                          <div className="text-sm text-foreground-muted">Durată</div>
                          <div className="font-semibold">{treatment.duration}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Indicat pentru:</h4>
                        <div className="flex flex-wrap gap-2">
                          {treatment.suitableFor.map((condition, idx) => (
                            <span key={idx} className="medical-badge-primary text-xs">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        Programează Consultația
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-background-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                Pachete <span className="text-primary">Dermatologie</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Programe complete care combină mai multe tratamente pentru rezultate 
                optime și costuri reduse.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <Card 
                  key={pkg.name}
                  className={`medical-card ${pkg.popular ? 'ring-2 ring-primary scale-105' : ''} hover:scale-[1.02] transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="medical-badge-primary">
                        <Star className="w-4 h-4 mr-1" />
                        Cel mai popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-display">{pkg.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                    <CardDescription className="text-accent-gold font-medium">
                      {pkg.duration}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {pkg.treatments.map((treatment, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{treatment}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant={pkg.popular ? "medical" : "outline"} 
                      className="w-full"
                      size="lg"
                    >
                      Alege Pachetul
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-soft/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Începe cu <span className="text-primary">Consultația Genetică</span>
            </h2>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Pentru rezultate cu adevărat personalizate, începem cu analiza profilului tău genetic 
              pentru a înțelege nevoile unice ale pielii tale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="medical" size="xl">
                Consultație Completă
              </Button>
              <Button variant="outline" size="xl">
                Test Genetic Piele
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dermatology;