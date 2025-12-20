import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">{t('about.title')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-h3 font-heading font-bold mb-6 text-foreground">{t('about.story')}</h2>
              <p className="text-body text-foreground mb-6 leading-relaxed">
                NANA PRINTERIOR je bil ustanovljen z vizijo zagotavljanja vrhunskih storitev digitalnega tiska. 
                Naša strast do barv in oblikovanja nas vodi pri vsakem projektu, ki ga prevzamemo.
              </p>
              <p className="text-body text-foreground leading-relaxed">
                Z več kot 10 leti izkušenj v industriji smo postali zaupanja vredni partner za podjetja 
                in posameznike, ki iščejo kakovostne tiskarske rešitve.
              </p>
              
              <div className="mt-8">
                <h3 className="text-h4 font-heading font-bold mb-4 text-foreground">{t('about.mission')}</h3>
                <ul className="list-disc list-inside space-y-2 text-body text-foreground">
                  <li>Zagotavljanje vrhunske kakovosti tiska</li>
                  <li>Osebna obravnava vsakega projekta</li>
                  <li>Hitra in zanesljiva dostava</li>
                  <li>Konkurenčne cene</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-h4 font-heading font-bold mb-4 text-foreground">{t('about.vision')}</h3>
                <p className="text-body text-foreground leading-relaxed">
                  Naša vizija je postati vodilni ponudnik digitalnega tiska v regiji, 
                  z nenehnim vlaganjem v najnovejšo tehnologijo in razvoj naše ekipe.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img 
                src="https://c.animaapp.com/mifzg6j8jXwMqC/img/user_1.png" 
                alt="undefined"
                className="w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
