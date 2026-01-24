import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Phone, MapPin, Star, Clock } from 'lucide-react';

const medicalShops = [
  {
    id: '1',
    name: 'Apollo Pharmacy',
    distance: '0.5 km',
    rating: 4.7,
    phone: '+91 98765 43210',
    isOpen: true,
    address: '123 Main Street, Near City Mall',
    timing: '24 hours',
  },
  {
    id: '2',
    name: 'MedPlus',
    distance: '0.8 km',
    rating: 4.5,
    phone: '+91 98765 43211',
    isOpen: true,
    address: '45 Park Road, Sector 5',
    timing: '8 AM - 11 PM',
  },
  {
    id: '3',
    name: 'Wellness Forever',
    distance: '1.2 km',
    rating: 4.4,
    phone: '+91 98765 43212',
    isOpen: false,
    address: '78 Market Lane, Downtown',
    timing: '9 AM - 10 PM',
  },
  {
    id: '4',
    name: 'NetMeds Store',
    distance: '1.5 km',
    rating: 4.6,
    phone: '+91 98765 43213',
    isOpen: true,
    address: '90 Health Plaza, Ring Road',
    timing: '8 AM - 10 PM',
  },
];

export default function Medical() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Medical Shops</h1>
            <p className="text-sm text-muted-foreground">Nearby pharmacies</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            className="pl-12"
          />
        </div>
      </header>

      {/* Quick Actions */}
      <div className="px-5 pb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-5 px-5">
          <Card className="min-w-[140px] p-4 text-center">
            <div className="text-3xl mb-2">💊</div>
            <p className="text-sm font-medium">Order Medicine</p>
          </Card>
          <Card className="min-w-[140px] p-4 text-center">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-sm font-medium">Upload Prescription</p>
          </Card>
          <Card className="min-w-[140px] p-4 text-center">
            <div className="text-3xl mb-2">🏥</div>
            <p className="text-sm font-medium">Health Tests</p>
          </Card>
        </div>
      </div>

      {/* Shops List */}
      <div className="px-5 space-y-4">
        <h2 className="text-lg font-semibold">Nearby Pharmacies</h2>
        {medicalShops.map(shop => (
          <Card key={shop.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{shop.name}</h4>
                  <Badge variant={shop.isOpen ? 'success' : 'destructive'}>
                    {shop.isOpen ? 'Open' : 'Closed'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {shop.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm mb-4">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-medium">{shop.rating}</span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {shop.distance}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {shop.timing}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(`tel:${shop.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button className="flex-1">
                Order Online
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
}
