import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

type LanguageSelectorProps = {
  /** When true the toggle button will be rendered inline (no fixed positioning) so it can live inside a navbar */
  inline?: boolean;
  className?: string;
};

export default function LanguageSelector({ inline = false, className = 'border border-gold text-white' }: LanguageSelectorProps) {
  const [showPopup, setShowPopup] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('languageSelected');
    if (!hasSelectedLanguage) {
      setShowPopup(true);
    }
  }, []);

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    localStorage.setItem('languageSelected', 'true');
    setShowPopup(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            data-testid="language-popup"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="glass-effect border border-gold rounded-lg p-12 max-w-md w-full text-center"
            >
              <Globe className="w-16 h-16 mx-auto mb-6 text-gold" />
              <h2 className="text-3xl font-serif mb-4 text-white">
                Choose Your Language
              </h2>
              <p className="text-white/80 mb-8">
                আপনার ভাষা নির্বাচন করুন
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => selectLanguage('en')}
                  variant="outline"
                  className="flex-1 h-14 text-lg border-gold hover:bg-gold hover:text-black"
                  data-testid="button-language-en"
                >
                  English
                </Button>
                <Button
                  onClick={() => selectLanguage('bn')}
                  variant="outline"
                  className="flex-1 h-14 text-lg border-gold hover:bg-gold hover:text-black"
                  data-testid="button-language-bn"
                >
                  বাংলা
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleLanguage}
        variant="ghost"
        size="icon"
        className={inline ? `z-40 ${className}` : `fixed top-4 right-4 z-40 ${className}`}
        data-testid="button-toggle-language"
      >
        <Globe className="w-5 h-5" />
      </Button>
    </>
  );
}
