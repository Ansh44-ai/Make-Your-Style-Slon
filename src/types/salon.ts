export type ServiceCategory = 'all' | 'cut-style' | 'colour' | 'treatments' | 'texture-bridal';

export interface SalonService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  pricePlaceholder: string;
  duration: string;
  image: string;
  highlights: string[];
  recommendedFor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location?: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  avatarInitial: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'styling' | 'transformation' | 'colour' | 'interior';
  image: string;
  caption: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
}

export interface BookingFormState {
  customerName: string;
  phoneNumber: string;
  email: string;
  selectedService: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  stylistPreference?: string;
}

export interface SalonContactInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  instagram: string;
  facebook: string;
  mapQuery: string;
}
