import { SalonService, ReviewItem, GalleryItem, FeatureItem, SalonContactInfo } from '../types/salon';

export const INITIAL_SALON_CONTACT: SalonContactInfo = {
  name: "Make Your Style Salon",
  tagline: "Your Hair, Your Style, Your Identity",
  address: "Suite 402, High Street Boulevard, Fashion & Beauty Arcade, New Delhi, 110001",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210", // Clean digits for WhatsApp link
  email: "concierge@makeyourstylesalon.com",
  hoursWeekday: "Monday – Saturday: 9:00 AM – 8:00 PM",
  hoursWeekend: "Sunday: 10:00 AM – 6:00 PM",
  instagram: "https://instagram.com/makeyourstylesalon",
  facebook: "https://facebook.com/makeyourstylesalon",
  mapQuery: "High+Street+Boulevard+Salon+New+Delhi"
};

export const SALON_SERVICES: SalonService[] = [
  {
    id: "haircut-styling",
    name: "Haircut & Styling",
    category: "cut-style",
    description: "Bespoke precision haircuts sculpted to your unique facial contours, hair density, and lifestyle, finished with our signature blowout.",
    pricePlaceholder: "Starting from $45 / ₹1,800",
    duration: "45 - 60 mins",
    image: "/images/service-haircut.jpg",
    highlights: ["Detailed face-shape consultation", "Detox scalp cleanse included", "Custom thermal styling"],
    recommendedFor: "All hair lengths & textures seeking effortless elegance and structure."
  },
  {
    id: "hair-spa",
    name: "Hair Spa",
    category: "treatments",
    description: "An indulgent multi-stage sensory relaxation ritual with deep-nourishing botanical masks, steam therapy, and an acupressure scalp massage.",
    pricePlaceholder: "Starting from $55 / ₹2,200",
    duration: "60 - 75 mins",
    image: "/images/service-spa.jpg",
    highlights: ["Steam hydration chamber", "Stress-relief shoulder & head massage", "Shine infusion serum"],
    recommendedFor: "Dry, stressed, or pollution-exposed hair needing deep moisture."
  },
  {
    id: "hair-smoothening",
    name: "Hair Smoothening",
    category: "texture-bridal",
    description: "Gentle realignment formula that tames stubborn frizz, controls volume, and leaves tresses silky, touchable, and naturally manageable.",
    pricePlaceholder: "Starting from $95 / ₹4,500",
    duration: "120 - 150 mins",
    image: "/images/service-smoothening.jpg",
    highlights: ["Frizz protection for up to 4 months", "Natural movement preserved", "Formaldehyde-free options"],
    recommendedFor: "Unruly, frizzy, and wavy hair seeking soft, silky discipline."
  },
  {
    id: "hair-straightening",
    name: "Hair Straightening",
    category: "texture-bridal",
    description: "High-definition thermal rebonding and permanent straightening delivering pin-straight, ultra-glossy, liquid-glass shine.",
    pricePlaceholder: "Starting from $110 / ₹5,500",
    duration: "150 - 180 mins",
    image: "/images/service-straightening.jpg",
    highlights: ["Ultra-sleek mirror gloss", "Long-lasting permanent realignment", "Neutralizing bond protectant"],
    recommendedFor: "Coarse or curly hair desiring permanent sleek pin-straight strands."
  },
  {
    id: "hair-colouring",
    name: "Hair Colouring",
    category: "colour",
    description: "Rich, multi-dimensional hair coloring with ammonia-free conditioning pigments, root touch-ups, or total dramatic color transformations.",
    pricePlaceholder: "Starting from $70 / ₹3,000",
    duration: "90 - 120 mins",
    image: "/images/service-colouring.jpg",
    highlights: ["Color lock bond builder", "Zero-ammonia gentle formulas", "Custom tone matching"],
    recommendedFor: "Grey coverage, rich tone revitalization, or vibrant fashion statements."
  },
  {
    id: "hair-highlights",
    name: "Hair Highlights",
    category: "colour",
    description: "Sun-kissed hand-painted balayage, subtle babylights, and face-framing foils designed to create seamless dimension and luminous contrast.",
    pricePlaceholder: "Starting from $85 / ₹3,800",
    duration: "120 - 180 mins",
    image: "/images/service-highlights.jpg",
    highlights: ["Freehand balayage artistry", "Bespoke gloss & toner glaze", "Anti-brass tone calibration"],
    recommendedFor: "Anyone wanting dimensional depth, sunlit radiance, and softness."
  },
  {
    id: "keratin-treatment",
    name: "Keratin Treatment",
    category: "treatments",
    description: "Deep restorative protein treatment that rebuilds fractured hair shafts, infuses hydrolysed keratin, and seals moisture with radiant gloss.",
    pricePlaceholder: "Starting from $120 / ₹6,000",
    duration: "120 - 160 mins",
    image: "/images/service-keratin.jpg",
    highlights: ["Intensive keratin peptide infusion", "Up to 5 months humidity resistance", "Cuts blow-dry time by 50%"],
    recommendedFor: "Chemically treated, porous, or severely heat-damaged hair."
  },
  {
    id: "hair-wash-blowdry",
    name: "Hair Wash & Blow Dry",
    category: "cut-style",
    description: "Invigorating cleansing ritual followed by an expert thermal blowout tailored for red-carpet volume, sleek silk, or beachy glamorous waves.",
    pricePlaceholder: "Starting from $35 / ₹1,200",
    duration: "35 - 45 mins",
    image: "/images/service-blowdry.jpg",
    highlights: ["Aromatic botanical scalp shampoo", "Volume root lift techniques", "Long-lasting finish hold"],
    recommendedFor: "Pre-event glam, weekly maintenance, or instant confidence boost."
  },
  {
    id: "bridal-hairstyling",
    name: "Bridal & Special Occasion Hairstyling",
    category: "texture-bridal",
    description: "Artisanal couture bridal hair artistry, romantic textured buns, regal braid crowns, and bespoke veil or floral accessory placements.",
    pricePlaceholder: "Starting from $130 / ₹7,500",
    duration: "90 - 120 mins",
    image: "/images/service-bridal.jpg",
    highlights: ["Pre-wedding trial consultation", "Hair extensions & ornament styling", "All-day event durability spray"],
    recommendedFor: "Brides, bridesmaids, galas, and landmark celebrations."
  },
  {
    id: "hair-treatment-care",
    name: "Hair Treatment & Care",
    category: "treatments",
    description: "Targeted clinical scalp and fiber therapies including anti-dandruff detox, bond builders (Olaplex/K18), and intensive anti-hair-fall ampoules.",
    pricePlaceholder: "Starting from $65 / ₹2,800",
    duration: "50 - 70 mins",
    image: "/images/service-treatment.jpg",
    highlights: ["Micro-follicle scalp analysis", "Bio-peptide molecular repair", "Custom home-care maintenance plan"],
    recommendedFor: "Thinning hair, sensitive scalps, and post-bleach recovery."
  }
];

export const SALON_FEATURES: FeatureItem[] = [
  {
    title: "Professional Hair Stylists",
    description: "Our certified master stylists bring years of international salon experience, precision cutting artistry, and continuous education in modern trends.",
    iconName: "Scissors"
  },
  {
    title: "Premium Hair Care Products",
    description: "We exclusively curate top-tier, ammonia-free, and dermatologically tested luxury salon formulations that respect your hair’s natural cuticle integrity.",
    iconName: "Sparkles"
  },
  {
    title: "Modern Styling Techniques",
    description: "From precision French balayage to molecular keratin peptide bonding, we deploy forward-thinking methodologies for long-lasting, healthy beauty.",
    iconName: "Flame"
  },
  {
    title: "Hygienic Environment",
    description: "Immaculate salon sanctuary with hospital-grade sanitization, sterile single-use tools, sterilized brushes, and private consultation stations.",
    iconName: "ShieldCheck"
  },
  {
    title: "Personalized Customer Experience",
    description: "Every visit begins with a 1-on-1 consultation assessing hair texture, face symmetry, and lifestyle before a single scissor touches your hair.",
    iconName: "HeartHandshake"
  },
  {
    title: "Friendly Staff",
    description: "Warm, gracious, and attentive hospitality from our reception to your styling chair, with complimentary artisanal teas and gourmet coffees.",
    iconName: "Smile"
  }
];

export const SALON_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Sun-Kissed Balayage & Soft Waves",
    category: "colour",
    image: "/images/service-highlights.jpg",
    caption: "Seamless golden honey transition on natural dark base with voluminous loose waves."
  },
  {
    id: "gal-2",
    title: "Couture Bridal Low Chignon",
    category: "styling",
    image: "/images/service-bridal.jpg",
    caption: "Textured bridal styling with handcrafted gold leaf hairpin accessories."
  },
  {
    id: "gal-3",
    title: "Precision Textured Bob & Gloss",
    category: "styling",
    image: "/images/service-haircut.jpg",
    caption: "Sculpted Italian bob with interior layering and high-shine conditioning finish."
  },
  {
    id: "gal-4",
    title: "Deep Gloss Keratin Transformation",
    category: "transformation",
    image: "/images/service-smoothening.jpg",
    caption: "Frizz-free liquid mirror finish restoring luster to heat-stressed hair."
  },
  {
    id: "gal-5",
    title: "Rich Chocolate Caramel Dimension",
    category: "colour",
    image: "/images/service-colouring.jpg",
    caption: "Deep multi-tonal brunette balayage with warm cinnamon ribbons."
  },
  {
    id: "gal-6",
    title: "The Make Your Style Sanctuary",
    category: "interior",
    image: "/images/hero-salon.jpg",
    caption: "Minimalist travertine architecture, ambient brass lighting, and private styling suites."
  },
  {
    id: "gal-7",
    title: "Spa Relaxation & Scalp Ritual",
    category: "interior",
    image: "/images/service-spa.jpg",
    caption: "Reclining ergonomic wash station with botanical mist therapy and warm towel wrap."
  },
  {
    id: "gal-8",
    title: "Ultra Sleek Rebonding Finish",
    category: "transformation",
    image: "/images/service-straightening.jpg",
    caption: "Silky, feather-light pin-straight hair with zero frizz in high humidity."
  }
];

export const TESTIMONIALS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Ananya Sharma",
    location: "South Delhi",
    service: "Balayage Highlights & Hair Spa",
    rating: 5,
    date: "October 2026",
    comment: "Make Your Style Salon completely redefined my look. The stylist took the time to study my undertones and crafted the softest golden balayage I've ever had. The salon's quiet luxury atmosphere is truly unmatched.",
    avatarInitial: "A"
  },
  {
    id: "rev-2",
    author: "Rohit Malhotra",
    location: "Gurugram",
    service: "Precision Haircut & Scalp Detox",
    rating: 5,
    date: "September 2026",
    comment: "The precision in their haircut technique is extraordinary. No rushing, immaculate hygiene, and the complimentary head massage during wash was pure bliss. My hair has never felt so manageable.",
    avatarInitial: "R"
  },
  {
    id: "rev-3",
    author: "Meera Sen",
    location: "Chanakyapuri",
    service: "Keratin Treatment & Gloss",
    rating: 5,
    date: "October 2026",
    comment: "I used to spend 45 minutes blow-drying my frizzy hair every morning. After their keratin ritual, my hair dries smooth and glossy in 10 minutes. Worth every single penny!",
    avatarInitial: "M"
  },
  {
    id: "rev-4",
    author: "Pooja Verma",
    location: "Vasant Kunj",
    service: "Bridal Styling Trial",
    rating: 5,
    date: "August 2026",
    comment: "Booked my bridal trial and fell in love with their artistry. The team listened to what I envisioned and created a timeless textured updo that stayed intact for over 12 hours. Incredible hospitality.",
    avatarInitial: "P"
  }
];

export const TIME_SLOTS = [
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
  "06:30 PM",
  "07:15 PM"
];

export const STYLIST_OPTIONS = [
  "Any Senior Stylist",
  "Master Stylist Vikram (Creative Director)",
  "Senior Stylist Priya (Color Specialist)",
  "Senior Stylist Aarav (Precision Cuts & Texture)",
  "Bridal Specialist Ritu (Couture Hair & Updos)"
];
