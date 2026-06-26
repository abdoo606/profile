"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useLanguage, useSiteData } from "./ClientApp";

const TelegramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export default function Contact() {
  const { t, dir } = useLanguage();
  const { settings } = useSiteData();

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.email")}</h3>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            </div>

            {settings.telegramUrl && (
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                  <TelegramIcon size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Telegram</h3>
                  <a
                    href={settings.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    @Abdulrhman0985
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.location")}</h3>
                <p className="text-slate-400">{settings.location}</p>
              </div>
            </div>

            {settings.telegramUrl && (
              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all mt-4"
              >
                <Send size={18} />
                Contact on Telegram
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form
              className={`space-y-4 ${dir === "rtl" ? "text-right" : ""}`}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder={t("contact.name")}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder={t("contact.email")}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder={t("contact.subject")}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                placeholder={t("contact.message")}
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={18} />
                {t("contact.send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
