import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scissors, Droplet, Sparkles, Hand, Heart, Eye, ArrowRight } from 'lucide-react';

export default function BeautySection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { icon: Scissors, title: t('beauty.hair'), key: 'hair', image: '/hair-service.png' },
    { icon: Droplet, title: t('beauty.color'), key: 'color', image: '/color-service.png' },
    { icon: Sparkles, title: t('beauty.makeup'), key: 'makeup', image: '/makeup-service.png' },
    { icon: Hand, title: t('beauty.nails'), key: 'nails', image: '/nails-service.png' },
    { icon: Heart, title: t('beauty.skin'), key: 'skin', image: '/skin-service.png' },
    { icon: Eye, title: t('beauty.lashes'), key: 'lashes', image: '/lashes-service.png' }
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
              <Card className="glass-dark border border-[rgba(216,193,143,0.08)] bg-black/30 shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_10px_30px_rgba(216,193,143,0.12)] hover:scale-105 transform transition-all duration-300 h-full focus:outline-none focus:ring-2 focus:ring-gold/30 overflow-hidden group cursor-pointer">
                <CardContent className="p-0 relative h-[300px]">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-end p-8 text-center gap-4 pb-12">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gold/20 to-gold/40 flex items-center justify-center shadow-lg shadow-gold/20 group-hover:shadow-gold/40 transition-shadow duration-300">
                      <service.icon className="w-8 h-8 text-gold" />
                    </div>
                    <div className="h-1 w-12 bg-gold rounded-full" aria-hidden />
                    <h3 className="text-2xl font-semibold tracking-tight text-white">{service.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Single Explore More Button for the entire section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gold/10 border-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 px-8 py-6 text-lg group"
          >
            Explore more services
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
