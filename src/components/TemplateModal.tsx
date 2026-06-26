"use client";

import { useState } from "react";
import { X, Star, ShoppingCart, ExternalLink, Check, Shield, Clock, Headphones, Copy } from "lucide-react";
import { useLanguage, useSiteData, type TemplateRow } from "./ClientApp";

interface TemplateModalProps {
  template: TemplateRow;
  onClose: () => void;
}

export default function TemplateModal({ template, onClose }: TemplateModalProps) {
  const { t } = useLanguage();
  const { settings } = useSiteData();
  const [showPayment, setShowPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(settings.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!txHash || !email) return;
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId: template.externalId,
        templateName: template.name,
        email,
        txHash,
        amount: template.price,
      }),
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white z-10">
          <X size={20} />
        </button>

        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 text-white text-xs rounded-full">{template.category}</div>
          <div className="absolute top-3 right-3 px-4 py-2 bg-emerald-600 text-white font-bold rounded-full">${template.price} USDT</div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{template.name}</h2>
          <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
              <span className="ml-1">4.9</span>
            </span>
            <span className="flex items-center gap-1"><Clock size={14} /> Instant Delivery</span>
          </div>

          <p className="text-slate-400 mb-6">{template.description}</p>

          <div className="mb-6">
            <h3 className="font-bold mb-3">What&apos;s Included</h3>
            <div className="grid grid-cols-2 gap-2">
              {template.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check size={14} className="text-emerald-400" /> {f}
                </div>
              ))}
            </div>
          </div>

          {!showPayment ? (
            <div className="flex gap-3">
              <button onClick={() => setShowPayment(true)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> {t("templates.buy")} - ${template.price}
              </button>
              {template.previewUrl && template.previewUrl !== "#" && (
                <a href={template.previewUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2">
                  <ExternalLink size={18} /> Preview
                </a>
              )}
            </div>
          ) : submitted ? (
            <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg p-4 text-center">
              <Check size={32} className="text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-400 font-medium">{t("payment.success")}</p>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-lg p-5 space-y-4">
              <h3 className="font-bold text-lg">{t("payment.title")}</h3>
              <p className="text-sm text-slate-400">{t("payment.send")} <span className="text-emerald-400 font-bold">${template.price} USDT</span> {t("payment.to")}</p>
              <div className="flex items-center gap-2 bg-slate-900 p-3 rounded-lg">
                <code className="text-xs text-blue-400 flex-1 break-all">{settings.walletAddress}</code>
                <button onClick={handleCopy} className="p-2 bg-slate-700 rounded hover:bg-slate-600">
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-xs text-amber-400">⚠️ {t("payment.warning")}</p>
              <input
                type="text"
                placeholder={t("payment.txhash.placeholder")}
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
              />
              <input
                type="email"
                placeholder={t("payment.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
              />
              <button onClick={handleSubmit} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg">
                {t("payment.submit")}
              </button>
            </div>
          )}

          <div className="mt-4 flex justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Shield size={14} /> Secure Payment</span>
            <span className="flex items-center gap-1"><Clock size={14} /> Instant Download</span>
            <span className="flex items-center gap-1"><Headphones size={14} /> 24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
