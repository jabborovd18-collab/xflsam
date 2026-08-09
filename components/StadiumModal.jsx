'use client';

import { useState } from 'react';

export default function StadiumModal({ stadium, onClose }) {
  const [selectedSlot, setSelectedSlot] = useState('');

  if (!stadium) return null;

  const name = stadium.name || stadium.nomi || "Stadion";
  const address = stadium.address || stadium.manzil || "Samarqand";
  const district = stadium.district || stadium.tuman || "Samarqand shahar";
  const price = stadium.pricePerHour || stadium.narx || "150,000 so'm / soat";
  const size = stadium.fieldSize || stadium.maydonHajmi || "6x6";
  const rating = stadium.rating || 4.5;
  const phone = stadium.phone || "+998 90 123 45 67";
  const description = stadium.description || stadium.tavsif || "Zamonaviy futbol maydoni.";

  const bookedSlots = stadium.bookedSlots || [
    { time: "18:00 - 19:30", team: "Afrosiyob FC" },
    { time: "20:00 - 21:30", team: "Registon FC" }
  ];

  const availableSlots = stadium.availableSlots || [
    "09:00 - 10:30", "11:00 - 12:30", "14:00 - 15:30", "16:00 - 17:30", "22:00 - 23:30"
  ];

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Iltimos, bron qilish uchun bo'sh vaqt oralig'ini tanlang!");
      return;
    }
    alert(`Muvaffaqiyatli! ${name} stadioni ${selectedSlot} vaqtiga bron qilindi. Administrator siz bilan bog'lanadi.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 animate-[slideUp_0.3s_ease-out] flex flex-col">

        {/* Header Banner */}
        <div className="h-44 md:h-56 bg-gradient-to-br from-[var(--color-xfl-primary)] via-[#141B2D] to-black relative shrink-0 p-6 flex flex-col justify-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md z-10 font-bold"
          >
            ✕
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black">
              O'lchami: {size}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black">
              📍 {district}
            </span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 text-xs font-black">
              ★ {rating}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white">
            {name}
          </h2>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-8">

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              <div className="text-xs text-[var(--color-xfl-text-dim)] font-bold mb-1">📍 MANZIL</div>
              <div className="text-sm font-bold text-white leading-tight">{address}</div>
            </div>

            <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              <div className="text-xs text-[var(--color-xfl-text-dim)] font-bold mb-1">💰 NARXI (SOATIGA)</div>
              <div className="text-sm font-black text-[var(--color-xfl-accent)]">{price}</div>
            </div>

            <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              <div className="text-xs text-[var(--color-xfl-text-dim)] font-bold mb-1">📏 MAYDON O'LCHAMI</div>
              <div className="text-sm font-black text-white">{size} ({size === '6x6' ? 'Mini-futbol' : size === '9x9' ? "O'rta maydon" : 'Katta standart'})</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-[var(--color-xfl-text-dim)] uppercase tracking-wider mb-2">Tavsif</h3>
            <p className="text-sm text-gray-300 leading-relaxed bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
              {description}
            </p>
          </div>

          {/* BOOKED AND AVAILABLE SLOTS */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>📅</span> Vaqtlar Grafigi va Bandlik Holati
            </h3>

            {/* Booked Slots (Band qilingan vaqtlar) */}
            <div className="bg-red-950/20 border border-red-500/30 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                BAND QILINGAN VAQTLAR (Bugun)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {bookedSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-red-900/30 border border-red-500/40 text-xs flex justify-between items-center"
                  >
                    <span className="font-black text-red-300">🔴 {slot.time || slot}</span>
                    <span className="text-[10px] text-red-400 font-bold truncate max-w-[100px]">{slot.team || 'Band'}</span>
                  </div>
                ))}
                {bookedSlots.length === 0 && (
                  <div className="text-xs text-gray-400">Hozircha hech qaysi vaqt band qilinmagan.</div>
                )}
              </div>
            </div>

            {/* Available Slots (Bo'sh vaqtlar) */}
            <div className="bg-green-950/20 border border-green-500/30 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  BO'SH VAQTLAR (Bron qilish mumkin)
                </div>
                <span className="text-[10px] text-gray-400">Vaqt ustiga bosing</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                      selectedSlot === slot
                        ? 'bg-[var(--color-xfl-accent)] text-black border-white shadow-lg shadow-green-500/20 font-black'
                        : 'bg-green-900/20 border-green-500/30 text-green-300 hover:bg-green-500/30'
                    }`}
                  >
                    🟢 {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-xfl-border)]">
            <div>
              <div className="text-xs text-[var(--color-xfl-text-dim)] font-bold">QO'NG'IROQ QILISH:</div>
              <div className="text-base font-extrabold text-white">{phone}</div>
            </div>

            <button
              onClick={handleBooking}
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-extrabold shadow-lg shadow-green-500/20 justify-center"
            >
              ⚽ {selectedSlot ? `${selectedSlot} Vaqtini Bron Qilish` : "Vaqtni Bron Qilish"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
