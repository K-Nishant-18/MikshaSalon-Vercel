import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Syringe, Zap, Droplet, TestTube, Shield } from 'lucide-react';

export default function HygieneSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const hygieneItems = [
    { icon: Syringe, text: t('hygiene.needles') },
    { icon: Zap, text: t('hygiene.autoclave') },
    { icon: Droplet, text: t('hygiene.inks') },
    // { icon: TestTube, text: t('hygiene.patch') },
    { icon: Shield, text: t('hygiene.dermat') }
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-background to-black"
      data-testid="section-hygiene"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-white" data-testid="text-hygiene-title">
            {t('hygiene.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {hygieneItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mb-4">
                <item.icon className="w-10 h-10 text-gold" />
              </div>
              <p className="text-white/90">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
