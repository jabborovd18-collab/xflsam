'use client';

import { useState } from 'react';
import { demoOyinchilar } from '@/data/demo-data';
import PlayerCard from '@/components/PlayerCard';

export default function ProfilPage() {
  const [user, setUser] = useState(demoOyinchilar[0] || {
    id: 'my-profile',
    fullName: "Jasurbek Normatov",
    position: "ST",
    age: 23,
    district: "Samarqand shahar",
    club: "Afrosiyob FC",
    matches: 24,
    goals: 18,
    assists: 7,
    rating: 8.4,
    pace: 85,
    shooting: 88,
    passing: 72,
    dribbling: 78,
    defense: 35,
    physical: 80,
    isOnTransfer: true,
    isVerified: true,
  });

  const toggleTransfer = () => {
    setUser(prev => ({ ...prev, isOnTransfer: !prev.isOnTransfer }));
  };

  const toggleVerification = () => {
    setUser(prev => ({ ...prev, isVerified: !prev.isVerified }));
  };

  return (
    <div className="page-container pb-24">
      {/* PROFILE HEADER */}
      <div className="glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-xfl-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[var(--color-xfl-primary)] to-[var(--color-xfl-accent)] p-1 shrink-0 shadow-lg shadow-green-500/20">
          <div className="w-full h-full rounded-xl bg-[var(--color-xfl-card)] flex items-center justify-center text-4xl font-black text-[var(--color-xfl-accent)]">
            {(user.fullName || user.ism || 'J')[0]}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl font-extrabold text-white">{user.fullName || user.ism}</h1>
                {user.isVerified ? (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold flex items-center gap-1">
                    ★ Tasdiqlangan
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-gray-500/20 border border-gray-500/50 text-gray-400 text-xs font-bold">
                    ◇ Oddiy Profil
                  </span>
                )}
              </div>
              <p className="text-[var(--color-xfl-text-dim)] text-sm mt-1">
                @jasur_st • {user.age || user.yosh} yosh • {user.district}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                {user.club && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-blue-400 text-xs font-bold">
                    ⚽ {user.club}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-[var(--color-xfl-accent)] text-xs font-bold">
                  {user.position} — Hujumchi
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={toggleVerification}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                  user.isVerified
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 hover:bg-amber-500/20'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-950 border-amber-400 shadow-lg shadow-amber-500/20'
                }`}
              >
                {user.isVerified ? '◇ Oddiy Versiyaga O\'tish' : '★ FC26 Oltin Kartasini Olish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COL: FC26 PLAYER CARD & TRANSFER TOGGLE */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card p-6 flex flex-col items-center">
            <h3 className="text-xs font-extrabold text-[var(--color-xfl-accent)] uppercase tracking-widest mb-4">
              FC26 ELEKTRON KARTANGIZ
            </h3>

            {/* FC26 Card rendering */}
            <div className="my-2 transform hover:scale-105 transition-transform duration-300">
              <PlayerCard player={user} />
            </div>

            <p className="text-[11px] text-[var(--color-xfl-text-dim)] text-center mt-4">
              {user.isVerified
                ? "★ Sizning kartangiz platforma tomonidan tasdiqlangan va Oltin maqomiga ega!"
                : "◇ Sizning kartangiz hozircha oddiy (tasdiqlanmagan). Tasdiqlash uchun admin bilan bog'laning."}
            </p>
          </div>

          {/* TRANSFER STATUS BOX */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-sm text-[var(--color-xfl-text)]">Transfer Holati</h4>
                <p className="text-xs text-[var(--color-xfl-text-dim)]">Klublar sizni topishlari uchun</p>
              </div>
              <button
                onClick={toggleTransfer}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  user.isOnTransfer
                    ? 'bg-[var(--color-xfl-accent)] text-black font-extrabold'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {user.isOnTransfer ? 'TRANSFERDA' : 'YOPILGAN'}
              </button>
            </div>
            <p className="text-xs text-[var(--color-xfl-text-dim)] bg-[var(--color-xfl-bg)] p-3 rounded-lg border border-[var(--color-xfl-border)]">
              {user.isOnTransfer
                ? "Sizning kartangiz barcha klub rahbarlariga Transfer oynasida ko'rinmoqda."
                : "Siz transfer oynasida emassiz. Boshqa klublar sizga taklif yubora olmaydi."}
            </p>
          </div>
        </div>

        {/* RIGHT COL: STATS DASHBOARD */}
        <div className="space-y-6 lg:col-span-2">
          {/* STAT CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "O'YINLAR", val: user.matches || 24, icon: "⚽" },
              { label: "GOLLAR", val: user.goals || 18, icon: "🎯" },
              { label: "ASSISTLAR", val: user.assists || 7, icon: "👟" },
              { label: "REYTING", val: user.rating || 8.4, icon: "⭐" },
            ].map((st, i) => (
              <div key={i} className="glass-card p-4 text-center">
                <div className="text-2xl mb-1">{st.icon}</div>
                <div className="text-2xl font-black text-white">{st.val}</div>
                <div className="text-[10px] font-bold text-[var(--color-xfl-text-dim)] uppercase tracking-wider mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* DETAILED FC26 SKILLS BREAKDOWN */}
          <div className="glass-card p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>📊</span> FC26 Texnik Ko'rsatkichlar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Tezlik (PAC)", val: user.pace || 85, col: "bg-blue-500" },
                { name: "Zarba (SHO)", val: user.shooting || 88, col: "bg-red-500" },
                { name: "Uzatish (PAS)", val: user.passing || 72, col: "bg-yellow-500" },
                { name: "Dribling (DRI)", val: user.dribbling || 78, col: "bg-purple-500" },
                { name: "Himoya (DEF)", val: user.defense || 35, col: "bg-green-500" },
                { name: "Jismoniy (PHY)", val: user.physical || 80, col: "bg-orange-500" },
              ].map((sk, idx) => (
                <div key={idx} className="bg-[var(--color-xfl-bg)] p-3 rounded-xl border border-[var(--color-xfl-border)]">
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-[var(--color-xfl-text)]">{sk.name}</span>
                    <span className="text-[var(--color-xfl-accent)]">{sk.val}</span>
                  </div>
                  <div className="stat-bar">
                    <div className={`stat-bar-fill ${sk.col}`} style={{ width: `${sk.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MATCH HISTORY */}
          <div className="glass-card p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>🏆</span> So'nggi O'yinlardagi Natijalar
            </h3>
            <div className="space-y-3">
              {[
                { vs: "Urgut Arslon", res: "3 - 1", goals: 2, rating: "8.8 (MVP)", date: "08.08.2025" },
                { vs: "Registon FC", res: "2 - 2", goals: 1, rating: "8.2", date: "01.08.2025" },
                { vs: "Jomboy Stars", res: "4 - 0", goals: 3, rating: "9.5 (MVP)", date: "25.07.2025" },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[var(--color-xfl-bg)] rounded-xl border border-[var(--color-xfl-border)] text-xs">
                  <div>
                    <div className="font-bold text-white">vs {m.vs}</div>
                    <div className="text-[10px] text-[var(--color-xfl-text-dim)]">{m.date}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-[var(--color-xfl-accent)]">{m.res}</div>
                    <div className="text-[10px] text-gray-400">{m.goals} gol</div>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 font-bold">
                    ★ {m.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
