'use client';

export default function ClubCard({ club, onClick }) {
  if (!club) return null;

  const format = club.format || "11x11";
  const name = club.name || "Klub";
  const district = club.district || "Samarqand shahar";
  const wins = club.wins ?? club.stats?.wins ?? 0;
  const draws = club.draws ?? club.stats?.draws ?? 0;
  const losses = club.losses ?? club.stats?.losses ?? 0;
  const membersCount = club.membersCount || club.roster?.length || 15;

  const formatColors = {
    '6x6': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    '9x9': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    '11x11': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  };

  return (
    <div
      onClick={() => onClick && onClick(club)}
      className="glass-card p-5 flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-[var(--color-xfl-border)] group relative overflow-hidden"
    >
      {/* Top Bar Color */}
      <div
        className="h-1.5 w-full absolute top-0 left-0"
        style={{ backgroundColor: club.color1 || 'var(--color-xfl-accent)' }}
      />

      <div>
        {/* Format Badge & Verified */}
        <div className="flex justify-between items-center mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${formatColors[format] || formatColors['11x11']}`}>
            {format} Liga
          </span>
          {club.isVerified ? (
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              ★ Tasdiqlangan
            </span>
          ) : (
            <span className="text-[10px] text-gray-400">Havaskor Klub</span>
          )}
        </div>

        {/* Club Logo Avatar & Name */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg shrink-0"
            style={{
              backgroundColor: club.color1 || '#1B5E20',
              border: `2px solid ${club.color2 || '#00E676'}`,
            }}
          >
            {name.charAt(0)}
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white group-hover:text-[var(--color-xfl-accent)] transition-colors">
              {name}
            </h3>
            <p className="text-xs text-[var(--color-xfl-text-dim)]">
              📍 {district} • {club.foundedYear || 2023}-yil
            </p>
          </div>
        </div>

        {/* Match Record Stats */}
        <div className="grid grid-cols-3 gap-2 bg-[var(--color-xfl-bg)] p-3 rounded-xl border border-[var(--color-xfl-border)] text-center mb-4">
          <div>
            <div className="text-xs font-black text-green-400">{wins}</div>
            <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">G'ALABA</div>
          </div>
          <div>
            <div className="text-xs font-black text-gray-300">{draws}</div>
            <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">DURRANG</div>
          </div>
          <div>
            <div className="text-xs font-black text-red-400">{losses}</div>
            <div className="text-[9px] text-[var(--color-xfl-text-dim)] font-bold">MAG'LUBIYAT</div>
          </div>
        </div>
      </div>

      {/* Roster count & Button */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-xfl-border)]">
        <span className="text-xs font-bold text-[var(--color-xfl-text-dim)] flex items-center gap-1">
          👥 <strong className="text-white">{membersCount} ta</strong> o'yinchi
        </span>

        <span className="text-xs font-extrabold text-[var(--color-xfl-accent)] group-hover:translate-x-1 transition-transform">
          Klubga Kirish →
        </span>
      </div>
    </div>
  );
}
