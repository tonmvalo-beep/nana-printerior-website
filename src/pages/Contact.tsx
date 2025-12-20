import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.success'),
      description: 'Odgovorili vam bomo v najkrajšem možnem času.',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">{t('contact.title')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-body-small font-medium mb-2 text-foreground">
                    {t('contact.name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background text-foreground border-border focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-body-small font-medium mb-2 text-foreground">
                    {t('contact.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background text-foreground border-border focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-body-small font-medium mb-2 text-foreground">
                    {t('contact.phone')}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-background text-foreground border-border focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-body-small font-medium mb-2 text-foreground">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-background text-foreground border-border focus:ring-primary"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-normal py-6 text-body"
                >
                  {t('contact.submit')}
                </Button>
              </form>
            </div>

            <div>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11062.123456789!2d15.2677!3d46.2305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f7f8f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sCelje%2C%20Slovenia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s&key=YOUR_API_KEY"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NANA PRINTERIOR Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
