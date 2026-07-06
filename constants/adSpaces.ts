export type AdCategory = 'billboards' | 'led_billboards' | 'newspaper' | 'digital' | 'radio' | 'cinema' | 'influencers' | 'buses' | 'cabs' | 'auto' | 'metro_trains' | 'tv' | 'digital_marketing' | 'led_vending' | 'led_vehicle';

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
  available: boolean;
}

export const categories = [
  { id: 'billboards' as const, name: 'Billboards', icon: 'billboard' },
  { id: 'led_billboards' as const, name: 'LED Billboards', icon: 'led_billboard' },
  { id: 'newspaper' as const, name: 'Newspaper', icon: 'newspaper' },
  { id: 'digital' as const, name: 'Digital', icon: 'monitor' },
  { id: 'radio' as const, name: 'Radio', icon: 'radio' },
  { id: 'cinema' as const, name: 'Cinema', icon: 'film' },
  { id: 'influencers' as const, name: 'Influencers', icon: 'users' },
  { id: 'buses' as const, name: 'Buses', icon: 'bus' },
  { id: 'cabs' as const, name: 'Cabs', icon: 'car' },
  { id: 'auto' as const, name: 'Auto', icon: 'navigation' },
  { id: 'metro_trains' as const, name: 'Metro & Trains', icon: 'train' },
  { id: 'tv' as const, name: 'TV', icon: 'tv' },
  { id: 'digital_marketing' as const, name: 'Digital Marketing', icon: 'smartphone' },
  { id: 'led_vending' as const, name: 'LED Vending Machine', icon: 'box' },
  { id: 'led_vehicle' as const, name: 'LED Vehicle', icon: 'truck' },
];

export const adSpaces: AdSpace[] = [
  {
    id: '1',
    title: 'Prime Billboard - Adyar Signal',
    category: 'billboards',
    location: 'Adyar',
    price: 75000,
    priceUnit: 'month',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1562613531-a1e13337c667?w=800&q=80',
    description: 'A massive, high-visibility billboard located right at the bustling Adyar signal. Guarantees massive exposure to daily commuters heading towards OMR and Besant Nagar. Perfect for brand awareness campaigns targeting IT professionals and residents.',
    reach: '500,000+ daily impressions',
    features: ['24/7 Illumination', 'High Dwell Time', 'Prime Intersection', 'Clear Sightlines'],
    available: true,
  },
  {
    id: '2',
    title: 'Metro Station Digital Display',
    category: 'metro_trains',
    location: 'Anna Nagar',
    price: 50000,
    priceUnit: 'month',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    description: 'Strategically placed high-definition digital displays along the ticketing and waiting areas of Anna Nagar Metro Station. Capture the attention of thousands of daily commuters with dynamic video content.',
    reach: '200,000+ daily commuters',
    features: ['4K Digital Display', 'Video Support', 'Captive Audience', 'High Frequency'],
    available: true,
  },
  {
    id: '3',
    title: 'T. Nagar Bus Stand Hoarding',
    category: 'billboards',
    location: 'T. Nagar',
    price: 105000,
    priceUnit: 'month',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    description: 'Located in the heart of Chennai’s busiest shopping district, this mega hoarding provides unparalleled visibility to shoppers, pedestrians, and vehicular traffic passing through the T. Nagar bus terminus area.',
    reach: '800,000+ daily impressions',
    features: ['Massive Size', 'Retail Shopper Demographic', 'High Pedestrian Traffic'],
    available: true,
  },
  {
    id: '4',
    title: 'Phoenix Marketcity Screen',
    category: 'digital',
    location: 'Velachery',
    price: 45000,
    priceUnit: 'week',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80',
    description: 'Premium indoor digital advertising screens located at key choke points within Phoenix Marketcity mall. Target affluent shoppers in a relaxed, high-intent mindset.',
    reach: '150,000+ weekend footfall',
    features: ['Premium Demographic', 'High Engagement', 'Dynamic Content'],
    available: true,
  },
  {
    id: '5',
    title: 'PVR Cinemas Pre-Show Ad',
    category: 'cinema',
    location: 'Anna Nagar',
    price: 60000,
    priceUnit: 'campaign',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    description: 'Feature your brand on the big screen right before blockbuster movies. Guaranteed unskippable attention from a captive, relaxed audience.',
    reach: '30,000+ weekly viewers',
    features: ['Captive Audience', 'High Recall Rate', '10-Second Spot', 'Audio Support'],
    available: false,
  },
  {
    id: '6',
    title: 'Airport Premium Lounge Display',
    category: 'digital',
    location: 'Guindy',
    price: 90000,
    priceUnit: 'month',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80',
    description: 'Target C-suite executives, business travelers, and affluent individuals inside the premium domestic departure lounges of Chennai International Airport.',
    reach: '50,000+ premium travelers',
    features: ['HNI Audience', 'High Dwell Time', 'B2B Targeting'],
    available: true,
  },
  {
    id: '7',
    title: 'OMR IT Park Kiosk',
    category: 'led_vending',
    location: 'OMR',
    price: 30000,
    priceUnit: 'month',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    description: 'Interactive digital vending machine screens located in the cafeterias and lobbies of major IT Parks along the Old Mahabalipuram Road (OMR).',
    reach: '80,000+ tech professionals',
    features: ['Interactive Touch', 'Tech Demographic', 'Direct Conversion'],
    available: true,
  },
  {
    id: '8',
    title: 'City Bus Wrap - Route 21G',
    category: 'buses',
    location: 'Broadway to Tambaram',
    price: 85000,
    priceUnit: 'month',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
    description: 'Full bus wrap advertising on one of Chennai\'s longest and busiest routes. This mobile billboard takes your brand message across multiple neighborhoods daily.',
    reach: '300,000+ daily street views',
    features: ['Moving Billboard', 'City-wide Coverage', 'High Eye-level Visibility'],
    available: true,
  },
  {
    id: '9',
    title: 'Radio City 91.1 FM Prime Time',
    category: 'radio',
    location: 'Chennai Region',
    price: 25000,
    priceUnit: 'week',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
    description: '30-second audio spots during the high-traffic morning and evening drive-time shows. Connect with commuters through local RJ endorsements.',
    reach: '1.2 Million+ daily listeners',
    features: ['Drive-time Slot', 'Audio Branding', 'RJ Mentions'],
    available: true,
  },
  {
    id: '10',
    title: 'Tech Influencer Campaign',
    category: 'influencers',
    location: 'Digital/Pan-India',
    price: 150000,
    priceUnit: 'campaign',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    description: 'Partner with top tier tech and lifestyle influencers on Instagram and YouTube for dedicated product unboxings, reviews, and shoutouts.',
    reach: '2.5 Million+ follower base',
    features: ['High Trust', 'Targeted Niche', 'Content Creation Included'],
    available: true,
  }
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
