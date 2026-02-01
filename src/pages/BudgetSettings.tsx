import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Edit2,
  Check,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BudgetSettings() {
  const navigate = useNavigate();
  const { 
    dailyBudget, 
    setDailyBudget, 
    monthlyBudget, 
    setMonthlyBudget,
    spentToday,
    spentThisMonth,
  } = useApp();
  const { toast } = useToast();

  const [editingDaily, setEditingDaily] = useState(false);
  const [editingMonthly, setEditingMonthly] = useState(false);
  const [tempDaily, setTempDaily] = useState(dailyBudget.toString());
  const [tempMonthly, setTempMonthly] = useState(monthlyBudget.toString());

  const dailyProgress = Math.min((spentToday / dailyBudget) * 100, 100);
  const monthlyProgress = Math.min((spentThisMonth / monthlyBudget) * 100, 100);
  const dailyRemaining = Math.max(dailyBudget - spentToday, 0);
  const monthlyRemaining = Math.max(monthlyBudget - spentThisMonth, 0);

  const isDailyExceeded = spentToday > dailyBudget;
  const isMonthlyExceeded = spentThisMonth > monthlyBudget;

  const handleSaveDaily = () => {
    const value = parseInt(tempDaily);
    if (isNaN(value) || value < 50) {
      toast({
        title: "Invalid Budget",
        description: "Daily budget must be at least ₹50",
        variant: "destructive",
      });
      return;
    }
    setDailyBudget(value);
    setEditingDaily(false);
    toast({
      title: "Budget Updated",
      description: `Daily budget set to ₹${value}`,
    });
  };

  const handleSaveMonthly = () => {
    const value = parseInt(tempMonthly);
    if (isNaN(value) || value < 1000) {
      toast({
        title: "Invalid Budget",
        description: "Monthly budget must be at least ₹1000",
        variant: "destructive",
      });
      return;
    }
    setMonthlyBudget(value);
    setEditingMonthly(false);
    toast({
      title: "Budget Updated",
      description: `Monthly budget set to ₹${value}`,
    });
  };

  return (
    <MobileLayout showNav={false}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Budget Settings</h1>
        </div>
      </header>

      <div className="px-5 py-4 space-y-6">
        {/* Daily Budget Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Daily Budget</h3>
                <p className="text-sm text-muted-foreground">Per day spending limit</p>
              </div>
            </div>
            {!editingDaily && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTempDaily(dailyBudget.toString());
                  setEditingDaily(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingDaily ? (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold">₹</span>
              <Input
                type="number"
                value={tempDaily}
                onChange={(e) => setTempDaily(e.target.value)}
                className="text-lg font-bold"
                autoFocus
              />
              <Button size="icon" onClick={handleSaveDaily}>
                <Check className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setEditingDaily(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-3xl font-bold text-primary mb-4">₹{dailyBudget}</p>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent Today</span>
              <span className={isDailyExceeded ? 'text-destructive font-medium' : ''}>
                ₹{spentToday} / ₹{dailyBudget}
              </span>
            </div>
            <Progress 
              value={dailyProgress} 
              className={`h-2 ${isDailyExceeded ? '[&>div]:bg-destructive' : ''}`}
            />
            {isDailyExceeded ? (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Budget exceeded by ₹{spentToday - dailyBudget}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                ₹{dailyRemaining} remaining today
              </p>
            )}
          </div>
        </Card>

        {/* Monthly Budget Card */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Monthly Budget</h3>
                <p className="text-sm text-muted-foreground">Monthly spending limit</p>
              </div>
            </div>
            {!editingMonthly && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTempMonthly(monthlyBudget.toString());
                  setEditingMonthly(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {editingMonthly ? (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold">₹</span>
              <Input
                type="number"
                value={tempMonthly}
                onChange={(e) => setTempMonthly(e.target.value)}
                className="text-lg font-bold"
                autoFocus
              />
              <Button size="icon" onClick={handleSaveMonthly}>
                <Check className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setEditingMonthly(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-3xl font-bold text-secondary mb-4">₹{monthlyBudget}</p>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent This Month</span>
              <span className={isMonthlyExceeded ? 'text-destructive font-medium' : ''}>
                ₹{spentThisMonth} / ₹{monthlyBudget}
              </span>
            </div>
            <Progress 
              value={monthlyProgress} 
              className={`h-2 ${isMonthlyExceeded ? '[&>div]:bg-destructive' : ''}`}
            />
            {isMonthlyExceeded ? (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Budget exceeded by ₹{spentThisMonth - monthlyBudget}</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                ₹{monthlyRemaining} remaining this month
              </p>
            )}
          </div>
        </Card>

        {/* Stats Summary */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Spending Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <p className="text-2xl font-bold text-primary">₹{spentToday}</p>
              <p className="text-sm text-muted-foreground">Today</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-xl">
              <p className="text-2xl font-bold text-secondary">₹{spentThisMonth}</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            Budget Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Set realistic daily limits based on your eating habits</li>
            <li>• Try homemade meals to save 30-40% on costs</li>
            <li>• Subscribe to meal plans for additional discounts</li>
          </ul>
        </Card>
      </div>
    </MobileLayout>
  );
}
