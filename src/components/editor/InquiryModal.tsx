import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabaseClient } from '@/lib/supabaseClient';
import { InquiryData } from './types';

interface InquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiryData: Partial<InquiryData>;
  onSubmit: () => void;
}

export default function InquiryModal({
  open,
  onOpenChange,
  inquiryData,
  onSubmit
}: InquiryModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast({ title: 'Error', description: 'Email is required' });
      return;
    }

    setLoading(true);
    try {
      const fullInquiry = {
        ...inquiryData,
        ...formData,
        createdAt: new Date().toISOString()
      };

      if (supabaseClient) {
        const { error } = await supabaseClient
          .from('inquiries')
          .insert([fullInquiry]);

        if (error) throw error;
      } else {
        console.log('Inquiry (Supabase not configured):', fullInquiry);
      }

      toast({
        title: 'Success',
        description: 'Your inquiry has been sent successfully!'
      });

      setFormData({ name: '', email: '', message: '' });
      onOpenChange(false);
      onSubmit();
    } catch (error) {
      console.error('Inquiry submit error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit inquiry. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Inquiry</DialogTitle>
          <DialogDescription>
            Tell us about your design requirements
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your design..."
              className="mt-1 resize-none"
              rows={4}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
