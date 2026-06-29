export interface SiteSettingsData {
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
  githubUrl: string;
  linkedinUrl: string;
  telegramUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  email: string;
  phone: string;
  location: string;
  showPhone: boolean;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  yearsExperience: string;
  templatesSold: string;
  happyClients: string;
  services: { title: string; description: string; iconType: string }[];
  skills: { title: string; items: string[] }[];
  walletAddress: string;
  adminPassword: string;
}

export const defaultSettings: SiteSettingsData = {
  heroGreeting: "Hi, I'm",
  heroName: "Abdulrhman",
  heroTitle: "IT Engineer & UI/UX Designer",
  heroDescription:
    "I design and develop premium website templates, UI kits, and digital solutions. Browse my collection and find the perfect template for your project.",
  profileImage: "/images/profile.jpg",
  profileImageX: 50,
  profileImageY: 50,
  heroBackground:
    "https://images.pexels.com/photos/8108683/pexels-photo-8108683.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroBackgroundX: 50,
  heroBackgroundY: 50,
  githubUrl: "https://github.com/abdoo606",
  linkedinUrl: "",
  telegramUrl: "https://t.me/Abdulrhman0985",
  instagramUrl: "",
  twitterUrl: "",
  email: "abdulrhmant948@gmail.com",
  phone: "",
  location: "Saudi Arabia",
  showPhone: false,
  aboutTitle: "About Me",
  aboutParagraph1:
    "I am Abdulrhman, an IT Engineer with expertise in UI/UX Design. I combine technical knowledge with creative design to build exceptional digital products.",
  aboutParagraph2:
    "I hold multiple certifications in UI/UX Design and IT. I create premium templates and digital assets that help businesses and individuals launch their online presence quickly.",
  yearsExperience: "3+",
  templatesSold: "50+",
  happyClients: "100+",
  services: [
    {
      title: "UI/UX Design",
      description:
        "Beautiful and intuitive user interfaces designed in Figma and Adobe XD.",
      iconType: "layout",
    },
    {
      title: "Web Templates",
      description:
        "Responsive, modern website templates built with latest technologies.",
      iconType: "code",
    },
    {
      title: "IT Solutions",
      description:
        "Complete IT infrastructure solutions and technical consulting.",
      iconType: "database",
    },
    {
      title: "Custom Development",
      description:
        "Tailored solutions built specifically for your business needs.",
      iconType: "smartphone",
    },
  ],
  skills: [
    {
      title: "UI/UX Design",
      items: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "Prototyping",
        "Wireframing",
        "User Research",
      ],
    },
    {
      title: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML/CSS",
        "JavaScript",
      ],
    },
    {
      title: "IT & Tools",
      items: [
        "Git",
        "Linux",
        "Networking",
        "Cloud (AWS)",
        "Docker",
        "Troubleshooting",
      ],
    },
    {
      title: "Soft Skills",
      items: [
        "Problem Solving",
        "Communication",
        "Team Work",
        "Project Management",
      ],
    },
  ],
  walletAddress: "TQ8599AiSX5DFW8NAmjuE5C6yCC5iWfRED",
  adminPassword: "abdulrhman2024",
};

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  previewUrl: string;
  features: string[];
}

export const defaultTemplates: TemplateData[] = [
  {
    id: "1",
    name: "Business Pro",
    description:
      "Professional business website template with modern design, perfect for agencies and startups.",
    image:
      "https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Business",
    price: 49,
    previewUrl: "#",
    features: [
      "Responsive Design",
      "Contact Form",
      "SEO Optimized",
      "Fast Loading",
      "10+ Pages",
      "Team Section",
      "Services Page",
      "Blog Integration",
    ],
  },
  {
    id: "2",
    name: "E-Commerce Pro",
    description:
      "Full-featured e-commerce template with shopping cart, checkout, and admin dashboard.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "E-Commerce",
    price: 99,
    previewUrl: "#",
    features: [
      "Shopping Cart",
      "Payment Integration",
      "Product Management",
      "Order Tracking",
      "User Auth",
      "Wishlist",
      "Reviews System",
      "Admin Dashboard",
    ],
  },
  {
    id: "3",
    name: "Portfolio Starter",
    description:
      "Clean and minimal portfolio template for designers, developers, and creatives.",
    image:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Portfolio",
    price: 29,
    previewUrl: "#",
    features: [
      "Project Showcase",
      "About Section",
      "Contact Form",
      "Animations",
      "Skills Display",
      "Testimonials",
      "Blog Ready",
      "Dark Mode",
    ],
  },
  {
    id: "4",
    name: "SaaS Landing Pro",
    description:
      "High-converting SaaS landing page template with pricing tables and feature sections.",
    image:
      "https://images.pexels.com/photos/3888149/pexels-photo-3888149.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Landing Page",
    price: 59,
    previewUrl: "#",
    features: [
      "Pricing Tables",
      "Testimonials",
      "FAQ Section",
      "CTA Buttons",
      "Hero Animations",
      "Feature Grid",
      "Newsletter",
      "Analytics Ready",
    ],
  },
  {
    id: "5",
    name: "Dashboard UI Kit",
    description:
      "Complete admin dashboard UI kit with charts, tables, and data visualization components.",
    image:
      "https://images.pexels.com/photos/17279854/pexels-photo-17279854.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Dashboard",
    price: 89,
    previewUrl: "#",
    features: [
      "50+ Components",
      "Charts & Graphs",
      "Dark Mode",
      "Figma Files",
      "User Management",
      "Analytics Pages",
      "Data Tables",
      "Form Elements",
    ],
  },
  {
    id: "6",
    name: "Restaurant Starter",
    description:
      "Beautiful restaurant website template with menu, reservations, and gallery.",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Restaurant",
    price: 45,
    previewUrl: "#",
    features: [
      "Menu Display",
      "Reservation Form",
      "Gallery",
      "Location Map",
      "Online Ordering",
      "Chef Profiles",
      "Reviews",
      "Events Section",
    ],
  },
  {
    id: "7",
    name: "Blog Starter",
    description:
      "Modern blog template with categories, tags, and commenting system.",
    image:
      "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Blog",
    price: 35,
    previewUrl: "#",
    features: [
      "Category System",
      "Search Function",
      "Author Pages",
      "RSS Feed",
      "Comments",
      "Social Share",
      "Newsletter",
      "Related Posts",
    ],
  },
  {
    id: "8",
    name: "Mobile App UI Kit",
    description:
      "Complete mobile app UI kit for iOS and Android with 100+ screens.",
    image:
      "https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Mobile App",
    price: 99,
    previewUrl: "#",
    features: [
      "100+ Screens",
      "iOS & Android",
      "Figma Files",
      "Documentation",
      "Onboarding",
      "E-commerce",
      "Social Features",
      "Messaging UI",
    ],
  },
];

export interface PortfolioData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export const defaultPortfolio: PortfolioData[] = [
  {
    id: "1",
    title: "E-Commerce Website Redesign",
    description:
      "Complete redesign of an e-commerce platform with modern UI/UX principles, improving conversion rates by 40%.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "UI/UX Design",
    link: "#",
  },
  {
    id: "2",
    title: "Corporate IT Infrastructure",
    description:
      "Designed and implemented complete IT infrastructure for a 200+ employee company including network, security, and cloud solutions.",
    image:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "IT Solutions",
    link: "#",
  },
  {
    id: "3",
    title: "Mobile Banking App UI",
    description:
      "Designed intuitive mobile banking application interface with focus on accessibility and user experience.",
    image:
      "https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "UI/UX Design",
    link: "#",
  },
  {
    id: "4",
    title: "Restaurant Management System",
    description:
      "Full-stack web application for restaurant management including POS, inventory, and staff management.",
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Web Development",
    link: "#",
  },
];
