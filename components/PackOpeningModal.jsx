'use client';

import { useState, useEffect } from 'react';
import sounds from '@/lib/audio';
import PlayerCard from './PlayerCard';
import { demoOyinchilar, demoKlublar } from '@/data/demo-data';

export default function PackOpeningModal({ onClose }) {
  // Stages: 'select', 'tunnel', 'flag', 'position', 'club', 'walkout', 'card'
  const [stage, setStage] = useState('select');
  const [selectedPack, setSelectedPack] = useState(null);
  const [openedPlayer, setOpenedPlayer] = useState(null);
  const [skipAvailable, setSkipAvailable] = useState(false);

  const packs = [
    {
      id: 'gold',
      name: "Samarqand Oltin Jumbo Paki",
      desc: "Kafolatlangan 80+ OVR Oltin Yulduz (Walkout kafolati)",
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
    setSkipAvailable(true);

    // Pick a player
    const eligible = demoOyinchilar.filter(p => (p.rating || 7.5) * 10 >= pack.ratingMin);
    const chosen = eligible.length > 0
      ? eligible[Math.floor(Math.random() * eligible.length)]
      : demoOyinchilar[0];

    setOpenedPlayer(chosen);

    // 1. Stage: TUNNEL (0s)
    setStage('tunnel');
    sounds.playPackOpen();

    // 2. Stage: COUNTRY (1.4s) -> 🇺🇿 O'ZBEKISTON
    setTimeout(() => {
      setStage('flag');
      sounds.playKick();

      // 3. Stage: POSITION (2.8s) -> CAM / ST / LW / CDM
      setTimeout(() => {
        setStage('position');
        sounds.playKick();

        // 4. Stage: CLUB (4.2s) -> AFROSIYOB FC / REGISTON FC
        setTimeout(() => {
          setStage('club');
          sounds.playKick();

          // 5. Stage: WALKOUT FIREWORKS (5.6s) -> 84+ WALKOUT
          setTimeout(() => {
            setStage('walkout');
            sounds.playWalkout();

            // 6. Stage: FINAL 3D CARD REVEAL (7.5s)
            setTimeout(() => {
              setStage('card');
              sounds.playGoal();
            }, 2000);
          }, 1400);
        }, 1400);
      }, 1400);
    }, 1400);
  };

  const handleSkip = () => {
    setStage('card');
    sounds.playGoal();
  };

  const handleReset = () => {
    setStage('select');
    setSelectedPack(null);
    setOpenedPlayer(null);
    setSkipAvailable(false);
  };

  // Find club color
  const playerClub = demoKlublar.find(c => c.name === openedPlayer?.club) || {
    color1: '#1B5E20',
    color2: '#00E676'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
      {/* Darkened stadium tunnel backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={stage === 'card' ? onClose : undefined} />

      {/* Skip Button in top right during animation */}
      {skipAvailable && stage !== 'card' && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-black text-white flex items-center gap-1.5 transition-all shadow-lg"
        >
          <span>O'tkazib yuborish (Skip)</span>
          <span>⏭️</span>
        </button>
      )}

      {/* Main Experience Box */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#0c121e] via-[#05080e] to-black border-2 border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[580px] p-6 animate-slide-up z-10">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-colors z-50"
        >
          ✕
        </button>

        {/* ------------------------------------------------------------- */}
        {/* STAGE 0: PACK SELECTION MENU */}
        {/* ------------------------------------------------------------- */}
        {stage === 'select' && (
          <div className="w-full space-y-6 text-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase mb-2">
                <span>📦 EA SPORTS FC 26 PACK STORE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Samarqand FC 26 Paklarini Ochish
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Pakni tanlang va haqiqiy EA Sports FC walkout animatsiyasini tomosha qiling!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {packs.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => handleOpenPack(pack)}
                  className="group relative glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex flex-col justify-between"
                >
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

        {/* ------------------------------------------------------------- */}
        {/* STAGE 1: PACK TUNNEL OPENING & SMOKE SHAKE */}
        {/* ------------------------------------------------------------- */}
        {stage === 'tunnel' && (
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {/* Spotlight Beam */}
            <div className="absolute top-0 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <div className="relative w-52 h-72 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 p-6 flex flex-col justify-between shadow-2xl shadow-amber-500/50 border-4 border-white animate-bounce">
              <div className="fc26-foil-overlay" />
              <div className="text-6xl">👑</div>
              <div className="text-xl font-black text-black uppercase tracking-widest">
                XFL 2026
              </div>
              <div className="text-xs font-black text-black uppercase">OCHILMOQDA...</div>
            </div>

            <h3 className="text-xl font-black text-amber-300 uppercase tracking-widest animate-pulse">
              PAK YORILMOQDA... 🔥
            </h3>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 2: STEP A — COUNTRY REVEAL (DAVLAT: UZB 🇺🇿) */}
        {/* ------------------------------------------------------------- */}
        {stage === 'flag' && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            {/* Top Walkout Header */}
            <div className="text-[11px] font-black text-amber-400 uppercase tracking-[0.3em] animate-pulse">
              ★ EA SPORTS FC WALKOUT ★
            </div>

            {/* Giant Glowing Country Flag */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-b from-blue-900/40 via-emerald-950/50 to-black border-2 border-white/30 shadow-2xl shadow-blue-500/40 transform scale-125 my-4 animate-pulse">
              <div className="text-8xl filter drop-shadow-2xl">
                🇺🇿
              </div>
            </div>

            <h2 className="text-4xl font-black text-white tracking-widest uppercase mt-2 drop-shadow-lg">
              O'ZBEKISTON
            </h2>
            <div className="text-xs font-bold text-gray-400">Millat / Davlat</div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 3: STEP B — POSITION REVEAL (JOYLASHISHI: CAM / ST / LW) */}
        {/* ------------------------------------------------------------- */}
        {stage === 'position' && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            <div className="text-[11px] font-black text-amber-400 uppercase tracking-[0.3em]">
              ★ EA SPORTS FC WALKOUT ★
            </div>

            {/* Country Pill above */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-white">
              <span>🇺🇿</span>
              <span>O'ZBEKISTON</span>
            </div>

            {/* Giant Glowing Position Card */}
            <div className="relative px-12 py-6 rounded-3xl bg-gradient-to-b from-red-600/30 via-red-950/60 to-black border-4 border-red-500/80 shadow-2xl shadow-red-500/50 transform scale-125 my-4">
              <div className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                {openedPlayer?.position || 'CAM'}
              </div>
            </div>

            <h2 className="text-2xl font-black text-red-400 tracking-wider uppercase">
              POZITSIYA: {openedPlayer?.position || 'CAM'}
            </h2>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 4: STEP C — CLUB REVEAL (KLUB EMBLEMASI & NOMI) */}
        {/* ------------------------------------------------------------- */}
        {stage === 'club' && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            <div className="text-[11px] font-black text-amber-400 uppercase tracking-[0.3em]">
              ★ EA SPORTS FC WALKOUT ★
            </div>

            {/* Country & Position Badges */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-black text-white">
                🇺🇿 O'ZBEKISTON
              </span>
              <span className="px-3 py-1 rounded-full bg-red-600/30 border border-red-500 text-xs font-black text-white">
                {openedPlayer?.position || 'CAM'}
              </span>
            </div>

            {/* Giant Club Crest Shield */}
            <div
              style={{
                backgroundColor: playerClub.color1,
                borderColor: playerClub.color2,
                boxShadow: `0 0 50px ${playerClub.color2}80`,
              }}
              className="w-36 h-36 rounded-3xl border-4 flex items-center justify-center text-5xl font-black text-white shadow-2xl transform scale-110 my-4"
            >
              {(openedPlayer?.club || 'XFL').substring(0, 2).toUpperCase()}
            </div>

            <h2 className="text-3xl font-black text-white tracking-wider uppercase">
              {openedPlayer?.club || "Afrosiyob FC"}
            </h2>
            <div className="text-xs font-bold text-emerald-400">Samarqand Viloyati Klubi</div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 5: WALKOUT STAGE WITH FIREWORKS & SMOKE PILLARS */}
        {/* ------------------------------------------------------------- */}
        {stage === 'walkout' && (
          <div className="flex flex-col items-center justify-center space-y-6 text-center w-full">
            {/* Dramatic Side Stage Pillars */}
            <div className="flex items-center justify-between w-full max-w-lg px-4">
              <div className="w-6 h-56 bg-gradient-to-t from-amber-500 via-yellow-300 to-transparent rounded-full blur-sm animate-pulse" />
              
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  <span className="text-2xl">🇺🇿</span>
                  <span className="text-xl font-black text-red-400">{openedPlayer?.position || 'CAM'}</span>
                  <span className="text-xl font-black text-emerald-400">{openedPlayer?.club || 'AF'}</span>
                </div>

                <div className="text-6xl sm:text-7xl font-black gradient-text tracking-tighter uppercase drop-shadow-2xl animate-bounce">
                  ★ WALKOUT! ★
                </div>

                <div className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest">
                  {openedPlayer?.fullName || openedPlayer?.name}
                </div>
              </div>

              <div className="w-6 h-56 bg-gradient-to-t from-amber-500 via-yellow-300 to-transparent rounded-full blur-sm animate-pulse" />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 6: FULL 3D FC 26 CARD REVEAL */}
        {/* ------------------------------------------------------------- */}
        {stage === 'card' && openedPlayer && (
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-slide-up">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg">
                🎉 YANGI FC 26 OLTIN YULDUZ KASHF QILINDI!
              </div>
            </div>

            {/* 3D FC26 Interactive Card */}
            <div className="transform hover:scale-105 transition-transform duration-300 my-1 drop-shadow-2xl">
              <PlayerCard player={openedPlayer} size="standard" />
            </div>

            {/* Stats summary banner */}
            <div className="bg-black/60 px-6 py-2.5 rounded-2xl border border-white/10 flex items-center gap-6 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">REYTING</span>
                <strong className="text-base text-amber-300 font-black">{Math.round((openedPlayer.rating || 7.8) * 10)} OVR</strong>
              </div>
              <div className="w-[1px] h-6 bg-white/20" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">POZITSIYA</span>
                <strong className="text-base text-white font-black">{openedPlayer.position}</strong>
              </div>
              <div className="w-[1px] h-6 bg-white/20" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold">KLUB</span>
                <strong className="text-base text-emerald-400 font-black">{openedPlayer.club || "Erkin Agent"}</strong>
              </div>
            </div>

            {/* Action Buttons */}
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
                Klub Tarkibiga Saqlash
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
