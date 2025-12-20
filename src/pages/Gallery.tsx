import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Gallery() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = [
    { image: 'https://placehold.co/600x400', caption: 'Reklamni pano' },
    { image: 'https://placehold.co/600x400', caption: 'Majice po meri' },
    { image: 'https://placehold.co/600x400', caption: 'Personalizirani izdelki' },
    { image: 'https://placehold.co/600x400', caption: 'Reklamni material' },
    { image: 'https://placehold.co/600x400', caption: 'Tisk na tekstil' },
    { image: 'https://placehold.co/600x400', caption: 'Velike dimenzije' },
    { image: 'https://placehold.co/600x400', caption: 'Barvni tisk' },
    { image: 'https://placehold.co/600x400', caption: 'Oblikovanje' },
    { image: 'https://placehold.co/600x400', caption: 'Promocijski material' }
  ];

  return (
    <div className="w-full">
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-background">
        <div className="max-w-container mx-auto">
          <h1 className="text-h1 font-heading font-bold text-center mb-16 text-foreground">Galerija</h1>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.caption}
                  className="w-full h-auto transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <p className="text-body font-medium text-background">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
