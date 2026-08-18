'use client';

import { useState } from 'react';
import { demoOyinchilar } from '@/data/demo-data';
import PlayerCard from '@/components/PlayerCard';
import CreatePlayerModal from '@/components/CreatePlayerModal';
import PlayerRadarHeatmap from '@/components/PlayerRadarHeatmap';
import { exportPlayerCardAsPNG } from '@/lib/exportCard';

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
    pace: 86,
    shooting: 88,
    passing: 75,
    dribbling: 82,
    defense: 40,
    physical: 80,
    isOnTransfer: true,
    isVerified: true,
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [transferNote, setTransferNote] = useState("Yangi jamoa va turnirlarga tayyorman. Hujumchi pozitsiyasida o'ynayman.");

  const toggleTransfer = () => {
    setUser(prev => ({ ...prev, isOnTransfer: !prev.isOnTransfer }));
  };

  const toggleVerification = () => {
    setUser(prev => ({ ...prev, isVerified: !prev.isVerified }));
  };

  return (
    <div className="page-container pb-28 space-y-8">
      {/* PROFILE TOP BANNER */}
      <div className="glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden border border-[var(--color-xfl-border)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* User Big Avatar Initial */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#1B5E20] to-[#00E676] p-1 shrink-0 shadow-xl shadow-green-500/25 border border-white/20 flex items-center justify-center">
          <div className="w-full h-full rounded-[22px] bg-[var(--color-xfl-card)] flex items-center justify-center text-4xl font-black text-[var(--color-xfl-accent)]">
            {(user.fullName || 'J')[0]}
          </div>
        </div>

        {/* User Info Details */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl sm:text-4xl font-black text-white">{user.fullName}</h1>
                {user.isVerified ? (
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-black flex items-center gap-1 shadow-sm">
                    ★ TASDIQLANGAN (GOLD)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-500/20 border border-slate-500/40 text-slate-300 text-xs font-bold">
                    ◇ ODDIY PROFIL (SILVER)
                  </span>
                )}
              </div>
              <p className="text-[var(--color-xfl-text-dim)] text-xs sm:text-sm mt-1">
                @jasur_st • {user.age} yosh • 📍 {user.district}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                {user.club && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 border border-blue-500/30 text-blue-400 text-xs font-black">
                    🛡️ {user.club}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 border border-emerald-500/30 text-[var(--color-xfl-accent)] text-xs font-black">
                  🎯 {user.position} — Markaziy Hujumchi
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => exportPlayerCardAsPNG(user)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                title="Instagram / Telegram Story uchun rasm qilib saqlash"
              >
                <span>📸</span>
                <span>Kartani Yuklab Olish (PNG)</span>
              </button>

              <button
                onClick={() => setIsEditOpen(true)}
                className="btn-primary py-2.5 px-5 text-xs font-black shadow-lg"
              >
                ✏️ Tahrirlash
              </button>

              <button
                onClick={toggleVerification}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border ${
                  user.isVerified
                    ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 hover:bg-amber-400/20'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black border-amber-300 font-black shadow-lg shadow-amber-500/25'
                }`}
              >
                {user.isVerified ? '◇ Kumush Rejim' : '★ Oltin Maqom'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: 3D FC26 CARD & TRANSFER CONTROLS */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card p-6 flex flex-col items-center">
            <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span>★ ELEKTRON FC 26 KARTANGIZ</span>
            </div>

            {/* 3D Interactive Card */}
            <div className="my-2 transform hover:scale-105 transition-transform duration-300">
              <PlayerCard player={user} size="standard" />
            </div>

            <button
              onClick={() => exportPlayerCardAsPNG(user)}
              className="mt-4 btn-primary w-full py-2.5 text-xs font-black justify-center flex items-center gap-2"
            >
              <span>📸</span>
              <span>HD Rasm (PNG) Yuklash</span>
            </button>
          </div>

          {/* TRANSFER STATUS BOX */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-sm text-white">Transfer Bozori</h4>
                <p className="text-xs text-[var(--color-xfl-text-dim)]">Klublar sizni topa olishi uchun</p>
              </div>
              <button
                onClick={toggleTransfer}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  user.isOnTransfer
                    ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] font-black shadow-md shadow-green-500/30'
                    : 'bg-slate-700 text-gray-300'
                }`}
              >
                {user.isOnTransfer ? '🟢 TRANSFERDA' : '🔴 YOPILGAN'}
              </button>
            </div>

            <div className="bg-[var(--color-xfl-bg)] p-3 rounded-xl border border-[var(--color-xfl-border)]">
              <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">Transfer E'lon Matni:</label>
              <textarea
                rows="2"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                className="w-full bg-transparent text-xs text-gray-200 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT 2 COLUMNS: SOFASCORE RADAR & HEATMAP & METRICS & TROPHIES */}
        <div className="space-y-6 lg:col-span-2">

          {/* 4 CORE CAREER STAT METRICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[
              { label: "O'YINLAR", val: user.matches || 24, icon: "⚽", col: "text-white" },
              { label: "GOLLAR", val: user.goals || 18, icon: "🎯", col: "text-amber-400" },
              { label: "ASSISTLAR", val: user.assists || 7, icon: "👟", col: "text-emerald-400" },
              { label: "OVR REYTING", val: Math.round(user.rating * 10) || 84, icon: "⭐", col: "text-yellow-300" },
            ].map((st, i) => (
              <div key={i} className="glass-card p-4 text-center space-y-1">
                <div className="text-2xl">{st.icon}</div>
                <div className={`text-2xl sm:text-3xl font-black ${st.col} tabular-nums`}>{st.val}</div>
                <div className="text-[9px] font-black text-[var(--color-xfl-text-dim)] uppercase tracking-wider">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* SOFASCORE SKILL RADAR & THERMAL PITCH HEATMAP */}
          <PlayerRadarHeatmap player={user} />

          {/* DETAILED FC26 SKILL BARS */}
          <div className="glass-card p-6 sm:p-7 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>📊</span> FC 26 Texnik Ko'rsatkichlar Tahlili
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Tezlik (PAC)", val: user.pace || 86, col: "bg-blue-500" },
                { name: "Zarba (SHO)", val: user.shooting || 88, col: "bg-red-500" },
                { name: "Uzatish (PAS)", val: user.passing || 75, col: "bg-yellow-500" },
                { name: "Dribling (DRI)", val: user.dribbling || 82, col: "bg-purple-500" },
                { name: "Himoya (DEF)", val: user.defense || 40, col: "bg-green-500" },
                { name: "Jismoniy (PHY)", val: user.physical || 80, col: "bg-orange-500" },
              ].map((sk, idx) => (
                <div key={idx} className="bg-[var(--color-xfl-bg)] p-3.5 rounded-2xl border border-[var(--color-xfl-border)] space-y-2">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-gray-200">{sk.name}</span>
                    <span className="text-[var(--color-xfl-accent)] tabular-nums">{sk.val}</span>
                  </div>
                  <div className="stat-bar">
                    <div className={`stat-bar-fill ${sk.col}`} style={{ width: `${sk.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TROPHY ROOM & ACHIEVEMENTS */}
          <div className="glass-card p-6 sm:p-7 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>🏆</span> Shaxsiy Yutuqlar va Mukofotlar
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: "To'purar", desc: "Mavsumda 15+ gol", icon: "🥇", unlocked: true },
                { title: "Xet-Trik", desc: "Bir o'yinda 3 ta gol", icon: "⚽", unlocked: true },
                { title: "Hafta Yulduzi", desc: "Hafta ramziy jamoasi", icon: "⭐", unlocked: true },
                { title: "Oltin Butsa", desc: "Liga to'purari nomzodi", icon: "👑", unlocked: true },
              ].map((trophy, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)] text-center space-y-1.5 hover:scale-105 transition-transform"
                >
                  <div className="text-3xl">{trophy.icon}</div>
                  <div className="text-xs font-black text-white">{trophy.title}</div>
                  <div className="text-[9px] text-gray-400 leading-tight">{trophy.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <CreatePlayerModal
          onClose={() => setIsEditOpen(false)}
          onCreated={(updatedUser) => {
            setUser(updatedUser);
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}
