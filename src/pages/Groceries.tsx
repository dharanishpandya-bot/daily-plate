import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBasket } from 'lucide-react';

export default function Groceries() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Groceries</h1>
        </div>
      </header>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-20">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingBasket className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">Coming Soon</h2>
        <p className="text-muted-foreground text-center max-w-xs">
          Grocery delivery service will be available soon in your area.
        </p>
      </div>
    </MobileLayout>
  );
}
