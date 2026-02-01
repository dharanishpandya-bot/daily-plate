import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { FAQ, SupportTicket } from '@/types/app';
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  FileText,
  Clock,
  CheckCircle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer: 'You can track your order in real-time by going to Orders > Active Orders. You\'ll see a live map with your delivery partner\'s location and estimated arrival time.',
    category: 'orders',
  },
  {
    id: '2',
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Digital Wallets, and Cash on Delivery. You can manage your payment methods in Profile > Payment Methods.',
    category: 'payments',
  },
  {
    id: '3',
    question: 'How do I cancel an order?',
    answer: 'You can cancel an order within 2 minutes of placing it. Go to Orders > Active Orders, select the order, and tap "Cancel Order". Refunds are processed within 3-5 business days.',
    category: 'orders',
  },
  {
    id: '4',
    question: 'How does the daily budget work?',
    answer: 'Set your daily food budget in Profile > Budget Settings. You\'ll see a progress bar showing your spending. We\'ll alert you when you\'re close to or exceed your limit.',
    category: 'budget',
  },
  {
    id: '5',
    question: 'What is the subscription feature?',
    answer: 'Subscribe to daily meals and save up to 20%! Choose breakfast, lunch, dinner, or all meals. Subscriptions auto-renew monthly and can be paused or cancelled anytime.',
    category: 'subscriptions',
  },
  {
    id: '6',
    question: 'How do I report a missing item?',
    answer: 'Go to Orders > Past Orders, select the order with the issue, and tap "Report Issue". Choose "Missing Item" and describe the problem. We\'ll investigate and process a refund if needed.',
    category: 'orders',
  },
];

const ticketCategories = [
  'Order Issue',
  'Payment Problem',
  'Refund Request',
  'Account Issue',
  'App Bug',
  'Suggestion',
  'Other',
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const { supportTickets, addSupportTicket, orders } = useApp();
  const { toast } = useToast();

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: 'Hi! How can I help you today?', isUser: false },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Ticket form
  const [ticketData, setTicketData] = useState({
    category: '',
    orderId: '',
    message: '',
  });

  const handleSubmitTicket = () => {
    if (!ticketData.category || !ticketData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a category and describe your issue.",
        variant: "destructive",
      });
      return;
    }

    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      category: ticketData.category,
      message: ticketData.message.trim(),
      orderId: ticketData.orderId || undefined,
      status: 'open',
      createdAt: new Date(),
    };

    addSupportTicket(newTicket);
    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });

    setShowTicketDialog(false);
    setTicketData({ category: '', orderId: '', message: '' });
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { text: chatInput, isUser: true }]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          text: "Thank you for your message! A support agent will review your query and get back to you soon. For urgent issues, please call our helpline.",
          isUser: false,
        },
      ]);
    }, 1000);
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
          <h1 className="text-lg font-semibold">Help & Support</h1>
        </div>
      </header>

      <div className="px-5 py-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setShowChatDialog(true)}
            className="p-4 bg-primary/5 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary/10 transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Chat</span>
          </button>
          <a
            href="tel:+919876543210"
            className="p-4 bg-secondary/5 rounded-2xl flex flex-col items-center gap-2 hover:bg-secondary/10 transition-colors"
          >
            <Phone className="w-6 h-6 text-secondary" />
            <span className="text-sm font-medium">Call Us</span>
          </a>
          <a
            href="mailto:support@mealwise.app"
            className="p-4 bg-accent/5 rounded-2xl flex flex-col items-center gap-2 hover:bg-accent/10 transition-colors"
          >
            <Mail className="w-6 h-6 text-accent" />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>

        {/* Raise Ticket */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Raise a Ticket</p>
                <p className="text-sm text-muted-foreground">Report an issue or request</p>
              </div>
            </div>
            <Button size="sm" onClick={() => setShowTicketDialog(true)}>
              Create
            </Button>
          </div>
        </Card>

        {/* My Tickets */}
        {supportTickets.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
              MY TICKETS
            </h2>
            <Card className="divide-y divide-border">
              {supportTickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{ticket.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.status === 'open' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : ticket.status === 'resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{ticket.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* FAQs */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-3 px-1">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <Card className="divide-y divide-border">
            {faqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={expandedFaq === faq.id}
                onOpenChange={(open) => setExpandedFaq(open ? faq.id : null)}
              >
                <CollapsibleTrigger className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="flex-1 font-medium">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground pl-8">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </Card>
        </div>
      </div>

      {/* Raise Ticket Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Raise a Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={ticketData.category}
                onValueChange={(value) => setTicketData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  {ticketCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(ticketData.category === 'Order Issue' || ticketData.category === 'Refund Request') && orders.length > 0 && (
              <div className="space-y-2">
                <Label>Related Order (Optional)</Label>
                <Select
                  value={ticketData.orderId}
                  onValueChange={(value) => setTicketData(prev => ({ ...prev, orderId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an order" />
                  </SelectTrigger>
                  <SelectContent>
                    {orders.slice(0, 5).map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        Order #{order.id.slice(-6)} - ₹{order.total}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Describe Your Issue</Label>
              <Textarea
                value={ticketData.message}
                onChange={(e) => setTicketData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please describe your issue in detail..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTicketDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitTicket}>
              Submit Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="max-w-md mx-4 h-[500px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Chat Support</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 py-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted rounded-bl-md'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            />
            <Button size="icon" onClick={handleSendChat}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
