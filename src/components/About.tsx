import { motion } from 'framer-motion';
import { Code, Database, Layout, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSiteData } from '../data/store';

const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout className="text-blue-400" size={32} />,
  code: <Code className="text-emerald-400" size={32} />,
  database: <Database className="text-purple-400" size={32} />,
  smartphone: <Smartphone className="text-amber-400" size={32} />,
};

const About = () => {
  const { t, dir } = useLanguage();
  const settings = getSiteData().settings;
  
  const stats = [
    { value: settings.yearsExperience, label: t('about.experience') },
    { value: settings.templatesSold, label: t('about.projects') },
    { value: settings.happyClients, label: t('about.clients') },
  ];

  return (
    <section id="about" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col md:flex-row gap-12 items-center ${dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`md:w-1/2 ${dir === 'rtl' ? 'text-right' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{settings.aboutTitle || t('about.title')}</h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">{settings.aboutParagraph1 || t('about.p1')}</p>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">{settings.aboutParagraph2 || t('about.p2')}</p>
            
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-center">
                  <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {settings.services.map((service, index) => (
              <div key={index} className={`p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors group ${dir === 'rtl' ? 'text-right' : ''}`}>
                <div className="mb-4">{iconMap[service.iconType] || iconMap.code}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
