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
  { id: 'cinema' as const, name: 'Cinema', icon: 'film' },
  { id: 'newspaper' as const, name: 'Newspaper', icon: 'newspaper' },
  { id: 'influencers' as const, name: 'Influencers', icon: 'users' },
  { id: 'buses' as const, name: 'Buses', icon: 'bus' },
  { id: 'cabs' as const, name: 'Cabs', icon: 'car' },
  { id: 'auto' as const, name: 'Auto', icon: 'zap' }, // approximation for Auto
  { id: 'metro_trains' as const, name: 'Metro & Trains', icon: 'train' },
  { id: 'digital_tv' as const, name: 'Digital(TV)', icon: 'tv' },
  { id: 'digital_marketing' as const, name: 'Digital Marketing', icon: 'smartphone' },
  { id: 'led_vending' as const, name: 'LED Vending Machine', icon: 'box' },
  { id: 'led_vehicle' as const, name: 'LED Vehicle', icon: 'truck' },
  { id: 'billboards' as const, name: 'Billboards', icon: 'billboard' }, // Kept regular billboards as well if needed, or mapped to something else? User asked for "all these services" from screenshot. Screenshot doesn't confirm if "Billboards" was removed, but let's keep it or move it. The screenshot shows broad categories. Let's append to existing or replace? Screenshot shows specific list. Let's keep 'billboards' and 'radio' as legacy or additional if not strictly forbidden, but standardizing types.
  // Wait, the screenshot starts with Cinema, Newspaper.
  // User said "add all these services".
  // I will keep existing ones that make sense and map 'print' -> 'newspaper' etc where possible.
];

export const adSpaces: AdSpace[] = [
  {
    id: '1',
    title: 'City Center Billboard',
    category: 'billboards',
    location: 'VR Mall, Anna Nagar',
    price: 75000,
    priceUnit: 'week',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Prime location billboard with high visibility',
    reach: '500K+ daily impressions',
    features: ['Prime location', 'LED display', '24/7 visibility', 'High traffic area'],
  },
  {
    id: '2',
    title: 'Highway Billboard',
    category: 'billboards',
    location: 'OMR, Chennai',
    price: 50000,
    priceUnit: 'week',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    description: 'Strategic highway placement for maximum exposure',
    reach: '300K+ daily impressions',
    features: ['Highway visibility', 'Large format', 'Weather resistant'],
  },
  {
    id: '3',
    title: 'The Hindu - Full Page',
    category: 'newspaper',
    location: 'Chennai Edition',
    price: 105000,
    priceUnit: 'day',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    description: 'Full page advertisement in leading newspaper',
    reach: '2M+ readers',
    minSpend: 25000,
    features: ['Premium placement', 'Color print', 'Wide readership'],
  },
  {
    id: '4',
    title: 'Times of India - Half Page',
    category: 'newspaper',
    location: 'All India',
    price: 85000,
    priceUnit: 'day',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=800&q=80',
    description: 'Half page ad in national newspaper',
    reach: '5M+ readers',
    features: ['National coverage', 'Trusted brand', 'High engagement'],
  },
  {
    id: '5',
    title: 'Instagram Sponsored Post',
    category: 'digital_marketing',
    location: 'India',
    price: 45000,
    priceUnit: 'campaign',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    description: 'Targeted Instagram advertising campaign',
    reach: '1M+ targeted reach',
    features: ['Precise targeting', 'Analytics dashboard', 'A/B testing'],
  },
  {
    id: '6',
    title: 'Google Display Network',
    category: 'digital_marketing',
    location: 'Global',
    price: 30000,
    priceUnit: 'campaign',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Display ads across Google network',
    reach: '2M+ impressions',
    features: ['Wide reach', 'Retargeting', 'Performance tracking'],
  },
  {
    id: '7',
    title: 'Radio Mirchi - Prime Time',
    category: 'radio',
    location: 'Chennai',
    price: 25000,
    priceUnit: 'week',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    description: '30-second spots during prime time',
    reach: '800K+ listeners',
    features: ['Prime time slots', 'Professional production', 'Multiple plays'],
  },
  {
    id: '8',
    title: 'PVR Cinemas - Pre-Show',
    category: 'cinema',
    location: 'All PVR Screens',
    price: 150000,
    priceUnit: 'month',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    description: 'Pre-show advertisement across all PVR screens',
    reach: '1.5M+ viewers',
    features: ['Captive audience', 'HD quality', 'Premium environment'],
  },
  {
    id: '9',
    title: 'Tech Influencer Package',
    category: 'influencers',
    location: 'Social Media',
    price: 80000,
    priceUnit: 'campaign',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    description: 'Collaboration with top tech influencers',
    reach: '500K+ engaged followers',
    features: ['Authentic content', 'Story + Post', 'High engagement'],
  },
  {
    id: '10',
    title: 'Lifestyle Influencer Network',
    category: 'influencers',
    location: 'Instagram + YouTube',
    price: 120000,
    priceUnit: 'campaign',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    description: 'Network of lifestyle influencers for brand promotion',
    reach: '2M+ combined reach',
    features: ['Multi-platform', 'Diverse audience', 'Content rights'],
  },
];

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
