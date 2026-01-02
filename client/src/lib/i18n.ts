import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      hero: {
        title: "Art. Beauty. Identity.",
        subtitle: "Perfected At MISHKA",
        description: "Under One Roof Beauty Salon Premium Haircut | Beauty | Grooming | Hair Extension & Tattoo Services in Kolkata",
        bookButton: "Book Appointment",
        galleryButton: "Explore Gallery"
      },
      experience: {
        title: "The MISHKA Experience",
        description: "At MISHKA Tattoo & Beauty Salon, we blend artistic mastery with beauty expertise. A space where creativity meets confidence."
      },
      aboutUs: {
        title: "About Us",
        subtitle: "Where Art Meets Beauty",
        storyTitle: "Our Story",
        storyPara1: "MISHKA Tattoo & Beauty Salon was born from a passion for artistic expression and beauty. Founded in Maheshtala, we create a space where creativity thrives and every client leaves empowered.",
        storyPara2: "Our vision was simple: blend tattoo artistry with premium beauty services under one roof. Today, we're more than a salon—we're a community celebrating self-expression and redefining beauty on your terms.",
        storyPara3: "With certified artists and beauty experts, we combine experience with cutting-edge techniques. From intricate tattoos to stunning makeovers, every service reflects our commitment to excellence.",
        valuesTitle: "Our Values",
        value1Title: "Passion & Artistry",
        value1Desc: "Every stroke, every look is crafted with passion and precision by our talented team of artists.",
        value2Title: "Excellence & Safety",
        value2Desc: "We maintain the highest standards of hygiene and use only premium, certified products.",
        value3Title: "Community & Trust",
        value3Desc: "Building lasting relationships with our clients through transparency, care, and exceptional service.",
        achievement1: "5+ Years of Excellence",
        achievement2: "1000+ Happy Clients",
        achievement3: "Certified Artists & Experts"
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
        address: "BLOCK B, Near Mollargate Kashturi Das Hospital, MAHESHTALA, Santoshpur Maheshtala-700142",
        phoneNumber: "+91 7947141455",
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
        description: "এক ছাদের নিচে সৌন্দর্য সেলুন প্রিমিয়াম হেয়ারকাট|সৌন্দর্য|গ্রুমিং|হেয়ার এক্সটেনশন ও ট্যাটু সেবা কলকাতায়",
        bookButton: "অ্যাপয়েন্টমেন্ট বুক করুন",
        galleryButton: "গ্যালারি দেখুন"
      },
      experience: {
        title: "মিশকা অভিজ্ঞতা",
        description: "মিশকা ট্যাটু ও বিউটি সেলুনে, আমরা শিল্পকলা এবং সৌন্দর্য দক্ষতার সমন্বয় করি। একটি স্থান যেখানে সৃজনশীলতা আত্মবিশ্বাসের সাথে মিলিত হয়।"
      },
      aboutUs: {
        title: "আমাদের সম্পর্কে",
        subtitle: "যেখানে শিল্প সৌন্দর্যের সাথে মিলিত",
        storyTitle: "আমাদের গল্প",
        storyPara1: "মিশকা ট্যাটু ও বিউটি সেলুন শিল্পকলা ও সৌন্দর্যের প্রতি আবেগ থেকে জন্মেছে। মহেশতলায় প্রতিষ্ঠিত, আমরা এমন স্থান তৈরি করি যেখানে সৃজনশীলতা বিকশিত হয় এবং প্রতিটি ক্লায়েন্ট ক্ষমতাপ্রাপ্ত হয়ে যায়।",
        storyPara2: "আমাদের দৃষ্টিভঙ্গি সহজ ছিল: একই ছাদের নীচে ট্যাটু শিল্প ও প্রিমিয়াম সৌন্দর্য সেবার সমন্বয়। আজ, আমরা শুধু সেলুনের চেয়ে বেশি—একটি সম্প্রদায় যা আত্ম-প্রকাশ উদযাপন করে এবং আপনার শর্তে সৌন্দর্য পুনর্নির্ধারণ করে।",
        storyPara3: "সার্টিফাইড শিল্পী ও বিশেষজ্ঞদের সাথে, আমরা অভিজ্ঞতা ও আধুনিক কৌশল একত্রিত করি। জটিল ট্যাটু থেকে চমৎকার মেকওভার পর্যন্ত, প্রতিটি সেবা আমাদের শ্রেষ্ঠত্বের প্রতিশ্রুতি প্রতিফলিত করে।",
        valuesTitle: "আমাদের মূল্যবোধ",
        value1Title: "আবেগ ও শিল্পকলা",
        value1Desc: "প্রতিটি আঁচড়, প্রতিটি চেহারা আমাদের প্রতিভাবান শিল্পীদের দ্বারা আবেগ এবং নিখুঁততার সাথে তৈরি।",
        value2Title: "শ্রেষ্ঠত্ব ও নিরাপত্তা",
        value2Desc: "আমরা স্বাস্থ্যবিধির সর্বোচ্চ মান বজায় রাখি এবং শুধুমাত্র প্রিমিয়াম, সার্টিফাইড পণ্য ব্যবহার করি।",
        value3Title: "সম্প্রদায় ও বিশ্বাস",
        value3Desc: "স্বচ্ছতা, যত্ন এবং ব্যতিক্রমী সেবার মাধ্যমে আমাদের ক্লায়েন্টদের সাথে দীর্ঘস্থায়ী সম্পর্ক গড়ে তোলা।",
        achievement1: "৫+ বছরের শ্রেষ্ঠত্ব",
        achievement2: "১০০০+ সন্তুষ্ট গ্রাহক",
        achievement3: "সার্টিফাইড শিল্পী ও বিশেষজ্ঞ"
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
        address: "ব্লক বি, মোলারগেট নিকট কাশতুরি দাস হাসপাতাল, মহেশতলা, সন্তোষপুর মহেশতলা-৭০০১৪২",
        phoneNumber: "+৯১ ৭৯৪৭১৪১৪৫৫",
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
