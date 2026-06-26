"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { useLanguage, useSiteData, type TemplateRow } from "./ClientApp";
import TemplateModal from "./TemplateModal";

export default function Templates() {
  const { t, dir } = useLanguage();
  const { templates } = useSiteData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateRow | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ["All", ...Array.from(new Set(templates.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? templates : templates.filter((p) => p.category === activeCategory);
  const visibleTemplates = filtered.slice(0, visibleCount);

  return (
    <section id="templates" className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("templates.title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("templates.subtitle")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
              }`}
            >
              {cat === "All" ? t("templates.all") : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="relative overflow-hidden h-44">
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white"><Eye size={20} /></span>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">{template.category}</div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-600 text-white text-sm font-bold rounded-full">${template.price}</div>
                </div>
                <div className={`p-4 ${dir === "rtl" ? "text-right" : ""}`}>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                    <span className="text-xs text-slate-500 ml-1">(4.9)</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{template.name}</h3>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">{f}</span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="px-2 py-0.5 bg-slate-800 text-blue-400 text-xs rounded">+{template.features.length - 3} more</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedTemplate(template); }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={16} /> {t("templates.buy")} - ${template.price}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full border border-slate-700 transition-colors"
            >
              Load More Templates ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Templates", value: templates.length + "+" },
            { label: "Happy Customers", value: "500+" },
            { label: "Categories", value: String(categories.length - 1) },
            { label: "Avg. Rating", value: "4.9 ⭐" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedTemplate && <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />}
    </section>
  );
}
