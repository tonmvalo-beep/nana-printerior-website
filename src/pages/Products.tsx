import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PanelEditor from '../components/PanelEditor';
import TShirtEditor from '../components/TShirtEditor';

export default function Products() {
  const { t } = useTranslation();
  const [showPanelEditor, setShowPanelEditor] = useState(false);
  const [showTShirtEditor, setShowTShirtEditor] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const panels = [
    { size: '1 × 1.5 m', price: '30€ + DDV' },
    { size: '2 × 1.5 m', price: '50€ + DDV' },
    { size: '3 × 1.5 m', price: '75€ + DDV' },
    { size: 'Po meri', price: 'Pokliči za ceno' }
  ];

  const tshirts = [
    { name: 'Osnovna majica', price: '15€ + DDV' },
    { name: 'Premium majica', price: '25€ + DDV' },
    { name: 'Polo majica', price: '30€ + DDV' },
    { name: 'Hoodie', price: '45€ + DDV' }
  ];

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">{t('products.title')}</h1>
          
          <Tabs defaultValue="panels" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-muted">
              <TabsTrigger value="panels" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                {t('products.panels')}
              </TabsTrigger>
              <TabsTrigger value="tshirts" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                {t('products.tshirts')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="panels">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {panels.map((panel, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-6">
                      <h3 className="text-h5 font-heading font-bold mb-2 text-card-foreground">{panel.size}</h3>
                      <p className="text-body text-card-foreground mb-4">{panel.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  onClick={() => setShowPanelEditor(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal px-8 py-6 text-body"
                >
                  {t('products.createDesign')}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tshirts">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {tshirts.map((tshirt, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-6">
                      <h3 className="text-h5 font-heading font-bold mb-2 text-card-foreground">{tshirt.name}</h3>
                      <p className="text-body text-card-foreground mb-4">{tshirt.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  onClick={() => setShowTShirtEditor(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal px-8 py-6 text-body"
                >
                  {t('products.createDesign')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {showPanelEditor && <PanelEditor onClose={() => setShowPanelEditor(false)} />}
      {showTShirtEditor && <TShirtEditor onClose={() => setShowTShirtEditor(false)} />}
    </div>
  );
}
