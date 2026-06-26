import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSiteData } from '../data/store';

const TelegramIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const Contact = () => {
  const { t, dir } = useLanguage();
  const settings = getSiteData().settings;

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col lg:flex-row gap-16 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:w-1/3 ${dir === 'rtl' ? 'text-right' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('contact.title')}</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">{t('contact.subtitle')}</p>

            <div className="space-y-6">
              {/* Email */}
              <a 
                href={`mailto:${settings.email}`}
                className={`flex items-center gap-4 group ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
              >
                <div className="p-3 bg-slate-900 rounded-lg text-blue-400 border border-slate-800 group-hover:border-blue-500 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{t('contact.email')}</p>
                  <p className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{settings.email}</p>
                </div>
              </a>

              {/* Telegram */}
              {settings.telegramUrl && (
                <a 
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 group ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="p-3 bg-slate-900 rounded-lg text-emerald-400 border border-slate-800 group-hover:border-emerald-500 transition-colors">
                    <TelegramIcon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Telegram</p>
                    <p className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">@Abdulrhman0985</p>
                  </div>
                </a>
              )}

              {/* Location */}
              <div className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="p-3 bg-slate-900 rounded-lg text-purple-400 border border-slate-800">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{t('contact.location')}</p>
                  <p className="font-medium text-slate-200">{settings.location}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Button */}
            <a
              href={settings.telegramUrl || `mailto:${settings.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all"
            >
              <Send size={18} />
              Contact on Telegram
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3"
          >
            <form className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    className={`w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white ${dir === 'rtl' ? 'text-right' : ''}`}
                    placeholder={t('contact.name')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    className={`w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white ${dir === 'rtl' ? 'text-right' : ''}`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.subject')}</label>
                <input
                  type="text"
                  className={`w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white ${dir === 'rtl' ? 'text-right' : ''}`}
                  placeholder={t('contact.subject')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.message')}</label>
                <textarea
                  className={`w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors h-32 text-white ${dir === 'rtl' ? 'text-right' : ''}`}
                  placeholder={t('contact.message')}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {t('contact.send')}
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
