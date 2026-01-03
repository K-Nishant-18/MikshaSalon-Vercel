import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '#booking', label: 'Booking' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3">
              <img src="/logo2.png" alt="MISHKA Logo" className="w-20 h-10 object-cover" />
              <div className="flex flex-col leading-tight">
                <span className="text-white text-lg font-serif">MISHKA</span>
                <span className="text-white/70 text-xs -mt-1">Tattoo & Beauty</span>
              </div>
            </a>
          </div>

          {/* Desktop nav links (hidden on mobile) */}
          <nav className="hidden md:flex gap-8 text-white/90">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="/gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#booking" className="hover:text-gold transition-colors">Booking</a>
          </nav>

          {/* Language selector and hamburger on the right */}
          <div className="flex items-center gap-4">
            <LanguageSelector inline />

            {/* Hamburger menu (visible only on mobile) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-gold/10 rounded-lg transition-all duration-300 relative z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu content - centered */}
        <div className="relative h-full flex items-center justify-center">
          <nav className="space-y-8 text-center">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`block text-white text-3xl font-serif hover:text-gold transition-colors duration-300 ${isMenuOpen ? 'animate-fadeInUp' : ''
                  }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
