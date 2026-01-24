import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Wallet,
} from 'lucide-react';

const menuItems = [
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payments' },
  { icon: Wallet, label: 'Budget Settings', path: '/budget' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  { icon: Settings, label: 'App Settings', path: '/settings' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, setIsLoggedIn, setUser, dailyBudget } = useApp();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <div className="px-5 space-y-6">
        {/* User Card */}
        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{user?.name || 'Guest User'}</h3>
              <p className="text-muted-foreground">{user?.email || 'guest@example.com'}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">₹{dailyBudget}</p>
            <p className="text-xs text-muted-foreground">Daily Budget</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-secondary">24</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">₹1.2k</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="divide-y divide-border">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium">{label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          size="lg"
          className="w-full text-destructive border-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </MobileLayout>
  );
}
