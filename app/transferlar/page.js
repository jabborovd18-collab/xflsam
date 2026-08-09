'use client';
import { useState } from 'react';
import PlayerCard from '@/components/PlayerCard';
import CreatePlayerModal from '@/components/CreatePlayerModal';
import { demoOyinchilar, pozitsiyalar, tumanlar } from '@/data/demo-data';

export default function TransferlarPage() {
  const [tab, setTab] = useState('bosh'); // 'bosh' or 'barchasi'
  const [positionFilter, setPositionFilter] = useState('Barchasi');
  const [districtFilter, setDistrictFilter] = useState('Barchasi');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const posKeys = Object.keys(pozitsiyalar);

  // Filter logic
  const filteredPlayers = demoOyinchilar.filter(player => {
    // Tab filter
    if (tab === 'bosh' && player.club !== null && player.club !== undefined) return false;

    // Dropdown filters
    const matchesPos = positionFilter === 'Barchasi' || player.position === positionFilter;
    const matchesDist = districtFilter === 'Barchasi' || player.district === districtFilter;
    const matchesVerified = !verifiedOnly || player.isVerified;

    return matchesPos && matchesDist && matchesVerified;
  });

  return (
    <div className="page-container pb-24">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 gradient-text">
            Transfer Oynasi
          </h1>
          <p className="text-[var(--color-xfl-text-dim)] text-base">
            FC26 elektron kartangizni yarating yoki yangi o'yinchilarni jamoangizga tanlang
          </p>
        </div>

        <div className="flex bg-[var(--color-xfl-card)] p-1 rounded-xl border border-[var(--color-xfl-border)]">
          <button
            onClick={() => setTab('bosh')}
            className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all ${
              tab === 'bosh'
                ? 'bg-[var(--color-xfl-primary)] text-white shadow-lg'
                : 'text-[var(--color-xfl-text-dim)] hover:text-white'
            }`}
          >
            Bo'sh o'yinchilar
          </button>
          <button
            onClick={() => setTab('barchasi')}
            className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all ${
              tab === 'barchasi'
                ? 'bg-[var(--color-xfl-primary)] text-white shadow-lg'
                : 'text-[var(--color-xfl-text-dim)] hover:text-white'
            }`}
          >
            Barcha o'yinchilar
          </button>
        </div>
      </div>

      {/* Filters & Action */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 bg-[var(--color-xfl-card)] p-3 rounded-xl border border-[var(--color-xfl-border)]">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="input-field py-2.5 text-xs"
          >
            <option value="Barchasi">Barcha pozitsiyalar</option>
            {posKeys.map(k => (
              <option key={k} value={k}>{pozitsiyalar[k].name} ({k})</option>
            ))}
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="input-field py-2.5 text-xs"
          >
            <option value="Barchasi">Barcha tumanlar</option>
            {tumanlar.map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-2.5 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap border ${
              verifiedOnly
                ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                : 'bg-[var(--color-xfl-bg)] border-[var(--color-xfl-border)] text-[var(--color-xfl-text-dim)]'
            }`}
          >
            ★ Faqat Tasdiqlangan (Oltin)
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-3.5 px-6 whitespace-nowrap text-sm font-extrabold shadow-lg shadow-green-500/20"
        >
          ⚽ O'yinchi Karta Yaratish (FC26)
        </button>
      </div>

      {/* Players Grid — FC26 Cards Centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {filteredPlayers.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
        {filteredPlayers.length === 0 && (
          <div className="col-span-full py-16 text-center text-[var(--color-xfl-text-dim)] border border-dashed border-[var(--color-xfl-border)] rounded-2xl w-full">
            Ushbu filtrlarga mos o'yinchilar topilmadi.
          </div>
        )}
      </div>

      {/* Create Player Modal */}
      {isModalOpen && (
        <CreatePlayerModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
