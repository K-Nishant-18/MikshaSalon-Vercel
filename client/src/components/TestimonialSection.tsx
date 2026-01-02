import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

export default function TestimonialSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const duration = isMobile ? 10 : 20;

  const testimonials = [
    { name: t('testimonials.client1'), review: t('testimonials.review1'), rating: 5 },
    { name: t('testimonials.client2'), review: t('testimonials.review2'), rating: 5 },
    { name: t('testimonials.client3'), review: t('testimonials.review3'), rating: 5 },
    { name: t('testimonials.client4'), review: t('testimonials.review4'), rating: 5 },
    { name: t('testimonials.client5'), review: t('testimonials.review5'), rating: 5 }
  ];

  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-12 overflow-hidden bg-white" data-testid="section-testimonials">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-gold">{t('testimonials.title')}</h2>
      </div>

      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
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
    </section>
  );
}
