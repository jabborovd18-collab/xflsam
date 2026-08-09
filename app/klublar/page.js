'use client';
import { useState } from 'react';
import ClubCard from '@/components/ClubCard';
import ClubModal from '@/components/ClubModal';
import { demoKlublar, tumanlar, formatlar } from '@/data/demo-data';

export default function KlublarPage() {
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('Barchasi');
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all', '6x6', '9x9', '11x11'
  const [selectedClub, setSelectedClub] = useState(null);

  // Filter logic
  const filteredClubs = demoKlublar.filter(club => {
    const format = club.format || '11x11';
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = district === 'Barchasi' || club.district === district;
    const matchesFormat = selectedFormat === 'all' || format === selectedFormat;

    return matchesSearch && matchesDistrict && matchesFormat;
  });

  return (
    <div className="page-container pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 gradient-text">
            Klublar Platformasi
          </h1>
          <p className="text-[var(--color-xfl-text-dim)] text-base">
            Samarqand viloyati xavaskor futbol klublari — 6x6, 9x9 va 11x11 ligalari
          </p>
        </div>

        <button
          onClick={() => alert("Yangi klub yaratish formasi: Tez orada ishga tushadi!")}
          className="btn-primary py-3.5 px-6 text-sm font-extrabold shadow-lg shadow-green-500/20 whitespace-nowrap"
        >
          🛡️ Yangi Klub Yaratish
        </button>
      </div>

      {/* FORMATS TABS (6x6, 9x9, 11x11) */}
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
            Barcha Klublar ({demoKlublar.length})
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
              {f.icon} {f.id} Liga
            </button>
          ))}
        </div>

        {/* Search & District Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Klub nomini qidiring..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field py-2 text-xs min-w-[200px]"
          />

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="input-field py-2 text-xs min-w-[160px]"
          >
            <option value="Barchasi">Barcha tumanlar</option>
            {tumanlar.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={() => setSelectedClub(club)}
          />
        ))}
        {filteredClubs.length === 0 && (
          <div className="col-span-full py-16 text-center text-[var(--color-xfl-text-dim)] border border-dashed border-[var(--color-xfl-border)] rounded-2xl">
            Tanlangan filtrlarga mos klublar topilmadi.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedClub && (
        <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />
      )}
    </div>
  );
}
