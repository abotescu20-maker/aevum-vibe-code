import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Calendar } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Programe", href: "#packages" },
    { 
      name: "Servicii", 
      href: "#services",
      submenu: [
        { name: "Terapii IV", href: "/terapii-iv" },
        { name: "Dermatologie", href: "/dermatologie" },
        { name: "Neuromodulare", href: "/neuromodulare" }
      ]
    },
    { name: "Webshop", href: "/webshop" },
    { name: "Evaluări", href: "#assessments" },
    { name: "Despre", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-card-border z-50">
      {/* Top bar */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+40-xxx-xxx-xxx" className="flex items-center space-x-1 text-foreground-muted hover:text-primary transition-colors">
                <Phone className="w-3 h-3" />
                <span>+40 XXX XXX XXX</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">RO</Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-3 h-3 mr-1" />
                Rezervă
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">{/* ... keep existing code */}
            <h1 className="text-2xl font-display font-bold text-primary">AEVUM</h1>
            <span className="ml-2 text-sm text-foreground-muted">Medical Longevity</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-card-border rounded-lg shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline">Programează</Button>
              <Button variant="medical">Evaluare Gratuită</Button>
              <Link to="/login">
                <Button variant="ghost">Portal Pacient</Button>
              </Link>
            </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-card-border">
            <nav className="flex flex-col space-y-4 mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                  Programează
                </Button>
                <Button variant="medical" onClick={() => setIsMenuOpen(false)}>
                  Evaluare Gratuită
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;