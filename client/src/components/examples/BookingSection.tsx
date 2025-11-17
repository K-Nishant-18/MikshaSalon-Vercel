import BookingSection from '../BookingSection';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function BookingSectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="bg-black">
        <BookingSection />
      </div>
    </I18nextProvider>
  );
}
