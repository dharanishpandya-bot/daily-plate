import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Navigation, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const vehicleOptions = [
  {
    id: 'bike',
    type: 'Bike',
    name: 'Bike Taxi',
    price: 45,
    eta: '3 min',
    capacity: '1',
    emoji: '🏍️',
  },
  {
    id: 'auto',
    type: 'Auto',
    name: 'Auto Rickshaw',
    price: 85,
    eta: '5 min',
    capacity: '3',
    emoji: '🛺',
  },
  {
    id: 'car',
    type: 'Car',
    name: 'Mini Car',
    price: 150,
    eta: '7 min',
    capacity: '4',
    emoji: '🚗',
  },
  {
    id: 'premium',
    type: 'Premium',
    name: 'Sedan',
    price: 250,
    eta: '10 min',
    capacity: '4',
    emoji: '🚙',
  },
];

export default function Vehicle() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const canBook = pickup && drop && selectedVehicle;

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Book a Ride</h1>
            <p className="text-sm text-muted-foreground">Get there safely</p>
          </div>
        </div>
      </header>

      <div className="px-5 space-y-6">
        {/* Location Inputs */}
        <Card className="p-5">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-3">
                <div className="w-3 h-3 bg-secondary rounded-full" />
                <div className="w-0.5 h-10 bg-border" />
                <div className="w-3 h-3 bg-primary rounded-full" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                  <Input
                    placeholder="Pickup location"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    className="pl-12"
                  />
                </div>
                <div className="relative">
                  <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    placeholder="Where to?"
                    value={drop}
                    onChange={e => setDrop(e.target.value)}
                    className="pl-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Map Placeholder */}
        <Card className="h-40 bg-muted flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-sm text-muted-foreground">Route preview</p>
          </div>
        </Card>

        {/* Vehicle Selection */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Choose your ride</h2>
          <div className="space-y-3">
            {vehicleOptions.map(vehicle => (
              <Card
                key={vehicle.id}
                className={cn(
                  'p-4 cursor-pointer transition-all',
                  selectedVehicle === vehicle.id
                    ? 'border-2 border-primary bg-primary/5'
                    : 'hover:shadow-card'
                )}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{vehicle.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{vehicle.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {vehicle.eta}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vehicle.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{vehicle.price}</p>
                    <p className="text-xs text-muted-foreground">estimated</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-20 left-0 right-0 p-5 bg-background max-w-lg mx-auto">
        <Button
          size="xl"
          variant="gradient"
          className="w-full"
          disabled={!canBook}
        >
          {canBook
            ? `Book ${vehicleOptions.find(v => v.id === selectedVehicle)?.name} • ₹${vehicleOptions.find(v => v.id === selectedVehicle)?.price}`
            : 'Select pickup, drop & vehicle'}
        </Button>
      </div>
    </MobileLayout>
  );
}
