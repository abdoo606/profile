"use client";

import { Heart } from "lucide-react";
import { useLanguage } from "./ClientApp";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-slate-900 text-white border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          ABDULRHMAN
        </div>
        <p className="text-slate-400 text-sm flex items-center justify-center gap-1">
          {t("footer.made")}{" "}
          <Heart size={14} className="text-red-500 fill-red-500" />{" "}
          {t("footer.by")}
        </p>
        <p className="text-slate-500 text-xs mt-2">
          &copy; {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
