import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MenuIcon, XIcon, MapPinIcon, ShoppingCartIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();

  const navItems = [
    { path: '/services', label: t('nav.services') },
    { path: '/products', label: t('nav.products') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/faq', label: t('nav.faq') },
    { path: '/testimonials', label: t('nav.testimonials') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/about', label: t('nav.about') },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-border">
      {/* TOP BAR */}
      <div className="w-full border-b border-border">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <img
              src="https://c.animaapp.com/mifzg6j8jXwMqC/img/nana_logo_koncna-verzija-01.svg"
              alt="NANA PRINTERIOR"
              className="h-16 w-auto transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
            />
          </Link>

          {/* Search bar (center) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-full max-w-xl">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={t('nav.search') || "Iskanje..."}
                className="pl-10 pr-4 py-2 rounded-xl border border-border shadow-sm bg-white"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center gap-6 text-foreground">
            {/* Lokacija */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-accent transition">
              <MapPinIcon className="h-5 w-5" />
              <span className="text-sm">{t('nav.location') || "Lokacija"}</span>
            </div>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative cursor-pointer hover:text-accent transition"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-5 min-w-[20px] rounded-full bg-accent text-white text-xs flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Language */}
            <Button 
              variant="ghost"
              onClick={() => changeLanguage(i18n.language === 'si' ? 'en' : 'si')}
              className="text-foreground hover:text-accent uppercase text-sm"
            >
              {i18n.language === 'si' ? 'SL' : 'ENG'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="hidden lg:flex w-full bg-white">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-20 h-14 flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-all duration-300 cursor-pointer relative group ${
                location.pathname === item.path
                  ? 'text-accent font-semibold'
                  : 'text-foreground hover:text-accent'
              }`}
            >
              <span className="relative inline-block transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE NAV */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-6 border-t border-border">
          {/* Mobile search */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Iskanje..."
              className="pl-10 py-2 rounded-xl border border-border shadow-sm"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base ${
                  location.pathname === item.path ? 'text-accent font-semibold' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
