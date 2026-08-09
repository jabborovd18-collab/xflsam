'use client';
import { useEffect, useState } from 'react';

export default function ClubModal({ club, onClose }) {
  const [activeTab, setActiveTab] = useState('roster'); // 'roster', 'matches', 'stadiums'

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out] z-10 flex flex-col max-h-[90vh]">

        {/* Top Banner */}
        <div
          className="h-36 w-full relative p-6 flex items-end shrink-0"
          style={{
            background: `linear-gradient(135deg, ${club.color1 || '#1B5E20'} 0%, #0A0E17 100%)`,
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
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-2xl border-4 border-[var(--color-xfl-card)] shrink-0"
              style={{
                backgroundColor: club.color1 || '#1B5E20',
                border: `3px solid ${club.color2 || '#00E676'}`,
              }}
            >
              {name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black">
                  {format} LIGA
                </span>
                {club.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-black">
                    ★ Tasdiqlangan
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <p className="text-xs text-[var(--color-xfl-text-dim)]">
                📍 {district} • Tashkil yili: {club.foundedYear || 2023}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 px-6 border-b border-[var(--color-xfl-border)] flex gap-4 shrink-0">
          <button
            onClick={() => setActiveTab('roster')}
            className={`pb-3 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'roster'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-[var(--color-xfl-text-dim)] hover:text-white'
            }`}
          >
            👥 Tarkib va O'yinchilar ({roster.length})
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`pb-3 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'matches'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-[var(--color-xfl-text-dim)] hover:text-white'
            }`}
          >
            🏆 Oxirgi Natijalar ({recentMatches.length})
          </button>

          <button
            onClick={() => setActiveTab('stadiums')}
            className={`pb-3 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'stadiums'
                ? 'border-[var(--color-xfl-accent)] text-[var(--color-xfl-accent)]'
                : 'border-transparent text-[var(--color-xfl-text-dim)] hover:text-white'
            }`}
          >
            🏟️ Yoqtirgan Stadionlar ({favoriteStadiums.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Description & Overview Stats */}
          <div className="grid grid-cols-4 gap-2 bg-[var(--color-xfl-bg)] p-3 rounded-2xl border border-[var(--color-xfl-border)] text-center text-xs">
            <div>
              <div className="font-black text-green-400">{wins}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">G'ALABA</div>
            </div>
            <div>
              <div className="font-black text-gray-300">{draws}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">DURRANG</div>
            </div>
            <div>
              <div className="font-black text-red-400">{losses}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">MAG'LUBIYAT</div>
            </div>
            <div>
              <div className="font-black text-[var(--color-xfl-accent)]">{points}</div>
              <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">OCHKO</div>
            </div>
          </div>

          <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed bg-black/20 p-3.5 rounded-xl border border-[var(--color-xfl-border)]">
            {description}
          </p>

          {/* TAB 1: ROSTER */}
          {activeTab === 'roster' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-extrabold text-[var(--color-xfl-text-dim)] px-1">
                <span>KLUB O'YINCHILARI RO'YXATI ({roster.length} ta)</span>
                <span>REYTING (OVR)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roster.map((player, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs hover:border-[var(--color-xfl-accent)]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white/10 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                        #{player.number || idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-white">{player.name}</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">{player.pos} — Pozitsiya</div>
                      </div>
                    </div>

                    <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-black text-xs">
                      ★ {player.rating || 7.5}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RECENT MATCHES */}
          {activeTab === 'matches' && (
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-[var(--color-xfl-text-dim)] mb-2">
                SO'NGGI O'YIN NATIJALARI
              </div>

              <div className="space-y-2">
                {recentMatches.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${m.isWin ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-bold text-white">vs {m.vs}</div>
                        <div className="text-[10px] text-[var(--color-xfl-text-dim)]">{m.date}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-sm text-[var(--color-xfl-accent)]">{m.score}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">
                        {m.isWin ? "G'alaba" : "O'yin bo'lib o'tdi"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FAVORITE STADIUMS */}
          {activeTab === 'stadiums' && (
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-[var(--color-xfl-text-dim)] mb-2">
                KLUB UB VA SEVIMLI STADIONLARI
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteStadiums.map((stadName, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] text-xs flex items-center gap-3"
                  >
                    <span className="text-2xl">🏟️</span>
                    <div>
                      <div className="font-extrabold text-white">{stadName}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Sevimli uy maydoni</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={() => {
              alert(`Jamoaga qo'shilish so'rovingiz ${name} klubi sardoriga yuborildi!`);
              onClose();
            }}
            className="btn-primary w-full py-3.5 text-xs font-extrabold justify-center shadow-lg shadow-green-500/20"
          >
            ⚽ Jamoaga Qo'shilish So'rovini Yuborish
          </button>
        </div>

      </div>
    </div>
  );
}
