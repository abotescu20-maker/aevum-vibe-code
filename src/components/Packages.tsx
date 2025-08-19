import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Zap } from "lucide-react";

const Packages = () => {
  const packages = [
    {
      name: "Discovery",
      price: "€950",
      popular: false,
      icon: Zap,
      description: "Începe-ți călătoria către longevitate cu o evaluare completă",
      duration: "6 luni monitoring",
      features: [
        "Evaluare medicală 90 min",
        "Test genetic complet (250+ variante)",
        "Scanare compoziție corporală",
        "IV personalizat (NAD+ sau Glutation)",
        "Plan personalizat de longevitate",
        "Monitorizare 6 luni"
      ],
      cta: "Începe Discovery"
    },
    {
      name: "Fusion",
      price: "€1,450",
      popular: true,
      icon: Star,
      description: "Combinația perfectă între dermatologie și longevitate",
      duration: "3 luni intensiv",
      features: [
        "Tot ce include Discovery",
        "4 ședințe Red Light Therapy",
        "Tratament dermatologic complementar",
        "Skin longevity assessment",
        "Monitorizare intensivă 3 luni",
        "Acces prioritar la rezervări"
      ],
      cta: "Alege Fusion"
    },
    {
      name: "Optimization Premium",
      price: "€2,800",
      popular: false,
      icon: Crown,
      description: "Programul complet pentru optimizarea longevității",
      duration: "6 luni VIP",
      features: [
        "Tot ce include Fusion",
        "Test epigenetic (vârsta biologică)",
        "Panouri hormonale complete",
        "8 IV-uri personalizate",
        "Neuromodulare EEG/VR (2 ședințe)",
        "Follow-up la 3 și 6 luni",
        "Acces prioritar la toate serviciile"
      ],
      cta: "Premium Access"
    }
  ];

  return (
    <section id="packages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Programe de <span className="text-primary">Longevitate</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Programe integrate, personalizate pe baza profilului tău genetic și a biomarkerilor. 
            Fiecare pachet include monitorizare continuă și ajustări personalizate.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Card 
                key={pkg.name}
                className={`medical-card relative ${pkg.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''} hover:scale-[1.02] transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="medical-badge-primary">
                      <Star className="w-4 h-4 mr-1" />
                      Cel mai popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-display">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                  <CardDescription className="text-accent-gold font-medium">
                    {pkg.duration}
                  </CardDescription>
                  <p className="text-foreground-muted mt-4">{pkg.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={pkg.popular ? "medical" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    {pkg.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-primary-soft/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-display font-bold mb-4">
            Program Special: Skin & Longevity Fusion
          </h3>
          <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
            Combinația perfectă între crema personalizată AEVUM Skin Longevity și terapiile de longevitate. 
            <span className="font-semibold text-primary"> €1,850 </span> pentru 3 luni complete.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <span className="medical-badge-primary">Skin Kit personalizat</span>
            <span className="medical-badge-primary">2 IV anti-aging</span>
            <span className="medical-badge-primary">2 Red Light sessions</span>
            <span className="medical-badge-primary">Control dermatologic</span>
          </div>
          <Button variant="premium" size="lg">
            Comandă Skin Fusion
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Packages;