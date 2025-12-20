import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ZapIcon, PaletteIcon, PrinterIcon, SparklesIcon } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [animatedTitle, setAnimatedTitle] = useState('');
  const fullTitle = "Vsaka barva ena zgodba";
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.85;
      const fadeStart = heroHeight * 0.3;
      const fadeEnd = heroHeight * 0.9;
      
      let opacity = 1;
      if (scrollPosition > fadeStart) {
        opacity = Math.max(0, 1 - ((scrollPosition - fadeStart) / (fadeEnd - fadeStart)));
      }
      
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.success'),
      description: 'Odgovorili vam bomo v najkrajšem možnem času.',
    });
    setContactFormData({ name: '', email: '', phone: '', message: '' });
  };

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullTitle.length) {
        setAnimatedTitle(fullTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullTitle]);

  const services = [
    {
      title: t('services.panels'),
      icon: <PrinterIcon className="h-12 w-12 text-accent" strokeWidth={1.5} />,
      path: '/products'
    },
    {
      title: t('services.tshirts'),
      icon: <SparklesIcon className="h-12 w-12 text-accent" strokeWidth={1.5} />,
      path: '/products'
    },
    {
      title: t('services.custom'),
      icon: <PaletteIcon className="h-12 w-12 text-accent" strokeWidth={1.5} />,
      path: '/services'
    }
  ];

  const benefits = [
    { title: t('benefits.fast'), icon: <ZapIcon className="h-10 w-10 text-accent" strokeWidth={1.5} /> },
    { title: t('benefits.quality'), icon: <PaletteIcon className="h-10 w-10 text-accent" strokeWidth={1.5} /> },
    { title: t('benefits.tech'), icon: <PrinterIcon className="h-10 w-10 text-accent" strokeWidth={1.5} /> },
    { title: t('benefits.custom'), icon: <SparklesIcon className="h-10 w-10 text-accent" strokeWidth={1.5} /> }
  ];

  return (
    <div className="w-full">
      <section className="relative h-screen flex items-start overflow-hidden bg-white">
        <div 
          className="absolute inset-0 z-0 transition-all duration-700"
          style={{ 
            opacity: scrollOpacity,
            transform: `scale(${1 + (1 - scrollOpacity) * 0.1})`
          }}
        >
          <div className="relative w-full h-full">
            <img 
              src="https://c.animaapp.com/mifzg6j8jXwMqC/img/large-format-printer-vibrant-colors-industrial-setting-high-detail-action-shot_1.jpg"
              alt="Large Format Printer"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 35%' }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent"
              style={{ 
                background: `linear-gradient(to right, 
                  rgba(255, 255, 255, 1) 0%, 
                  rgba(255, 255, 255, 0.98) 15%, 
                  rgba(255, 255, 255, 0.85) 30%, 
                  rgba(255, 255, 255, 0.5) 50%, 
                  rgba(255, 255, 255, 0) 80%)`
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>

        <div 
          className="relative z-10 w-full h-full flex items-center px-16"
          style={{ opacity: scrollOpacity }}
        >
          <div className="max-w-2xl ml-[5%]">
            <h2 className="text-h5 font-body font-semibold text-[#696969] mb-6 leading-tight uppercase">
              DIGITALNI TISK
            </h2>
            
            <h1 className="text-h3 font-body font-bold text-foreground leading-tight mb-8">
              {animatedTitle.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-color-change"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '4s',
                    animationIterationCount: 'infinite'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <Button 
              onClick={() => navigate('/products')}
              className="bg-secondary !text-[#E1E1E1] hover:bg-secondary/90 font-body font-semibold px-12 py-6 text-h6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 uppercase"
            >
              NAJDI SVOJO BARVO
            </Button>
          </div>
        </div>
      </section>



      <section className="py-24 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-background to-muted">
        <div className="max-w-container mx-auto">
          <h2 className="text-h5 font-body font-bold text-center mb-16 text-foreground">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cotls-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="cursor-pointer transition-all duration-200 hover:scale-105 bg-card border-border"
                onClick={() => navigate(service.path)}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">{service.icon}</div>
                  <h3 className="text-h4 font-body font-medium text-card-foreground">{service.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative w-full max-w-4xl mx-auto">
            <ImageCarousel />
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-body font-bold text-center mb-16 text-foreground">{t('benefits.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h4 className="text-h5 font-body font-medium text-foreground">{benefit.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24 bg-muted">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-body font-bold text-center mb-16 text-foreground">{t('testimonials.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-accent text-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-body text-card-foreground mb-6 italic">"Odlična kakovost in izjemno hitra izdelava. Barve so neverjetno žive!"</p>
                <div>
                  <p className="text-h6 font-body font-bold text-card-foreground">Marko Novak</p>
                  <p className="text-body-small text-muted-foreground">ABC d.o.o.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-accent text-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-body text-card-foreground mb-6 italic">"Profesionalna ekipa, ki je pomagala pri oblikovanju. Priporočam!"</p>
                <div>
                  <p className="text-h6 font-body font-bold text-card-foreground">Ana Kovač</p>
                  <p className="text-body-small text-muted-foreground">XYZ s.p.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-accent text-accent" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-body text-card-foreground mb-6 italic">"Hitro in učinkovito. Majice so bile natisnjene točno po naših željah."</p>
                <div>
                  <p className="text-h6 font-body font-bold text-card-foreground">Peter Horvat</p>
                  <p className="text-body-small text-muted-foreground">DEF d.o.o.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-body font-bold text-center mb-16 text-foreground">{t('contact.title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h3 className="text-h4 font-body font-bold mb-6 text-foreground">Pošljite nam sporočilo</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-body-small font-medium mb-2 text-foreground">
                      {t('contact.name')}
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      required
                      className="bg-background text-foreground border-border focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-body-small font-medium mb-2 text-foreground">
                      {t('contact.email')}
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      required
                      className="bg-background text-foreground border-border focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-body-small font-medium mb-2 text-foreground">
                    {t('contact.phone')}
                  </label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={contactFormData.phone}
                    onChange={handleContactChange}
                    className="bg-background text-foreground border-border focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-body-small font-medium mb-2 text-foreground">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactChange}
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
              <h3 className="text-h4 font-body font-bold mb-6 text-foreground">Kontaktni podatki</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-h6 font-body font-bold mb-2 text-foreground">Email</h4>
                    <a href="mailto:info@nanaprinterior.si" className="text-body text-accent hover:underline">
                      info@nanaprinterior.si
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-h6 font-body font-bold mb-2 text-foreground">Telefon</h4>
                    <a href="tel:+386123456789" className="text-body text-accent hover:underline">
                      +386 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-h6 font-body font-bold mb-2 text-foreground">Lokacija</h4>
                    <p className="text-body text-foreground">
                      Celje, Slovenia
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-h6 font-body font-bold mb-4 text-foreground">Delovni čas</h4>
                  <div className="space-y-2 text-body text-foreground">
                    <p>Ponedeljek - Petek: 8:00 - 17:00</p>
                    <p>Sobota: 9:00 - 13:00</p>
                    <p>Nedelja: Zaprto</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11062.123456789!2d15.2677!3d46.2305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f7f8f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sCelje%2C%20Slovenia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
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
      </section>
    </div>
  );
}
