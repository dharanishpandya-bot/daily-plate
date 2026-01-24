import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

export function SubscriptionBanner() {
  const navigate = useNavigate();
  const { subscription } = useApp();

  if (subscription) {
    const progress = (subscription.mealsDelivered / subscription.totalMeals) * 100;

    return (
      <Card className="bg-secondary/10 border-secondary/20">
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-secondary">Active Subscription</p>
                <p className="text-sm text-muted-foreground">
                  {subscription.mealsDelivered} of {subscription.totalMeals} meals
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/subscriptions')}
            >
              Manage
            </Button>
          </div>
          <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-secondary text-secondary-foreground border-0 overflow-hidden">
      <button
        onClick={() => navigate('/subscriptions')}
        className="p-5 w-full text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary-foreground/20 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg">Monthly Meal Plans</p>
            <p className="text-sm opacity-90">Save up to 30% on daily meals</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 opacity-80" />
      </button>
    </Card>
  );
}
