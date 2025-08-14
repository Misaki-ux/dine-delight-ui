import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import signatureDish from "@/assets/signature-dish.jpg";

const MenuSection = () => {
  const menuCategories = [
    {
      title: "Appetizers",
      items: [
        {
          name: "Truffle Arancini",
          description: "Crispy risotto balls with black truffle and aged parmesan",
          price: "$18",
          featured: true
        },
        {
          name: "Seared Scallops",
          description: "Pan-seared with cauliflower purée and pancetta",
          price: "$24"
        },
        {
          name: "Burrata Caprese",
          description: "Fresh burrata with heirloom tomatoes and basil oil",
          price: "$16"
        }
      ]
    },
    {
      title: "Main Courses",
      items: [
        {
          name: "Wagyu Beef Tenderloin",
          description: "8oz prime cut with roasted vegetables and red wine jus",
          price: "$58",
          featured: true
        },
        {
          name: "Pan-Roasted Salmon",
          description: "Atlantic salmon with lemon herb butter and quinoa",
          price: "$32"
        },
        {
          name: "Duck Confit",
          description: "Slow-cooked duck leg with cherry gastrique",
          price: "$38"
        }
      ]
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Chocolate Soufflé",
          description: "Warm dark chocolate soufflé with vanilla bean ice cream",
          price: "$14",
          featured: true
        },
        {
          name: "Tiramisu",
          description: "Classic Italian dessert with mascarpone and coffee",
          price: "$12"
        }
      ]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-elegant text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each dish is carefully crafted using the finest ingredients, 
            combining traditional techniques with modern innovation.
          </p>
        </div>

        {/* Featured Dish */}
        <div className="mb-20">
          <Card className="max-w-4xl mx-auto elegant-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-square">
                <img 
                  src={signatureDish} 
                  alt="Signature dish presentation"
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4 accent-gradient text-accent-foreground">
                  Chef's Signature
                </Badge>
                <CardTitle className="font-elegant text-3xl mb-4">
                  Seasonal Tasting Menu
                </CardTitle>
                <CardDescription className="text-base mb-6">
                  A seven-course journey through the finest seasonal ingredients, 
                  showcasing our chef's creativity and passion for culinary excellence.
                </CardDescription>
                <div className="text-2xl font-semibold text-accent mb-4">
                  $95 per person
                </div>
                <p className="text-sm text-muted-foreground">
                  Available Tuesday through Saturday. Wine pairings available for an additional $45.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Menu Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {menuCategories.map((category) => (
            <Card key={category.title} className="warm-shadow">
              <CardHeader>
                <CardTitle className="font-elegant text-2xl text-primary">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.name} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        {item.name}
                        {item.featured && (
                          <Badge variant="outline" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </h4>
                      <span className="text-accent font-semibold">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;