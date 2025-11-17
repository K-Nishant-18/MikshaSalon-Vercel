import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import client1 from '@assets/generated_images/Client_testimonial_woman_4e279d36.png';
import client2 from '@assets/generated_images/Client_testimonial_man_e0835a47.png';

export default function TestimonialSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: t('testimonials.client1'),
      review: t('testimonials.review1'),
      image: client1,
      rating: 5
    },
    {
      name: t('testimonials.client2'),
      review: t('testimonials.review2'),
      image: client2,
      rating: 5
    },
    {
      name: t('testimonials.client3'),
      review: t('testimonials.review3'),
      image: client1,
      rating: 5
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      ref={ref}
      className="py-20 px-4"
      data-testid="section-testimonials"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4" data-testid="text-testimonials-title">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <div className="relative">
          <Card className="glass-effect border-gold/30">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-6 border-2 border-gold">
                  <AvatarImage src={testimonials[activeIndex].image} />
                  <AvatarFallback>{testimonials[activeIndex].name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-lg md:text-xl mb-6 italic">
                  "{testimonials[activeIndex].review}"
                </p>

                <p className="text-gold font-semibold text-lg">
                  {testimonials[activeIndex].name}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="border-gold hover:bg-gold hover:text-black"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="border-gold hover:bg-gold hover:text-black"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
