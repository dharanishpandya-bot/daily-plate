import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Plus, Minus } from 'lucide-react';

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Staples', 'Snacks'];

const groceryItems = [
  { id: '1', name: 'Fresh Tomatoes', price: 40, unit: '1 kg', category: 'Vegetables', emoji: '🍅' },
  { id: '2', name: 'Onions', price: 30, unit: '1 kg', category: 'Vegetables', emoji: '🧅' },
  { id: '3', name: 'Potatoes', price: 25, unit: '1 kg', category: 'Vegetables', emoji: '🥔' },
  { id: '4', name: 'Bananas', price: 45, unit: '1 dozen', category: 'Fruits', emoji: '🍌' },
  { id: '5', name: 'Apples', price: 180, unit: '1 kg', category: 'Fruits', emoji: '🍎' },
  { id: '6', name: 'Milk', price: 60, unit: '1 liter', category: 'Dairy', emoji: '🥛' },
  { id: '7', name: 'Curd', price: 40, unit: '400g', category: 'Dairy', emoji: '🫙' },
  { id: '8', name: 'Rice', price: 80, unit: '1 kg', category: 'Staples', emoji: '🍚' },
  { id: '9', name: 'Wheat Flour', price: 45, unit: '1 kg', category: 'Staples', emoji: '🌾' },
  { id: '10', name: 'Biscuits', price: 30, unit: '1 pack', category: 'Snacks', emoji: '🍪' },
  { id: '11', name: 'Chips', price: 20, unit: '1 pack', category: 'Snacks', emoji: '🥔' },
  { id: '12', name: 'Oranges', price: 90, unit: '1 kg', category: 'Fruits', emoji: '🍊' },
];

export default function Groceries() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredItems = groceryItems.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const cartTotal = Object.entries(quantities).reduce((sum, [id, qty]) => {
    const item = groceryItems.find(i => i.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Groceries</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search groceries..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="px-5 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-5 pb-28">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => {
            const qty = quantities[item.id] || 0;
            return (
              <Card key={item.id} className="p-4">
                <div className="text-4xl text-center mb-3">{item.emoji}</div>
                <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.unit}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold">₹{item.price}</span>
                  {qty === 0 ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-6 text-center font-semibold">{qty}</span>
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
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
              <Button variant="ghost" className="text-secondary-foreground font-semibold">
                View Cart →
              </Button>
            </div>
          </Card>
        </div>
      )}
    </MobileLayout>
  );
}
