'use client';

import { useState } from 'react';
import { demoStadionlar, tumanlar, formatlar } from '@/data/demo-data';
import StadiumCard from '@/components/StadiumCard';
import StadiumModal from '@/components/StadiumModal';
import AddStadiumModal from '@/components/AddStadiumModal';

export default function StadionlarPage() {
  const [stadionlar, setStadionlar] = useState(demoStadionlar);
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all', '6x6', '9x9', '11x11'
  const [districtFilter, setDistrictFilter] = useState('all');

  // Modals
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredStadionlar = stadionlar.filter(s => {
    const size = s.fieldSize || s.maydonHajmi || '';
    const district = s.district || s.tuman || '';

    const matchesFormat = selectedFormat === 'all' || size === selectedFormat;
    const matchesDistrict = districtFilter === 'all' || district === districtFilter;

    return matchesFormat && matchesDistrict;
  });

  return (
    <div className="page-container pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 gradient-text">
            Stadionlar Tizimi
          </h1>
          <p className="text-[var(--color-xfl-text-dim)] text-base">
            Samarqand viloyatidagi 6x6, 9x9 va 11x11 futbol maydonlarini qidiring va vaqtlarni bron qiling
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary py-3.5 px-6 text-sm font-extrabold shadow-lg shadow-green-500/20 whitespace-nowrap"
        >
          ➕ Yangi Stadion Qo'shish
        </button>
      </div>

      {/* FORMATS SELECTOR TABS (6x6, 9x9, 11x11) */}
      <div className="glass-card p-3 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFormat('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedFormat === 'all'
                ? 'bg-[var(--color-xfl-primary)] text-white shadow-md'
                : 'bg-[var(--color-xfl-bg)] text-[var(--color-xfl-text-dim)] hover:text-white'
            }`}
          >
            Barchasi ({stadionlar.length})
          </button>

          {formatlar.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFormat(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                selectedFormat === f.id
                  ? 'bg-[var(--color-xfl-accent)] text-black border-white shadow-lg shadow-green-500/20'
                  : 'bg-[var(--color-xfl-bg)] border-[var(--color-xfl-border)] text-[var(--color-xfl-text-dim)] hover:text-white'
              }`}
            >
              {f.icon} {f.id} Maydonlar
            </button>
          ))}
        </div>

        {/* District Filter */}
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="input-field py-2 text-xs max-w-[200px]"
        >
          <option value="all">Barcha tumanlar</option>
          {tumanlar.map(t => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* STADIUMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStadionlar.map(stadium => (
          <StadiumCard
            key={stadium.id}
            stadium={stadium}
            onClick={() => setSelectedStadium(stadium)}
          />
        ))}
        {filteredStadionlar.length === 0 && (
          <div className="col-span-full py-16 text-center text-[var(--color-xfl-text-dim)] border border-dashed border-[var(--color-xfl-border)] rounded-2xl">
            Tanlangan o'lcham ({selectedFormat}) va hudud bo'yicha stadionlar topilmadi.
          </div>
        )}
      </div>

      {/* DETAIL & BOOKING MODAL */}
      {selectedStadium && (
        <StadiumModal
          stadium={selectedStadium}
          onClose={() => setSelectedStadium(null)}
        />
      )}

      {/* ADD STADIUM MODAL */}
      {isAddModalOpen && (
        <AddStadiumModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(newStadion) => {
            setStadionlar(prev => [newStadion, ...prev]);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
