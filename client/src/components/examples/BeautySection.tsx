import BeautySection from '../BeautySection';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function BeautySectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <BeautySection />
    </I18nextProvider>
  );
}
