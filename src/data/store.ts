// Data store using localStorage

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  previewUrl: string;
  features: string[];
}

export interface Order {
  id: string;
  templateId: string;
  templateName: string;
  email: string;
  txHash: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
  completedAt?: string;
}

export interface Visitor {
  id: string;
  timestamp: string;
  page: string;
  country?: string;
  device?: string;
  referrer?: string;
}

export interface SiteSettings {
  // Hero Section
  heroGreeting: string;
  heroName: string;
  heroTitle: string;
  heroDescription: string;
  profileImage: string;
  profileImageX: number;
  profileImageY: number;
  heroBackground: string;
  heroBackgroundX: number;
  heroBackgroundY: number;
  
  // Social Links
  githubUrl: string;
  linkedinUrl: string;
  telegramUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  
  // Contact Info
  email: string;
  phone: string;
  location: string;
  showPhone: boolean;
  
  // About Section
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  yearsExperience: string;
  templatesSold: string;
  happyClients: string;
  
  // Services
  services: {
    title: string;
    description: string;
    iconType: string;
  }[];
  
  // Skills
  skills: {
    title: string;
    items: string[];
  }[];
  
  // Payment
  walletAddress: string;
  adminPassword: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export interface SiteData {
  settings: SiteSettings;
  templates: Template[];
  portfolio: PortfolioItem[];
  orders: Order[];
  visitors: Visitor[];
}

const USDT_WALLET = 'TQ8599AiSX5DFW8NAmjuE5C6yCC5iWfRED';

const defaultSettings: SiteSettings = {
  // Hero
  heroGreeting: "Hi, I'm",
  heroName: 'Abdulrhman',
  heroTitle: 'IT Engineer & UI/UX Designer',
  heroDescription: 'I design and develop premium website templates, UI kits, and digital solutions. Browse my collection and find the perfect template for your project.',
  profileImage: '/images/profile.jpg',
  profileImageX: 50,
  profileImageY: 50,
  heroBackground: 'https://images.pexels.com/photos/8108683/pexels-photo-8108683.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroBackgroundX: 50,
  heroBackgroundY: 50,
  
  // Social Links
  githubUrl: 'https://github.com/abdoo606',
  linkedinUrl: '',
  telegramUrl: 'https://t.me/Abdulrhman0985',
  instagramUrl: '',
  twitterUrl: '',
  
  // Contact
  email: 'abdulrhmant948@gmail.com',
  phone: '',
  location: 'Saudi Arabia',
  showPhone: false,
  
  // About
  aboutTitle: 'About Me',
  aboutParagraph1: 'I am Abdulrhman, an IT Engineer with expertise in UI/UX Design. I combine technical knowledge with creative design to build exceptional digital products.',
  aboutParagraph2: 'I hold multiple certifications in UI/UX Design and IT. I create premium templates and digital assets that help businesses and individuals launch their online presence quickly.',
  yearsExperience: '3+',
  templatesSold: '50+',
  happyClients: '100+',
  
  // Services
  services: [
    { title: 'UI/UX Design', description: 'Beautiful and intuitive user interfaces designed in Figma and Adobe XD.', iconType: 'layout' },
    { title: 'Web Templates', description: 'Responsive, modern website templates built with latest technologies.', iconType: 'code' },
    { title: 'IT Solutions', description: 'Complete IT infrastructure solutions and technical consulting.', iconType: 'database' },
    { title: 'Custom Development', description: 'Tailored solutions built specifically for your business needs.', iconType: 'smartphone' },
  ],
  
  // Skills
  skills: [
    { title: 'UI/UX Design', items: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'Wireframing', 'User Research'] },
    { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'] },
    { title: 'IT & Tools', items: ['Git', 'Linux', 'Networking', 'Cloud (AWS)', 'Docker', 'Troubleshooting'] },
    { title: 'Soft Skills', items: ['Problem Solving', 'Communication', 'Team Work', 'Project Management'] },
  ],
  
  // Payment
  walletAddress: USDT_WALLET,
  adminPassword: 'abdulrhman2024',
};

const defaultTemplates: Template[] = [
  {
    id: '1',
    name: 'Business Pro',
    description: 'Professional business website template with modern design, perfect for agencies and startups. Includes multiple page layouts, team section, services showcase, and client testimonials. Built with React and Tailwind CSS for maximum performance and easy customization.',
    image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    price: 49,
    previewUrl: '#',
    features: ['Responsive Design', 'Contact Form', 'SEO Optimized', 'Fast Loading', '10+ Pages', 'Team Section', 'Services Page', 'Blog Integration'],
  },
  {
    id: '2',
    name: 'E-Commerce Pro',
    description: 'Full-featured e-commerce template with shopping cart, checkout, and admin dashboard. Includes product filtering, wishlist, user authentication, payment gateway integration (Stripe/PayPal), order tracking, and inventory management system.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'E-Commerce',
    price: 99,
    previewUrl: '#',
    features: ['Shopping Cart', 'Payment Integration', 'Product Management', 'Order Tracking', 'User Auth', 'Wishlist', 'Reviews System', 'Admin Dashboard'],
  },
  {
    id: '3',
    name: 'Portfolio starter',
    description: 'Clean and minimal portfolio template for designers, developers, and creatives. Features smooth animations, project showcase with filtering, about section, skills display, and contact form with email integration.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Portfolio',
    price: 29,
    previewUrl: '#',
    features: ['Project Showcase', 'About Section', 'Contact Form', 'Animations', 'Skills Display', 'Testimonials', 'Blog Ready', 'Dark Mode'],
  },
  {
    id: '4',
    name: 'SaaS Landing Pro',
    description: 'High-converting SaaS landing page template with pricing tables and feature sections. Includes hero section with animations, feature highlights, pricing comparison, FAQ accordion, testimonials carousel, and newsletter signup.',
    image: 'https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Landing Page',
    price: 59,
    previewUrl: '#',
    features: ['Pricing Tables', 'Testimonials', 'FAQ Section', 'CTA Buttons', 'Hero Animations', 'Feature Grid', 'Newsletter', 'Analytics Ready'],
  },
  {
    id: '5',
    name: 'Dashboard UI Kit',
    description: 'Complete admin dashboard UI kit with charts, tables, and data visualization components. Includes 50+ pre-built components, multiple dashboard layouts, user management, analytics pages, and both light/dark themes.',
    image: 'https://images.pexels.com/photos/17279854/pexels-photo-17279854.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Dashboard',
    price: 89,
    previewUrl: '#',
    features: ['50+ Components', 'Charts & Graphs', 'Dark Mode', 'Figma Files', 'User Management', 'Analytics Pages', 'Data Tables', 'Form Elements'],
  },
  {
    id: '6',
    name: 'Restaurant starter',
    description: 'Beautiful restaurant website template with menu, reservations, and gallery. Features online ordering system, table booking, menu with categories, photo gallery, chef profiles, and Google Maps integration.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Restaurant',
    price: 45,
    previewUrl: '#',
    features: ['Menu Display', 'Reservation Form', 'Gallery', 'Location Map', 'Online Ordering', 'Chef Profiles', 'Reviews', 'Events Section'],
  },
  {
    id: '7',
    name: 'Blog starter',
    description: 'Modern blog template with categories, tags, and commenting system. Includes author profiles, search functionality, related posts, social sharing, newsletter subscription, and SEO optimization.',
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Blog',
    price: 35,
    previewUrl: '#',
    features: ['Category System', 'Search Function', 'Author Pages', 'RSS Feed', 'Comments', 'Social Share', 'Newsletter', 'Related Posts'],
  },
  {
    id: '8',
    name: 'Mobile App UI Kit',
    description: 'Complete mobile app UI kit for iOS and Android with 100+ screens. Includes onboarding, authentication, dashboards, profiles, settings, e-commerce, social, and messaging screens with Figma source files.',
    image: 'https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Mobile App',
    price: 99,
    previewUrl: '#',
    features: ['100+ Screens', 'iOS & Android', 'Figma Files', 'Documentation', 'Onboarding', 'E-commerce', 'Social Features', 'Messaging UI'],
  },
  {
    id: '9',
    name: 'Real Estate Pro',
    description: 'Premium real estate website template with property listings, search filters, and agent profiles. Includes map integration, mortgage calculator, virtual tour support, and lead capture forms.',
    image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Real Estate',
    price: 79,
    previewUrl: '#',
    features: ['Property Listings', 'Advanced Search', 'Map Integration', 'Agent Profiles', 'Mortgage Calculator', 'Virtual Tours', 'Lead Forms', 'Favorites'],
  },
  {
    id: '10',
    name: 'Gym & Fitness',
    description: 'Dynamic fitness website template for gyms, personal trainers, and wellness centers. Features class schedules, trainer profiles, membership plans, BMI calculator, and workout programs.',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fitness',
    price: 55,
    previewUrl: '#',
    features: ['Class Schedule', 'Trainer Profiles', 'Membership Plans', 'BMI Calculator', 'Workout Programs', 'Gallery', 'Testimonials', 'Contact Form'],
  },
  {
    id: '11',
    name: 'Medical & Healthcare',
    description: 'Professional healthcare website template for hospitals, clinics, and doctors. Includes appointment booking, department listings, doctor profiles, services showcase, and patient portal.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Healthcare',
    price: 69,
    previewUrl: '#',
    features: ['Appointment Booking', 'Doctor Profiles', 'Departments', 'Services', 'Patient Portal', 'Emergency Info', 'Insurance', 'Blog'],
  },
  {
    id: '12',
    name: 'Education & LMS',
    description: 'Comprehensive learning management system template for online courses. Features course catalog, video lessons, quizzes, certificates, student dashboard, and instructor panel.',
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Education',
    price: 89,
    previewUrl: '#',
    features: ['Course Catalog', 'Video Lessons', 'Quizzes', 'Certificates', 'Student Dashboard', 'Instructor Panel', 'Progress Tracking', 'Reviews'],
  },
  {
    id: '13',
    name: 'Travel & Tourism',
    description: 'Stunning travel website template for agencies and tour operators. Includes destination showcases, tour packages, booking system, travel guides, and customer reviews.',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Travel',
    price: 65,
    previewUrl: '#',
    features: ['Tour Packages', 'Booking System', 'Destinations', 'Travel Guides', 'Reviews', 'Gallery', 'Search Filters', 'Newsletter'],
  },
  {
    id: '14',
    name: 'Hotel & Resort',
    description: 'Luxury hotel website template with room booking, amenities showcase, and virtual tours. Features room types, pricing calendar, special offers, restaurant menu, and event spaces.',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Hospitality',
    price: 75,
    previewUrl: '#',
    features: ['Room Booking', 'Pricing Calendar', 'Virtual Tours', 'Amenities', 'Restaurant', 'Events', 'Special Offers', 'Gallery'],
  },
  {
    id: '15',
    name: 'News & Magazine',
    description: 'Feature-rich news portal template with multiple layouts and categories. Includes breaking news ticker, featured articles, video content, author system, and advertisement placements.',
    image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'News',
    price: 59,
    previewUrl: '#',
    features: ['Multiple Layouts', 'Categories', 'Breaking News', 'Video Content', 'Author System', 'Ad Placements', 'Newsletter', 'Social Feed'],
  },
  {
    id: '16',
    name: 'Agency starter',
    description: 'Creative agency website template with portfolio showcase and service pages. Features case studies, team members, client logos, process timeline, and contact with project estimator.',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Agency',
    price: 49,
    previewUrl: '#',
    features: ['Portfolio', 'Case Studies', 'Team Section', 'Client Logos', 'Services', 'Process Timeline', 'Project Estimator', 'Blog'],
  },
  {
    id: '17',
    name: 'Crypto & NFT',
    description: 'Modern cryptocurrency and NFT marketplace template. Features wallet connection, NFT gallery, live price charts, token information, and trading interface mockups.',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Crypto',
    price: 85,
    previewUrl: '#',
    features: ['NFT Gallery', 'Wallet Connect', 'Price Charts', 'Token Info', 'Trading UI', 'Collections', 'Creator Profiles', 'Auctions'],
  },
  {
    id: '18',
    name: 'Event & Conference',
    description: 'Professional event website template for conferences and meetups. Includes speaker profiles, schedule timeline, ticket booking, sponsors section, and live streaming integration.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Events',
    price: 55,
    previewUrl: '#',
    features: ['Speaker Profiles', 'Schedule', 'Ticket Booking', 'Sponsors', 'Venue Info', 'Live Stream', 'Countdown', 'Gallery'],
  },
  {
    id: '19',
    name: 'Podcast & Audio',
    description: 'Sleek podcast website template with episode player and show notes. Features audio player, episode archive, guest profiles, transcripts, and subscription options.',
    image: 'https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Podcast',
    price: 45,
    previewUrl: '#',
    features: ['Audio Player', 'Episode Archive', 'Show Notes', 'Guest Profiles', 'Transcripts', 'Subscribe Options', 'Newsletter', 'Social Links'],
  },
  {
    id: '20',
    name: 'Photography Pro',
    description: 'Elegant photography portfolio template with fullscreen galleries. Features masonry layouts, lightbox, client proofing, pricing packages, and booking calendar.',
    image: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Photography',
    price: 55,
    previewUrl: '#',
    features: ['Fullscreen Gallery', 'Masonry Layout', 'Lightbox', 'Client Proofing', 'Pricing', 'Booking Calendar', 'About', 'Contact'],
  },
];

const defaultPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-Commerce Website Redesign',
    description: 'Complete redesign of an e-commerce platform with modern UI/UX principles, improving conversion rates by 40%.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'UI/UX Design',
    link: '#',
  },
  {
    id: '2',
    title: 'Corporate IT Infrastructure',
    description: 'Designed and implemented complete IT infrastructure for a 200+ employee company including network, security, and cloud solutions.',
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'IT Solutions',
    link: '#',
  },
  {
    id: '3',
    title: 'Mobile Banking App UI',
    description: 'Designed intuitive mobile banking application interface with focus on accessibility and user experience.',
    image: 'https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'UI/UX Design',
    link: '#',
  },
  {
    id: '4',
    title: 'Restaurant Management System',
    description: 'Full-stack web application for restaurant management including POS, inventory, and staff management.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Web Development',
    link: '#',
  },
];

const defaultData: SiteData = {
  settings: defaultSettings,
  templates: defaultTemplates,
  portfolio: defaultPortfolio,
  orders: [],
  visitors: [],
};

const STORAGE_KEY = 'portfolio_store';
const AUTH_KEY = 'portfolio_admin_auth';
const LANG_KEY = 'portfolio_language';

export function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        ...defaultData,
        ...data,
        settings: { ...defaultSettings, ...data.settings },
      };
    }
  } catch (e) {
    console.error('Error loading site data', e);
  }
  return defaultData;
}

export function saveSiteData(data: SiteData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetSiteData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
}

export function getLanguage(): string {
  return localStorage.getItem(LANG_KEY) || 'en';
}

export function setLanguage(lang: string): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function loginAdmin(password: string): boolean {
  const data = getSiteData();
  if (password === data.settings.adminPassword) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function logoutAdmin(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function addOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): void {
  const data = getSiteData();
  data.orders.push({
    ...order,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  saveSiteData(data);
}

export function updateOrderStatus(orderId: string, status: Order['status']): void {
  const data = getSiteData();
  const order = data.orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    if (status === 'completed') {
      order.completedAt = new Date().toISOString();
    }
    saveSiteData(data);
  }
}

export function trackVisitor(page: string): void {
  const data = getSiteData();
  const visitor: Visitor = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    page,
    device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    referrer: document.referrer || 'Direct',
  };
  data.visitors.push(visitor);
  if (data.visitors.length > 10000) {
    data.visitors = data.visitors.slice(-10000);
  }
  saveSiteData(data);
}

export function getVisitorStats() {
  const data = getSiteData();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const weekAgo = today - 7 * 24 * 60 * 60 * 1000;
  const monthAgo = today - 30 * 24 * 60 * 60 * 1000;

  return {
    total: data.visitors.length,
    today: data.visitors.filter(v => new Date(v.timestamp).getTime() >= today).length,
    week: data.visitors.filter(v => new Date(v.timestamp).getTime() >= weekAgo).length,
    month: data.visitors.filter(v => new Date(v.timestamp).getTime() >= monthAgo).length,
    byDevice: {
      mobile: data.visitors.filter(v => v.device === 'Mobile').length,
      desktop: data.visitors.filter(v => v.device === 'Desktop').length,
    },
    recentVisitors: data.visitors.slice(-50).reverse(),
  };
}

export function getOrderStats() {
  const data = getSiteData();
  return {
    total: data.orders.length,
    pending: data.orders.filter(o => o.status === 'pending').length,
    completed: data.orders.filter(o => o.status === 'completed').length,
    rejected: data.orders.filter(o => o.status === 'rejected').length,
    revenue: data.orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0),
  };
}
