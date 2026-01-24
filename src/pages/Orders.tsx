import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Clock, RotateCcw, ChevronRight } from 'lucide-react';

export default function Orders() {
  const navigate = useNavigate();
  const { orders } = useApp();

  const mockOrders = [
    {
      id: 'ORD123456',
      restaurant: 'Sharma Kitchen',
      items: ['Paneer Butter Masala Thali', 'Roti (4)'],
      total: 180,
      status: 'delivered',
      date: '22 Jan 2026',
      emoji: '🍛',
    },
    {
      id: 'ORD123455',
      restaurant: 'Fresh Bites',
      items: ['Grilled Chicken Salad', 'Fresh Lime Soda'],
      total: 220,
      status: 'delivered',
      date: '21 Jan 2026',
      emoji: '🥗',
    },
    {
      id: 'ORD123454',
      restaurant: 'Mama\'s Home Food',
      items: ['Dal Makhani', 'Jeera Rice', 'Raita'],
      total: 160,
      status: 'delivered',
      date: '20 Jan 2026',
      emoji: '🍲',
    },
  ];

  const allOrders = [...orders.map(o => ({
    ...o,
    restaurant: o.items[0]?.restaurantName || 'Restaurant',
    items: o.items.map(i => i.menuItem.name),
    date: new Date(o.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    emoji: '🍽️',
  })), ...mockOrders];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'out_for_delivery':
        return 'warning';
      case 'preparing':
        return 'accent';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'out_for_delivery':
        return 'On the way';
      case 'preparing':
        return 'Preparing';
      case 'confirmed':
        return 'Confirmed';
      default:
        return status;
    }
  };

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="text-muted-foreground">Your past orders and subscriptions</p>
      </header>

      <div className="px-5 space-y-4">
        {/* Active Subscription Card */}
        <Card className="p-5 bg-gradient-secondary text-secondary-foreground border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Monthly Subscription</p>
              <p className="text-xl font-bold">Lunch Plan - ₹4,500</p>
              <p className="text-sm opacity-90 mt-1">18 of 30 meals delivered</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-secondary-foreground"
              onClick={() => navigate('/subscriptions')}
            >
              Manage
            </Button>
          </div>
          <div className="mt-4 h-2 bg-secondary-foreground/20 rounded-full overflow-hidden">
            <div className="h-full bg-secondary-foreground w-[60%] rounded-full" />
          </div>
        </Card>

        {/* Orders List */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Past Orders</h2>
          <div className="space-y-4">
            {allOrders.map(order => (
              <Card key={order.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center text-2xl">
                      {order.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold">{order.restaurant}</h4>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {order.items.join(', ')}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="font-medium">₹{order.total}</span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {order.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t flex">
                  <button className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted transition-colors">
                    <RotateCcw className="w-4 h-4" />
                    Reorder
                  </button>
                  <div className="w-px bg-border" />
                  <button className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted transition-colors">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
