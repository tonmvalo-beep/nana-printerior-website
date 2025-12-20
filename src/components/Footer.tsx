import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-h5 font-heading font-bold mb-4 text-background">NANA PRINTERIOR</h3>
            <p className="text-body-small text-background">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="text-h6 font-heading font-bold mb-4 text-background">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-body-small text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                {t('nav.home')}
              </Link>
              <Link to="/about" className="text-body-small text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                {t('nav.about')}
              </Link>
              <Link to="/services" className="text-body-small text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                {t('nav.services')}
              </Link>
              <Link to="/products" className="text-body-small text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                {t('nav.products')}
              </Link>
              <Link to="/contact" className="text-body-small text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-h6 font-heading font-bold mb-4 text-background">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 text-background" strokeWidth={1.5} />
                <span className="text-body-small text-background">info@nanaprinterior.si</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-background" strokeWidth={1.5} />
                <span className="text-body-small text-background">+386 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-background" strokeWidth={1.5} />
                <span className="text-body-small text-background">Celje, Slovenia</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                  <FacebookIcon className="h-6 w-6" strokeWidth={1.5} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-background hover:text-primary transition-colors duration-200 cursor-pointer">
                  <InstagramIcon className="h-6 w-6" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-body-small text-background">&copy; 2024 NANA PRINTERIOR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
