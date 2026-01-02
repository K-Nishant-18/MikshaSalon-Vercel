import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import TattooSection from '@/components/TattooSection';
import BeautySection from '@/components/BeautySection';
import GallerySection from '@/components/GallerySection';
import PricingSection from '@/components/PricingSection';
import BrandsSection from '@/components/BrandsSection';
import HygieneSection from '@/components/HygieneSection';
import TestimonialSection from '@/components/TestimonialSection';
import BookingSection from '@/components/BookingSection';
import WhatsAppButton from '@/components/WhatsAppButton';
// Using a plain anchor for the staff login link so it renders correctly

export default function Home() {
  useEffect(() => {
    document.title = "MISHKA Tattoo & Beauty Salon - Art. Beauty. Identity.";
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="relative pt-0">
        <Navbar />
        <HeroSection />
        <ExperienceSection />
        <TattooSection />
        <BeautySection />
        <GallerySection />
        <PricingSection />
        <BrandsSection />
        <HygieneSection />
        <TestimonialSection />
        <BookingSection />
        <WhatsAppButton />

        <footer className="bg-black text-white/60 py-8 text-center border-t border-gold/20">
          <p>© 2025 MISHKA Tattoo & Beauty Salon. </p>
          <p>All rights reserved.</p>
          <h4 className='pt-5'><b>Made by Nishant and Team</b> </h4>
          <a href="/admin" data-testid="link-admin" className="inline-flex items-center gap-1 text-xs mt-2 text-white/40 hover:text-white/60 transition-colors">
            <Lock className="w-3 h-3" />
            Staff Login
          </a>
        </footer>
      </div>
    </I18nextProvider>
  );
}
