import { useState } from 'react';
import { X, Check, ShoppingCart, ExternalLink, Star, Zap, Shield, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Template } from '../data/store';
import PaymentModal from './PaymentModal';

interface TemplateModalProps {
  template: Template;
  onClose: () => void;
}

const TemplateModal = ({ template, onClose }: TemplateModalProps) => {
  const { dir } = useLanguage();
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return <PaymentModal template={template} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-slate-900 rounded-2xl border border-slate-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto ${dir === 'rtl' ? 'text-right' : ''}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={template.image}
            alt={template.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {template.category}
          </div>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">${template.price}</span>
              <span className="text-slate-400">USDT</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title & Quick Info */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{template.name}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Star className="text-amber-400 fill-amber-400" size={16} />
                <span>4.9 (120+ sales)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield size={16} />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-slate-400 leading-relaxed">{template.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {template.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <Check className="text-emerald-400 flex-shrink-0" size={16} />
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose This */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Why Choose This Template?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-white font-medium mb-1">🚀 Production Ready</h4>
                <p className="text-slate-400 text-sm">Clean, well-documented code ready for deployment</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">📱 Fully Responsive</h4>
                <p className="text-slate-400 text-sm">Perfect display on all devices and screen sizes</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">🎨 Easy Customization</h4>
                <p className="text-slate-400 text-sm">Tailwind CSS makes styling changes a breeze</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowPayment(true)}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25"
            >
              <ShoppingCart size={20} />
              Buy Now - ${template.price} USDT
            </button>
            {template.previewUrl && template.previewUrl !== '#' && (
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <ExternalLink size={18} />
                Live Preview
              </a>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-400" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-amber-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
