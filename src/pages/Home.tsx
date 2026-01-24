import { MobileLayout } from '@/components/layout/MobileLayout';
import { BudgetCard } from '@/components/home/BudgetCard';
import { QuickActions } from '@/components/home/QuickActions';
import { SubscriptionBanner } from '@/components/home/SubscriptionBanner';
import { useApp } from '@/context/AppContext';
import { Bell, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-muted-foreground text-sm">{getGreeting()} 👋</p>
            <h1 className="text-2xl font-bold">{user?.name || 'Guest'}</h1>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </div>
        <button className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Deliver to: </span>
          <span className="text-foreground font-medium">Home</span>
        </button>
      </header>

      {/* Content */}
      <div className="px-5 space-y-6">
        {/* Budget Card */}
        <BudgetCard />

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">What would you like?</h2>
          <QuickActions />
        </section>

        {/* Subscription Banner */}
        <section>
          <SubscriptionBanner />
        </section>

        {/* Popular Near You */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Popular Near You</h2>
            <button className="text-primary text-sm font-medium">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
            {popularRestaurants.map(restaurant => (
              <div
                key={restaurant.id}
                className="min-w-[160px] bg-card rounded-2xl overflow-hidden shadow-soft"
              >
                <div className="h-24 bg-muted flex items-center justify-center text-4xl">
                  {restaurant.emoji}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm truncate">{restaurant.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-warning">★</span>
                    <span className="text-xs text-muted-foreground">
                      {restaurant.rating} • {restaurant.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}

const popularRestaurants = [
  { id: '1', name: 'Sharma Kitchen', rating: 4.5, time: '20 min', emoji: '🍛' },
  { id: '2', name: 'Fresh Bites', rating: 4.3, time: '25 min', emoji: '🥗' },
  { id: '3', name: 'Mama Meals', rating: 4.8, time: '30 min', emoji: '🍲' },
  { id: '4', name: 'Quick Eats', rating: 4.2, time: '15 min', emoji: '🥪' },
];
