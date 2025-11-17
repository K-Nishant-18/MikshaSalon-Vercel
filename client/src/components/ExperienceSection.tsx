import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import tattooStudioImg from '@assets/generated_images/Luxury_tattoo_studio_interior_f0d54787.png';
import beautySalonImg from '@assets/generated_images/Luxury_beauty_salon_interior_b10ce87e.png';

export default function ExperienceSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      data-testid="section-experience"
    >
      <div className="grid md:grid-cols-2 h-full">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${tattooStudioImg})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${beautySalonImg})` }}
          />
          <div className="absolute inset-0 bg-rose-nude/40" />
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute inset-0 flex items-center justify-center p-4"
      >
        <div className="glass-effect border border-gold rounded-lg p-8 md:p-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white" data-testid="text-experience-title">
            {t('experience.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {t('experience.description')}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
