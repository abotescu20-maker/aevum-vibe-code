import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Microscope, Heart, ArrowRight } from "lucide-react";
import consultationImage from "@/assets/consultation-room.jpg";

const About = () => {
  const stats = [
    { value: "500+", label: "Pacienți tratați", icon: Users },
    { value: "98%", label: "Satisfacție pacienți", icon: Heart },
    { value: "15+", label: "Ani experiență", icon: Award },
    { value: "50+", label: "Studii aplicate", icon: Microscope }
  ];

  const team = [
    {
      name: "Dr. Elena Ionescu",
      role: "Medic Primar Medicină Internă",
      specialty: "Longevitate & Biomarkeri",
      description: "15+ ani în medicina personalizată, specialist în optimizarea longevității prin biomarkeri."
    },
    {
      name: "Dr. Andrei Popescu", 
      role: "Medic Dermatolog",
      specialty: "Dermatologie Integrativă",
      description: "Expert în dermatologie estetică integrată cu terapii de longevitate și wellness."
    },
    {
      name: "Dr. Maria Gheorghe",
      role: "Medic Genetician",
      specialty: "Genetică & Epigenetică",
      description: "Specialist în interpretarea testelor genetice pentru personalizarea terapiilor."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="medical-card text-center hover:scale-105 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-foreground-muted">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Prima Clinică de <span className="text-primary">Longevitate</span> din România
            </h2>
            <p className="text-xl text-foreground-muted mb-6 leading-relaxed">
              AEVUM reprezintă convergența între știința genetică avansată și medicina personalizată. 
              Suntem prima clinică din România care integrează testele genetice cu terapii de longevitate 
              și dermatologie premium.
            </p>
            <p className="text-foreground-muted mb-8">
              Misiunea noastră este să redefinim conceptul de sănătate prin abordarea holistică 
              "Look Well, Feel Well, Get Well" - o combinație unică între aspectul exterior, 
              sănătatea internă și optimizarea funcțiilor cognitive și emoționale.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Personalizare 100% bazată pe profilul genetic individual</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Integrare neuromodulare EEG/VR pentru optimizare cognitivă</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Rezultate măsurabile prin biomarkeri și monitorizare continuă</span>
              </div>
            </div>

            <Button variant="medical" size="lg" className="group">
              Programează Consultația
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-glow transition-all duration-500">
              <img
                src={consultationImage}
                alt="AEVUM Medical Consultation Room"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-display font-bold text-center mb-12">
            Echipa Medicală <span className="text-primary">AEVUM</span>
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="medical-card text-center hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="text-xl font-display font-bold mb-2">{member.name}</h4>
                  <p className="text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-accent-gold text-sm font-medium mb-4">{member.specialty}</p>
                  <p className="text-foreground-muted text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-hero rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-display font-bold mb-4">
            Alătură-te Revoluției Longevității
          </h3>
          <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
            Fii printre primii care beneficiază de medicina personalizată de longevitate în România. 
            Începe cu o evaluare completă și descoperă potențialul tău de longevitate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="medical" size="lg">
              Rezervă Evaluarea Completă
            </Button>
            <Button variant="outline" size="lg">
              Descarcă Brochura
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;