import { useState } from 'react';
import { X, Copy, Check, AlertTriangle, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Template, addOrder, getSiteData } from '../data/store';

interface PaymentModalProps {
  template: Template;
  onClose: () => void;
}

const PaymentModal = ({ template, onClose }: PaymentModalProps) => {
  const { t, dir } = useLanguage();
  const [txHash, setTxHash] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const walletAddress = getSiteData().settings.walletAddress;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash || !email) return;
    
    setLoading(true);
    
    // Add order to store
    addOrder({
      templateId: template.id,
      templateName: template.name,
      email,
      txHash,
      amount: template.price,
    });
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full max-h-[90vh] overflow-y-auto ${dir === 'rtl' ? 'text-right' : ''}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('payment.pending')}</h3>
              <p className="text-slate-400">{t('payment.success')}</p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                OK
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-2">{t('payment.title')}</h3>
              <p className="text-slate-400 text-sm mb-6">
                {template.name} - <span className="text-emerald-400 font-bold">${template.price} USDT</span>
              </p>

              {/* Payment Info */}
              <div className="bg-slate-800 rounded-xl p-4 mb-6">
                <p className="text-sm text-slate-300 mb-2">
                  {t('payment.send')} <span className="text-emerald-400 font-bold">${template.price} USDT</span> {t('payment.to')}
                </p>
                <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <code className="flex-1 text-sm text-white break-all font-mono">
                    {walletAddress}
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2 text-amber-400 text-xs">
                  <AlertTriangle size={14} />
                  <span>{t('payment.network')}</span>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
                <p className="text-red-400 text-xs">{t('payment.warning')}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{t('payment.txhash')}</label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder={t('payment.txhash.placeholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">{t('payment.email')}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? <Loader size={20} className="animate-spin" /> : t('payment.submit')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
