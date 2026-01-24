import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, MapPin, Phone, Check, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const trackingSteps = [
  { id: 'confirmed', label: 'Order Confirmed', time: '2:30 PM' },
  { id: 'preparing', label: 'Preparing your food', time: '2:35 PM' },
  { id: 'out_for_delivery', label: 'Out for delivery', time: '2:50 PM' },
  { id: 'delivered', label: 'Delivered', time: '' },
];

export default function Tracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;
  const [voiceAlert, setVoiceAlert] = useState(true);

  // Mock current status
  const currentStatus = 'out_for_delivery';
  const currentStepIndex = trackingSteps.findIndex(s => s.id === currentStatus);

  if (!order) {
    return (
      <MobileLayout showNav={false}>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <p className="text-muted-foreground">No order found</p>
          <Button onClick={() => navigate('/home')} className="mt-4">
            Go Home
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showNav={false}>
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Track Order</h1>
          <p className="text-sm text-muted-foreground">Order #{order.id}</p>
        </div>
      </header>

      <div className="px-5 space-y-6">
        {/* Map Placeholder */}
        <Card className="h-48 bg-muted flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <div className="text-6xl mb-2">🗺️</div>
            <p className="text-muted-foreground text-sm">Live map tracking</p>
          </div>
        </Card>

        {/* ETA Card */}
        <Card className="p-5 bg-gradient-primary text-primary-foreground border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Estimated Arrival</p>
              <p className="text-2xl font-bold">{order.estimatedTime}</p>
            </div>
            <div className="w-14 h-14 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
          </div>
        </Card>

        {/* OTP Display */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Delivery OTP</h3>
            <Badge variant="warning">Share with rider</Badge>
          </div>
          <div className="flex justify-center gap-3 py-4">
            {order.deliveryOtp.split('').map((digit: string, i: number) => (
              <div
                key={i}
                className="w-14 h-16 bg-muted rounded-xl flex items-center justify-center text-2xl font-bold"
              >
                {digit}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Share this OTP with your delivery partner to receive your order
          </p>
        </Card>

        {/* Voice Alert Toggle */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Voice Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get spoken delivery updates
                </p>
              </div>
            </div>
            <Switch checked={voiceAlert} onCheckedChange={setVoiceAlert} />
          </div>
        </Card>

        {/* Status Timeline */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">Order Status</h3>
          <div className="space-y-1">
            {trackingSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex gap-4">
                  {/* Line and dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                        isCompleted
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground',
                        isCurrent && 'ring-4 ring-success/20 animate-pulse-soft'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={cn(
                          'w-0.5 h-12',
                          isCompleted ? 'bg-success' : 'bg-muted'
                        )}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <p
                      className={cn(
                        'font-medium',
                        !isCompleted && 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </p>
                    {step.time && (
                      <p className="text-sm text-muted-foreground">{step.time}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Contact Delivery Partner */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl">
                🛵
              </div>
              <div>
                <p className="font-semibold">Rahul K.</p>
                <p className="text-sm text-muted-foreground">Delivery Partner</p>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
}
