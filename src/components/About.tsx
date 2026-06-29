"use client";

import { motion } from "framer-motion";
import { Layout, Code, Database, Smartphone } from "lucide-react";
import { useLanguage, useSiteData } from "./ClientApp";

const iconMap: Record<string, React.ReactNode> = {
  layout: <Layout size={28} />,
  code: <Code size={28} />,
  database: <Database size={28} />,
  smartphone: <Smartphone size={28} />,
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
    <section id="about" className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-16 items-center ${dir === "rtl" ? "md:grid-flow-dense" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={dir === "rtl" ? "md:col-start-2" : ""}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {settings.aboutTitle || t("about.title")}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-4">
                {settings.aboutParagraph1 || t("about.p1")}
              </p>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {settings.aboutParagraph2 || t("about.p2")}
              </p>

              <div className={`grid grid-cols-3 gap-4 ${dir === "rtl" ? "text-right" : ""}`}>
                {stats.map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${dir === "rtl" ? "md:col-start-1" : ""}`}
            >
              {settings.services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[service.iconType] || iconMap.code}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-sm">{service.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
