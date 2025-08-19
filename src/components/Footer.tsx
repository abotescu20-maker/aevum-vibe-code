import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const services = [
    "Dermatologie Estetică",
    "Terapii IV Personalizate", 
    "Teste Genetice",
    "Neuromodulare EEG/VR",
    "Red Light Therapy",
    "Skin Longevity Kit"
  ];

  const quickLinks = [
    "Programe Longevitate",
    "Evaluări Online",
    "Rezultate & Dovezi",
    "Blog & Educație", 
    "Membership Elite",
    "Carriere"
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-display font-bold text-primary">AEVUM</h3>
              <span className="ml-2 text-sm text-background/70">Medical Longevity</span>
            </div>
            <p className="text-background/70 mb-6">
              Prima clinică de longevitate din România care personalizează terapiile pe baza profilului genetic și a biomarkerilor.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Servicii</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Link-uri Rapide</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-background/70">
                    Str. Medicală Nr. 123<br />
                    Sector 1, București<br />
                    Romania
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+40-xxx-xxx-xxx" className="text-background/70 hover:text-primary transition-colors">
                  +40 XXX XXX XXX
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:contact@aevum.ro" className="text-background/70 hover:text-primary transition-colors">
                  contact@aevum.ro
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-background/70">
                  <p>Lun - Vin: 9:00 - 18:00</p>
                  <p>Sâm: 9:00 - 14:00</p>
                  <p>Dum: Închis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/10 rounded-2xl p-8 mb-12 text-center">
          <h4 className="text-2xl font-display font-bold mb-4 text-primary">
            Începe-ți Călătoria către Longevitate
          </h4>
          <p className="text-background/70 mb-6 max-w-2xl mx-auto">
            Programează o evaluare completă sau începe cu una dintre evaluările noastre online gratuite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="medical">
              Programează Evaluarea
            </Button>
            <Button variant="outline" className="border-background/20 text-background hover:bg-background hover:text-foreground">
              Evaluări Gratuite
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-background/70 text-sm mb-4 lg:mb-0">
              © 2024 AEVUM Medical Longevity. Toate drepturile rezervate.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Politica de Confidențialitate
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Termeni și Condiții
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                GDPR
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Consimțământ Medical
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;