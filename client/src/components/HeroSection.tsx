import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import tattooStudioImg from '@assets/generated_images/Luxury_tattoo_studio_interior_f0d54787.png';

export default function HeroSection() {
  const { t } = useTranslation();

  const handleBookClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGalleryClick = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${tattooStudioImg})`,
          filter: 'brightness(0.4)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <Sparkles className="absolute top-1/4 right-1/4 w-8 h-8 text-gold animate-float opacity-60" />
      <Sparkles className="absolute top-1/3 left-1/4 w-6 h-6 text-gold animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute bottom-1/3 right-1/3 w-10 h-10 text-gold animate-float opacity-50" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4" data-testid="text-hero-title">
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-4xl font-serif text-gold mb-6" data-testid="text-hero-subtitle">
            {t('hero.subtitle')}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={handleBookClick}
            size="lg"
            className="glass-effect border-2 border-gold text-white hover:bg-gold hover:text-black text-lg px-8 h-12"
            data-testid="button-book-appointment"
          >
            {t('hero.bookButton')}
          </Button>
          <Button
            onClick={handleGalleryClick}
            size="lg"
            variant="outline"
            className="glass-effect border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 h-12"
            data-testid="button-explore-gallery"
          >
            {t('hero.galleryButton')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
