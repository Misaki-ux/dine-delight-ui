import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import AuthDialog from "./AuthDialog";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_popular: boolean;
  allergens: string[];
  dietary_tags: string[];
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  menu_items: MenuItem[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function InteractiveMenu() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const { data: categoriesData, error } = await supabase
        .from("menu_categories")
        .select(`
          *,
          menu_items (*)
        `)
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Error fetching menu:", error);
      toast({
        title: "Error",
        description: "Failed to load menu items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prev.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getCartItemQuantity = (itemId: string) => {
    return cart.find(item => item.id === itemId)?.quantity || 0;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-elegant text-primary mb-4">Loading Our Menu...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-elegant text-primary mb-6">Our Interactive Menu</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted dishes made with the finest ingredients and add them to your order
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mb-12">
            <Card className="max-w-lg mx-auto warm-shadow">
              <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                  Your Order ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="text-sm">{item.name} x{item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total:</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                {user ? (
                  <Button className="w-full mt-4" variant="hero">
                    Proceed to Checkout
                  </Button>
                ) : (
                  <AuthDialog>
                    <Button className="w-full mt-4" variant="hero">
                      Sign In to Order
                    </Button>
                  </AuthDialog>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Menu Categories */}
        <Tabs defaultValue={categories[0]?.id} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto mb-12 p-1 h-auto bg-card warm-shadow" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-lg py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-smooth"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-6">
                <h3 className="text-2xl font-elegant text-primary mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-8">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.menu_items?.map((item) => (
                  <Card key={item.id} className="transition-smooth hover:elegant-shadow hover:scale-105 group overflow-hidden">
                    {/* Image Section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <div className="text-muted-foreground text-6xl opacity-20">🍽️</div>
                        </div>
                      )}
                      {item.is_popular && (
                        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-lg">
                          Popular
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="font-elegant text-xl text-primary">{item.name}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Dietary tags and allergens */}
                      {(item.dietary_tags?.length > 0 || item.allergens?.length > 0) && (
                        <div className="space-y-3 mb-4">
                          {item.dietary_tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.dietary_tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {item.allergens?.length > 0 && (
                            <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
                              <span className="font-medium">Contains:</span> {item.allergens.join(", ")}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          ${item.price.toFixed(2)}
                        </div>
                        
                        {getCartItemQuantity(item.id) > 0 ? (
                          <div className="flex items-center gap-3 bg-card rounded-full p-1 border">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-bold text-primary">
                              {getCartItemQuantity(item.id)}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}