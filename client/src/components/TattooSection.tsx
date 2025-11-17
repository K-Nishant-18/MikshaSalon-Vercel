import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pen, Compass, User, Paintbrush, Droplet, Palette, Sparkles, CheckCircle } from 'lucide-react';

export default function TattooSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { icon: Pen, title: t('tattoo.fineLine'), key: 'fineLine' },
    { icon: Compass, title: t('tattoo.mandala'), key: 'mandala' },
    // { icon: User, title: t('tattoo.realism'), key: 'realism' },
    { icon: Paintbrush, title: t('tattoo.coverup'), key: 'coverup' },
    { icon: Droplet, title: t('tattoo.brush'), key: 'brush' },
    { icon: Palette, title: t('tattoo.color'), key: 'color' },
    { icon: Sparkles, title: t('tattoo.custom'), key: 'custom' }
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-black to-background"
      data-testid="section-tattoo"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-white" data-testid="text-tattoo-title">
            {t('tattoo.title')}
          </h2>
          <p className="text-xl text-gold">{t('tattoo.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-gold/30 hover:border-gold hover-elevate active-elevate-2 transition-all h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <service.icon className="w-12 h-12 mb-4 text-gold" />
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border-gold/50 bg-gradient-to-r from-gold/10 to-gold/5">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gold" />
              <h3 className="text-2xl font-serif mb-2 text-white">{t('tattoo.hygiene')}</h3>
              <p className="text-white/80">{t('tattoo.hygieneDesc')}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
