import { Card, CardContent } from "@/components/ui/card";
import chefPortrait from "@/assets/chef-portrait.jpg";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-elegant text-4xl md:text-5xl font-bold text-primary mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2010, Bella Vista has been a cornerstone of fine dining excellence, 
                combining traditional culinary techniques with innovative flavors that celebrate 
                both local and international cuisine.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our commitment to sourcing the finest ingredients and creating memorable 
                experiences has earned us recognition among food enthusiasts and critics alike.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent mb-2">15+</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent mb-2">50K+</div>
                  <div className="text-muted-foreground">Happy Guests</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chef Portrait */}
          <div className="space-y-6">
            <Card className="elegant-shadow overflow-hidden">
              <div className="aspect-[3/4]">
                <img 
                  src={chefPortrait} 
                  alt="Executive Chef" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-elegant text-xl font-semibold mb-2">
                  Chef Marco Alessandro
                </h3>
                <p className="text-muted-foreground mb-4">
                  Executive Chef & Owner
                </p>
                <p className="text-sm leading-relaxed">
                  With over 20 years of culinary experience across Europe and America, 
                  Chef Marco brings passion and precision to every dish, creating 
                  unforgettable dining experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;