import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Star, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { groceryShopsData } from '@/data/groceryShops';

export default function Groceries() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = groceryShopsData.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search grocery shops..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
      </header>

      {/* Shop List */}
      <div className="px-5 pb-24 space-y-4">
        {filteredShops.map(shop => (
          <Card
            key={shop.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/grocery/${shop.id}`)}
          >
            <div className="flex gap-4">
              {/* Shop Icon */}
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                {shop.emoji}
              </div>

              {/* Shop Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{shop.name}</h3>
                <p className="text-sm text-muted-foreground">{shop.type}</p>
                
                <div className="flex items-center gap-3 mt-2 text-sm">
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
              </div>
            </div>

            {/* Items Preview */}
            <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
              {shop.items.slice(0, 4).map(item => (
                <div key={item.id} className="flex-shrink-0 w-16">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <p className="text-xs text-center mt-1 truncate">{item.name}</p>
                </div>
              ))}
              {shop.items.length > 4 && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">+{shop.items.length - 4}</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
}
