import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus } from 'lucide-react';
import { groceryShopsData, GroceryItem } from '@/data/groceryShops';

export default function GroceryShopDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const shop = groceryShopsData.find(s => s.id === id);

  if (!shop) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-full p-5">
          <p className="text-lg font-semibold">Shop not found</p>
          <Button onClick={() => navigate('/groceries')} className="mt-4">
            Back to Groceries
          </Button>
        </div>
      </MobileLayout>
    );
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta),
    }));
  };

  const cartTotal = Object.entries(quantities).reduce((sum, [itemId, qty]) => {
    const item = shop.items.find(i => i.id === itemId);
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  // Group items by category
  const categories = [...new Set(shop.items.map(item => item.category))];

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{shop.name}</h1>
            <p className="text-sm text-muted-foreground">{shop.type}</p>
          </div>
        </div>

        {/* Shop Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="font-medium">{shop.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{shop.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{shop.distance}</span>
          </div>
        </div>
      </header>

      {/* Items by Category */}
      <div className="px-5 pb-32 space-y-6">
        {categories.map(category => (
          <section key={category}>
            <h2 className="text-lg font-semibold mb-3">{category}</h2>
            <div className="grid grid-cols-2 gap-4">
              {shop.items
                .filter(item => item.category === category)
                .map(item => {
                  const qty = quantities[item.id] || 0;
                  return (
                    <Card key={item.id} className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.unit}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">₹{item.price}</span>
                          {qty === 0 ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 px-3"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-8 w-8"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-6 text-center font-semibold">{qty}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </section>
        ))}
      </div>

      {/* Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 max-w-lg mx-auto animate-slide-up">
          <Card className="p-4 bg-secondary text-secondary-foreground border-0 shadow-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{cartCount} items</p>
                <p className="text-sm opacity-90">₹{cartTotal}</p>
              </div>
              <Button 
                variant="ghost" 
                className="text-secondary-foreground font-semibold"
                onClick={() => navigate('/cart')}
              >
                View Cart →
              </Button>
            </div>
          </Card>
        </div>
      )}
    </MobileLayout>
  );
}
