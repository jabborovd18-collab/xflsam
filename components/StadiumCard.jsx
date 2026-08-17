'use client';

export default function StadiumCard({ stadium, onClick }) {
  if (!stadium) return null;

  const name = stadium.name || stadium.nomi || "Stadion";
  const address = stadium.address || stadium.manzil || "Samarqand";
  const district = stadium.district || stadium.tuman || "Samarqand shahar";
  const price = stadium.pricePerHour || stadium.narx || "150,000 so'm / soat";
  const size = stadium.fieldSize || stadium.maydonHajmi || "6x6";
  const surface = stadium.surfaceType || "Sun'iy maydon";
  const rating = stadium.rating || 4.5;
  const reviewCount = stadium.reviewCount || 15;
  const bookedSlots = stadium.bookedSlots || [
    { time: "18:00 - 19:30", team: "Afrosiyob FC" }
  ];
  const availableSlots = stadium.availableSlots || ["20:00 - 21:30", "22:00 - 23:30"];

  const formatColors = {
    '6x6': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    '9x9': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    '11x11': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  }[size] || 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

  return (
    <div
      onClick={() => onClick && onClick(stadium)}
      className="glass-card p-5 sm:p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-[var(--color-xfl-border)] group relative overflow-hidden"
    >
      {/* Top Banner Row */}
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="min-w-0">
            <span className="text-[10px] font-black tracking-wider text-[var(--color-xfl-text-dim)] uppercase block truncate">
              📍 {district}
            </span>
            <h3 className="text-lg font-black text-white group-hover:text-[var(--color-xfl-accent)] transition-colors truncate mt-0.5">
              {name}
            </h3>
          </div>

          <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border shrink-0 ${formatColors}`}>
            {size}
          </span>
        </div>

        {/* Address Row */}
        <div className="flex items-start gap-2 text-xs text-[var(--color-xfl-text-dim)] mb-4 bg-[var(--color-xfl-bg)] p-3 rounded-2xl border border-[var(--color-xfl-border)]">
          <span className="text-base shrink-0">📌</span>
          <span className="font-medium text-gray-200 line-clamp-2 leading-relaxed">{address}</span>
        </div>

        {/* Price & Rating & Surface */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
            <div className="text-[9px] text-gray-400 font-bold uppercase">NARXI (SOATIGA)</div>
            <div className="text-xs sm:text-sm font-black text-[var(--color-xfl-accent)] truncate">{price}</div>
          </div>

          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-right">
            <div className="text-[9px] text-gray-400 font-bold uppercase">QOPLAMA & REYTING</div>
            <div className="text-xs font-black text-amber-300 truncate">
              ★ {rating} <span className="text-[10px] text-gray-400 font-normal">({surface})</span>
            </div>
          </div>
        </div>

        {/* Amenities Row */}
        <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-gray-300 mb-4">
          {stadium.hasLighting && <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">💡 Yoritgich</span>}
          {stadium.hasParking && <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">🅿️ Parking</span>}
          {stadium.hasShower && <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">🚿 Dush</span>}
          {stadium.hasLockerRoom && <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">🔒 Kiyinish</span>}
        </div>

        {/* Booked Time Slots Preview */}
        <div className="bg-black/40 p-3 rounded-2xl border border-white/5 mb-4 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
            <span>📅 Bugungi Bandlik:</span>
            <span className="text-red-400 font-bold">{bookedSlots.length} ta band vaqt</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {bookedSlots.map((b, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-black bg-red-950/40 border border-red-500/30 text-red-300"
              >
                🔴 {b.time || b}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              🟢 {availableSlots.length} ta bo'sh vaqt
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="btn-primary w-full justify-center text-xs py-3 font-black shadow-lg shadow-green-500/20">
        🏟️ Vaqtlarni Ko'rish va Bron Qilish
      </button>
    </div>
  );
}
