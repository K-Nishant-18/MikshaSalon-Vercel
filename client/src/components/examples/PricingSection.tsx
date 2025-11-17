import PricingSection from '../PricingSection';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function PricingSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <PricingSection />
    </I18nextProvider>
  );
}
