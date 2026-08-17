'use client';

export default function ClubCard({ club, onClick }) {
  if (!club) return null;

  const format = club.format || "11x11";
  const name = club.name || "Klub";
  const district = club.district || "Samarqand shahar";
  const wins = club.wins ?? club.stats?.wins ?? 0;
  const draws = club.draws ?? club.stats?.draws ?? 0;
  const losses = club.losses ?? club.stats?.losses ?? 0;
  const points = club.points ?? (wins * 3 + draws);
  const membersCount = club.membersCount || club.roster?.length || 15;
  const favoriteStadium = club.favoriteStadiums?.[0] || "Samarqand Stadioni";

  const formatBadgeStyles = {
    '6x6': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    '9x9': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    '11x11': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  }[format] || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  return (
    <div
      onClick={() => onClick && onClick(club)}
      className="glass-card p-5 sm:p-6 flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-[var(--color-xfl-border)] group relative overflow-hidden"
    >
      {/* Top Club Color Stripe */}
      <div
        className="h-2 w-full absolute top-0 left-0"
        style={{
          background: `linear-gradient(90deg, ${club.color1 || '#1B5E20'} 0%, ${club.color2 || '#00E676'} 100%)`,
        }}
      />

      <div>
        {/* Format Badge & Verified Status */}
        <div className="flex justify-between items-center mb-4 pt-1">
          <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border ${formatBadgeStyles}`}>
            {format} Liga
          </span>
          {club.isVerified ? (
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1 shadow-sm">
              ★ TASDIQLANGAN
            </span>
          ) : (
            <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
              Havaskor Klub
            </span>
          )}
        </div>

        {/* Club Emblem & Info */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-xl shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300"
            style={{
              backgroundColor: club.color1 || '#1B5E20',
              border: `2.5px solid ${club.color2 || '#00E676'}`,
              boxShadow: `0 8px 20px -4px ${club.color1 || '#1B5E20'}80`,
            }}
          >
            {name.charAt(0)}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-black text-white group-hover:text-[var(--color-xfl-accent)] transition-colors truncate">
              {name}
            </h3>
            <p className="text-xs text-[var(--color-xfl-text-dim)] truncate mt-0.5">
              📍 {district}
            </p>
            <div className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <span>🏟️</span>
              <span className="truncate">{favoriteStadium}</span>
            </div>
          </div>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-4 gap-1.5 bg-[var(--color-xfl-bg)] p-3 rounded-2xl border border-[var(--color-xfl-border)] text-center mb-4">
          <div>
            <div className="text-xs font-black text-green-400">{wins}</div>
            <div className="text-[8px] text-[var(--color-xfl-text-dim)] font-bold">G'ALABA</div>
          </div>
          <div>
            <div className="text-xs font-black text-gray-300">{draws}</div>
            <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">DURRANG</div>
          </div>
          <div>
            <div className="text-xs font-black text-red-400">{losses}</div>
            <div className="text-[8px] text-[var(--color-xfl-text-dim)] font-bold">MAG'LUB</div>
          </div>
          <div>
            <div className="text-xs font-black text-[var(--color-xfl-accent)]">{points}</div>
            <div className="text-[8px] text-[var(--color-xfl-text-dim)] font-bold">OCHKO</div>
          </div>
        </div>
      </div>

      {/* Footer Roster Count & Action CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--color-xfl-border)] text-xs">
        <span className="font-bold text-[var(--color-xfl-text-dim)] flex items-center gap-1.5">
          <span>👥</span>
          <strong className="text-white">{membersCount} ta</strong> o'yinchi
        </span>

        <span className="font-black text-[var(--color-xfl-accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Tarkib & Taktika →
        </span>
      </div>
    </div>
  );
}
