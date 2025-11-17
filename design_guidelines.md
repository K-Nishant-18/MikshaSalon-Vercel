# MISHKA Tattoo & Beauty Salon - Design Guidelines

## Design Approach
**Reference-Based Luxury Approach**: Drawing inspiration from high-end beauty brands like Glossier, luxury tattoo studios like Bang Bang NYC, and premium booking platforms like The Black Tux. This combines artistic edge with sophisticated beauty aesthetics.

## Brand Identity & Color Palette

**Primary Colors:**
- Black (#0E0E0E) - Main backgrounds, headers
- Champagne Gold (#D8C18F) - Premium accents, CTAs, borders
- Rose Nude (#F7E8E1) - Beauty section backgrounds, soft elements
- Pure White (#FFFFFF) - Text, cards, clean spaces
- Ink Grey (#444444) - Secondary text

**Visual Treatment:**
- Glassmorphism effects on cards and overlays
- Subtle neon glow on interactive elements
- Gold accent borders and highlights
- Gradient overlays combining black to rose-nude

## Typography System

**Font Families (Google Fonts):**
- Display: Playfair Display (luxury headlines)
- Primary: Inter (clean, modern body text)
- Accent: Montserrat (buttons, labels)

**Hierarchy:**
- Hero Headlines: 72px/56px/40px (desktop/tablet/mobile), Playfair Display Bold
- Section Headers: 48px/36px/28px, Playfair Display Semibold
- Subheadlines: 24px/20px/18px, Inter Medium
- Body Text: 16px/15px/14px, Inter Regular
- Buttons/CTAs: 16px, Montserrat Semibold, uppercase tracking

## Layout System

**Spacing Units:** Tailwind units of 4, 8, 12, 16, 20, 24, 32
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-8 (desktop), gap-4 (mobile)
- Container max-width: max-w-7xl

## Key Components & Sections

### 1. Language Selection Popup
Full-screen overlay on initial load with glassmorphism card center-screen. Two large buttons: "English" and "বাংলা" with gold borders. Smooth fade-out animation on selection. Store preference in localStorage.

### 2. Hero Section (Full Viewport)
**Background:** Cinematic looping video showing:
- Tattoo needle close-up
- Makeup application
- Hair styling motion
- Artist sketching

**Overlay:** Dark gradient (black 40% opacity) for text readability

**Content:** Center-aligned
- Main headline: "Art. Beauty. Identity. Perfected At MISHKA."
- Subheadline with gold underline accent
- Two glass-effect buttons with blur background: "Book Appointment" (gold border) + "Explore Gallery" (white border)
- Floating gold sparkle animations (CSS particles)

### 3. MISHKA Experience Section
Split-screen layout with animated reveal:
- Left: Dark moody tattoo studio image
- Right: Bright, soft beauty salon image
- Center text overlay with glassmorphism background
- Parallax scroll effect

### 4. Tattoo Services Section
Dark background (#0E0E0E) with gold accents

**Service Grid:** 4 columns (desktop), 2 (tablet), 1 (mobile)
- Glass cards with subtle neon glow hover
- Each card: Icon (gold) + Title + Brief description
- Services: Fine Line, Mandala, Realism, Cover-ups, Brush/Ink, Color, Custom Designs
- Hygiene badge at bottom: Gold-bordered box with checkmarks

**Artist Spotlight:** Magazine-style photo layout with fade-in on scroll

### 5. Beauty Salon Section
Rose-nude background (#F7E8E1) with soft golden wave patterns

**Service Cards:** Glassmorphism style, 3 columns
- Soft shadows, rounded corners
- Icons in champagne gold
- Services: Hair, Color/Keratin, HD Makeup, Nails, Skin, Lashes
- Hover: Gentle lift effect

### 6. Gallery Section
**Layout:** Masonry grid (Pinterest-style)
- 4 columns (desktop), 2 (tablet), 1 (mobile)
- Filter tabs at top: All / Tattoos / Makeup / Nails / Hair (gold active state)
- Hover: Image zoom + overlay with view icon
- Lightbox: Full-screen overlay with prev/next navigation, close button
- Scroll-triggered staggered fade-in

**Scrolling Tattoo Wall:** Horizontal auto-scroll strip of tattoos beneath main gallery

### 7. Pricing Section
Tabbed interface with smooth transitions
- Two tabs: "Tattoos" and "Beauty Services" (gold active underline)
- Pricing cards: 4 columns with glassmorphism
- Each card: Service name + Price + Features list + "Book Now" button
- Soft glow effect on hover

### 8. Hygiene & Safety
Icon grid (5 columns) with animated checkmarks
- Icons: Needle, Autoclave, Ink bottle, Patch test, Dermat badge
- Short descriptive text beneath each
- Optional: Embedded hygiene process video

### 9. Testimonial Carousel
Auto-rotating cards (5s intervals) with manual controls
- Card design: Client photo (circular) + Quote + Name + Rating stars (gold)
- 3 visible cards (desktop), 1 (mobile)
- Smooth slide transitions

### 10. Smart Booking Section
Two-column layout:
- Left: Multi-step form with glassmorphism
  - Step 1: Service type (Tattoo/Beauty)
  - Step 2: Specific service dropdown
  - Step 3: Date/time picker (calendar UI)
  - Step 4: Image upload for tattoo reference (drag-drop zone)
  - Submit button (gold)
- Right: Contact info card + Google Maps embed

**Floating WhatsApp Button:** Fixed bottom-right, gold circle with pulse animation

## Animation Guidelines

**Scroll Triggers:**
- Fade-in + slight upward movement for section entries
- Parallax on hero and experience sections
- Staggered reveal for gallery items

**Hover Effects:**
- Gentle lift (transform: translateY(-8px))
- Glow intensification on neon elements
- Smooth 0.3s transitions

**Page Load:**
- Language popup: Fade-in 0.5s
- Hero content: Staggered fade-in (headline → subline → buttons)
- No excessive motion; keep elegant and smooth

## Bilingual Implementation
Toggle in navigation (small flag icons or text switcher)
- All text content duplicated in English/Bangla
- Language preference persists across sessions
- Smooth content swap without page reload

## Images Required
1. **Hero Video:** 1920x1080, 20-30s loop, cinematically lit salon footage
2. **Experience Split:** Two 1200x800 images (tattoo studio + beauty salon)
3. **Gallery:** 30+ high-quality images across categories
4. **Artist Spotlight:** Professional portrait, 800x1000
5. **Testimonial Photos:** Client headshots, 200x200 circular

## Accessibility
- ARIA labels for language switcher, carousel controls, image galleries
- Keyboard navigation for all interactive elements
- Alt text for all images
- Sufficient color contrast (gold on black passes WCAG AA)