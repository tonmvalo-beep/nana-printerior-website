import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: 'Kakšni so roki dostave?',
      answer: 'Standardni rok dostave je 3-5 delovnih dni. Za nujne naročila ponujamo tudi ekspresno dostavo v 24-48 urah.'
    },
    {
      question: 'Kakšne so cene?',
      answer: 'Cene so odvisne od velikosti, količine in vrste materiala. Za natančno ponudbo nas kontaktirajte ali uporabite naš spletni kalkulator.'
    },
    {
      question: 'Ali lahko naročim po meri?',
      answer: 'Da, ponujamo tisk po meri za vse naše izdelke. Kontaktirajte nas za več informacij o možnostih prilagajanja.'
    },
    {
      question: 'Katere materiale uporabljate?',
      answer: 'Uporabljamo visokokakovostne materiale, primerne za digitalni tisk. Za reklamne panoje uporabljamo PVC, mesh in druge materiale, odvisno od namena uporabe.'
    },
    {
      question: 'Ali ponujate popuste za večje količine?',
      answer: 'Da, za večje količine ponujamo ugodne popuste. Kontaktirajte nas za individualno ponudbo.'
    },
    {
      question: 'Kako pripravim datoteke za tisk?',
      answer: 'Datoteke naj bodo v formatu PDF, AI ali EPS z resolucijo najmanj 300 DPI. Za pomoč pri pripravi datotek smo vam na voljo.'
    }
  ];

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">{t('faq.title')}</h1>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-h5 font-heading font-medium text-left text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
