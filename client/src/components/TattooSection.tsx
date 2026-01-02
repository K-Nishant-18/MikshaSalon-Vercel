import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Users, Sparkles, Shield, Star } from 'lucide-react';

export default function TattooSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    { icon: Heart, title: t('aboutUs.value1Title'), description: t('aboutUs.value1Desc'), key: 'passion' },
    { icon: Award, title: t('aboutUs.value2Title'), description: t('aboutUs.value2Desc'), key: 'excellence' },
    { icon: Users, title: t('aboutUs.value3Title'), description: t('aboutUs.value3Desc'), key: 'community' }
  ];

  const achievements = [
    { icon: Star, text: t('aboutUs.achievement1'), key: 'years' },
    { icon: Users, text: t('aboutUs.achievement2'), key: 'clients' },
    { icon: Award, text: t('aboutUs.achievement3'), key: 'certified' }
  ];

  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-black to-background"
      data-testid="section-tattoo"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-white" data-testid="text-tattoo-title">
            {t('aboutUs.title')}
          </h2>
          <p className="text-xl text-gold mb-8">{t('aboutUs.subtitle')}</p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass-effect border-gold/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image on the left */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative h-64 md:h-full min-h-[400px]"
                >
                  <img
                    src="/salon-interior.png"
                    alt="MISHKA Salon Interior"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Story content on the right */}
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-serif mb-6 text-gold">
                    {t('aboutUs.storyTitle')}
                  </h3>
                  <div className="space-y-4 text-white/90 text-base md:text-lg leading-relaxed">
                    <p>{t('aboutUs.storyPara1')}</p>
                    <p>{t('aboutUs.storyPara2')}</p>
                    <p>{t('aboutUs.storyPara3')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-serif mb-8 text-white text-center">
            {t('aboutUs.valuesTitle')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="border border-gold/30 bg-gradient-to-br from-black/80 via-black/60 to-black/40 hover:border-gold hover-elevate transition-all h-full shadow-lg hover:shadow-gold/20">
                  <CardContent className="p-8 text-center">
                    <value.icon className="w-16 h-16 mx-auto mb-4 text-gold" />
                    <h4 className="text-xl font-semibold text-white mb-3">{value.title}</h4>
                    <p className="text-white/70">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border-gold/50 bg-gradient-to-r from-gold/10 to-gold/5">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <achievement.icon className="w-12 h-12 mb-3 text-gold" />
                    <p className="text-white text-lg font-semibold">{achievement.text}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
