'use client';

import { useState } from 'react';

export default function StadiumModal({ stadium, onClose }) {
  const [selectedDay, setSelectedDay] = useState('bugun');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingTeam, setBookingTeam] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  if (!stadium) return null;

  const name = stadium.name || stadium.nomi || "Stadion";
  const address = stadium.address || stadium.manzil || "Samarqand";
  const district = stadium.district || stadium.tuman || "Samarqand shahar";
  const price = stadium.pricePerHour || stadium.narx || "150,000 so'm / soat";
  const size = stadium.fieldSize || stadium.maydonHajmi || "6x6";
  const surface = stadium.surfaceType || "Sun'iy premium gazon";
  const rating = stadium.rating || 4.8;
  const phone = stadium.phone || "+998 90 123 45 67";
  const description = stadium.description || "Samarqand viloyatining barcha qulayliklarga ega zamonaviy futbol maydoni.";

  const bookedSlots = stadium.bookedSlots || [
    { time: "18:00 - 19:30", team: "Afrosiyob FC" },
    { time: "20:00 - 21:30", team: "Registon FC" }
  ];

  const availableSlots = stadium.availableSlots || [
    "08:00 - 09:30", "10:00 - 11:30", "14:00 - 15:30", "16:00 - 17:30", "22:00 - 23:30"
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Iltimos, bron qilish uchun bo'sh vaqtni tanlang!");
      return;
    }
    if (!bookingPhone) {
      alert("Iltimos, telefon raqamingizni kiriting!");
      return;
    }
    setBookedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl z-10 animate-slide-up flex flex-col">

        {/* Top Banner Header */}
        <div className="h-44 sm:h-52 bg-gradient-to-br from-[#103822] via-[#092215] to-black relative shrink-0 p-6 flex flex-col justify-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md z-10 font-bold"
          >
            ✕
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase">
              O'LCHAM: {size}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
              📍 {district}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-xs font-black">
              ★ {rating} ({surface})
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {name}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">📍 Aniq Manzil</div>
              <div className="text-xs font-bold text-white leading-relaxed">{address}</div>
            </div>

            <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">💰 Soatlik Narx</div>
              <div className="text-sm font-black text-[var(--color-xfl-accent)]">{price}</div>
            </div>

            <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">📞 Aloqa Uchun</div>
              <div className="text-xs font-black text-white">{phone}</div>
            </div>
          </div>

          {/* Amenities & Description */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-200">
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">💡 Yoritgich</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">🅿️ Avtoturargoh</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">🚿 Dush xonalari</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">🔒 Kiyinish xonasi</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">☕ Kafe & Suv</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              {description}
            </p>
          </div>

          {/* INTERACTIVE BOOKING MATRIX */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>📅</span> Vaqtlar Jadvali va Real-Vaqtda Bron
              </h3>

              {/* Day Switcher */}
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-bold">
                {['bugun', 'ertaga', 'shanba', 'yakshanba'].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`px-3 py-1 rounded-lg capitalize transition-all ${
                      selectedDay === d
                        ? 'bg-[var(--color-xfl-accent)] text-black font-black shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {d === 'bugun' ? 'Bugun' : d === 'ertaga' ? 'Ertaga' : d === 'shanba' ? 'Shanba' : 'Yakshanba'}
                  </button>
                ))}
              </div>
            </div>

            {/* Booked Slots Alert Box */}
            <div className="bg-red-950/25 border border-red-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-red-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  BAND QILINGAN VAQTLAR ({selectedDay})
                </span>
                <span className="text-[10px] text-gray-400">Band qilingan vaqtlarni tanlab bo'lmaydi</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {bookedSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-red-900/30 border border-red-500/30 text-xs flex justify-between items-center text-red-200"
                  >
                    <span className="font-black">🔴 {slot.time || slot}</span>
                    <span className="text-[10px] font-bold text-red-400 truncate max-w-[110px]">
                      {slot.team || 'Band qilingan'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Slots Selectable Buttons */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-emerald-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  BO'SH VAQTLAR (Bron qilish uchun bosing)
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">
                  {selectedSlot ? `Tanlandi: ${selectedSlot}` : 'Vaqtni tanlang'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1">
                {availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-xl text-xs font-black transition-all text-center border ${
                      selectedSlot === slot
                        ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] border-white shadow-lg shadow-green-500/30 scale-105'
                        : 'bg-emerald-900/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                    }`}
                  >
                    🟢 {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* User Instant Booking Form */}
            {!bookedSuccess ? (
              <form onSubmit={handleBookingSubmit} className="bg-[var(--color-xfl-bg)] p-5 rounded-2xl border border-[var(--color-xfl-border)] space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  Bron qilish formasini to'ldiring:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                      Tanlangan Vaqt
                    </label>
                    <input
                      type="text"
                      value={selectedSlot ? `${selectedDay.toUpperCase()} • ${selectedSlot}` : "Vaqt tanlanmagan"}
                      readOnly
                      className="input-field py-2 text-xs font-black text-[var(--color-xfl-accent)] bg-black/40"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                      Jamoangiz Nomi
                    </label>
                    <input
                      type="text"
                      placeholder="Masalan: Afrosiyob FC"
                      value={bookingTeam}
                      onChange={(e) => setBookingTeam(e.target.value)}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                      Telefon Raqamingiz
                    </label>
                    <input
                      type="text"
                      placeholder="+998 90 123 45 67"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="input-field py-2 text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-gray-400">
                    To'lov usuli: Maydonga kelganda (Naqd yoki Payme/Click)
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto px-8 py-3 text-xs font-black justify-center shadow-lg"
                  >
                    ⚽ Stadionni Bron Qilish
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-950/40 border border-emerald-500 p-6 rounded-2xl text-center space-y-2 animate-slide-up">
                <span className="text-4xl">🎉</span>
                <h4 className="text-lg font-black text-emerald-400">Stadion Muvaffaqiyatli Bron Qilindi!</h4>
                <p className="text-xs text-gray-200 max-w-md mx-auto">
                  <strong>{name}</strong> stadioni <strong>{selectedDay}</strong> kuni <strong>{selectedSlot}</strong> vaqtiga <strong>{bookingTeam}</strong> nomiga band qilindi. Administrator sizga ({bookingPhone}) orqali tasdiqlovchi SMS yuboradi.
                </p>
                <button
                  onClick={onClose}
                  className="btn-secondary py-2 px-6 text-xs font-bold mt-2"
                >
                  Yopish
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
