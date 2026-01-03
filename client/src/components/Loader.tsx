import { useEffect, useState } from 'react';

export default function Loader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide loader after content loads
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black loader-fade-out">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />

            {/* Loader content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Animated logo */}
                <div className="loader-pulse">
                    <img
                        src="/logo2.png"
                        alt="MISHKA"
                        className="w-48 h-24 object-cover"
                    />
                </div>

                {/* Brand name with animation */}
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-5xl font-serif text-white tracking-widest loader-slide-up">
                        MISHKA
                    </h1>
                    <p className="text-gold/70 text-sm tracking-[0.3em] loader-slide-up-delay">
                        TATTOO & BEAUTY
                    </p>
                </div>

                {/* Animated loading bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold via-yellow-300 to-gold loader-bar"></div>
                </div>

                {/* Spinning ring */}
                <div className="loader-ring">
                    <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
