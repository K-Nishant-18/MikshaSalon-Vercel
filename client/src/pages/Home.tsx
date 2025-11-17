import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import LanguageSelector from '@/components/LanguageSelector';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import TattooSection from '@/components/TattooSection';
import BeautySection from '@/components/BeautySection';
import GallerySection from '@/components/GallerySection';
import PricingSection from '@/components/PricingSection';
import HygieneSection from '@/components/HygieneSection';
import TestimonialSection from '@/components/TestimonialSection';
import BookingSection from '@/components/BookingSection';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  useEffect(() => {
    document.title = "MISHKA Tattoo & Beauty Salon - Art. Beauty. Identity.";
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="relative">
        <LanguageSelector />
        <HeroSection />
        <ExperienceSection />
        <TattooSection />
        <BeautySection />
        <GallerySection />
        <PricingSection />
        <HygieneSection />
        <TestimonialSection />
        <BookingSection />
        <WhatsAppButton />
        
        <footer className="bg-black text-white/60 py-8 text-center border-t border-gold/20">
          <p>© 2025 MISHKA Tattoo & Beauty Salon. All rights reserved.</p>
        </footer>
      </div>
    </I18nextProvider>
  );
}
