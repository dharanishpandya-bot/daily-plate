import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { Mail, Lock, Fingerprint, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setUser({
      id: '1',
      name: name || 'User',
      email,
      dailyBudget: 200,
    });
    setIsLoggedIn(true);
    navigate('/home');
  };

  const handleFingerprint = () => {
    // Mock fingerprint auth
    setUser({
      id: '1',
      name: 'User',
      email: 'user@example.com',
      dailyBudget: 200,
    });
    setIsLoggedIn(true);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="pt-16 pb-8 px-8 text-center">
        <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-card">
          <span className="text-4xl">🍽️</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {isLogin
            ? 'Sign in to continue ordering delicious meals'
            : 'Join us for budget-friendly meals'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 px-8 space-y-5">
        {!isLogin && (
          <div className="relative animate-fade-in">
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="pl-14"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
              👤
            </div>
          </div>
        )}

        <div className="relative">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="pl-14"
            required
          />
          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="pl-14 pr-14"
            required
          />
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {isLogin && (
          <button type="button" className="text-primary font-medium text-sm block ml-auto">
            Forgot Password?
          </button>
        )}

        <Button type="submit" size="xl" variant="gradient" className="w-full mt-6">
          {isLogin ? 'Sign In' : 'Create Account'}
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or continue with</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Fingerprint Auth */}
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="w-full"
          onClick={handleFingerprint}
        >
          <Fingerprint className="w-6 h-6" />
          Use Fingerprint
        </Button>
      </form>

      {/* Switch mode */}
      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-semibold"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
