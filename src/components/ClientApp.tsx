"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import type { SiteSettingsData } from "@/db/defaults";
import { Language, languages, getTranslation } from "@/lib/translations";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Portfolio from "./Portfolio";
import Templates from "./Templates";
import Skills from "./Skills";
import Contact from "./Contact";
import Footer from "./Footer";
import AdminPanel from "./AdminPanel";

export interface TemplateRow {
  id: number;
  externalId: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  previewUrl: string;
  features: string[];
  createdAt: string | null;
}

export interface PortfolioRow {
  id: number;
  externalId: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  createdAt: string | null;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

interface SiteDataContextType {
  settings: SiteSettingsData;
  templates: TemplateRow[];
  portfolio: PortfolioRow[];
  refreshData: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}

interface ClientAppProps {
  initialSettings: SiteSettingsData;
  initialTemplates: TemplateRow[];
  initialPortfolio: PortfolioRow[];
}

export default function ClientApp({
  initialSettings,
  initialTemplates,
  initialPortfolio,
}: ClientAppProps) {
  const [adminOpen, setAdminOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const [templatesList, setTemplates] = useState(initialTemplates);
  const [portfolioList, setPortfolio] = useState(initialPortfolio);
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (l: Language) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("portfolio_language", l);
  };

  const t = (key: string) => getTranslation(lang, key);
  const dir = languages.find((l) => l.code === lang)?.dir || "ltr";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_language");
      if (saved && languages.some((l) => l.code === saved)) {
        setLangState(saved as Language);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: window.location.pathname,
        device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        referrer: document.referrer || "Direct",
      }),
    }).catch(() => {});
  }, []);

  const refreshData = useCallback(async () => {
    const [sRes, tRes, pRes] = await Promise.all([
      fetch("/api/settings"),
      fetch("/api/templates"),
      fetch("/api/portfolio"),
    ]);
    if (sRes.ok) setSettings(await sRes.json());
    if (tRes.ok) setTemplates(await tRes.json());
    if (pRes.ok) setPortfolio(await pRes.json());
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      <SiteDataContext.Provider value={{ settings, templates: templatesList, portfolio: portfolioList, refreshData }}>
        <Navbar onAdminClick={() => setAdminOpen(true)} />
        <Hero />
        <About />
        <Portfolio />
        <Templates />
        <Skills />
        <Contact />
        <Footer />
        {adminOpen && (
          <AdminPanel onClose={() => { setAdminOpen(false); refreshData(); }} />
        )}
      </SiteDataContext.Provider>
    </LanguageContext.Provider>
  );
}
