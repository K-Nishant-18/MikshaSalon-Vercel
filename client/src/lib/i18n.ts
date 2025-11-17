import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hero: {
        title: "Art. Beauty. Identity.",
        subtitle: "Perfected At MISHKA",
        description: "Tattoos that speak. Beauty that shines.",
        bookButton: "Book Appointment",
        galleryButton: "Explore Gallery"
      },
      experience: {
        title: "The MISHKA Experience",
        description: "At MISHKA Tattoo & Beauty Salon, we blend artistic mastery with beauty expertise. A space where creativity meets confidence."
      },
      tattoo: {
        title: "Tattoo Artistry",
        subtitle: "Express Your Story",
        fineLine: "Fine Line",
        mandala: "Mandala",
        realism: "Realism Portraits",
        coverup: "Cover-ups",
        brush: "Brush/Ink Art",
        color: "Color Tattoos",
        custom: "Custom Designs",
        hygiene: "100% Hygiene Guarantee",
        hygieneDesc: "Single-use needles • Premium inks • Certified artists"
      },
      beauty: {
        title: "Beauty Services",
        subtitle: "Look Good • Feel Good • Own Your Glow",
        hair: "Hair Cutting & Styling",
        color: "Hair Color & Keratin",
        makeup: "HD Makeup",
        nails: "Nail Extensions",
        skin: "Skin Treatments",
        lashes: "Eyelash Extensions"
      },
      gallery: {
        title: "Our Gallery",
        all: "All",
        tattoos: "Tattoos",
        makeup: "Makeup",
        nails: "Nails",
        hair: "Hair"
      },
      pricing: {
        title: "Pricing",
        tattooTab: "Tattoos",
        beautyTab: "Beauty Services",
        minimal: "Minimal",
        small: "Small",
        medium: "Medium",
        customQuote: "Custom - Quote",
        haircut: "Haircut",
        facial: "Facial",
        hdMakeup: "HD Makeup",
        bridalMakeup: "Bridal Makeup",
        bookNow: "Book Now"
      },
      hygiene: {
        title: "Hygiene & Safety",
        needles: "Single-use needles",
        autoclave: "Autoclave sterilization",
        inks: "Premium imported inks",
        patch: "Patch test available",
        dermat: "Dermat-safe products"
      },
      testimonials: {
        title: "What Our Clients Say",
        review1: "Best tattoo experience of my life! The artist was professional and the studio was incredibly clean.",
        review2: "Makeup was flawless and long-lasting. Perfect for my wedding day!",
        review3: "Amazing hair styling service. I always leave feeling confident and beautiful.",
        client1: "Priya Sharma",
        client2: "Raj Patel",
        client3: "Ananya Das"
      },
      booking: {
        title: "Book Your Appointment",
        serviceType: "Service Type",
        tattoo: "Tattoo",
        beauty: "Beauty Service",
        selectService: "Select Service",
        selectDate: "Select Date & Time",
        uploadRef: "Upload Reference Image",
        uploadDesc: "Drag & drop or click to upload tattoo reference",
        name: "Your Name",
        phoneLabel: "Phone Number",
        submit: "Book Appointment",
        contact: "Contact Us",
        address: "123 Park Street, Kolkata",
        phoneNumber: "+91 98765 43210",
        email: "info@mishka.salon"
      },
      whatsapp: "Chat on WhatsApp",
      footer: {
        copyright: "© 2025 MISHKA Tattoo & Beauty Salon. All rights reserved."
      }
    }
  },
  bn: {
    translation: {
      hero: {
        title: "শিল্প। সৌন্দর্য। পরিচয়।",
        subtitle: "মিশকায় নিখুঁত",
        description: "ট্যাটু যা কথা বলে। সৌন্দর্য যা উজ্জ্বল।",
        bookButton: "অ্যাপয়েন্টমেন্ট বুক করুন",
        galleryButton: "গ্যালারি দেখুন"
      },
      experience: {
        title: "মিশকা অভিজ্ঞতা",
        description: "মিশকা ট্যাটু ও বিউটি সেলুনে, আমরা শিল্পকলা এবং সৌন্দর্য দক্ষতার সমন্বয় করি। একটি স্থান যেখানে সৃজনশীলতা আত্মবিশ্বাসের সাথে মিলিত হয়।"
      },
      tattoo: {
        title: "ট্যাটু শিল্প",
        subtitle: "আপনার গল্প প্রকাশ করুন",
        fineLine: "ফাইন লাইন",
        mandala: "মন্ডল",
        realism: "বাস্তববাদী প্রতিকৃতি",
        coverup: "কভার-আপ",
        brush: "ব্রাশ/ইঙ্ক আর্ট",
        color: "রঙিন ট্যাটু",
        custom: "কাস্টম ডিজাইন",
        hygiene: "১০০% স্বাস্থ্যবিধি নিশ্চয়তা",
        hygieneDesc: "একবার ব্যবহারযোগ্য সূঁচ • প্রিমিয়াম কালি • সার্টিফাইড শিল্পী"
      },
      beauty: {
        title: "সৌন্দর্য সেবা",
        subtitle: "সুন্দর দেখুন • ভালো অনুভব করুন • আপনার উজ্জ্বলতা প্রকাশ করুন",
        hair: "চুল কাটা ও স্টাইলিং",
        color: "চুলের রঙ ও কেরাটিন",
        makeup: "এইচডি মেকআপ",
        nails: "নেইল এক্সটেনশন",
        skin: "ত্বকের চিকিৎসা",
        lashes: "আইল্যাশ এক্সটেনশন"
      },
      gallery: {
        title: "আমাদের গ্যালারি",
        all: "সব",
        tattoos: "ট্যাটু",
        makeup: "মেকআপ",
        nails: "নখ",
        hair: "চুল"
      },
      pricing: {
        title: "মূল্য তালিকা",
        tattooTab: "ট্যাটু",
        beautyTab: "সৌন্দর্য সেবা",
        minimal: "ন্যূনতম",
        small: "ছোট",
        medium: "মাঝারি",
        customQuote: "কাস্টম - উদ্ধৃতি",
        haircut: "চুল কাটা",
        facial: "ফেসিয়াল",
        hdMakeup: "এইচডি মেকআপ",
        bridalMakeup: "ব্রাইডাল মেকআপ",
        bookNow: "এখনই বুক করুন"
      },
      hygiene: {
        title: "স্বাস্থ্যবিধি ও নিরাপত্তা",
        needles: "একবার ব্যবহারযোগ্য সূঁচ",
        autoclave: "অটোক্লেভ জীবাণুমুক্তকরণ",
        inks: "প্রিমিয়াম আমদানিকৃত কালি",
        patch: "প্যাচ পরীক্ষা উপলব্ধ",
        dermat: "ডার্মাট-নিরাপদ পণ্য"
      },
      testimonials: {
        title: "আমাদের ক্লায়েন্টরা যা বলেন",
        review1: "আমার জীবনের সেরা ট্যাটু অভিজ্ঞতা! শিল্পী পেশাদার এবং স্টুডিও অবিশ্বাস্যভাবে পরিচ্ছন্ন ছিল।",
        review2: "মেকআপ ত্রুটিহীন এবং দীর্ঘস্থায়ী ছিল। আমার বিয়ের দিনের জন্য নিখুঁত!",
        review3: "আশ্চর্যজনক চুল স্টাইলিং সেবা। আমি সবসময় আত্মবিশ্বাসী এবং সুন্দর অনুভব করে চলে যাই।",
        client1: "প্রিয়া শর্মা",
        client2: "রাজ প্যাটেল",
        client3: "অনন্যা দাস"
      },
      booking: {
        title: "আপনার অ্যাপয়েন্টমেন্ট বুক করুন",
        serviceType: "সেবার ধরন",
        tattoo: "ট্যাটু",
        beauty: "সৌন্দর্য সেবা",
        selectService: "সেবা নির্বাচন করুন",
        selectDate: "তারিখ ও সময় নির্বাচন করুন",
        uploadRef: "রেফারেন্স ছবি আপলোড করুন",
        uploadDesc: "ড্র্যাগ করুন এবং ছেড়ে দিন অথবা ট্যাটু রেফারেন্স আপলোড করতে ক্লিক করুন",
        name: "আপনার নাম",
        phoneLabel: "ফোন নম্বর",
        submit: "অ্যাপয়েন্টমেন্ট বুক করুন",
        contact: "যোগাযোগ করুন",
        address: "১২৩ পার্ক স্ট্রিট, কলকাতা",
        phoneNumber: "+৯১ ৯৮৭৬৫ ৪৩২১০",
        email: "info@mishka.salon"
      },
      whatsapp: "হোয়াটসঅ্যাপে চ্যাট করুন",
      footer: {
        copyright: "© ২০২৫ মিশকা ট্যাটু ও বিউটি সেলুন। সমস্ত অধিকার সংরক্ষিত।"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
