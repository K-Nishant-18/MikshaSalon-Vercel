import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Droplet, Sparkles, Hand, Heart, Eye } from 'lucide-react';

export default function BeautySection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { icon: Scissors, title: t('beauty.hair'), key: 'hair' },
    { icon: Droplet, title: t('beauty.color'), key: 'color' },
    { icon: Sparkles, title: t('beauty.makeup'), key: 'makeup' },
    { icon: Hand, title: t('beauty.nails'), key: 'nails' },
    { icon: Heart, title: t('beauty.skin'), key: 'skin' },
    { icon: Eye, title: t('beauty.lashes'), key: 'lashes' }
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-background via-rose-nude to-background"
      data-testid="section-beauty"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4" data-testid="text-beauty-title">
            {t('beauty.title')}
          </h2>
          <p className="text-xl text-gold">{t('beauty.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-dark border border-[rgba(216,193,143,0.08)] bg-black/30 shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_30px_rgba(216,193,143,0.12)] hover:scale-105 transform transition-all duration-300 h-full focus:outline-none focus:ring-2 focus:ring-gold/30">
                <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold/20 to-gold/40 flex items-center justify-center mb-4 shadow-inner">
                    <service.icon className="w-8 h-8 text-gold" />
                  </div>
                  <div className="h-1 w-12 bg-gold rounded-full mb-2" aria-hidden />
                  <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
