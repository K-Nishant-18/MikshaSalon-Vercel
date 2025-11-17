import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Updated WhatsApp phone number to match displayed contact (+91 7947141455)
  const phoneNumber = "918986412823";
  const message = "Hello! I'd like to book an appointment at MISHKA.";

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll logic — hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // scrolling down → hide
      } else {
        setVisible(true); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`
        fixed bottom-6 right-5 z-50 transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {/* Tooltip */}
      <div className="absolute -top-12  right-0  text-white text-s px-3 py-1 rounded-lg shadow-md opacity-80">
        Chat Now
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        className="
          w-16 h-16 rounded-full bg-green-600 text-white shadow-xl 
          flex items-center justify-center relative cursor-pointer
          hover:bg-green-700 transition-all
          animate-float
        "
      >
        <MessageCircle className="w-8 h-8" />

        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full border-4 border-green-600 animate-pulse-slow opacity-40"></span>
      </button>
    </div>
  );
}
