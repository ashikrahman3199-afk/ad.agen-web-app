export interface CategoryField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  options?: string[]; // For select types
  placeholder?: string;
}

export interface CategoryMetadata {
  id: string;
  fields: CategoryField[];
  services: string[];
}

export const categoryFieldsMap: Record<string, CategoryMetadata> = {
  billboards: {
    id: 'billboards',
    fields: [
      { name: 'size', label: 'Size', type: 'text', placeholder: 'e.g., 40x20 ft' },
      { name: 'impression', label: 'Impression', type: 'number', placeholder: 'e.g., 500000' },
      { name: 'lighting', label: 'Lighting', type: 'text', placeholder: 'e.g., Front-lit' },
      { name: 'location', label: 'Location Details', type: 'text', placeholder: 'e.g., Highway facing' },
    ],
    services: ['Hoarding', 'Printing & mounting'],
  },
  led_billboards: {
    id: 'led_billboards',
    fields: [
      { name: 'size', label: 'Size', type: 'text', placeholder: 'e.g., 40x20 ft' },
      { name: 'location', label: 'Location Details', type: 'text', placeholder: 'e.g., Highway facing' },
    ],
    services: ['Hoardings'],
  },
  radio: {
    id: 'radio',
    fields: [
      { name: 'primeTime', label: 'Prime Time', type: 'text', placeholder: 'e.g., 8AM - 11AM' },
      { name: 'frequency', label: 'Frequency', type: 'text', placeholder: 'e.g., 98.3 FM' },
      { name: 'topRjShows', label: 'Top RJ Shows', type: 'text', placeholder: 'e.g., Morning Drive' },
      { name: 'language', label: 'Language', type: 'text', placeholder: 'e.g., Tamil, English' },
    ],
    services: ['Jingle', 'RJ mention contest', 'sponsorship tags'],
  },
  cinema: {
    id: 'cinema',
    fields: [
      { name: 'venue', label: 'Venue', type: 'text', placeholder: 'e.g., PVR Anna Nagar' },
      { name: 'seats', label: 'Seats', type: 'number', placeholder: 'e.g., 250' },
      { name: 'screen', label: 'Screen', type: 'text', placeholder: 'e.g., Screen 1' },
      { name: 'chainOfCinema', label: 'Chain of Cinema', type: 'text', placeholder: 'e.g., PVR' },
    ],
    services: ['Slide AD', 'Video AD'],
  },
  newspaper: {
    id: 'newspaper',
    fields: [
      { name: 'language', label: 'Language', type: 'text', placeholder: 'e.g., English' },
      { name: 'areaCovered', label: 'Area Covered', type: 'text', placeholder: 'e.g., Chennai City' },
      { name: 'circulation', label: 'Circulation', type: 'number', placeholder: 'e.g., 100000' },
      { name: 'readership', label: 'Readership', type: 'number', placeholder: 'e.g., 300000' },
      { name: 'printDay', label: 'Print Day', type: 'text', placeholder: 'e.g., Daily' },
      { name: 'newspaperType', label: 'Newspaper Type', type: 'text', placeholder: 'e.g., Broadsheet' },
      { name: 'categories', label: 'Categories', type: 'text', placeholder: 'e.g., General News' },
    ],
    services: [
      'Full page', 'Half page', 'Quarter page', 'Custom sized ads', 
      'Jacket front side', 'Jacket back side', 'Jacket both sides', 
      'innovative ads', 'Pointer ads', 'skyballs', 'Display classified ads', 
      'advertorial', 'obituary ads', 'public notice'
    ],
  },
  influencers: {
    id: 'influencers',
    fields: [
      { name: 'gender', label: 'Gender', type: 'select', options: ['Any', 'Male', 'Female', 'Other'] },
      { name: 'avgLikes', label: 'Avg Likes', type: 'number', placeholder: 'e.g., 5000' },
      { name: 'avgViews', label: 'Avg Views', type: 'number', placeholder: 'e.g., 20000' },
      { name: 'avgComment', label: 'Avg Comments', type: 'number', placeholder: 'e.g., 300' },
      { name: 'username', label: 'Username/Handle', type: 'text', placeholder: 'e.g., @chennai_foodie' },
      { name: 'categories', label: 'Categories', type: 'text', placeholder: 'e.g., Food, Travel' },
      { name: 'followers', label: 'Followers', type: 'number', placeholder: 'e.g., 150000' },
      { name: 'platform', label: 'Platform', type: 'text', placeholder: 'e.g., Instagram' },
    ],
    services: ['Instagram reel', 'post', 'story', 'podcast', 'video', 'shorts'],
  },
  buses: {
    id: 'buses',
    fields: [
      { name: 'operator', label: 'Operator', type: 'text', placeholder: 'e.g., MTC' },
      { name: 'name', label: 'Name', type: 'text', placeholder: 'e.g., AC Volvo' },
      { name: 'routes', label: 'Routes', type: 'text', placeholder: 'e.g., 21G, 570' },
      { name: 'distancePerDay', label: 'Distance/Day (km)', type: 'number', placeholder: 'e.g., 150' },
      { name: 'dailyViewers', label: 'Daily Viewers', type: 'number', placeholder: 'e.g., 5000' },
      { name: 'fleets', label: 'Fleets', type: 'number', placeholder: 'e.g., 10' },
    ],
    services: ['Full bus exterior', 'Swing', 'Interior pamplets', 'Monitoring'],
  },
  cabs: {
    id: 'cabs',
    fields: [
      { name: 'fleets', label: 'Fleets', type: 'number', placeholder: 'e.g., 50' },
      { name: 'categories', label: 'Categories', type: 'text', placeholder: 'e.g., Mini, Sedan' },
      { name: 'avgDistancePerDay', label: 'Avg Distance/Day (km)', type: 'number', placeholder: 'e.g., 200' },
    ],
    services: ['Full cab', 'door branding', 'seat back'],
  },
  auto: {
    id: 'auto',
    fields: [
      { name: 'fleets', label: 'Fleets', type: 'number', placeholder: 'e.g., 100' },
      { name: 'categories', label: 'Categories', type: 'text', placeholder: 'e.g., Share Auto' },
      { name: 'avgDistancePerDay', label: 'Avg Distance/Day (km)', type: 'number', placeholder: 'e.g., 100' },
    ],
    services: ['Auto houd', 'Auto back panel', 'Monitoring'],
  },
  metro_trains: {
    id: 'metro_trains',
    fields: [
      { name: 'ridershipCount', label: 'Ridership Count', type: 'number', placeholder: 'e.g., 100000' },
      { name: 'routeLength', label: 'Route Length (km)', type: 'number', placeholder: 'e.g., 45' },
      { name: 'categories', label: 'Categories', type: 'text', placeholder: 'e.g., Blue Line' },
    ],
    services: [
      'Interior train branding (Metro)', 'Interior train branding (Local)', 
      'Exterior train branding (Metro)', 'Exterior train branding (Local)', 
      'Full train branding (Metro)', 'Full train branding (Local)', 
      'Metro pillars', 'Metro stations', 'Digital screens', 
      'Promotional spcae', 'Back lit'
    ],
  },
  tv: {
    id: 'tv', // Represents Digital(TV)
    fields: [
      { name: 'monthlyReach', label: 'Monthly Reach', type: 'number', placeholder: 'e.g., 1000000' },
      { name: 'language', label: 'Language', type: 'text', placeholder: 'e.g., Tamil' },
      { name: 'primeTime', label: 'Prime Time', type: 'text', placeholder: 'e.g., 7PM - 10PM' },
      { name: 'categories', label: 'Categories', type: 'text', placeholder: 'e.g., News, Entertainment' },
    ],
    services: ['Video ads'],
  },
  digital_marketing: {
    id: 'digital_marketing',
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'e.g., AdVantage' },
      { name: 'servicesProvided', label: 'Services', type: 'text', placeholder: 'e.g., SEO, SEM' },
    ],
    services: ['packages'],
  },
};
