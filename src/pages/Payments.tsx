import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { PaymentMethod } from '@/types/app';
import {
  ArrowLeft,
  Plus,
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  MoreVertical,
  Trash2,
  Check,
  Shield,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const paymentTypeIcons = {
  upi: Smartphone,
  card: CreditCard,
  wallet: Wallet,
  cod: Banknote,
};

const paymentTypeLabels = {
  upi: 'UPI',
  card: 'Card',
  wallet: 'Wallet',
  cod: 'Cash on Delivery',
};

export default function Payments() {
  const navigate = useNavigate();
  const { paymentMethods, addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } = useApp();
  const { toast } = useToast();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    type: 'upi' as 'upi' | 'card' | 'wallet' | 'cod',
    name: '',
    details: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      type: 'upi',
      name: '',
      details: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      isDefault: false,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.type === 'upi') {
      if (!formData.details.trim()) {
        newErrors.details = 'UPI ID is required';
      } else if (!/^[\w.-]+@[\w]+$/.test(formData.details)) {
        newErrors.details = 'Enter a valid UPI ID';
      }
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
    } else if (formData.type === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!formData.expiry) {
        newErrors.expiry = 'Expiry is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = 'Use MM/YY format';
      }
      if (!formData.name.trim()) {
        newErrors.name = 'Name on card is required';
      }
    } else if (formData.type === 'wallet') {
      if (!formData.name.trim()) {
        newErrors.name = 'Wallet name is required';
      }
      if (!formData.details.trim()) {
        newErrors.details = 'Phone/Email is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    let details = formData.details;
    let name = formData.name;

    if (formData.type === 'card') {
      // Mask card number
      const lastFour = formData.cardNumber.replace(/\s/g, '').slice(-4);
      details = `•••• •••• •••• ${lastFour}`;
      name = `${formData.name} Card`;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: formData.type,
      name: name,
      details: details,
      isDefault: formData.isDefault || paymentMethods.length === 0,
    };

    addPaymentMethod(newMethod);
    toast({
      title: "Payment Method Added",
      description: `${paymentTypeLabels[formData.type]} has been added successfully.`,
    });

    setShowAddDialog(false);
    resetForm();
  };

  const initiateDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowOtpDialog(true);
    setOtp('');
    // In a real app, send OTP here
  };

  const confirmDeleteWithOtp = () => {
    if (otp !== '1234') {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP. (Hint: 1234)",
        variant: "destructive",
      });
      return;
    }

    if (pendingDeleteId) {
      deletePaymentMethod(pendingDeleteId);
      toast({
        title: "Payment Method Removed",
        description: "The payment method has been deleted.",
      });
    }

    setShowOtpDialog(false);
    setPendingDeleteId(null);
    setOtp('');
  };

  const handleSetDefault = (id: string) => {
    setDefaultPaymentMethod(id);
    toast({
      title: "Default Payment Set",
      description: "This payment method will be used by default.",
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  return (
    <MobileLayout showNav={false}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Payment Methods</h1>
          </div>
          <Button size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </header>

      <div className="px-5 py-4 space-y-4">
        {/* Security Notice */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and secure
            </p>
          </div>
        </Card>

        {paymentMethods.length === 0 ? (
          <Card className="p-8 text-center">
            <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Payment Methods</h3>
            <p className="text-muted-foreground mb-4">Add a payment method for faster checkout</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </Card>
        ) : (
          paymentMethods.map((method) => {
            const Icon = paymentTypeIcons[method.type];
            return (
              <Card key={method.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    method.isDefault ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${method.isDefault ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold">{method.name}</span>
                      {method.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!method.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(method.id)}>
                          <Check className="w-4 h-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => initiateDelete(method.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Payment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Choose a payment method to add
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Payment Type Selection */}
            <div className="grid grid-cols-4 gap-2">
              {(['upi', 'card', 'wallet', 'cod'] as const).map((type) => {
                const Icon = paymentTypeIcons[type];
                return (
                  <button
                    key={type}
                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                      formData.type === type
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${formData.type === type ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-xs ${formData.type === type ? 'font-medium' : ''}`}>
                      {type === 'cod' ? 'COD' : type.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>

            {formData.type === 'upi' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="upiName">UPI App Name</Label>
                  <Input
                    id="upiName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Google Pay, PhonePe"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="yourname@upi"
                    className={errors.details ? 'border-destructive' : ''}
                  />
                  {errors.details && <p className="text-sm text-destructive">{errors.details}</p>}
                </div>
              </>
            )}

            {formData.type === 'card' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={errors.cardNumber ? 'border-destructive' : ''}
                  />
                  {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input
                      id="expiry"
                      value={formData.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                        setFormData(prev => ({ ...prev, expiry: v }));
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={errors.expiry ? 'border-destructive' : ''}
                    />
                    {errors.expiry && <p className="text-sm text-destructive">{errors.expiry}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      value={formData.cvv}
                      onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                      placeholder="•••"
                      maxLength={4}
                    />
                  </div>
                </div>
              </>
            )}

            {formData.type === 'wallet' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="walletName">Wallet Name</Label>
                  <Input
                    id="walletName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Paytm, Amazon Pay"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walletId">Phone/Email</Label>
                  <Input
                    id="walletId"
                    value={formData.details}
                    onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                    placeholder="Linked phone or email"
                    className={errors.details ? 'border-destructive' : ''}
                  />
                  {errors.details && <p className="text-sm text-destructive">{errors.details}</p>}
                </div>
              </>
            )}

            {formData.type === 'cod' && (
              <Card className="p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  Cash on Delivery will be enabled for your orders. No additional setup required.
                </p>
              </Card>
            )}

            {formData.type !== 'cod' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded border-border"
                />
                <Label htmlFor="isDefault" className="font-normal cursor-pointer">
                  Set as default payment method
                </Label>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Add {paymentTypeLabels[formData.type]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Verify Removal</DialogTitle>
            <DialogDescription>
              Enter the OTP sent to your phone to confirm removal of this payment method.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter OTP"
              maxLength={4}
              className="text-center text-lg tracking-widest"
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              For demo, use OTP: 1234
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOtpDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteWithOtp}>
              Confirm Removal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
