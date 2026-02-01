import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  Bell,
  Tag,
  Clock,
  Smartphone,
  Volume2,
  Vibrate,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const notificationOptions = [
  {
    key: 'orderUpdates',
    icon: Bell,
    title: 'Order Updates',
    description: 'Get notified about order status changes',
  },
  {
    key: 'offers',
    icon: Tag,
    title: 'Offers & Promotions',
    description: 'Receive exclusive deals and discounts',
  },
  {
    key: 'reminders',
    icon: Clock,
    title: 'Meal Reminders',
    description: 'Daily reminders for meal ordering',
  },
] as const;

const systemOptions = [
  {
    key: 'pushEnabled',
    icon: Smartphone,
    title: 'Push Notifications',
    description: 'Enable push notifications on this device',
  },
  {
    key: 'sound',
    icon: Volume2,
    title: 'Sound',
    description: 'Play sound for notifications',
  },
  {
    key: 'vibration',
    icon: Vibrate,
    title: 'Vibration',
    description: 'Vibrate for notifications',
  },
] as const;

export default function Notifications() {
  const navigate = useNavigate();
  const { notificationSettings, updateNotificationSettings } = useApp();
  const { toast } = useToast();

  const handleToggle = (key: keyof typeof notificationSettings, value: boolean) => {
    updateNotificationSettings({ [key]: value });
    toast({
      title: value ? 'Enabled' : 'Disabled',
      description: `Notification setting has been ${value ? 'enabled' : 'disabled'}.`,
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
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
      </header>

      <div className="px-5 py-4 space-y-6">
        {/* Notification Types */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            NOTIFICATION PREFERENCES
          </h2>
          <Card className="divide-y divide-border">
            {notificationOptions.map(({ key, icon: Icon, title, description }) => (
              <div key={key} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Switch
                  checked={notificationSettings[key]}
                  onCheckedChange={(checked) => handleToggle(key, checked)}
                />
              </div>
            ))}
          </Card>
        </div>

        {/* System Settings */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            SYSTEM SETTINGS
          </h2>
          <Card className="divide-y divide-border">
            {systemOptions.map(({ key, icon: Icon, title, description }) => (
              <div key={key} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Switch
                  checked={notificationSettings[key]}
                  onCheckedChange={(checked) => handleToggle(key, checked)}
                />
              </div>
            ))}
          </Card>
        </div>

        {/* Info */}
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground text-center">
            You can change these settings anytime. Some notifications are required for order updates and cannot be disabled.
          </p>
        </Card>
      </div>
    </MobileLayout>
  );
}
