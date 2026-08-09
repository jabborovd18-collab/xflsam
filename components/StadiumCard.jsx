'use client';

export default function StadiumCard({ stadium, onClick }) {
  if (!stadium) return null;

  const name = stadium.name || stadium.nomi || "Stadion";
  const address = stadium.address || stadium.manzil || "Samarqand";
  const district = stadium.district || stadium.tuman || "Samarqand shahar";
  const price = stadium.pricePerHour || stadium.narx || "150,000 so'm / soat";
  const size = stadium.fieldSize || stadium.maydonHajmi || "6x6";
  const rating = stadium.rating || 4.5;
  const reviewCount = stadium.reviewCount || stadium.sharhlar_soni || 15;
  const bookedSlots = stadium.bookedSlots || [
    { time: "18:00 - 19:30", team: "XFL Jamoa", status: "booked" }
  ];

  // Format badge colors
  const formatColors = {
    '6x6': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    '9x9': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    '11x11': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  };

  return (
    <div
      onClick={() => onClick && onClick(stadium)}
      className="glass-card p-5 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-[var(--color-xfl-border)] group relative overflow-hidden"
    >
      {/* Top Header Row */}
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <span className="text-[10px] font-extrabold tracking-wider text-[var(--color-xfl-text-dim)] uppercase">
              📍 {district}
            </span>
            <h3 className="text-lg font-extrabold text-white group-hover:text-[var(--color-xfl-accent)] transition-colors">
              {name}
            </h3>
          </div>

          {/* O'lchami Badge: 6x6, 9x9, 11x11 */}
          <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${formatColors[size] || formatColors['6x6']}`}>
            {size}
          </span>
        </div>

        {/* Address (Manzili) */}
        <div className="flex items-start gap-1.5 text-xs text-[var(--color-xfl-text-dim)] mb-4 bg-[var(--color-xfl-bg)] p-2.5 rounded-lg border border-[var(--color-xfl-border)]">
          <span className="text-sm shrink-0">📌</span>
          <span className="font-semibold text-white/90 line-clamp-2">{address}</span>
        </div>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] text-[var(--color-xfl-text-dim)] font-bold uppercase">NARX (SOATIGA)</div>
            <div className="text-sm font-black text-[var(--color-xfl-accent)]">{price}</div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-[var(--color-xfl-text-dim)] font-bold uppercase">REYTING</div>
            <div className="text-xs font-extrabold text-yellow-400">
              ★ {rating} <span className="text-[10px] text-gray-400 font-medium">({reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Features icons */}
        <div className="flex gap-2 text-xs mb-4">
          {stadium.hasLighting && <span className="px-2 py-1 rounded bg-white/5 border border-white/10" title="Yoritgich">💡 Yoritgich</span>}
          {stadium.hasParking && <span className="px-2 py-1 rounded bg-white/5 border border-white/10" title="Parking">🅿️ Avtoturargoh</span>}
          {stadium.hasShower && <span className="px-2 py-1 rounded bg-white/5 border border-white/10" title="Dush">🚿 Dush</span>}
        </div>

        {/* Band qilingan vaqtlar ko'rinishi */}
        <div className="bg-black/40 p-3 rounded-xl border border-white/5 mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--color-xfl-text-dim)] mb-2">
            <span>📅 Bugungi band vaqtlar:</span>
            <span className="text-red-400 font-extrabold">{bookedSlots.length} ta band</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {bookedSlots.map((b, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 border border-red-500/40 text-red-400"
              >
                🔴 {b.time || b}
              </span>
            ))}
            {bookedSlots.length === 0 && (
              <span className="text-[11px] text-green-400 font-bold">🟢 Hozircha bo'sh vaqtlar ko'p</span>
            )}
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="btn-primary w-full justify-center text-xs py-2.5 font-bold shadow-lg shadow-green-500/10">
        🏟️ Band qilish va Vaqtlarni Ko'rish
      </button>
    </div>
  );
}
