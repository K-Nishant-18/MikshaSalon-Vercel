import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { apiRequest } from "@/lib/queryClient";
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BookingSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [serviceType, setServiceType] = useState('');
  const [subService, setSubService] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
        toast({
          title: "Image uploaded",
          description: acceptedFiles[0].name
        });
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dateValue = (document.getElementById('date') as HTMLInputElement)?.value;

      const bookingData = {
        customerName: (document.getElementById('name') as HTMLInputElement)?.value,
        customerPhone: (document.getElementById('phone') as HTMLInputElement)?.value,
        serviceName: serviceType === 'beauty' ?
          (subService ? `${t('beauty.' + subService)}` : 'Beauty Service') :
          'Tattoo Session',
        serviceCategory: serviceType,
        bookingDate: dateValue ? new Date(dateValue).toISOString() : new Date().toISOString(),
        notes: message,
        status: 'pending'
      };

      await apiRequest('POST', '/api/admin/bookings', bookingData);

      toast({
        title: "Booking Submitted!",
        description: "We'll contact you soon to confirm your appointment."
      });

      // Reset form
      setServiceType('');
      setSubService('');
      setMessage('');
      setUploadedFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Booking failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit booking. Please try again."
      });
    }
  };

  return (
    <section
      id="booking"
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-background to-black"
      data-testid="section-booking"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-black" data-testid="text-booking-title">
            {t('booking.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect border-gold/30">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="service-type">{t('booking.serviceType')}</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger id="service-type" data-testid="select-service-type">
                        <SelectValue placeholder={t('booking.selectService')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tattoo">{t('booking.tattoo')}</SelectItem>
                        <SelectItem value="beauty">{t('booking.beauty')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {serviceType === 'beauty' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="sub-service">{t('booking.selectService')}</Label>
                      <Select value={subService} onValueChange={setSubService}>
                        <SelectTrigger id="sub-service" data-testid="select-sub-service">
                          <SelectValue placeholder={t('booking.selectService')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hair">{t('beauty.hair')}</SelectItem>
                          <SelectItem value="color">{t('beauty.color')}</SelectItem>
                          <SelectItem value="makeup">{t('beauty.makeup')}</SelectItem>
                          <SelectItem value="nails">{t('beauty.nails')}</SelectItem>
                          <SelectItem value="skin">{t('beauty.skin')}</SelectItem>
                          <SelectItem value="lashes">{t('beauty.lashes')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}

                  <div>
                    <Label htmlFor="name">{t('booking.name')}</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t('booking.phoneLabel')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">{t('booking.selectDate')}</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      required
                      data-testid="input-date"
                    />
                  </div>

                  {serviceType === 'tattoo' && (
                    <div>
                      <Label>{t('booking.uploadRef')}</Label>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed border-gold/50 rounded-lg p-8 text-center cursor-pointer hover:border-gold transition-colors ${isDragActive ? 'bg-gold/10' : ''
                          }`}
                        data-testid="dropzone-upload"
                      >
                        <input {...getInputProps()} />
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gold" />
                        <p className="text-white/80">
                          {uploadedFile ? uploadedFile.name : t('booking.uploadDesc')}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message">Special Requests / Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific requests or questions?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold text-black hover:bg-gold/80 h-12 text-lg"
                    data-testid="button-submit-booking"
                  >
                    {t('booking.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-effect border-gold/30 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{t('booking.contact')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">{t('booking.address') ? t('booking.contact') : 'Address'}</p>
                    <p className="text-white/80">{t('booking.address')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-white/80">{t('booking.phoneNumber')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-white/80">info@mishka.salon</p>
                  </div>
                </div>

                <div className="aspect-video bg-muted rounded-lg overflow-hidden mt-6">
                  <iframe
                    src="https://www.google.com/maps?q=BLOCK%20B%2C%20Near%20Mollargate%20Kashturi%20Das%20Hospital%2C%20MAHESHTALA%2C%20Santoshpur%20Maheshtala-700142&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
