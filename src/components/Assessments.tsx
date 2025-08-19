import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, Brain, ArrowRight, Star } from "lucide-react";

const Assessments = () => {
  const assessments = [
    {
      icon: ClipboardList,
      title: "Chestionar Calitatea Vieții",
      subtitle: "QLI - Quality of Life Index",
      description: "Evaluează 7 domenii cheie ale sănătății tale pentru un profil complet de wellness.",
      duration: "~10 minute",
      domains: [
        "Energie & oboseală",
        "Calitatea somnului", 
        "Dispoziție & stres",
        "Claritate mentală",
        "Digestie & confort",
        "Performanță fizică",
        "Sănătatea pielii"
      ],
      benefits: [
        "Scor personalizat 0-100",
        "Hartă radială pe domenii",
        "Recomandări personalizate",
        "Plan de îmbunătățire"
      ],
      cta: "Începe Evaluarea QLI",
      color: "primary"
    },
    {
      icon: Clock,
      title: "Aging Clock",
      subtitle: "Well-Age Index",
      description: "Determină vârsta ta biologică de wellness și primește un plan personalizat de optimizare.",
      duration: "~15 minute",
      domains: [
        "Lifestyle & Recovery",
        "Nutriție & hidratare",
        "Stres & management emoțional", 
        "Activitate fizică",
        "Sănătatea pielii",
        "Funcții cognitive",
        "Biomarkeri opționali"
      ],
      benefits: [
        "Well-Age Score ±5 ani",
        "Indice de încredere",
        "Timeline recomandări",
        "Pachet personalizat sugerat"
      ],
      cta: "Calculează Well-Age",
      color: "accent-gold"
    }
  ];

  return (
    <section id="assessments" className="py-20 bg-background-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Evaluări <span className="text-primary">Gratuite</span> Online
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Începe-ți călătoria către longevitate cu evaluările noastre științifice validate. 
            Rezultate instantanee și recomandări personalizate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {assessments.map((assessment, index) => {
            const Icon = assessment.icon;
            return (
              <Card 
                key={assessment.title}
                className="medical-card hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-${assessment.color}/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${assessment.color}`} />
                    </div>
                    <div className="medical-badge-primary">
                      <Clock className="w-3 h-3 mr-1" />
                      {assessment.duration}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-display">{assessment.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-accent-gold">
                    {assessment.subtitle}
                  </CardDescription>
                  <p className="text-foreground-muted mt-4">{assessment.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">Domenii evaluate:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {assessment.domains.slice(0, 4).map((domain, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{domain}</span>
                        </div>
                      ))}
                      {assessment.domains.length > 4 && (
                        <div className="text-sm text-foreground-muted">
                          +{assessment.domains.length - 4} alte domenii...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground">Vei primi:</h4>
                    <div className="space-y-2">
                      {assessment.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <Star className="w-4 h-4 text-accent-gold" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant={assessment.color === 'primary' ? 'medical' : 'premium'} 
                    className="w-full group"
                    size="lg"
                  >
                    {assessment.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-subtle rounded-2xl p-8 border border-card-border">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">
              Rezultate Instantanee & Planuri Personalizate
            </h3>
            <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
              La finalizarea oricărei evaluări, vei primi imediat rezultatele detaliate și recomandări 
              specifice pentru îmbunătățirea scorului tău de longevitate. Toate evaluările sunt 
              non-diagnostice și reprezintă instrumente informative de wellness.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="medical-badge-primary">Fără date medicale</span>
              <span className="medical-badge-primary">Rezultate instantanee</span>
              <span className="medical-badge-primary">100% confidențial</span>
              <span className="medical-badge-primary">GDPR compliant</span>
            </div>
            <Button variant="outline" size="lg">
              Vezi Exemple de Rezultate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assessments;