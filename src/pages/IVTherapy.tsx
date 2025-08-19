import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Droplets, Shield, Zap, Brain, Heart, Sparkles, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const IVTherapy = () => {
  const therapies = [
    {
      name: "NAD+ Boost",
      price: "€180",
      duration: "60-90 min",
      icon: Zap,
      description: "Coenzima anti-aging pentru regenerare celulară și energie optimă",
      benefits: [
        "Regenerare celulară accelerată",
        "Creșterea nivelului de energie",
        "Îmbunătățirea funcției cognitive",
        "Protecție împotriva îmbătrânirii"
      ],
      ingredients: [
        "NAD+ 500mg",
        "Vitamina B Complex",
        "Magneziu chelat",
        "Soluție salină sterilă"
      ],
      idealFor: ["Oboseală cronică", "Nebunie mentală", "Anti-aging", "Performanță sportivă"],
      frequency: "2-3 perfuzii/lună pentru rezultate optime"
    },
    {
      name: "Glutation Master",
      price: "€150",
      duration: "45-60 min", 
      icon: Shield,
      description: "Antioxidantul principal al organismului pentru detoxifiere profundă",
      benefits: [
        "Detoxifiere hepatică completă",
        "Luminozitate și uniformizarea pielii",
        "Sistem imunitar fortificat",
        "Protecție împotriva radicalilor liberi"
      ],
      ingredients: [
        "Glutation redus 1200mg",
        "Vitamina C liposomală",
        "Seleniu organic",
        "Alpha-lipoic acid"
      ],
      idealFor: ["Detoxifiere", "Probleme de piele", "Sistem imunitar slab", "Expunere la toxine"],
      frequency: "1-2 perfuzii/săptămână pentru cure intensive"
    },
    {
      name: "Myers Cocktail Plus",
      price: "€120",
      duration: "30-45 min",
      icon: Heart,
      description: "Formula clasică îmbunătățită pentru wellness general și vitalitate",
      benefits: [
        "Hidratare profundă",
        "Energie susținută",
        "Sistem imunitar robust",
        "Recuperare accelerată"
      ],
      ingredients: [
        "Vitamina C 2000mg",
        "Complex B întreg",
        "Magneziu sulfat",
        "Calciu gluconat",
        "Zinc chelat"
      ],
      idealFor: ["Wellness general", "Sistem imunitar", "Stres cronic", "Recuperare sportivă"],
      frequency: "1 perfuzie/săptămână pentru menținere"
    },
    {
      name: "Cognitive Enhancement",
      price: "€200",
      duration: "75-90 min",
      icon: Brain,
      description: "Formula avansată pentru optimizarea funcțiilor cognitive și claritate mentală",
      benefits: [
        "Claritate mentală superioară",
        "Memorie îmbunătățită",
        "Focus și concentrare",
        "Neuroprotecție"
      ],
      ingredients: [
        "NAD+ 300mg",
        "Fosfatidilcolină",
        "Acetil-L-carnitină", 
        "PQQ (Pyrroloquinoline quinone)",
        "Vitamina B12 metilcobalamină"
      ],
      idealFor: ["Performanță cognitivă", "Fog mental", "Stres intelectual", "Neuroprotecție"],
      frequency: "1 perfuzie/2 săptămâni pentru menținere cognitivă"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Consultația Genetică",
      description: "Analizăm profilul tău genetic pentru a identifica deficiențele metabolice și necesitățile individuale."
    },
    {
      step: "2", 
      title: "Testarea Biomarkerilor",
      description: "Măsurăm nivelurile vitaminelor, mineralelor și antioxidanților pentru o imagine completă."
    },
    {
      step: "3",
      title: "Personalizare Formula",
      description: "Creăm formulele IV specifice bazate pe rezultatele testelor și obiectivele tale de sănătate."
    },
    {
      step: "4",
      title: "Administrare Controlată",
      description: "Perfuziile sunt administrate într-un mediu medical controlat, sub supravegherea medicului."
    },
    {
      step: "5",
      title: "Monitorizare Rezultate",
      description: "Urmărim progresul prin retestări regulate și ajustăm formulele pentru rezultate optime."
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
                  <Droplets className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6">
                Terapii IV <span className="text-primary">Personalizate</span>
              </h1>
              
              <p className="text-xl text-foreground-muted mb-8 leading-relaxed max-w-3xl mx-auto">
                Primele perfuzii IV din România personalizate pe baza profilului genetic individual. 
                Fiecare formulă este adaptată metabolismului tău unic pentru rezultate maxime.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="medical" size="xl">
                  Programează Consultația IV
                </Button>
                <Button variant="outline" size="xl">
                  Test Genetic Gratuit
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                Procesul de <span className="text-primary">Personalizare</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Nu oferim formule standard. Fiecare perfuzie este creată specific pentru profilul tău genetic și biomarkerii actuali.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-foreground-muted text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Therapies Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6">
                Terapii IV <span className="text-primary">Avansate</span>
              </h2>
              <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                Fiecare terapie poate fi ajustată și combinată în funcție de necesitățile tale specifice, 
                identificate prin testele genetice și biomarkerii.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {therapies.map((therapy, index) => {
                const Icon = therapy.icon;
                return (
                  <Card key={therapy.name} className="medical-card hover:scale-[1.02] transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{therapy.price}</div>
                          <div className="text-sm text-foreground-muted">{therapy.duration}</div>
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-display">{therapy.name}</CardTitle>
                      <CardDescription className="text-base">
                        {therapy.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Beneficii principale:</h4>
                        <ul className="space-y-2">
                          {therapy.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Ingrediente active:</h4>
                        <div className="flex flex-wrap gap-2">
                          {therapy.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="medical-badge-primary text-xs">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Ideal pentru:</h4>
                        <div className="flex flex-wrap gap-2">
                          {therapy.idealFor.map((condition, idx) => (
                            <span key={idx} className="medical-badge-gold text-xs">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-accent/10 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">Frecvența recomandată:</span>
                        </div>
                        <p className="text-sm text-foreground-muted">{therapy.frequency}</p>
                      </div>

                      <Button variant="outline" className="w-full">
                        Personalizează Formula
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Combination Packages */}
            <div className="bg-gradient-subtle rounded-2xl p-8 border border-card-border">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-display font-bold mb-4">
                  Pachete <span className="text-primary">Combinate</span>
                </h3>
                <p className="text-foreground-muted max-w-2xl mx-auto">
                  Combinații personalizate de terapii IV pentru rezultate sinergice și costuri optimizate.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="medical-card">
                  <CardContent className="pt-6 text-center">
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Energy Boost Package</h4>
                    <p className="text-2xl font-bold text-primary mb-2">€450</p>
                    <p className="text-sm text-foreground-muted mb-4">3 perfuzii/lună</p>
                    <p className="text-sm">NAD+ + Myers + Cognitive Enhancement</p>
                  </CardContent>
                </Card>

                <Card className="medical-card ring-2 ring-primary">
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Detox & Glow Package</h4>
                    <p className="text-2xl font-bold text-primary mb-2">€380</p>
                    <p className="text-sm text-foreground-muted mb-4">2 perfuzii/lună</p>
                    <p className="text-sm">Glutation + Vitamina C + Myers</p>
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardContent className="pt-6 text-center">
                    <Brain className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Performance Package</h4>
                    <p className="text-2xl font-bold text-primary mb-2">€520</p>
                    <p className="text-sm text-foreground-muted mb-4">4 perfuzii/lună</p>
                    <p className="text-sm">NAD+ + Cognitive + Glutation + Myers</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-soft/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Începe cu <span className="text-primary">Testul Genetic</span>
            </h2>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Pentru a crea formulele IV perfecte pentru tine, începem cu analiza profilului tău genetic. 
              Primul test este gratuit cu orice pachet de 3 perfuzii.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="medical" size="xl">
                Programează Consultația
              </Button>
              <Button variant="outline" size="xl">
                Află Prețurile Complete
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default IVTherapy;