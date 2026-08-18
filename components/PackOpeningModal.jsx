'use client';

import { useState } from 'react';
import sounds from '@/lib/audio';
import PlayerCard from './PlayerCard';
import { demoOyinchilar } from '@/data/demo-data';

export default function PackOpeningModal({ onClose }) {
  const [stage, setStage] = useState('select'); // 'select', 'opening', 'walkout', 'revealed'
  const [selectedPack, setSelectedPack] = useState(null);
  const [openedPlayer, setOpenedPlayer] = useState(null);

  const packs = [
    {
      id: 'gold',
      name: "Samarqand Oltin Jumbo Paki",
      desc: "Kafolatlangan 80+ OVR Oltin Yulduz (Jasurbek Normatov, Sardor Usmonov...)",
      price: "100 XFL Coins",
      color: "from-amber-400 via-yellow-500 to-amber-700",
      ratingMin: 80,
      icon: "👑",
    },
    {
      id: 'derby',
      name: "El-Clasico Derbi Paki",
      desc: "Afrosiyob FC va Registon FC klublarining yetakchi o'yinchilari",
      price: "75 XFL Coins",
      color: "from-emerald-400 via-green-600 to-teal-800",
      ratingMin: 75,
      icon: "🔥",
    },
    {
      id: 'scout',
      name: "Yangi Iste'dodlar (Scout) Paki",
      desc: "Samarqand viloyati tumanlarining yosh va tezkor o'yinchilari",
      price: "50 XFL Coins",
      color: "from-blue-400 via-indigo-600 to-slate-800",
      ratingMin: 70,
      icon: "⚡",
    },
  ];

  const handleOpenPack = (pack) => {
    setSelectedPack(pack);
    setStage('opening');
    sounds.playPackOpen();

    // Select random player matching criteria
    const eligible = demoOyinchilar.filter(p => (p.rating || 7.5) * 10 >= pack.ratingMin);
    const chosen = eligible.length > 0
      ? eligible[Math.floor(Math.random() * eligible.length)]
      : demoOyinchilar[0];

    // Stage transition to Walkout animation
    setTimeout(() => {
      setStage('walkout');
      sounds.playWalkout();

      // Final reveal
      setTimeout(() => {
        setOpenedPlayer(chosen);
        setStage('revealed');
        sounds.playGoal();
      }, 2000);
    }, 1500);
  };

  const handleReset = () => {
    setStage('select');
    setSelectedPack(null);
    setOpenedPlayer(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      {/* Container */}
      <div className="relative w-full max-w-3xl bg-[var(--color-xfl-card)] border-2 border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col items-center justify-center min-h-[520px] animate-slide-up z-10">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors z-30"
        >
          ✕
        </button>

        {/* STAGE 1: PACK SELECTION */}
        {stage === 'select' && (
          <div className="w-full space-y-6 text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase mb-2">
                <span>📦 EA SPORTS FC ULTIMATE PACKS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Samarqand FC 26 Paklarini Ochish
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Pakni tanlang va Samarqandning yangi oltin yulduzlarini jamoangizga kashf qiling!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {packs.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => handleOpenPack(pack)}
                  className="group relative glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Pack Graphic Card */}
                  <div className={`w-full h-36 rounded-xl bg-gradient-to-tr ${pack.color} p-4 flex flex-col justify-between shadow-xl shadow-black/60 mb-4 border border-white/20 relative overflow-hidden group-hover:brightness-110 transition-all`}>
                    <div className="fc26-foil-overlay" />
                    <div className="flex justify-between items-start">
                      <span className="text-3xl">{pack.icon}</span>
                      <span className="text-[10px] font-black text-black bg-white/90 px-2 py-0.5 rounded-full">
                        {pack.ratingMin}+ OVR
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase drop-shadow leading-tight">{pack.name}</div>
                      <div className="text-[9px] text-white/80 font-bold">XFL ULTIMATE</div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-300 text-left line-clamp-2 leading-tight mb-3">
                    {pack.desc}
                  </p>

                  <button className="btn-primary w-full py-2.5 text-xs font-black justify-center shadow-md">
                    🎁 Ochish ({pack.price})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 2: PACK SHAKING & OPENING EXPLOSION */}
        {stage === 'opening' && (
          <div className="text-center space-y-6 animate-pulse">
            <div className="relative w-48 h-64 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 p-6 flex flex-col justify-between shadow-2xl shadow-amber-500/50 mx-auto border-4 border-white animate-bounce">
              <div className="text-5xl">👑</div>
              <div className="text-lg font-black text-black uppercase tracking-wider">
                OCHILMOQDA...
              </div>
              <div className="text-xs font-black text-black">XFL 2026</div>
            </div>
            <h3 className="text-xl font-black text-amber-300 uppercase tracking-widest animate-pulse">
              PAK YORILMOQDA... 🔥
            </h3>
          </div>
        )}

        {/* STAGE 3: WALKOUT ANIMATION (GOLDEN LIGHTS & COUNTRY FLAG) */}
        {stage === 'walkout' && (
          <div className="text-center space-y-6 flex flex-col items-center justify-center">
            {/* Walkout Pillar Lights */}
            <div className="flex gap-8 items-center">
              <div className="w-4 h-48 bg-gradient-to-t from-amber-500 to-transparent rounded-full blur-md animate-pulse" />
              
              <div className="space-y-4">
                <div className="text-7xl animate-bounce">🇺🇿</div>
                <div className="text-2xl font-black text-amber-400 tracking-widest uppercase">
                  O'ZBEKISTON • SAMARQAND
                </div>
                <div className="text-4xl font-black text-white uppercase tracking-wider">
                  ★ WALKOUT! ★
                </div>
              </div>

              <div className="w-4 h-48 bg-gradient-to-t from-amber-500 to-transparent rounded-full blur-md animate-pulse" />
            </div>
          </div>
        )}

        {/* STAGE 4: REVEALED 3D FC 26 CARD WITH SOUND & REWARD */}
        {stage === 'revealed' && openedPlayer && (
          <div className="text-center space-y-6 flex flex-col items-center animate-slide-up">
            <div className="text-center">
              <span className="text-[10px] font-black text-amber-300 bg-amber-400/20 border border-amber-400/50 px-3 py-1 rounded-full uppercase tracking-widest">
                🎉 TABRIKLAYMIZ! YANGI FUTBOLCHI KASHF QILINDI!
              </span>
            </div>

            {/* Revealed 3D Player Card */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <PlayerCard player={openedPlayer} size="standard" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <button
                onClick={handleReset}
                className="btn-primary py-3 px-8 text-xs font-black shadow-xl"
              >
                🎁 Yana Boshqa Pak Ochish
              </button>

              <button
                onClick={onClose}
                className="btn-secondary py-3 px-6 text-xs font-bold"
              >
                Klub Tarkibiga Qo'shish
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
