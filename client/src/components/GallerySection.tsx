import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ZoomIn } from 'lucide-react';
import fineTattoo from '@assets/generated_images/Fine_line_floral_tattoo_8fac8d05.png';
import realisticTattoo from '@assets/generated_images/Realistic_portrait_tattoo_e0ef5c7c.png';
import mandalaTattoo from '@assets/generated_images/Geometric_mandala_tattoo_9743e2e7.png';
import bridalMakeup from '@assets/generated_images/Bridal_makeup_look_ca619aa1.png';
import nailArt from '@assets/generated_images/Gold_chrome_nail_art_9ff7c3a0.png';
import hairStyling from '@assets/generated_images/Professional_hair_styling_cba7fdbf.png';

type Category = 'all' | 'tattoos' | 'makeup' | 'nails' | 'hair';

export default function GallerySection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [
    { key: 'all' as Category, label: t('gallery.all') },
    { key: 'tattoos' as Category, label: t('gallery.tattoos') },
    { key: 'makeup' as Category, label: t('gallery.makeup') },
    { key: 'nails' as Category, label: t('gallery.nails') },
    { key: 'hair' as Category, label: t('gallery.hair') }
  ];

  const images = [
    { src: fineTattoo, category: 'tattoos', alt: 'Fine Line Tattoo' },
    { src: realisticTattoo, category: 'tattoos', alt: 'Realistic Portrait Tattoo' },
    { src: mandalaTattoo, category: 'tattoos', alt: 'Mandala Tattoo' },
    { src: bridalMakeup, category: 'makeup', alt: 'Bridal Makeup' },
    { src: nailArt, category: 'nails', alt: 'Nail Art' },
    { src: hairStyling, category: 'hair', alt: 'Hair Styling' }
  ];

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 px-4"
      data-testid="section-gallery"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-8" data-testid="text-gallery-title">
            {t('gallery.title')}
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <Button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                className={activeCategory === cat.key ? 'bg-gold text-black' : 'border-gold text-gold hover:bg-gold hover:text-black'}
                data-testid={`button-filter-${cat.key}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4]"
              onClick={() => setLightboxImage(img.src)}
              data-testid={`gallery-item-${index}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox"
        >
          <img
            src={lightboxImage}
            alt="Gallery lightbox"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  );
}
