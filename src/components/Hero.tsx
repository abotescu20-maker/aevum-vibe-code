import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Dna } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="medical-badge-primary">
                <Sparkles className="w-4 h-4 mr-1" />
                Prima Clinică de Longevitate din România
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Look Well.
              <br />
              <span className="text-primary">Feel Well.</span>
              <br />
              Get Well.
            </h1>
            
            <p className="text-xl text-foreground-muted mb-8 leading-relaxed">
              Personalizăm terapiile de longevitate pe baza profilului tău genetic și a biomarkerilor, 
              integrat cu dermatologie premium și neuromodulare avansată.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => navigate("/auth")}
              >
                Rezervă Evaluarea
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate("/webshop")}
              >
                <Clock className="w-5 h-5 mr-2" />
                Aging Clock
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-foreground-muted">
              <div className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-primary" />
                <span>Teste Genetice</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>IV Personalizate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Rezultate Măsurabile</span>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-glow transition-all duration-500">
              <img
                src={heroImage}
                alt="AEVUM Medical Longevity Clinic"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-accent-gold text-background px-4 py-2 rounded-full font-semibold animate-float">
              +5 ani vârstă biologică
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold animate-float" style={{ animationDelay: '1s' }}>
              Rezultate în 90 zile
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;