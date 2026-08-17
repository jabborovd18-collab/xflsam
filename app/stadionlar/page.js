'use client';

import { useState } from 'react';
import { demoStadionlar, tumanlar, formatlar } from '@/data/demo-data';
import StadiumCard from '@/components/StadiumCard';
import StadiumModal from '@/components/StadiumModal';

export default function StadionlarPage() {
  const [stadionlarList, setStadionlarList] = useState(demoStadionlar);
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all', '6x6', '9x9', '11x11'
  const [districtFilter, setDistrictFilter] = useState('all');
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New stadium form state
  const [newStadName, setNewStadName] = useState('');
  const [newStadAddress, setNewStadAddress] = useState('');
  const [newStadDistrict, setNewStadDistrict] = useState('Samarqand shahar');
  const [newStadSize, setNewStadSize] = useState('6x6');
  const [newStadPrice, setNewStadPrice] = useState('120,000 so\'m / soat');
  const [newStadPhone, setNewStadPhone] = useState('+998 90 123 45 67');

  const filteredStadionlar = stadionlarList.filter(s => {
    const size = s.fieldSize || s.maydonHajmi || '';
    const district = s.district || s.tuman || '';

    const matchesFormat = selectedFormat === 'all' || size === selectedFormat;
    const matchesDistrict = districtFilter === 'all' || district === districtFilter;

    return matchesFormat && matchesDistrict;
  });

  const handleAddStadiumSubmit = (e) => {
    e.preventDefault();
    if (!newStadName || !newStadAddress) {
      alert("Iltimos, stadion nomi va manzilini to'ldiring!");
      return;
    }

    const newStadiumObj = {
      id: `stadion-user-${Date.now()}`,
      name: newStadName,
      address: newStadAddress,
      district: newStadDistrict,
      capacity: 100,
      pricePerHour: newStadPrice,
      phone: newStadPhone,
      rating: 4.9,
      reviewCount: 1,
      hasLighting: true,
      hasParking: true,
      hasShower: true,
      hasLockerRoom: true,
      surfaceType: "Sun'iy premium gazon",
      fieldSize: newStadSize,
      description: `${newStadName} — Samarqand viloyati ${newStadDistrict} hududidagi ${newStadSize} o'lchamdagi yangi futbol maydoni.`,
      bookedSlots: [],
      availableSlots: ["18:00 - 19:30", "20:00 - 21:30", "22:00 - 23:30"],
    };

    setStadionlarList([newStadiumObj, ...stadionlarList]);
    setIsAddModalOpen(false);
    setSelectedStadium(newStadiumObj);
  };

  return (
    <div className="page-container pb-28 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-xfl-border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase mb-3">
            <span>🏟️ SAMARQAND MAYDONLARI XARITASI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black gradient-text tracking-tight">
            Stadionlar Tizimi
          </h1>
          <p className="text-[var(--color-xfl-text-dim)] text-sm sm:text-base mt-1">
            Samarqand bo'ylab 6x6, 9x9 va 11x11 futbol maydonlarini qidiring, narxlarni solishtiring va real-vaqtda bron qiling
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary py-3.5 px-8 text-xs font-black shadow-xl shadow-green-500/25 whitespace-nowrap flex items-center gap-2"
        >
          ➕ Yangi Maydon Qo'shish
        </button>
      </div>

      {/* Format & District Filter Bar */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Formats Tabs (6x6, 9x9, 11x11) */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedFormat === 'all'
                  ? 'bg-[var(--color-xfl-primary)] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Barcha Maydonlar ({stadionlarList.length})
            </button>

            {formatlar.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                  selectedFormat === f.id
                    ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] border-white shadow-md shadow-green-500/25'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {f.icon} {f.id} Maydonlar
              </button>
            ))}
          </div>

          {/* District Selector */}
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="input-field py-2.5 text-xs font-bold w-full lg:w-64"
          >
            <option value="all">Barcha tumanlar / hududlar</option>
            {tumanlar.map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stadiums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStadionlar.map(stadium => (
          <StadiumCard
            key={stadium.id}
            stadium={stadium}
            onClick={() => setSelectedStadium(stadium)}
          />
        ))}
        {filteredStadionlar.length === 0 && (
          <div className="col-span-full py-20 text-center text-[var(--color-xfl-text-dim)] border border-dashed border-[var(--color-xfl-border)] rounded-3xl space-y-3">
            <div className="text-4xl">🏟️</div>
            <div className="text-base font-black text-white">Tanlangan format bo'yicha maydon topilmadi</div>
            <p className="text-xs text-gray-400">
              Boshqa format yoki tumanlarni tanlab ko'ring.
            </p>
          </div>
        )}
      </div>

      {/* STADIUM DETAIL & LIVE BOOKING MODAL */}
      {selectedStadium && (
        <StadiumModal
          stadium={selectedStadium}
          onClose={() => setSelectedStadium(null)}
        />
      )}

      {/* ADD STADIUM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsAddModalOpen(false)} />

          <div className="relative w-full max-w-xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up z-10 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">YANGI STADION</span>
                <h3 className="text-xl font-black text-white mt-0.5">Futbol Maydonini Qo'shish</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStadiumSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Stadion / Maydon Nomi</label>
                <input
                  type="text"
                  placeholder="Masalan: Registon Arena VIP"
                  value={newStadName}
                  onChange={(e) => setNewStadName(e.target.value)}
                  className="input-field py-2.5 text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Aniq Manzil</label>
                <input
                  type="text"
                  placeholder="Masalan: Samarqand sh., Registon ko'chasi 45-uy"
                  value={newStadAddress}
                  onChange={(e) => setNewStadAddress(e.target.value)}
                  className="input-field py-2.5 text-xs font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Maydon O'lchami</label>
                  <select
                    value={newStadSize}
                    onChange={(e) => setNewStadSize(e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                  >
                    <option value="6x6">6x6 Mini-futbol</option>
                    <option value="9x9">9x9 O'rta maydon</option>
                    <option value="11x11">11x11 Katta futbol</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Tuman / Hudud</label>
                  <select
                    value={newStadDistrict}
                    onChange={(e) => setNewStadDistrict(e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                  >
                    {tumanlar.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Soatlik Narx</label>
                  <input
                    type="text"
                    value={newStadPrice}
                    onChange={(e) => setNewStadPrice(e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Telefon Raqam</label>
                  <input
                    type="text"
                    value={newStadPhone}
                    onChange={(e) => setNewStadPhone(e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-xs font-black justify-center shadow-xl shadow-green-500/25 mt-2"
              >
                🏟️ Stadionni XFL Ro'yxatiga Qo'shish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
