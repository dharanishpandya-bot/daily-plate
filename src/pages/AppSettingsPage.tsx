import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  Globe,
  Moon,
  Sun,
  Shield,
  LogOut,
  ChevronRight,
  Check,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
];

export default function AppSettingsPage() {
  const navigate = useNavigate();
  const { appSettings, updateAppSettings, setIsLoggedIn, setUser } = useApp();
  const { toast } = useToast();

  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const handleLanguageChange = (language: string) => {
    updateAppSettings({ language });
    setShowLanguageDialog(false);
    toast({
      title: "Language Updated",
      description: `App language set to ${language}`,
    });
  };

  const handleDarkModeToggle = (enabled: boolean) => {
    updateAppSettings({ darkMode: enabled });
    // In a real app, this would apply the theme
    toast({
      title: enabled ? "Dark Mode Enabled" : "Dark Mode Disabled",
      description: enabled ? "Switched to dark theme" : "Switched to light theme",
    });
  };

  const handlePrivacyToggle = (enabled: boolean) => {
    updateAppSettings({ privacyMode: enabled });
    toast({
      title: enabled ? "Privacy Mode Enabled" : "Privacy Mode Disabled",
      description: enabled ? "Your order history is now hidden" : "Your order history is visible",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowLogoutDialog(false);
    navigate('/login');
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
          <h1 className="text-lg font-semibold">App Settings</h1>
        </div>
      </header>

      <div className="px-5 py-4 space-y-6">
        {/* General Settings */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            GENERAL
          </h2>
          <Card className="divide-y divide-border">
            {/* Language */}
            <button
              onClick={() => setShowLanguageDialog(true)}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">{appSettings.language}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Dark Mode */}
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                {appSettings.darkMode ? (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  {appSettings.darkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                </p>
              </div>
              <Switch
                checked={appSettings.darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </Card>
        </div>

        {/* Privacy Settings */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            PRIVACY
          </h2>
          <Card className="divide-y divide-border">
            {/* Privacy Mode */}
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Privacy Mode</p>
                <p className="text-sm text-muted-foreground">Hide order history from others</p>
              </div>
              <Switch
                checked={appSettings.privacyMode}
                onCheckedChange={handlePrivacyToggle}
              />
            </div>

            {/* Privacy Policy */}
            <button
              onClick={() => setShowPrivacyDialog(true)}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Privacy Policy</p>
                <p className="text-sm text-muted-foreground">View our privacy policy</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            ACCOUNT
          </h2>
          <Card>
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="w-full p-4 flex items-center gap-4 hover:bg-destructive/5 transition-colors text-destructive"
            >
              <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Log Out</p>
                <p className="text-sm opacity-70">Sign out of your account</p>
              </div>
            </button>
          </Card>
        </div>

        {/* App Info */}
        <Card className="p-4 text-center">
          <p className="text-sm text-muted-foreground">MealWise v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">Made with ❤️ for healthy eating</p>
        </Card>
      </div>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
            <DialogDescription>
              Choose your preferred app language
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.name.split(' ')[0])}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors ${
                  appSettings.language === lang.name.split(' ')[0]
                    ? 'bg-primary/10 border border-primary'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <span className="font-medium">{lang.name}</span>
                {appSettings.language === lang.name.split(' ')[0] && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation */}
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

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Data Collection:</strong> We collect your name, email, phone number, and delivery addresses to provide our services.
            </p>
            <p>
              <strong className="text-foreground">Order History:</strong> We store your order history to improve recommendations and provide order tracking.
            </p>
            <p>
              <strong className="text-foreground">Payment Information:</strong> Card details are encrypted and stored securely. We never store CVV numbers.
            </p>
            <p>
              <strong className="text-foreground">Location Data:</strong> We use your location only when you're actively placing an order to show nearby restaurants.
            </p>
            <p>
              <strong className="text-foreground">Third Parties:</strong> We do not sell your personal data to third parties.
            </p>
            <p>
              <strong className="text-foreground">Data Deletion:</strong> You can request complete deletion of your data by contacting support.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPrivacyDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
