'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('uz');
  const [theme, setTheme] = useState('default');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('xfl_lang') || 'uz';
    const savedTheme = localStorage.getItem('xfl_theme') || 'default';
    setLang(savedLang);
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'uz' ? 'ru' : 'uz';
    setLang(newLang);
    localStorage.setItem('xfl_lang', newLang);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('xfl_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsThemeOpen(false);
  };

  const themes = [
    { id: 'default', name: 'Zümrad Yashil', color: '#00E676', bg: '#0A0E17', icon: '🌲' },
    { id: 'pitch', name: 'Neft Qora', color: '#A0A0A0', bg: '#050508', icon: '🌑' },
    { id: 'navy', name: 'Tungi Ko\'k', color: '#38BDF8', bg: '#060B18', icon: '🌌' },
    { id: 'crimson', name: 'Soya Qizil', color: '#F43F5E', bg: '#120608', icon: '🌋' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 my-2 px-4 sm:px-6 py-3 flex items-center justify-between border border-[var(--color-xfl-border)] shadow-xl">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-xfl-primary)] to-[var(--color-xfl-accent)] flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
            <span className="text-xl">⚽</span>
          </div>
          <span className="text-2xl font-black gradient-text tracking-tight">
            XFL
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6 text-xs font-extrabold">
        <Link href="/" className="text-[var(--color-xfl-text)] hover:text-[var(--color-xfl-accent)] transition-colors relative group py-1">
          {lang === 'uz' ? 'Bosh sahifa' : 'Главная'}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-xfl-accent)] transition-all group-hover:w-full" />
        </Link>
        <Link href="/klublar" className="text-[var(--color-xfl-text)] hover:text-[var(--color-xfl-accent)] transition-colors relative group py-1">
          {lang === 'uz' ? 'Klublar' : 'Клубы'}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-xfl-accent)] transition-all group-hover:w-full" />
        </Link>
        <Link href="/transferlar" className="text-[var(--color-xfl-text)] hover:text-[var(--color-xfl-accent)] transition-colors relative group py-1">
          {lang === 'uz' ? 'Transferlar' : 'Трансферы'}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-xfl-accent)] transition-all group-hover:w-full" />
        </Link>
        <Link href="/stadionlar" className="text-[var(--color-xfl-text)] hover:text-[var(--color-xfl-accent)] transition-colors relative group py-1">
          {lang === 'uz' ? 'Stadionlar' : 'Стадионы'}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-xfl-accent)] transition-all group-hover:w-full" />
        </Link>
        <Link href="/profil" className="text-[var(--color-xfl-text)] hover:text-[var(--color-xfl-accent)] transition-colors relative group py-1">
          {lang === 'uz' ? 'Profil' : 'Профиль'}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-xfl-accent)] transition-all group-hover:w-full" />
        </Link>
      </div>

      {/* Right Controls: Theme + Language + Login */}
      <div className="hidden md:flex items-center gap-3 relative">
        {/* FON (THEME SWITCHER) BUTTON */}
        <div className="relative">
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs font-extrabold text-[var(--color-xfl-text)] hover:border-[var(--color-xfl-accent)] transition-all"
            title="Fon rangini o'zgartirish"
          >
            <span>🎨 Fon</span>
          </button>

          {/* Theme Dropdown */}
          {isThemeOpen && (
            <div className="absolute right-0 mt-2 w-48 glass-card p-2 rounded-xl shadow-2xl border border-[var(--color-xfl-border)] z-50 space-y-1 animate-[fadeIn_0.2s_ease]">
              <div className="text-[10px] font-black text-[var(--color-xfl-text-dim)] px-2 py-1 uppercase">
                Mavzu Rangini Tanlang
              </div>
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-extrabold transition-colors ${
                    theme === t.id
                      ? 'bg-[var(--color-xfl-card-hover)] text-[var(--color-xfl-accent)]'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{t.icon}</span>
                    <span>{t.name}</span>
                  </span>
                  <span
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: t.color }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TIL (LANGUAGE SWITCHER) BUTTON */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs font-black text-amber-400 hover:border-amber-400 transition-all"
          title="Tilni almashtirish"
        >
          <span>{lang === 'uz' ? '🇺🇿 UZ' : '🇷🇺 RU'}</span>
        </button>

        {/* PROFILE / LOGIN LINK */}
        <Link
          href="/profil"
          className="btn-primary py-2 px-4 text-xs font-black shadow-lg shadow-green-500/20"
        >
          👤 {lang === 'uz' ? 'Profil' : 'Профиль'}
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={toggleLanguage}
          className="px-2.5 py-1 rounded-lg bg-[var(--color-xfl-bg)] text-xs font-black text-amber-400 border border-[var(--color-xfl-border)]"
        >
          {lang === 'uz' ? '🇺🇿 UZ' : '🇷🇺 RU'}
        </button>

        <button
          className="text-white p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 flex flex-col gap-3 md:hidden z-50 border border-[var(--color-xfl-border)]">
          <Link href="/" className="text-xs font-extrabold text-white py-1" onClick={() => setIsOpen(false)}>
            🏠 {lang === 'uz' ? 'Bosh sahifa' : 'Главная'}
          </Link>
          <Link href="/klublar" className="text-xs font-extrabold text-white py-1" onClick={() => setIsOpen(false)}>
            🛡️ {lang === 'uz' ? 'Klublar' : 'Клубы'}
          </Link>
          <Link href="/transferlar" className="text-xs font-extrabold text-white py-1" onClick={() => setIsOpen(false)}>
            🔄 {lang === 'uz' ? 'Transferlar' : 'Трансферы'}
          </Link>
          <Link href="/stadionlar" className="text-xs font-extrabold text-white py-1" onClick={() => setIsOpen(false)}>
            🏟️ {lang === 'uz' ? 'Stadionlar' : 'Стадионы'}
          </Link>
          <Link href="/profil" className="text-xs font-extrabold text-white py-1" onClick={() => setIsOpen(false)}>
            👤 {lang === 'uz' ? 'Profil' : 'Профиль'}
          </Link>

          <hr className="border-[var(--color-xfl-border)] my-1" />

          {/* Theme switcher for mobile */}
          <div className="text-[10px] font-black text-[var(--color-xfl-text-dim)] uppercase">Fon Rangini Tanlang:</div>
          <div className="grid grid-cols-2 gap-2">
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  changeTheme(t.id);
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs font-bold flex items-center gap-2 text-white"
              >
                <span>{t.icon}</span>
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
