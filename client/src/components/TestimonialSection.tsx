import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

export default function TestimonialSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { name: t('testimonials.client1'), review: t('testimonials.review1'), rating: 5 },
    { name: t('testimonials.client2'), review: t('testimonials.review2'), rating: 5 },
    { name: t('testimonials.client3'), review: t('testimonials.review3'), rating: 5 },
    { name: t('testimonials.client4'), review: t('testimonials.review4'), rating: 5 },
    { name: t('testimonials.client5'), review: t('testimonials.review5'), rating: 5 }
  ];

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMobile, testimonials.length]);

  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-12 overflow-hidden bg-white" data-testid="section-testimonials">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-gold">{t('testimonials.title')}</h2>
      </div>

      {isMobile ? (
        <div className="relative h-[250px] w-full max-w-md mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 px-4"
            >
              <div className="h-full border border-gold/30 rounded-lg p-6 bg-white shadow-md flex flex-col justify-center items-center text-center">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-base text-gray-700 mb-4 italic">"{testimonials[currentIndex].review}"</p>
                <p className="text-sm text-gold font-semibold">— {testimonials[currentIndex].name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {duplicated.map((item, i) => (
            <div key={i} className="min-w-[300px] border border-gold/30 rounded-lg p-4 bg-white shadow-md">
              <div className="flex gap-0.5 mb-2">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-2 italic">"{item.review}"</p>
              <p className="text-xs text-gold font-semibold">— {item.name}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
