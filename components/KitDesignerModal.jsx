'use client';

import { useState } from 'react';
import sounds from '@/lib/audio';

export default function KitDesignerModal({ onClose, onSaved }) {
  const [kitType, setKitType] = useState('stripes'); // 'stripes', 'sash', 'gradient', 'solid'
  const [primaryColor, setPrimaryColor] = useState('#1B5E20');
  const [secondaryColor, setSecondaryColor] = useState('#00E676');
  const [collarColor, setCollarColor] = useState('#FFFFFF');
  const [jerseyNumber, setJerseyNumber] = useState('10');
  const [playerName, setPlayerName] = useState('NORMATOV');
  const [sponsorText, setSponsorText] = useState('XFL SAMARQAND');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    sounds.playGoal();
    setIsSaved(true);
    if (onSaved) {
      onSaved({
        type: kitType,
        primaryColor,
        secondaryColor,
        collarColor,
        jerseyNumber,
        playerName,
        sponsorText,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[var(--color-xfl-card)] border-2 border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] animate-slide-up z-10">

        {/* LEFT CONTROLS PANEL */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-[var(--color-xfl-border)]">
            <div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                🎨 3D FORMA STUDIYASI
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">Klub Formasini Loyihalash</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {!isSaved ? (
            <div className="space-y-5">
              
              {/* Pattern Selector */}
              <div>
                <label className="text-[10px] font-black text-gray-300 uppercase block mb-2">
                  Forma Uslubi (Pattern)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'stripes', label: 'Chiziqli', icon: '🦓' },
                    { id: 'sash', label: 'Diagonal', icon: '⚡' },
                    { id: 'gradient', label: 'Gradient', icon: '🌈' },
                    { id: 'solid', label: 'Bir Xil Rang', icon: '🛡️' },
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setKitType(p.id)}
                      className={`p-3 rounded-xl border text-xs font-black transition-all flex flex-col items-center gap-1 ${
                        kitType === p.id
                          ? 'bg-[var(--color-xfl-accent)] text-black border-white shadow-md'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--color-xfl-bg)] p-3 rounded-xl border border-[var(--color-xfl-border)] space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 block">1-Asosiy Rang</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={e => setPrimaryColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                </div>

                <div className="bg-[var(--color-xfl-bg)] p-3 rounded-xl border border-[var(--color-xfl-border)] space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 block">2-Qo'shimcha Rang</label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={e => setSecondaryColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                </div>

                <div className="bg-[var(--color-xfl-bg)] p-3 rounded-xl border border-[var(--color-xfl-border)] space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 block">Yoqa / Raqam</label>
                  <input
                    type="color"
                    value={collarColor}
                    onChange={e => setCollarColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                </div>
              </div>

              {/* Number & Name Customization */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Futbolchi Ismi</label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value.toUpperCase())}
                    className="input-field py-2 text-xs font-black uppercase"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Raqam (#)</label>
                  <input
                    type="text"
                    value={jerseyNumber}
                    maxLength="2"
                    onChange={e => setJerseyNumber(e.target.value)}
                    className="input-field py-2 text-xs font-black text-center"
                  />
                </div>
              </div>

              {/* Sponsor Logo Text */}
              <div>
                <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Homiylik / Klub Logotipi Yozuvi</label>
                <input
                  type="text"
                  value={sponsorText}
                  onChange={e => setSponsorText(e.target.value.toUpperCase())}
                  className="input-field py-2 text-xs font-black"
                />
              </div>

              <button
                onClick={handleSave}
                className="btn-primary w-full py-3.5 text-xs font-black justify-center shadow-xl shadow-green-500/25"
              >
                💾 Ushbu Formani Klubga Saqlash
              </button>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4 animate-slide-up">
              <span className="text-5xl">👕</span>
              <h3 className="text-2xl font-black text-emerald-400">Forma Muvaffaqiyatli Saqlandi!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Klubingiz endi {formatMatchColorName(primaryColor)} va {formatMatchColorName(secondaryColor)} rangli yangi rasmiy libosda maydonga tushadi.
              </p>
              <button
                onClick={onClose}
                className="btn-primary py-3 px-8 text-xs font-black"
              >
                Maydonga Qaytish
              </button>
            </div>
          )}
        </div>

        {/* RIGHT 3D JERSEY LIVE PREVIEW CANVAS */}
        <div className="w-full md:w-96 bg-gradient-to-b from-[#0e1626] to-black p-8 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 relative">
          <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6">
            ★ 3D FORMA PREVIEW
          </div>

          {/* SVG 3D T-SHIRT RENDERING */}
          <div className="w-64 h-72 relative drop-shadow-2xl hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 200 240" className="w-full h-full filter drop-shadow-xl">
              <defs>
                <linearGradient id="kitGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={primaryColor} />
                  <stop offset="100%" stopColor={secondaryColor} />
                </linearGradient>

                <pattern id="stripesPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="10" height="20" fill={primaryColor} />
                  <rect x="10" width="10" height="20" fill={secondaryColor} />
                </pattern>
              </defs>

              {/* Main Jersey Body */}
              <path
                d="M40 30 L70 10 L130 10 L160 30 L190 70 L160 90 L150 70 L150 230 L50 230 L50 70 L40 90 L10 70 Z"
                fill={kitType === 'stripes' ? 'url(#stripesPattern)' : kitType === 'gradient' ? 'url(#kitGrad)' : primaryColor}
                stroke={collarColor}
                strokeWidth="2"
              />

              {/* Sash diagonal if selected */}
              {kitType === 'sash' && (
                <path
                  d="M60 10 L160 210 L130 230 L30 30 Z"
                  fill={secondaryColor}
                  opacity="0.8"
                />
              )}

              {/* Collar Ribbing */}
              <path
                d="M75 10 C75 35, 125 35, 125 10 Z"
                fill={collarColor}
              />

              {/* Uzbekistan Crest on Left Chest */}
              <circle cx="80" cy="65" r="10" fill="#FFFFFF" opacity="0.9" />
              <text x="80" y="69" textAnchor="middle" fontSize="10">🇺🇿</text>

              {/* Sponsor Logo on Chest */}
              <rect x="65" y="110" width="70" height="22" rx="4" fill="rgba(0,0,0,0.5)" />
              <text x="100" y="125" textAnchor="middle" fill={collarColor} fontSize="8" fontWeight="900" letterSpacing="1">
                {sponsorText.substring(0, 14)}
              </text>

              {/* Jersey Number */}
              <text x="100" y="185" textAnchor="middle" fill={collarColor} fontSize="46" fontWeight="900" opacity="0.95">
                {jerseyNumber}
              </text>

              {/* Player Name at Top */}
              <text x="100" y="45" textAnchor="middle" fill={collarColor} fontSize="9" fontWeight="900" letterSpacing="2">
                {playerName}
              </text>
            </svg>
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-6">
            Ushbu dizayn o'yin davomida maydondagi barcha futbolchilar formasida aks etadi.
          </p>
        </div>

      </div>
    </div>
  );
}

function formatMatchColorName(hex) {
  if (hex === '#1B5E20') return 'Zümrad Yashil';
  if (hex === '#00E676') return 'Yorqin Oq-Yashil';
  return hex;
}
