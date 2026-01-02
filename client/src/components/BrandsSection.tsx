import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandsSection() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Brand logos from public folder
    const brands = [
        {
            name: 'Brand 1',
            logo: '/brand1.png',
            alt: 'Brand 1 Logo'
        },
        {
            name: 'Brand 2',
            logo: '/brand2.png',
            alt: 'Brand 2 Logo'
        },
        {
            name: 'Brand 3',
            logo: '/brand6.png',
            alt: 'Brand 3 Logo'
        },
        {
            name: 'Brand 4',
            logo: '/brand4.png',
            alt: 'Brand 4 Logo'
        },
        {
            name: 'Brand 5',
            logo: '/brand3.png',
            alt: 'Brand 5 Logo'
        }
    ];

    return (
        <section
            ref={ref}
            className="py-20 px-4 bg-white relative overflow-hidden"
            data-testid="section-brands"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-serif mb-4 text-black" data-testid="text-brands-title">
                        Premium Brands We Use
                    </h2>
                    <p className="text-xl text-gray-600">
                        Only the finest products for exceptional results
                    </p>
                </motion.div>

                {/* Brands Grid - 5 brands displayed */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative bg-white border-2 border-gray-200 rounded-xl p-8 hover:bg-white hover:border-gold hover:shadow-xl transition-all duration-300 hover:scale-105 transform h-full flex items-center justify-center">
                                {/* Brand Logo - Replace with actual logo images */}
                                <div className="w-full h-24 flex items-center justify-center">
                                    <img
                                        src={brand.logo}
                                        alt={brand.alt}
                                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                        onError={(e) => {
                                            // Fallback to text if image fails to load
                                            const target = e.currentTarget as HTMLElement;
                                            const fallback = target.nextElementSibling as HTMLElement;
                                            if (target && fallback) {
                                                target.style.display = 'none';
                                                fallback.style.display = 'block';
                                            }
                                        }}
                                    />
                                    {/* Fallback text (hidden by default, shown if image fails) */}
                                    <div className="hidden text-center">
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gold transition-colors duration-300">
                                            {brand.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="inline-block bg-gold/10 border-2 border-gold rounded-full px-8 py-4">
                        <p className="text-gold font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            100% Authentic & Certified Products
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
