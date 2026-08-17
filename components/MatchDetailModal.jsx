'use client';

import { useState } from 'react';

export default function MatchDetailModal({ match, onClose, onStadiumClick }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'lineup', 'prediction'
  const [simulated, setSimulated] = useState(false);
  const [simResult, setSimResult] = useState(null);

  if (!match) return null;

  const isCompleted = match.status === 'completed';

  const simulateMatch = () => {
    const homeGoals = Math.floor(Math.random() * 4) + 1;
    const awayGoals = Math.floor(Math.random() * 3);
    setSimResult({
      home: homeGoals,
      away: awayGoals,
      mvp: match.homeTeam.includes('Afrosiyob') ? 'Jasurbek Normatov (Afrosiyob FC)' : 'Sardor Usmonov (Urgut Arslon)',
      possession: { home: 56, away: 44 },
    });
    setSimulated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden animate-slide-up z-10 flex flex-col max-h-[90vh]">
        {/* Header Match Scoreboard */}
        <div className="bg-gradient-to-br from-[#0B1E14] via-[#05110B] to-black p-6 relative border-b border-[var(--color-xfl-border)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white font-bold flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          {/* Format & Stadium Chip */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase">
              {match.format || '11x11'} Liga
            </span>
            <span
              onClick={() => onStadiumClick && onStadiumClick(match.stadium)}
              className="px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-bold cursor-pointer hover:bg-blue-500/30"
            >
              🏟️ {match.stadium}
            </span>
          </div>

          {/* Teams and Score/Time */}
          <div className="flex items-center justify-between gap-4 text-center">
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-2xl font-black text-white shadow-lg mb-2 border border-white/20">
                {match.homeTeam.charAt(0)}
              </div>
              <h3 className="text-base font-black text-white leading-tight">{match.homeTeam}</h3>
              <span className="text-[10px] text-gray-400">Mezbon</span>
            </div>

            {/* Score / VS Center */}
            <div className="flex flex-col items-center px-4">
              {isCompleted ? (
                <div className="text-3xl sm:text-4xl font-black gradient-text tabular-nums">
                  {match.homeScore} - {match.awayScore}
                </div>
              ) : (
                <div className="px-4 py-2 rounded-2xl bg-black/60 border border-emerald-500/30">
                  <span className="text-lg font-black text-emerald-400">VS</span>
                  <span className="text-[10px] text-gray-400 block font-bold mt-0.5">{match.date}</span>
                </div>
              )}
              <span className="text-[10px] text-amber-400 font-extrabold uppercase mt-2">
                {isCompleted ? "Tugallangan" : "Kutilmoqda (19:00)"}
              </span>
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-400 flex items-center justify-center text-2xl font-black text-white shadow-lg mb-2 border border-white/20">
                {match.awayTeam.charAt(0)}
              </div>
              <h3 className="text-base font-black text-white leading-tight">{match.awayTeam}</h3>
              <span className="text-[10px] text-gray-400">Mehmon</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--color-xfl-border)] px-6 text-xs font-black">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            📊 Umumiy Tafsilotlar
          </button>
          <button
            onClick={() => setActiveTab('prediction')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'prediction'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            ⚡ AI Simulyatsiya / Bashorat
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-[var(--color-xfl-bg)] p-3.5 rounded-xl border border-[var(--color-xfl-border)]">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Stadion</div>
                  <div className="text-xs font-black text-white mt-0.5">{match.stadium}</div>
                </div>
                <div className="bg-[var(--color-xfl-bg)] p-3.5 rounded-xl border border-[var(--color-xfl-border)]">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Sana va Vaqt</div>
                  <div className="text-xs font-black text-emerald-400 mt-0.5">{match.date} • 19:00</div>
                </div>
                <div className="bg-[var(--color-xfl-bg)] p-3.5 rounded-xl border border-[var(--color-xfl-border)]">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Hakamlar guruhi</div>
                  <div className="text-xs font-black text-white mt-0.5">XFL Rasmiy Bosh Hakam</div>
                </div>
              </div>

              {/* Head to head analysis */}
              <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
                <h4 className="text-xs font-black text-white mb-3 uppercase tracking-wider">
                  O'zaro O'yinlar Tarixi (H2H)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300 pb-2 border-b border-white/5">
                    <span>G'alabalar: <strong>{match.homeTeam}</strong> (3)</span>
                    <span>Durrang: (1)</span>
                    <span><strong>{match.awayTeam}</strong> (1)</span>
                  </div>
                  <div className="text-[11px] text-gray-400 pt-1">
                    Oxirgi uchrashuv: Afrosiyob FC 3 - 1 Urgut Arslon (Afrosiyob Arena)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prediction' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-300">
                XFL statistik modeli asosida jamoalarning reytinglari va formasi tahlil qilinadi.
              </p>

              {!simulated ? (
                <button
                  onClick={simulateMatch}
                  className="btn-primary py-3.5 px-8 text-xs font-black shadow-xl"
                >
                  ⚡ O'yinni Simulyatsiya Qilish
                </button>
              ) : (
                <div className="bg-[var(--color-xfl-bg)] p-6 rounded-2xl border border-emerald-500/40 animate-slide-up space-y-4">
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                    AI TAXMINIY NATIJASI
                  </div>
                  <div className="text-4xl font-black gradient-text">
                    {match.homeTeam} {simResult.home} - {simResult.away} {match.awayTeam}
                  </div>
                  <div className="text-xs text-amber-300 font-bold">
                    ⭐ Taxminiy O'yin Qahramoni: {simResult.mvp}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    To'p nazorati: Mezbon {simResult.possession.home}% — Mehmon {simResult.possession.away}%
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
