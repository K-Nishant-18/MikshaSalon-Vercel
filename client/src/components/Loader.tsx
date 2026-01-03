import { useEffect, useState } from 'react';

export default function Loader() {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Smooth increment - faster at start, slower near end
                const increment = prev < 60 ? 8 : prev < 80 ? 4 : prev < 95 ? 2 : 1;
                return Math.min(prev + increment, 100);
            });
        }, 80);

        // Hide loader after progress completes
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2800);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
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

                {/* Loading bar with percentage */}
                <div className="w-80 px-4">
                    {/* Progress bar container */}
                    <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-lg">
                        {/* Animated fill bar with gradient and glow */}
                        <div
                            className="h-full bg-gradient-to-r from-gold via-yellow-300 to-gold transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-animation"></div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 shadow-[0_0_20px_rgba(255,215,0,0.6)]"></div>
                        </div>
                    </div>

                    {/* Percentage text */}
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-gold/40 text-xs font-mono">Loading...</p>
                        <p className="text-gold text-sm font-mono font-bold">
                            {progress}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
