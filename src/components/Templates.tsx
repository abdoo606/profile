import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSiteData, Template } from '../data/store';
import PaymentModal from './PaymentModal';

const Templates = () => {
  const { t, dir } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const templates = getSiteData().templates;
  const categories = ['All', ...Array.from(new Set(templates.map(p => p.category)))];
  const filtered = activeCategory === 'All' ? templates : templates.filter(p => p.category === activeCategory);

  return (
    <section id="templates" className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className={`mb-12 text-center ${dir === 'rtl' ? 'text-right' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('templates.title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t('templates.subtitle')}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {cat === 'All' ? t('templates.all') : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/30 transition-all group"
            >
              <div className="relative overflow-hidden h-44">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-600 text-white text-sm font-bold rounded-full">
                  ${template.price} USDT
                </div>
              </div>
              <div className={`p-5 ${dir === 'rtl' ? 'text-right' : ''}`}>
                <div className="text-xs text-blue-400 font-medium mb-1">{template.category}</div>
                <h3 className="text-lg font-bold mb-2">{template.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{template.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={16} />
                    {t('templates.buy')}
                  </button>
                  {template.previewUrl && template.previewUrl !== '#' && (
                    <a
                      href={template.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <PaymentModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </section>
  );
};

export default Templates;
