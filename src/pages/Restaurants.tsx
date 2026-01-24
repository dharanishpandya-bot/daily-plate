import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, SlidersHorizontal, Star, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const restaurants = [
  {
    id: '1',
    name: 'Sharma Kitchen',
    image: '🍛',
    rating: 4.5,
    reviewCount: 234,
    cuisines: ['North Indian', 'Thali'],
    deliveryTime: '20-25 min',
    deliveryFee: 20,
    distance: '1.2 km',
    isHomeMade: true,
    priceRange: 1,
  },
  {
    id: '2',
    name: 'Fresh Bites Cafe',
    image: '🥗',
    rating: 4.3,
    reviewCount: 189,
    cuisines: ['Healthy', 'Salads', 'Wraps'],
    deliveryTime: '25-30 min',
    deliveryFee: 30,
    distance: '2.1 km',
    isHomeMade: false,
    priceRange: 2,
  },
  {
    id: '3',
    name: 'Mama\'s Home Food',
    image: '🍲',
    rating: 4.8,
    reviewCount: 456,
    cuisines: ['Home Style', 'Comfort Food'],
    deliveryTime: '30-35 min',
    deliveryFee: 15,
    distance: '0.8 km',
    isHomeMade: true,
    priceRange: 1,
  },
  {
    id: '4',
    name: 'Biryani House',
    image: '🍚',
    rating: 4.6,
    reviewCount: 567,
    cuisines: ['Biryani', 'Mughlai'],
    deliveryTime: '35-40 min',
    deliveryFee: 25,
    distance: '3.2 km',
    isHomeMade: false,
    priceRange: 2,
  },
  {
    id: '5',
    name: 'South Express',
    image: '🥞',
    rating: 4.4,
    reviewCount: 321,
    cuisines: ['South Indian', 'Dosa'],
    deliveryTime: '20-25 min',
    deliveryFee: 20,
    distance: '1.5 km',
    isHomeMade: false,
    priceRange: 1,
  },
];

const filters = ['All', 'Home-Made', 'Budget', 'Top Rated', 'Fast Delivery'];

export default function Restaurants() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRestaurants = restaurants.filter(r => {
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeFilter === 'Home-Made' && !r.isHomeMade) return false;
    if (activeFilter === 'Budget' && r.priceRange > 1) return false;
    if (activeFilter === 'Top Rated' && r.rating < 4.5) return false;
    if (activeFilter === 'Fast Delivery' && parseInt(r.deliveryTime) > 25) return false;
    return true;
  });

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Restaurants</h1>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Filters */}
      <div className="px-5 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant List */}
      <div className="px-5 space-y-4">
        {filteredRestaurants.map(restaurant => (
          <Card
            key={restaurant.id}
            className="overflow-hidden cursor-pointer hover:shadow-card transition-shadow"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            <div className="flex">
              <div className="w-28 h-28 bg-muted flex items-center justify-center text-5xl">
                {restaurant.image}
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  {restaurant.isHomeMade && (
                    <Badge variant="homemade" className="text-xs">Home-Made</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {restaurant.cuisines.join(' • ')}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-muted-foreground">({restaurant.reviewCount})</span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {restaurant.deliveryTime}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  {restaurant.distance} • ₹{restaurant.deliveryFee} delivery
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
}
