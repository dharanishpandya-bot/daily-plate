import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';

const trending = [
  { id: '1', name: 'Biryani', emoji: '🍚' },
  { id: '2', name: 'Pizza', emoji: '🍕' },
  { id: '3', name: 'Thali', emoji: '🍛' },
  { id: '4', name: 'Dosa', emoji: '🥞' },
  { id: '5', name: 'Burger', emoji: '🍔' },
  { id: '6', name: 'Noodles', emoji: '🍜' },
];

const categories = [
  { id: '1', name: 'North Indian', emoji: '🍛', count: 45 },
  { id: '2', name: 'South Indian', emoji: '🥞', count: 32 },
  { id: '3', name: 'Chinese', emoji: '🥡', count: 28 },
  { id: '4', name: 'Fast Food', emoji: '🍔', count: 56 },
  { id: '5', name: 'Healthy', emoji: '🥗', count: 22 },
  { id: '6', name: 'Desserts', emoji: '🍰', count: 18 },
];

const recentSearches = ['Paneer Butter Masala', 'Chicken Biryani', 'Masala Dosa'];

export default function Explore() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for food, restaurants..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
      </header>

      <div className="px-5 space-y-6">
        {/* Recent Searches */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm text-muted-foreground">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map(search => (
              <Badge key={search} variant="outline" className="cursor-pointer">
                {search}
              </Badge>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Trending Now</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 pb-2">
            {trending.map(item => (
              <button
                key={item.id}
                className="min-w-[80px] flex flex-col items-center gap-2"
                onClick={() => navigate('/restaurants')}
              >
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-3xl">
                  {item.emoji}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map(cat => (
              <Card
                key={cat.id}
                className="p-4 cursor-pointer hover:shadow-card transition-shadow"
                onClick={() => navigate('/restaurants')}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{cat.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{cat.name}</h4>
                    <p className="text-sm text-muted-foreground">{cat.count} places</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <h2 className="text-lg font-semibold">Top Rated</h2>
            </div>
            <button className="text-primary text-sm font-medium">See All</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Mama's Home Food", rating: 4.9, cuisine: 'Home Style', emoji: '🍲' },
              { name: 'Biryani House', rating: 4.8, cuisine: 'Mughlai', emoji: '🍚' },
              { name: 'Apollo Pharmacy', rating: 4.7, cuisine: 'Pharmacy', emoji: '💊' },
            ].map((item, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-success/10 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-success fill-success" />
                    <span className="text-sm font-semibold text-success">{item.rating}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
