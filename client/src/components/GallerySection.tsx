import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ZoomIn } from 'lucide-react';

type Category = 'all' | 'hair' | 'mehndi' | 'makeup' | 'nails' | 'tattoos';

export default function GallerySection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [
    { key: 'all' as Category, label: t('gallery.all') },
    { key: 'hair' as Category, label: t('gallery.hair') },
    { key: 'mehndi' as Category, label: 'Mehndi' },
    { key: 'makeup' as Category, label: t('gallery.makeup') },
    { key: 'nails' as Category, label: t('gallery.nails') },
    { key: 'tattoos' as Category, label: t('gallery.tattoos') }
  ];

  const images = [
    { src: '/gallery/hair1.png', category: 'hair', alt: 'Hair Styling' },
    { src: '/gallery/hair2.jpg', category: 'hair', alt: 'Professional Hair Design' },
    { src: '/gallery/mehndi1.png', category: 'mehndi', alt: 'Mehndi Design' },
    { src: '/gallery/mehndi2.png', category: 'mehndi', alt: 'Henna Art' },
    { src: '/gallery/bridal_1.jpg', category: 'makeup', alt: 'Bridal Makeup' },
    { src: '/gallery/makup1.png', category: 'makeup', alt: 'Professional Makeup' },
    { src: '/gallery/makup2.png', category: 'makeup', alt: 'HD Makeup' },
    { src: '/gallery/tejaswinimakeupartist.com_34_Image.png', category: 'makeup', alt: 'Makeup Artistry' },
    { src: '/gallery/nails_1.jpg', category: 'nails', alt: 'Nail Art' },
    { src: '/gallery/tattoo1.png', category: 'tattoos', alt: 'Tattoo Design' },
    { src: '/gallery/tattoo3.jpg', category: 'tattoos', alt: 'Tattoo Art' }
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
          {filteredImages.slice(0, 9).map((img, index) => (
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

        {/* View Full Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center mt-12"
        >
          <a href="/gallery">
            <Button
              size="lg"
              className="bg-gold/10 border-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 px-8 py-6 text-lg"
            >
              View Full Gallery
            </Button>
          </a>
        </motion.div>
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
