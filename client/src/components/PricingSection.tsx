import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const tattooPrices = [
    { name: t('pricing.minimal'), price: '₹799' },
    { name: t('pricing.small'), price: '₹1,499' },
    { name: t('pricing.medium'), price: '₹2,499' },
    { name: t('pricing.customQuote'), price: 'Quote' }
  ];

  const beautyPrices = [
    { name: t('pricing.haircut'), price: '₹299' },
    { name: t('pricing.facial'), price: '₹699' },
    { name: t('pricing.hdMakeup'), price: '₹2,999' },
    { name: t('pricing.bridalMakeup'), price: '₹6,999' }
  ];

  const handleBookClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="py-20 px-4"
      data-testid="section-pricing"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4" data-testid="text-pricing-title">
            {t('pricing.title')}
          </h2>
        </motion.div>

        <Tabs defaultValue="tattoo" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="tattoo" data-testid="tab-tattoo-pricing">
              {t('pricing.tattooTab')}
            </TabsTrigger>
            <TabsTrigger value="beauty" data-testid="tab-beauty-pricing">
              {t('pricing.beautyTab')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tattoo">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tattooPrices.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gold/30 hover:border-gold hover-elevate active-elevate-2 transition-all h-full">
                    <CardHeader>
                      <CardTitle className="text-center text-2xl">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-4xl font-bold text-gold mb-6">{item.price}</p>
                      <Button
                        onClick={handleBookClick}
                        className="w-full bg-gold text-black hover:bg-gold/80"
                        data-testid={`button-book-${item.name}`}
                      >
                        {t('pricing.bookNow')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beauty">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {beautyPrices.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gold/30 hover:border-gold hover-elevate active-elevate-2 transition-all h-full">
                    <CardHeader>
                      <CardTitle className="text-center text-2xl">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-4xl font-bold text-gold mb-6">{item.price}</p>
                      <Button
                        onClick={handleBookClick}
                        className="w-full bg-gold text-black hover:bg-gold/80"
                        data-testid={`button-book-${item.name}`}
                      >
                        {t('pricing.bookNow')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
