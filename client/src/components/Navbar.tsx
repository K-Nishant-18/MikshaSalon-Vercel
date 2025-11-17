import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-sm border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold">M</div>
            <div className="flex flex-col leading-tight">
              <span className="text-white text-lg font-serif">MISHKA</span>
              <span className="text-white/70 text-xs -mt-1">Tattoo & Beauty</span>
            </div>
          </a>
        </div>

        {/* Placeholder for nav links (could be expanded) */}
        <nav className="hidden md:flex gap-8 text-white/90">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#gallery" className="hover:text-white">Gallery</a>
          <a href="#booking" className="hover:text-white">Booking</a>
        </nav>

        {/* Language selector on the right (inline) */}
        <div className="flex items-center gap-4">
          <LanguageSelector inline />
        </div>
      </div>
    </header>
  );
}
