import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartTotal, dailyBudget, clearCart, addOrder } = useApp();

  const deliveryFee = 20;
  const taxes = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + taxes;
  const isOverBudget = grandTotal > dailyBudget;

  const handleCheckout = () => {
    const order = {
      id: `ORD${Date.now()}`,
      items: cart,
      total: grandTotal,
      status: 'confirmed' as const,
      deliveryOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      estimatedTime: '30-35 min',
      deliveryAddress: 'Home',
      createdAt: new Date(),
    };
    addOrder(order);
    clearCart();
    navigate('/tracking', { state: { order } });
  };

  if (cart.length === 0) {
    return (
      <MobileLayout>
        <header className="px-5 pt-6 pb-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Your Cart</h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-8">
            Add some delicious meals to get started
          </p>
          <Button size="lg" onClick={() => navigate('/restaurants')}>
            Browse Restaurants
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">Your Cart</h1>
        <span className="text-muted-foreground">({cart.length} items)</span>
      </header>

      <div className="px-5 space-y-4 pb-48">
        {/* Budget Warning */}
        {isOverBudget && (
          <Card className="bg-destructive/10 border-destructive/20 p-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Over Budget!</p>
                <p className="text-sm text-muted-foreground">
                  Your order exceeds your daily budget by ₹{grandTotal - dailyBudget}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Cart Items */}
        <Card className="divide-y divide-border">
          {cart.map(item => (
            <div key={item.menuItem.id} className="p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center text-2xl">
                🍽️
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{item.menuItem.name}</h4>
                <p className="text-sm text-muted-foreground">{item.restaurantName}</p>
                <p className="font-bold text-primary mt-1">₹{item.menuItem.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-destructive"
                onClick={() => removeFromCart(item.menuItem.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </Card>

        {/* Bill Summary */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Bill Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes & Charges</span>
              <span>₹{taxes}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base">
              <span>Grand Total</span>
              <span className={cn(isOverBudget && 'text-destructive')}>
                ₹{grandTotal}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Budget</span>
              <span className="text-secondary">₹{dailyBudget}</span>
            </div>
          </div>
        </Card>

        {/* Delivery Info */}
        <Card className="p-5">
          <h3 className="font-semibold mb-2">Delivery Info</h3>
          <p className="text-sm text-muted-foreground">
            You'll receive a 4-digit OTP for secure delivery. Share it with the delivery partner to receive your order.
          </p>
        </Card>
      </div>

      {/* Checkout Button - Fixed at bottom */}
      <div className="fixed bottom-20 left-0 right-0 p-5 bg-background border-t max-w-lg mx-auto">
        <Button
          size="xl"
          variant="gradient"
          className="w-full"
          onClick={handleCheckout}
        >
          Proceed to Pay • ₹{grandTotal}
        </Button>
      </div>
    </MobileLayout>
  );
}
