import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { Address } from '@/types/app';
import {
  ArrowLeft,
  Plus,
  MapPin,
  Home,
  Briefcase,
  MoreVertical,
  Edit2,
  Trash2,
  Check,
  X,
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

const labelIcons = {
  home: Home,
  work: Briefcase,
  other: MapPin,
};

export default function Addresses() {
  const navigate = useNavigate();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useApp();
  const { toast } = useToast();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    label: 'home' as 'home' | 'work' | 'other',
    customLabel: '',
    fullAddress: '',
    landmark: '',
    city: '',
    pincode: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData({
      label: 'home',
      customLabel: '',
      fullAddress: '',
      landmark: '',
      city: '',
      pincode: '',
      isDefault: false,
    });
    setErrors({});
  };

  const openAddDialog = () => {
    resetForm();
    setEditingAddress(null);
    setShowAddDialog(true);
  };

  const openEditDialog = (address: Address) => {
    setFormData({
      label: address.label,
      customLabel: address.customLabel || '',
      fullAddress: address.fullAddress,
      landmark: address.landmark || '',
      city: address.city,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });
    setEditingAddress(address);
    setShowAddDialog(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }
    if (formData.label === 'other' && !formData.customLabel.trim()) {
      newErrors.customLabel = 'Label is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (editingAddress) {
      updateAddress(editingAddress.id, {
        label: formData.label,
        customLabel: formData.label === 'other' ? formData.customLabel : undefined,
        fullAddress: formData.fullAddress.trim(),
        landmark: formData.landmark.trim() || undefined,
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        isDefault: formData.isDefault,
      });
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully.",
      });
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        label: formData.label,
        customLabel: formData.label === 'other' ? formData.customLabel : undefined,
        fullAddress: formData.fullAddress.trim(),
        landmark: formData.landmark.trim() || undefined,
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        isDefault: formData.isDefault || addresses.length === 0,
      };
      addAddress(newAddress);
      toast({
        title: "Address Added",
        description: "New address has been saved successfully.",
      });
    }

    setShowAddDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
    setDeleteConfirmId(null);
    toast({
      title: "Address Deleted",
      description: "The address has been removed.",
    });
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    toast({
      title: "Default Address Set",
      description: "This address will be used for deliveries.",
    });
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
            <h1 className="text-lg font-semibold">Saved Addresses</h1>
          </div>
          <Button size="sm" onClick={openAddDialog}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </header>

      <div className="px-5 py-4 space-y-4">
        {addresses.length === 0 ? (
          <Card className="p-8 text-center">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Addresses Saved</h3>
            <p className="text-muted-foreground mb-4">Add your first delivery address</p>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </Card>
        ) : (
          addresses.map((address) => {
            const Icon = labelIcons[address.label];
            return (
              <Card key={address.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    address.isDefault ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon className={`w-5 h-5 ${address.isDefault ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold capitalize">
                        {address.label === 'other' ? address.customLabel : address.label}
                      </span>
                      {address.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {address.fullAddress}
                      {address.landmark && `, ${address.landmark}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city} - {address.pincode}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(address)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                          <Check className="w-4 h-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteConfirmId(address.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
            <DialogDescription>
              {editingAddress ? 'Update your delivery address details' : 'Enter your delivery address details'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Label Selection */}
            <div className="space-y-2">
              <Label>Address Type</Label>
              <div className="flex gap-2">
                {(['home', 'work', 'other'] as const).map((label) => {
                  const Icon = labelIcons[label];
                  return (
                    <button
                      key={label}
                      onClick={() => setFormData(prev => ({ ...prev, label }))}
                      className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                        formData.label === label
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${formData.label === label ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm capitalize ${formData.label === label ? 'font-medium' : ''}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {formData.label === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="customLabel">Custom Label</Label>
                <Input
                  id="customLabel"
                  value={formData.customLabel}
                  onChange={(e) => setFormData(prev => ({ ...prev, customLabel: e.target.value }))}
                  placeholder="e.g., Parent's Home"
                  className={errors.customLabel ? 'border-destructive' : ''}
                />
                {errors.customLabel && <p className="text-sm text-destructive">{errors.customLabel}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Input
                id="fullAddress"
                value={formData.fullAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, fullAddress: e.target.value }))}
                placeholder="House/Flat No., Building, Street"
                className={errors.fullAddress ? 'border-destructive' : ''}
              />
              {errors.fullAddress && <p className="text-sm text-destructive">{errors.fullAddress}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark">Landmark (Optional)</Label>
              <Input
                id="landmark"
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                placeholder="Near Metro Station, Opposite Mall"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                  className={errors.city ? 'border-destructive' : ''}
                />
                {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                  placeholder="560001"
                  maxLength={6}
                  className={errors.pincode ? 'border-destructive' : ''}
                />
                {errors.pincode && <p className="text-sm text-destructive">{errors.pincode}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                className="rounded border-border"
              />
              <Label htmlFor="isDefault" className="font-normal cursor-pointer">
                Set as default address
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingAddress ? 'Update' : 'Save'} Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Delete Address?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
