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
  profileImagePosition: string;
  heroBackground: string;
  heroBackgroundPosition: string;
  
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

export interface SiteData {
  settings: SiteSettings;
  templates: Template[];
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
  profileImagePosition: 'center',
  heroBackground: 'https://images.pexels.com/photos/8108683/pexels-photo-8108683.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroBackgroundPosition: 'center',
  
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
    description: 'Professional business website template with modern design, perfect for agencies and startups.',
    image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    price: 49,
    previewUrl: '#',
    features: ['Responsive Design', 'Contact Form', 'SEO Optimized', 'Fast Loading'],
  },
  {
    id: '2',
    name: 'E-Commerce Starter',
    description: 'Full-featured e-commerce template with shopping cart, checkout, and admin dashboard.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'E-Commerce',
    price: 79,
    previewUrl: '#',
    features: ['Shopping Cart', 'Payment Integration', 'Product Management', 'Order Tracking'],
  },
  {
    id: '3',
    name: 'Portfolio starter',
    description: 'Clean and minimal portfolio template for designers, developers, and creatives.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Portfolio',
    price: 29,
    previewUrl: '#',
    features: ['Project Showcase', 'About Section', 'Contact Form', 'Animations'],
  },
  {
    id: '4',
    name: 'SaaS Landing',
    description: 'High-converting SaaS landing page template with pricing tables and feature sections.',
    image: 'https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Landing Page',
    price: 39,
    previewUrl: '#',
    features: ['Pricing Tables', 'Testimonials', 'FAQ Section', 'CTA Buttons'],
  },
  {
    id: '5',
    name: 'Dashboard UI Kit',
    description: 'Complete admin dashboard UI kit with charts, tables, and data visualization components.',
    image: 'https://images.pexels.com/photos/17279854/pexels-photo-17279854.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Dashboard',
    price: 89,
    previewUrl: '#',
    features: ['50+ Components', 'Charts & Graphs', 'Dark Mode', 'Figma Files'],
  },
  {
    id: '6',
    name: 'Restaurant starter',
    description: 'Beautiful restaurant website template with menu, reservations, and gallery.',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Restaurant',
    price: 45,
    previewUrl: '#',
    features: ['Menu Display', 'Reservation Form', 'Gallery', 'Location Map'],
  },
  {
    id: '7',
    name: 'Blog starter',
    description: 'Modern blog template with categories, tags, and commenting system.',
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Blog',
    price: 35,
    previewUrl: '#',
    features: ['Category System', 'Search Function', 'Author Pages', 'RSS Feed'],
  },
  {
    id: '8',
    name: 'Mobile App UI',
    description: 'Complete mobile app UI kit for iOS and Android with 100+ screens.',
    image: 'https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Mobile App',
    price: 99,
    previewUrl: '#',
    features: ['100+ Screens', 'iOS & Android', 'Figma Files', 'Documentation'],
  },
];

const defaultData: SiteData = {
  settings: defaultSettings,
  templates: defaultTemplates,
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
