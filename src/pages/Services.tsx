import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { PrinterIcon, ShirtIcon, PackageIcon, SparklesIcon } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      title: 'Reklamni panoji',
      description: 'Visokokakovostni digitalni tisk za reklamne panoje različnih velikosti.',
      icon: <PrinterIcon className="h-16 w-16 text-accent" strokeWidth={1.5} />,
      path: '/products'
    },
    {
      title: 'Tisk na majice',
      description: 'Personalizirane majice z vašim dizajnom ali logotipom.',
      icon: <ShirtIcon className="h-16 w-16 text-accent" strokeWidth={1.5} />,
      path: '/products'
    },
    {
      title: 'Personalizirani izdelki',
      description: 'Tisk na različne materiale in izdelke po vaši želji.',
      icon: <PackageIcon className="h-16 w-16 text-accent" strokeWidth={1.5} />,
      path: '/products'
    },
    {
      title: 'Oblikovanje',
      description: 'Pomoč pri oblikovanju in pripravi datotek za tisk.',
      icon: <SparklesIcon className="h-16 w-16 text-accent" strokeWidth={1.5} />,
      path: '/contact'
    }
  ];

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">{t('services.title')}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="cursor-pointer transition-all duration-200 hover:scale-105 bg-card border-border"
                onClick={() => navigate(service.path)}
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">{service.icon}</div>
                  <h3 className="text-h4 font-heading font-bold text-center mb-4 text-card-foreground">{service.title}</h3>
                  <p className="text-body text-center text-card-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24 bg-muted">
        <div className="max-w-container mx-auto">
          <h2 className="text-h2 font-heading font-bold text-center mb-8 text-foreground">Naša tehnologija</h2>
          <p className="text-body text-center text-foreground max-w-3xl mx-auto leading-relaxed">
            Uporabljamo najnovejšo tehnologijo HP Latex 365, ki zagotavlja vrhunsko kakovost tiska, 
            visoko barvno natančnost in okolju prijazne rešitve. Naša oprema omogoča tisk na različne 
            materiale in velikosti, kar nam omogoča izpolnitev vseh vaših potreb.
          </p>
        </div>
      </section>
    </div>
  );
}
