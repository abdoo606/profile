import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSiteData } from '../data/store';

const Portfolio = () => {
  const { dir } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const portfolio = getSiteData().portfolio || [];
  
  if (portfolio.length === 0) return null;
  
  const categories = ['All', ...Array.from(new Set(portfolio.map(p => p.category)))];
  const filtered = activeCategory === 'All' ? portfolio : portfolio.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className={`mb-12 text-center`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A showcase of my recent projects and work experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/30 transition-all">
                <div className="relative overflow-hidden h-52">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {item.category}
                  </div>
                  {item.link && item.link !== '#' && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-800"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <div className={`p-6 ${dir === 'rtl' ? 'text-right' : ''}`}>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  {item.link && item.link !== '#' && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                    >
                      View Project
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
