"use client";

import { motion } from "framer-motion";
import { useLanguage, useSiteData } from "./ClientApp";

const colorClasses = [
  "text-blue-400",
  "text-emerald-400",
  "text-purple-400",
  "text-amber-400",
];

export default function Skills() {
  const { t } = useLanguage();
  const { settings } = useSiteData();

  return (
    <section id="skills" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {settings.skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
            >
              <h3
                className={`text-xl font-bold mb-6 border-b border-slate-700 pb-3 ${
                  colorClasses[index % colorClasses.length]
                }`}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-900 text-slate-300 text-sm rounded-lg hover:text-white hover:bg-slate-700 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
