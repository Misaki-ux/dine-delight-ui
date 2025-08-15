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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-elegant text-primary mb-4">Our Interactive Menu</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted dishes and add them to your order
          </p>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mb-8">
            <Card className="max-w-md mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
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
          <TabsList className="grid w-full max-w-2xl mx-auto mb-8" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.menu_items?.map((item) => (
                  <Card key={item.id} className="transition-smooth hover:elegant-shadow">
                    <CardHeader>
                      {item.image_url && (
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-start justify-between">
                        <CardTitle className="font-elegant text-xl">{item.name}</CardTitle>
                        {item.is_popular && (
                          <Badge variant="secondary" className="ml-2">Popular</Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-semibold text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                        
                        {getCartItemQuantity(item.id) > 0 ? (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {getCartItemQuantity(item.id)}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="accent"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>

                      {/* Dietary tags and allergens */}
                      {(item.dietary_tags?.length > 0 || item.allergens?.length > 0) && (
                        <div className="space-y-2">
                          {item.dietary_tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.dietary_tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {item.allergens?.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              <span className="font-medium">Contains:</span> {item.allergens.join(", ")}
                            </div>
                          )}
                        </div>
                      )}
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