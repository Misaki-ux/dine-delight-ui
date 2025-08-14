import { Button } from "@/components/ui/button";
import heroImage from "@/assets/restaurant-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Elegant restaurant interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="font-elegant text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Bella Vista
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light tracking-wide opacity-90">
          Where culinary artistry meets elegant dining
        </p>
        <p className="text-lg mb-12 max-w-2xl mx-auto opacity-80">
          Experience exceptional cuisine crafted with passion, served in an atmosphere 
          of refined sophistication and warmth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="accent" 
            size="lg" 
            className="px-8 py-4 text-lg font-medium"
          >
            Reserve Your Table
          </Button>
          <Button 
            variant="elegant" 
            size="lg" 
            className="px-8 py-4 text-lg"
          >
            View Our Menu
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 font-light">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;