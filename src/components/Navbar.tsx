"use client";

import { useState, useEffect } from "react";
import { Menu, X, Settings, Globe } from "lucide-react";
import { useLanguage } from "./ClientApp";
import { languages, Language } from "@/lib/translations";

interface NavbarProps {
  onAdminClick: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const { t, lang, setLang, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: "My Work", href: "#portfolio" },
    { name: t("nav.templates"), href: "#templates" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-slate-900/50 backdrop-blur-sm"
      } border-b border-slate-800/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              ABDULRHMAN
            </span>
          </div>

          <div className={`hidden md:flex items-center gap-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="relative ml-4">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm">{languages.find((l) => l.code === lang)?.flag}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Language);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                        lang === l.code ? "bg-blue-600/20 text-blue-400" : "text-slate-300"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onAdminClick}
              className="ml-2 p-2 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-800"
              title="Admin Panel"
            >
              <Settings size={18} />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="p-2 text-slate-400 hover:text-white">
              <Globe size={18} />
            </button>
            <button onClick={onAdminClick} className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
              <Settings size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {langMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as Language);
                setLangMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-800 ${
                lang === l.code ? "bg-blue-600/20 text-blue-400" : "text-slate-300"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
