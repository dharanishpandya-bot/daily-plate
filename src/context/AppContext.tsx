import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CartItem, Order, Subscription, Address, PaymentMethod, NotificationSettings, AppSettings, SupportTicket } from '@/types/app';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  dailyBudget: number;
  setDailyBudget: (budget: number) => void;
  monthlyBudget: number;
  setMonthlyBudget: (budget: number) => void;
  spentToday: number;
  setSpentToday: (amount: number) => void;
  spentThisMonth: number;
  setSpentThisMonth: (amount: number) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  addOrder: (order: Order) => void;
  subscription: Subscription | null;
  setSubscription: (sub: Subscription | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  // Profile features
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  appSettings: AppSettings;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  supportTickets: SupportTicket[];
  addSupportTicket: (ticket: SupportTicket) => void;
}

const defaultNotificationSettings: NotificationSettings = {
  orderUpdates: true,
  offers: true,
  reminders: true,
  pushEnabled: true,
  sound: true,
  vibration: true,
};

const defaultAppSettings: AppSettings = {
  language: 'English',
  darkMode: false,
  privacyMode: false,
};

const defaultUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  dailyBudget: 200,
  avatar: undefined,
};

const defaultAddresses: Address[] = [
  {
    id: '1',
    label: 'home',
    fullAddress: '123, Green Park Apartments, Sector 15',
    landmark: 'Near Metro Station',
    city: 'Bangalore',
    pincode: '560001',
    isDefault: true,
  },
  {
    id: '2',
    label: 'work',
    fullAddress: '456, Tech Park, Whitefield',
    landmark: 'Opposite Mall',
    city: 'Bangalore',
    pincode: '560066',
    isDefault: false,
  },
];

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'upi',
    name: 'Google Pay',
    details: 'john@okicici',
    isDefault: true,
  },
  {
    id: '2',
    type: 'card',
    name: 'HDFC Credit Card',
    details: '•••• •••• •••• 4532',
    isDefault: false,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [dailyBudget, setDailyBudget] = useState(200);
  const [monthlyBudget, setMonthlyBudget] = useState(6000);
  const [spentToday, setSpentToday] = useState(85);
  const [spentThisMonth, setSpentThisMonth] = useState(2450);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(defaultPaymentMethods);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [appSettings, setAppSettingsState] = useState<AppSettings>(defaultAppSettings);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === item.menuItem.id);
      if (existing) {
        return prev.map(i =>
          i.menuItem.id === item.menuItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(i =>
        i.menuItem.id === itemId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  // Address management
  const addAddress = (address: Address) => {
    if (address.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })));
    }
    setAddresses(prev => [...prev, address]);
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    if (updates.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    } else {
      setAddresses(prev =>
        prev.map(a => (a.id === id ? { ...a, ...updates } : a))
      );
    }
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({ ...a, isDefault: a.id === id }))
    );
  };

  // Payment methods
  const addPaymentMethod = (method: PaymentMethod) => {
    if (method.isDefault) {
      setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: false })));
    }
    setPaymentMethods(prev => [...prev, method]);
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(m => ({ ...m, isDefault: m.id === id }))
    );
  };

  // Notification settings
  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  // App settings
  const updateAppSettings = (settings: Partial<AppSettings>) => {
    setAppSettingsState(prev => ({ ...prev, ...settings }));
  };

  // Support tickets
  const addSupportTicket = (ticket: SupportTicket) => {
    setSupportTickets(prev => [ticket, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        dailyBudget,
        setDailyBudget,
        monthlyBudget,
        setMonthlyBudget,
        spentToday,
        setSpentToday,
        spentThisMonth,
        setSpentThisMonth,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        orders,
        addOrder,
        subscription,
        setSubscription,
        isOnboarded,
        setIsOnboarded,
        isLoggedIn,
        setIsLoggedIn,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        paymentMethods,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
        notificationSettings,
        updateNotificationSettings,
        appSettings,
        updateAppSettings,
        supportTickets,
        addSupportTicket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
