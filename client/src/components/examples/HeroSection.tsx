import HeroSection from '../HeroSection';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function HeroSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <HeroSection />
    </I18nextProvider>
  );
}
