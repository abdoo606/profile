"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";
import { useLanguage, useSiteData } from "./ClientApp";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const TelegramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Hero() {
  const { t, dir } = useLanguage();
  const { settings } = useSiteData();

  const socialLinks = [
    { url: settings.githubUrl, Icon: GithubIcon, show: !!settings.githubUrl },
    { url: settings.telegramUrl, Icon: TelegramIcon, show: !!settings.telegramUrl },
    { url: settings.instagramUrl, Icon: InstagramIcon, show: !!settings.instagramUrl },
    { url: settings.linkedinUrl, Icon: LinkedinIcon, show: !!settings.linkedinUrl },
    { url: `mailto:${settings.email}`, Icon: Mail, show: !!settings.email },
  ].filter((link) => link.show);

  const bgPosition = `${settings.heroBackgroundX ?? 50}% ${settings.heroBackgroundY ?? 50}%`;
  const profilePosition = `${settings.profileImageX ?? 50}% ${settings.profileImageY ?? 50}%`;

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 bg-slate-950 text-white overflow-hidden relative">
      {settings.heroBackground && (
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroBackground}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: bgPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
        </div>
      )}

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className={`flex flex-col-reverse md:flex-row items-center gap-12 max-w-6xl mx-auto ${dir === "rtl" ? "md:flex-row-reverse" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`md:w-1/2 text-center ${dir === "rtl" ? "md:text-right" : "md:text-left"}`}
          >
            <h2 className="text-blue-400 font-mono mb-4 text-lg">
              {settings.heroGreeting || t("hero.greeting")}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-blue-200 bg-clip-text text-transparent">
              {settings.heroName || t("hero.name")}
            </h1>
            <h3 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-6">
              {settings.heroTitle || t("hero.title")}
            </h3>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {settings.heroDescription || t("hero.description")}
            </p>

            <div className={`flex flex-wrap gap-4 ${dir === "rtl" ? "justify-center md:justify-end" : "justify-center md:justify-start"}`}>
              <a
                href="#templates"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all flex items-center gap-2 group"
              >
                {t("hero.browse")}
                <ArrowRight className={`group-hover:translate-x-1 transition-transform ${dir === "rtl" ? "rotate-180" : ""}`} size={20} />
              </a>
              <a
                href={settings.telegramUrl || "#contact"}
                target={settings.telegramUrl ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-all flex items-center gap-2 border border-slate-700"
              >
                <Send size={18} />
                {t("hero.contact")}
              </a>
            </div>

            <div className={`mt-10 flex gap-4 ${dir === "rtl" ? "justify-center md:justify-end" : "justify-center md:justify-start"}`}>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
                >
                  <link.Icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500 via-emerald-500 to-purple-500 rounded-full blur-lg opacity-40 animate-pulse" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
                <img
                  src={settings.profileImage || "/images/profile.jpg"}
                  alt={settings.heroName}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: profilePosition }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400";
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
