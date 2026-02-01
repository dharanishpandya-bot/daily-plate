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
  Phone,
  Mail,
  Edit2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';

const menuItems = [
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses', color: 'bg-blue-500/10 text-blue-500' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payments', color: 'bg-green-500/10 text-green-500' },
  { icon: Wallet, label: 'Budget Settings', path: '/budget', color: 'bg-purple-500/10 text-purple-500' },
  { icon: Bell, label: 'Notifications', path: '/notifications', color: 'bg-orange-500/10 text-orange-500' },
  { icon: HelpCircle, label: 'Help & Support', path: '/help', color: 'bg-pink-500/10 text-pink-500' },
  { icon: Settings, label: 'App Settings', path: '/settings', color: 'bg-gray-500/10 text-gray-500' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, setIsLoggedIn, setUser, dailyBudget, spentToday, orders, addresses, paymentMethods } = useApp();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowLogoutDialog(false);
    navigate('/login');
  };

  const defaultAddress = addresses.find(a => a.isDefault);
  const totalOrders = orders.length || 24; // Mock data if no orders
  const savedAmount = 1200; // Mock saved amount

  return (
    <MobileLayout>
      {/* Header with gradient */}
      <div className="bg-gradient-primary px-5 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-primary-foreground mb-4">Profile</h1>
        
        {/* User Card */}
        <Card className="p-5 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-primary-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold truncate">{user?.name || 'Guest User'}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="text-sm truncate">{user?.email || 'guest@example.com'}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-sm">{user?.phone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4"
            onClick={() => navigate('/edit-profile')}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </Card>
      </div>

      <div className="px-5 space-y-6 -mt-2">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">₹{dailyBudget}</p>
            <p className="text-xs text-muted-foreground">Daily Budget</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-secondary">{totalOrders}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">₹{savedAmount}</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </Card>
        </div>

        {/* Default Address Preview */}
        {defaultAddress && (
          <Card 
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate('/addresses')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold capitalize">{defaultAddress.label}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{defaultAddress.fullAddress}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        )}

        {/* Default Payment Preview */}
        {paymentMethods.length > 0 && (
          <Card 
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => navigate('/payments')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{paymentMethods.find(p => p.isDefault)?.name || paymentMethods[0].name}</span>
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Default</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {paymentMethods.find(p => p.isDefault)?.details || paymentMethods[0].details}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        )}

        {/* Menu Items */}
        <Card className="divide-y divide-border">
          {menuItems.map(({ icon: Icon, label, path, color }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
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
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground pb-4">
          MealWise v1.0.0
        </p>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Log Out?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
