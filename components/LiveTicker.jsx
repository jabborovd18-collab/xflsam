'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LiveTicker() {
  const tickerItems = [
    { tag: "🔥 DERBI", text: "Afrosiyob FC vs Registon FC — Shanba 19:00, Afrosiyob Arenada! (Chiptalar bepul)", link: "/klublar" },
    { tag: "⚡ TRANSFER", text: "Jasurbek Normatov (ST, 18 Gol) ga 3 ta klubdan taklif tushdi!", link: "/transferlar" },
    { tag: "🏟️ STADION", text: "Samarqand Indoor Arena (6x6 Yopiq) bugun kechki vaqtlar uchun 2 ta bo'sh soat qoldi!", link: "/stadionlar" },
    { tag: "🏆 STATISTIKA", text: "11x11 Liga: Afrosiyob FC 59 ochko bilan turnir jadvalida peshqadamlik qilmoqda.", link: "/" },
    { tag: "🌟 YANGI O'YINCHI", text: "Farrux To'xtasinov (LW, 20 yosh) o'z FC26 kartasini e'lon qildi!", link: "/transferlar" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  const current = tickerItems[currentIndex];

  return (
    <div className="bg-gradient-to-r from-[#04140D] via-[#092216] to-[#04140D] border-b border-[var(--color-xfl-border)] text-xs py-2 px-4 overflow-hidden relative shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Live Pulse Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[var(--color-xfl-accent)] animate-pulse-live" />
          <span className="font-black text-[10px] tracking-widest uppercase text-[var(--color-xfl-accent)]">
            XFL LIVE
          </span>
        </div>

        {/* Animated Headline Item */}
        <div className="flex-1 overflow-hidden">
          <Link
            href={current.link}
            className="flex items-center gap-2 text-gray-200 hover:text-[var(--color-xfl-accent)] transition-colors truncate"
          >
            <span className="px-2 py-0.5 rounded-full bg-[var(--color-xfl-primary)]/80 text-[10px] font-black text-white shrink-0 border border-white/10">
              {current.tag}
            </span>
            <span className="font-medium truncate text-xs">
              {current.text}
            </span>
          </Link>
        </div>

        {/* Location & Time Widget */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-gray-400 shrink-0">
          <span>📍 Samarqand</span>
          <span>•</span>
          <span className="text-emerald-400">☀️ +28°C Havo</span>
        </div>
      </div>
    </div>
  );
}
