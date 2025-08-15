import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InteractiveMenu from "@/components/InteractiveMenu";
import AboutSection from "@/components/AboutSection";
import ReservationSection from "@/components/ReservationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16"> {/* Add padding for fixed navigation */}
        <section id="home">
          <Hero />
        </section>
        <section id="menu">
          <InteractiveMenu />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="reservations">
          <ReservationSection />
        </section>
      </div>
    </div>
  );
};

export default Index;
