'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LiveTicker from './LiveTicker';
import CreatePlayerModal from './CreatePlayerModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('uz');
  const [theme, setTheme] = useState('default');
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('xfl_lang') || 'uz';
    const savedTheme = localStorage.getItem('xfl_theme') || 'default';
    setLang(savedLang);
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('xfl_lang', newLang);
    setIsLangOpen(false);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('xfl_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsThemeOpen(false);
  };

  const themes = [
    { id: 'default', name: 'Zümrad Yashil', color: '#00E676', icon: '🌲' },
    { id: 'pitch', name: 'Neft Qora (Stealth)', color: '#94A3B8', icon: '🌑' },
    { id: 'navy', name: 'Tungi Ko\'k', color: '#38BDF8', icon: '🌌' },
    { id: 'crimson', name: 'Qizil Yulduz', color: '#F43F5E', icon: '🌋' },
    { id: 'gold', name: 'Oltin Voha (Gold)', color: '#F59E0B', icon: '👑' },
  ];

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'tj', name: 'Тоҷикӣ', flag: '🇹🇯' },
  ];

  const navLinks = [
    { href: '/', label: lang === 'uz' ? 'Bosh sahifa' : lang === 'ru' ? 'Главная' : 'Асосӣ', icon: '🏠' },
    { href: '/klublar', label: lang === 'uz' ? 'Klublar' : lang === 'ru' ? 'Клубы' : 'Клубҳо', icon: '🛡️' },
    { href: '/transferlar', label: lang === 'uz' ? 'Transferlar' : lang === 'ru' ? 'Трансферы' : 'Трансферҳо', icon: '🔄' },
    { href: '/stadionlar', label: lang === 'uz' ? 'Stadionlar' : lang === 'ru' ? 'Стадионы' : 'Варзишгоҳҳо', icon: '🏟️' },
    { href: '/profil', label: lang === 'uz' ? 'Profil' : lang === 'ru' ? 'Профиль' : 'Профил', icon: '👤' },
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <>
      {/* Real-time Ticker Broadcast Banner */}
      <LiveTicker />

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 px-3 sm:px-6 py-2.5 bg-black/40 backdrop-blur-xl border-b border-[var(--color-xfl-border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Brand Emblem */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1B5E20] to-[#00E676] flex items-center justify-center text-xl shadow-lg shadow-green-500/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-white/20">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black gradient-text tracking-tight">XFL</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SAMARQAND
                </span>
              </div>
              <span className="text-[9px] font-bold text-[var(--color-xfl-text-dim)] tracking-wider">
                HAVASKOR FUTBOL LIGASI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] shadow-md shadow-green-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme + Language + Create Card Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* THEME PICKER BUTTON */}
            <div className="relative">
              <button
                onClick={() => { setIsThemeOpen(!isThemeOpen); setIsLangOpen(false); }}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--color-xfl-accent)] text-xs font-bold text-gray-200 flex items-center gap-1.5 transition-all"
                title="Mavzu fonini o'zgartirish"
              >
                <span>🎨</span>
                <span className="hidden xl:inline">Mavzu</span>
              </button>

              {isThemeOpen && (
                <div className="absolute right-0 mt-2 w-52 glass-card p-2 rounded-2xl shadow-2xl border border-[var(--color-xfl-border)] z-50 space-y-1 animate-slide-up">
                  <div className="text-[10px] font-black text-[var(--color-xfl-text-dim)] px-2.5 py-1 uppercase tracking-wider">
                    Mavzu Rangi:
                  </div>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => changeTheme(t.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        theme === t.id
                          ? 'bg-[var(--color-xfl-card-hover)] text-[var(--color-xfl-accent)] border border-white/10'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{t.icon}</span>
                        <span>{t.name}</span>
                      </span>
                      <span
                        className="w-3 h-3 rounded-full border border-white/30"
                        style={{ backgroundColor: t.color }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LANGUAGE SELECTOR BUTTON */}
            <div className="relative">
              <button
                onClick={() => { setIsLangOpen(!isLangOpen); setIsThemeOpen(false); }}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-black text-amber-300 flex items-center gap-1.5 transition-all"
                title="Tilni tanlash"
              >
                <span>{currentLangObj.flag}</span>
                <span className="uppercase">{currentLangObj.code}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 glass-card p-1.5 rounded-2xl shadow-2xl border border-[var(--color-xfl-border)] z-50 space-y-1 animate-slide-up">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        lang === l.code
                          ? 'bg-[var(--color-xfl-card-hover)] text-amber-400 font-black'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CREATE CARD CTA BUTTON */}
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn-primary py-2.5 px-4 text-xs font-black shadow-lg shadow-green-500/25 shrink-0"
            >
              ⚽ Karta Yaratish
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-[#041B0E] font-black text-xs"
            >
              ⚽ Karta
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden mt-3 p-4 glass-card border border-[var(--color-xfl-border)] rounded-2xl space-y-4 animate-slide-up shadow-2xl">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`p-3 rounded-xl text-xs font-black flex items-center gap-2 ${
                    pathname === link.href
                      ? 'bg-[var(--color-xfl-accent)] text-black'
                      : 'bg-white/5 text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <hr className="border-white/10" />

            {/* Languages in Mobile */}
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase mb-2">Tilni Tanlang:</div>
              <div className="flex gap-2">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { changeLanguage(l.code); setIsOpen(false); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      lang === l.code
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-black'
                        : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    {l.flag} {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Themes in Mobile */}
            <div>
              <div className="text-[10px] font-black text-gray-400 uppercase mb-2">Mavzu Ranglari:</div>
              <div className="grid grid-cols-2 gap-2">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { changeTheme(t.id); setIsOpen(false); }}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-left flex items-center gap-2 text-white"
                  >
                    <span>{t.icon}</span>
                    <span className="truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global FC26 Card Creator Modal */}
      {isCreateOpen && (
        <CreatePlayerModal onClose={() => setIsCreateOpen(false)} />
      )}
    </>
  );
}
