import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            ABDULRHMAN
          </div>
          <div className="flex items-center gap-2 text-sm">
            {t('footer.made')} <Heart size={14} className="text-red-500 fill-red-500" /> {t('footer.by')} &copy; {new Date().getFullYear()}
          </div>
          <div className="text-sm">{t('footer.rights')}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
