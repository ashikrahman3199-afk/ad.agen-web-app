export type AdCategory = 'cinema' | 'newspaper' | 'influencers' | 'buses' | 'cabs' | 'auto' | 'metro_trains' | 'digital_tv' | 'digital_marketing' | 'led_vending' | 'led_vehicle' | 'billboards' | 'radio';

export interface AdSpace {
  id: string;
  title: string;
  category: AdCategory;
  location: string;
  price: number;
  priceUnit: 'week' | 'month' | 'day' | 'campaign';
  rating: number;
  image: string;
  description: string;
  reach: string;
  minSpend?: number;
  features: string[];
}

export const categories = [
  { id: 'buses' as const, name: 'Buses', icon: 'bus' },
  { id: 'cabs' as const, name: 'Cabs', icon: 'car' },
  { id: 'auto' as const, name: 'Auto', icon: 'navigation' },
  { id: 'metro_trains' as const, name: 'Metro & Trains', icon: 'train' },
  { id: 'digital_tv' as const, name: 'Digital(TV)', icon: 'tv' },
  { id: 'digital_marketing' as const, name: 'Digital Marketing', icon: 'smartphone' },
  { id: 'led_vending' as const, name: 'LED Vending Machine', icon: 'box' },
  { id: 'led_vehicle' as const, name: 'LED Vehicle', icon: 'truck' },
];

export const adSpaces: AdSpace[] = [];

export const campaignObjectives = [
  { id: 'brand-awareness', name: 'Brand Awareness', icon: 'megaphone' },
  { id: 'sales', name: 'Sales', icon: 'shopping-cart' },
  { id: 'lead-generation', name: 'Lead Generation', icon: 'users' },
  { id: 'engagement', name: 'Engagement', icon: 'heart' },
];

export const designStyles = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple design with focus on content',
    icon: 'minimize-2'
  },
  {
    id: 'bold-vibrant',
    name: 'Bold & Vibrant',
    description: 'Eye-catching colors and dynamic elements',
    icon: 'zap'
  },
  {
    id: 'photo-centric',
    name: 'Photo-centric',
    description: 'Design focused on high-quality imagery',
    icon: 'camera'
  },
  {
    id: 'custom',
    name: 'Custom Design',
    description: 'Work with our designers for a unique look',
    icon: 'edit'
  },
];
