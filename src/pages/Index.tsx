import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ReservationSection from "@/components/ReservationSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <MenuSection />
      <AboutSection />
      <ReservationSection />
    </div>
  );
};

export default Index;
