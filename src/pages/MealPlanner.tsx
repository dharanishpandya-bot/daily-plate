import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Sparkles, Leaf, Drumstick, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

const dietaryOptions = [
  { id: 'veg', label: 'Veg', icon: Leaf, color: 'text-success' },
  { id: 'nonveg', label: 'Non-Veg', icon: Drumstick, color: 'text-destructive' },
  { id: 'healthy', label: 'Healthy', icon: Heart, color: 'text-accent' },
];

const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

const mockSuggestions = [
  {
    id: '1',
    name: 'Paneer Butter Masala Thali',
    restaurant: 'Sharma Kitchen',
    isHomeMade: true,
    price: 120,
    isVeg: true,
    mealType: 'lunch',
    emoji: '🍛',
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    restaurant: 'Fresh Bites',
    isHomeMade: false,
    price: 180,
    isVeg: false,
    mealType: 'dinner',
    emoji: '🥗',
  },
  {
    id: '3',
    name: 'Masala Dosa with Sambar',
    restaurant: 'South Express',
    isHomeMade: true,
    price: 80,
    isVeg: true,
    mealType: 'breakfast',
    emoji: '🥞',
  },
];

export default function MealPlanner() {
  const navigate = useNavigate();
  const { dailyBudget, addToCart } = useApp();
  const [budget, setBudget] = useState([dailyBudget]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>(['veg']);
  const [selectedMeal, setSelectedMeal] = useState('Lunch');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleDiet = (id: string) => {
    setSelectedDiet(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleGeneratePlan = () => {
    setShowSuggestions(true);
  };

  const handleOrder = (suggestion: typeof mockSuggestions[0]) => {
    addToCart({
      menuItem: {
        id: suggestion.id,
        name: suggestion.name,
        description: '',
        price: suggestion.price,
        image: '',
        isVeg: suggestion.isVeg,
        category: 'meal',
      },
      quantity: 1,
      restaurantId: suggestion.restaurant,
      restaurantName: suggestion.restaurant,
    });
    navigate('/cart');
  };

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">AI Meal Planner</h1>
          <p className="text-sm text-muted-foreground">Get personalized suggestions</p>
        </div>
      </header>

      <div className="px-5 space-y-6">
        {/* Budget Slider */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Your Budget</h3>
            <span className="text-2xl font-bold text-primary">₹{budget[0]}</span>
          </div>
          <Slider
            value={budget}
            onValueChange={setBudget}
            min={50}
            max={500}
            step={10}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹50</span>
            <span>₹500</span>
          </div>
        </Card>

        {/* Dietary Preferences */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Dietary Preference</h3>
          <div className="flex gap-3">
            {dietaryOptions.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => toggleDiet(id)}
                className={cn(
                  'flex-1 py-4 rounded-2xl border-2 transition-all',
                  selectedDiet.includes(id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                )}
              >
                <Icon className={cn('w-6 h-6 mx-auto mb-2', color)} />
                <p className="text-sm font-medium">{label}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Meal Time */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Meal Time</h3>
          <div className="flex gap-3">
            {mealTimes.map(time => (
              <button
                key={time}
                onClick={() => setSelectedMeal(time)}
                className={cn(
                  'flex-1 py-3 rounded-2xl font-medium transition-all',
                  selectedMeal === time
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </Card>

        {/* Generate Button */}
        <Button
          size="xl"
          variant="gradient"
          className="w-full"
          onClick={handleGeneratePlan}
        >
          <Sparkles className="w-5 h-5" />
          Generate Meal Plan
        </Button>

        {/* Suggestions */}
        {showSuggestions && (
          <section className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {mockSuggestions.map(suggestion => (
                <Card key={suggestion.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-28 bg-muted flex items-center justify-center text-4xl">
                      {suggestion.emoji}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{suggestion.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {suggestion.restaurant}
                          </p>
                        </div>
                        {suggestion.isVeg ? (
                          <Badge variant="veg">Veg</Badge>
                        ) : (
                          <Badge variant="nonveg">Non-Veg</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">₹{suggestion.price}</span>
                          {suggestion.isHomeMade && (
                            <Badge variant="homemade">Home-Made</Badge>
                          )}
                        </div>
                        <Button size="sm" onClick={() => handleOrder(suggestion)}>
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </MobileLayout>
  );
}
