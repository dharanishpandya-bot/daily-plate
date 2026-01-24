import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export function MobileLayout({ children, showNav = true, className }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <main className={cn('pb-24', className)}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
