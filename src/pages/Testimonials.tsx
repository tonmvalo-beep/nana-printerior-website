import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

export default function Testimonials() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    {
      name: 'Marko Novak',
      company: 'ABC d.o.o.',
      text: 'Odlična storitev in hitra dostava. Reklamni panoji so presežli naša pričakovanja.',
      rating: 5
    },
    {
      name: 'Ana Kovač',
      company: 'XYZ s.p.',
      text: 'Profesionalna ekipa, ki je pomagala pri oblikovanju in izvedbi projekta. Priporočam!',
      rating: 5
    },
    {
      name: 'Peter Horvat',
      company: 'DEF d.o.o.',
      text: 'Kakovost tiska je vrhunska, cene pa konkurenčne. Zagotovo bomo naročili še.',
      rating: 5
    },
    {
      name: 'Maja Zupan',
      company: 'GHI d.o.o.',
      text: 'Hitro in učinkovito. Majice so bile natisnjene točno po naših željah.',
      rating: 5
    }
  ];

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">{t('testimonials.title')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-accent text-accent" strokeWidth={1.5} />
                    ))}
                  </div>
                  <p className="text-body text-card-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="text-h6 font-heading font-bold text-card-foreground">{testimonial.name}</p>
                    <p className="text-body-small text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
