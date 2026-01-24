import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  UtensilsCrossed, 
  ChefHat, 
  ShoppingBasket, 
  Pill, 
  Car 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  {
    icon: Sparkles,
    label: 'AI Meal Planner',
    path: '/meal-planner',
    color: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: UtensilsCrossed,
    label: 'Order Food',
    path: '/restaurants',
    color: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    icon: ChefHat,
    label: 'Home-Made',
    path: '/homemade',
    color: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  {
    icon: ShoppingBasket,
    label: 'Groceries',
    path: '/groceries',
    color: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    icon: Pill,
    label: 'Medical',
    path: '/medical',
    color: 'bg-destructive/10',
    iconColor: 'text-destructive',
  },
  {
    icon: Car,
    label: 'Vehicle',
    path: '/vehicle',
    color: 'bg-muted',
    iconColor: 'text-foreground',
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map(({ icon: Icon, label, path, color, iconColor }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className="action-card"
        >
          <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center', color)}>
            <Icon className={cn('w-7 h-7', iconColor)} />
          </div>
          <span className="text-sm font-medium text-center leading-tight">{label}</span>
        </button>
      ))}
    </div>
  );
}
