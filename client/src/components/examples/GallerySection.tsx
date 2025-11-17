import GallerySection from '../GallerySection';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function GallerySectionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <GallerySection />
    </I18nextProvider>
  );
}
