import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Assessments from "@/components/Assessments";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Assessments />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
