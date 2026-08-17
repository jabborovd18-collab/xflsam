'use client';

import { useEffect, useState } from 'react';
import TacticalPitch from './TacticalPitch';
import PlayerCard from './PlayerCard';

export default function ClubModal({ club, onClose, onStadiumClick }) {
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch', 'roster', 'matches', 'stadiums'
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [joinPhone, setJoinPhone] = useState('');
  const [joinPosition, setJoinPosition] = useState('ST');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!club) return null;

  const format = club.format || "11x11";
  const name = club.name || "Klub";
  const district = club.district || "Samarqand shahar";
  const description = club.description || "Samarqand viloyati xavaskor futbol klubi.";
  const wins = club.wins ?? club.stats?.wins ?? 0;
  const draws = club.draws ?? club.stats?.draws ?? 0;
  const losses = club.losses ?? club.stats?.losses ?? 0;
  const points = club.points ?? club.stats?.points ?? (wins * 3 + draws);

  const roster = club.roster || [
    { name: "Jasurbek Normatov", pos: "ST", rating: 8.4, number: 9 },
    { name: "Azizbek Tursunov", pos: "CDM", rating: 7.1, number: 6 },
    { name: "Farrux To'xtasinov", pos: "LW", rating: 7.0, number: 11 },
    { name: "Bobur Ismoilov", pos: "CB", rating: 7.4, number: 4 },
    { name: "Sanjar Raximov", pos: "GK", rating: 7.8, number: 1 },
  ];

  const recentMatches = club.recentMatches || [
    { vs: "Urgut Arslon", score: "3 - 1", isWin: true, date: "08.08.2025" },
    { vs: "Registon FC", score: "2 - 2", isWin: false, date: "01.08.2025" },
    { vs: "Kattaqo'rg'on United", score: "4 - 0", isWin: true, date: "25.07.2025" },
  ];

  const favoriteStadiums = club.favoriteStadiums || [
    "Afrosiyob Arena", "Registon Mini Arena"
  ];

  const handleJoinRequest = (e) => {
    e.preventDefault();
    if (!joinPhone) {
      alert("Iltimos, telefon raqamingizni kiriting!");
      return;
    }
    setJoinSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden animate-slide-up z-10 flex flex-col max-h-[92vh]">

        {/* Top Banner Header */}
        <div
          className="h-44 w-full relative p-6 flex items-end shrink-0"
          style={{
            background: `linear-gradient(135deg, ${club.color1 || '#1B5E20'} 0%, #060e0a 100%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-black text-white font-bold transition-colors z-20"
          >
            ✕
          </button>

          <div className="flex items-end gap-4 translate-y-6">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-2xl border-4 border-[var(--color-xfl-card)] shrink-0"
              style={{
                backgroundColor: club.color1 || '#1B5E20',
                border: `3px solid ${club.color2 || '#00E676'}`,
              }}
            >
              {name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase">
                  {format} LIGA
                </span>
                {club.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black">
                    ★ TASDIQLANGAN
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{name}</h2>
              <p className="text-xs text-[var(--color-xfl-text-dim)]">
                📍 {district} • Tashkil yili: {club.foundedYear || 2023}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="mt-10 px-6 border-b border-[var(--color-xfl-border)] flex gap-2 sm:gap-6 shrink-0 overflow-x-auto text-xs font-black">
          <button
            onClick={() => setActiveTab('pitch')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pitch'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>⚽</span> Taktik Maydon (Tarkib)
          </button>

          <button
            onClick={() => setActiveTab('roster')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'roster'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>👥</span> O'yinchilar ({roster.length})
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'matches'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>🏆</span> Natijalar ({recentMatches.length})
          </button>

          <button
            onClick={() => setActiveTab('stadiums')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'stadiums'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>🏟️</span> Uy Stadionlari
          </button>

          <button
            onClick={() => setActiveTab('join')}
            className={`pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'join'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span>✍️</span> A'zo Bo'lish
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2.5 bg-[var(--color-xfl-bg)] p-3.5 rounded-2xl border border-[var(--color-xfl-border)] text-center text-xs">
            <div>
              <div className="font-black text-green-400 text-sm sm:text-base">{wins}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">G'ALABA</div>
            </div>
            <div>
              <div className="font-black text-gray-300 text-sm sm:text-base">{draws}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">DURRANG</div>
            </div>
            <div>
              <div className="font-black text-red-400 text-sm sm:text-base">{losses}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">MAG'LUBIYAT</div>
            </div>
            <div>
              <div className="font-black text-[var(--color-xfl-accent)] text-sm sm:text-base">{points}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">OCHKO</div>
            </div>
          </div>

          {/* TAB 1: TACTICAL PITCH */}
          {activeTab === 'pitch' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-300">
                  {name} jamoasining {format} maydondagi taktik joylashuvi:
                </span>
                <span className="text-[10px] text-emerald-400 font-extrabold">
                  O'yinchiga bosing ➔ FC26 kartasi ochiladi
                </span>
              </div>

              <TacticalPitch
                format={format}
                roster={roster}
                onPlayerClick={(player) => setSelectedPlayer(player)}
              />
            </div>
          )}

          {/* TAB 2: ROSTER LIST */}
          {activeTab === 'roster' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-extrabold text-[var(--color-xfl-text-dim)] px-1">
                <span>KLUB O'YINCHILARI RO'YXATI ({roster.length} ta)</span>
                <span>REYTING (OVR)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {roster.map((player, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPlayer(player)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs hover:border-[var(--color-xfl-accent)] cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0 border border-white/10">
                        #{player.number || idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-white text-sm">{player.name}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{player.pos} — Pozitsiya</div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-black text-xs border border-amber-500/30">
                      ★ {player.rating || 7.5}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MATCHES */}
          {activeTab === 'matches' && (
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-[var(--color-xfl-text-dim)] mb-2">
                SO'NGGI O'YIN NATIJALARI
              </div>

              <div className="space-y-2.5">
                {recentMatches.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${m.isWin ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'}`} />
                      <div>
                        <div className="font-bold text-white text-sm">vs {m.vs}</div>
                        <div className="text-[10px] text-[var(--color-xfl-text-dim)]">{m.date} • {format} Liga</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-base text-[var(--color-xfl-accent)]">{m.score}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">
                        {m.isWin ? "G'alaba" : "O'yin tugadi"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STADIUMS */}
          {activeTab === 'stadiums' && (
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-[var(--color-xfl-text-dim)] mb-2">
                KLUB UY MAYDONLARI VA MASHG'ULOT BAZALARI
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteStadiums.map((stadName, idx) => (
                  <div
                    key={idx}
                    onClick={() => onStadiumClick && onStadiumClick(stadName)}
                    className="p-4 rounded-2xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] hover:border-emerald-500 text-xs flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏟️</span>
                      <div>
                        <div className="font-extrabold text-white text-sm group-hover:text-emerald-400 transition-colors">
                          {stadName}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-semibold">Doimiy uy maydoni</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-white">Bron qilish →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: JOIN REQUEST FORM */}
          {activeTab === 'join' && (
            <div className="bg-[var(--color-xfl-bg)] p-6 rounded-2xl border border-[var(--color-xfl-border)] space-y-4">
              {!joinSubmitted ? (
                <form onSubmit={handleJoinRequest} className="space-y-4">
                  <h4 className="text-sm font-black text-white">
                    {name} jamoasiga ko'rikdan o'tish yoki a'zo bo'lish uchun so'rov yuboring:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                        Telefon raqamingiz
                      </label>
                      <input
                        type="text"
                        placeholder="+998 90 123 45 67"
                        value={joinPhone}
                        onChange={(e) => setJoinPhone(e.target.value)}
                        className="input-field py-2.5 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                        O'ynaydigan Pozitsiyangiz
                      </label>
                      <select
                        value={joinPosition}
                        onChange={(e) => setJoinPosition(e.target.value)}
                        className="input-field py-2.5 text-xs"
                      >
                        <option value="GK">Darvozabon (GK)</option>
                        <option value="CB">Himoyachi (CB)</option>
                        <option value="CM">Yarim himoyachi (CM)</option>
                        <option value="LW">Qanot hujumchi (LW)</option>
                        <option value="ST">Hujumchi (ST)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3 text-xs font-black justify-center shadow-lg"
                  >
                    🚀 So'rovni Klub Sardoriga Yuborish
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-2 animate-slide-up">
                  <span className="text-4xl">✅</span>
                  <h4 className="text-base font-black text-emerald-400">So'rovingiz qabul qilindi!</h4>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    {name} jamoasi sardori sizning telefon raqamingiz (+{joinPhone}) orqali navbatdagi mashg'ulot vaqtini aytadi.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Embedded Player FC26 Card Viewer Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedPlayer(null)} />
          <div className="relative z-10 animate-slide-up">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <PlayerCard player={selectedPlayer} />
          </div>
        </div>
      )}
    </div>
  );
}
