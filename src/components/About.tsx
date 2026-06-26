"use client";

import { motion } from "framer-motion";
import { Layout, Code, Database, Smartphone } from "lucide-react";
import { useLanguage, useSiteData } from "./ClientApp";

const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout size={32} />,
  code: <Code size={32} />,
  database: <Database size={32} />,
  smartphone: <Smartphone size={32} />,
};

export default function About() {
  const { t, dir } = useLanguage();
  const { settings } = useSiteData();

  const stats = [
    { value: settings.yearsExperience, label: t("about.experience") },
    { value: settings.templatesSold, label: t("about.projects") },
    { value: settings.happyClients, label: t("about.clients") },
  ];

  return (
    <section id="about" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={dir === "rtl" ? "text-right" : ""}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {settings.aboutTitle || t("about.title")}
            </h2>
            <p className="text-slate-400 mb-4 leading-relaxed">
              {settings.aboutParagraph1 || t("about.p1")}
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {settings.aboutParagraph2 || t("about.p2")}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-4 bg-slate-800 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {settings.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/30 transition-all"
              >
                <div className="text-blue-400 mb-3">
                  {iconMap[service.iconType] || iconMap.code}
                </div>
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
