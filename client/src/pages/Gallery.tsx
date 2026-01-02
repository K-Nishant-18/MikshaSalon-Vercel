import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ZoomIn, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

type Category = 'all' | 'hair' | 'mehndi' | 'makeup' | 'nails' | 'tattoos';

export default function Gallery() {
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
        <div className="min-h-screen bg-gradient-to-b from-black via-background to-black">
            <Navbar />

            <main className="pt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <a href="/">
                            <Button
                                variant="outline"
                                className="border-gold text-gold hover:bg-gold hover:text-black"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </a>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif mb-4 text-white">
                            {t('gallery.title')}
                        </h1>
                        <p className="text-xl text-gold mb-8">
                            Explore our complete collection
                        </p>

                        {/* Category Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map(cat => (
                                <Button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    variant={activeCategory === cat.key ? 'default' : 'outline'}
                                    className={activeCategory === cat.key ? 'bg-gold text-black' : 'border-gold text-gold hover:bg-gold hover:text-black'}
                                >
                                    {cat.label}
                                </Button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredImages.map((img, index) => (
                            <motion.div
                                key={img.src}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4]"
                                onClick={() => setLightboxImage(img.src)}
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

                    {/* Show count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-8 text-white/70"
                    >
                        Showing {filteredImages.length} {activeCategory === 'all' ? 'images' : `${activeCategory} images`}
                    </motion.div>
                </div>
            </main>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <img
                        src={lightboxImage}
                        alt="Gallery lightbox"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
}
