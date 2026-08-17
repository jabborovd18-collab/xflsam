'use client';

import { useState } from 'react';
import ClubCard from '@/components/ClubCard';
import ClubModal from '@/components/ClubModal';
import StadiumModal from '@/components/StadiumModal';
import { demoKlublar, tumanlar, formatlar, demoStadionlar } from '@/data/demo-data';

export default function KlublarPage() {
  const [klublarList, setKlublarList] = useState(demoKlublar);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all', '6x6', '9x9', '11x11'
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [isCreateClubOpen, setIsCreateClubOpen] = useState(false);

  // New club form state
  const [newClubName, setNewClubName] = useState('');
  const [newClubDistrict, setNewClubDistrict] = useState('Samarqand shahar');
  const [newClubFormat, setNewClubFormat] = useState('11x11');
  const [newClubColor1, setNewClubColor1] = useState('#1B5E20');
  const [newClubColor2, setNewClubColor2] = useState('#00E676');

  // Filter logic
  const filteredClubs = klublarList.filter(club => {
    const format = club.format || '11x11';
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = district === 'all' || club.district === district;
    const matchesFormat = selectedFormat === 'all' || format === selectedFormat;

    return matchesSearch && matchesDistrict && matchesFormat;
  });

  const handleCreateClubSubmit = (e) => {
    e.preventDefault();
    if (!newClubName) {
      alert("Iltimos, klub nomini kiriting!");
      return;
    }

    const newClubObj = {
      id: `klub-user-${Date.now()}`,
      name: newClubName,
      shortName: newClubName.substring(0, 3).toUpperCase(),
      format: newClubFormat,
      district: newClubDistrict,
      description: `${newClubName} — Samarqand viloyati ${newClubFormat} ligasining yangi rasmiy jamoasi.`,
      foundedYear: 2025,
      color1: newClubColor1,
      color2: newClubColor2,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0,
      membersCount: 1,
      isVerified: true,
      favoriteStadiums: ["Afrosiyob Arena", "Samarqand Indoor Arena"],
      roster: [
        { name: "Siz (Sardor)", pos: "ST", rating: 8.5, number: 10 }
      ],
      recentMatches: []
    };

    setKlublarList([newClubObj, ...klublarList]);
    setIsCreateClubOpen(false);
    setSelectedClub(newClubObj);
    setNewClubName('');
  };

  return (
    <div className="page-container pb-28 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-xfl-border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase mb-3">
            <span>🛡️ XFL RASMIY JAMOALAR REESTRI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black gradient-text tracking-tight">
            Klublar Maydoni
          </h1>
          <p className="text-[var(--color-xfl-text-dim)] text-sm sm:text-base mt-1">
            Samarqand viloyatining 6x6, 9x9 va 11x11 formatdagi rasmiy havaskor futbol klublari
          </p>
        </div>

        <button
          onClick={() => setIsCreateClubOpen(true)}
          className="btn-primary py-3.5 px-8 text-xs font-black shadow-xl shadow-green-500/25 whitespace-nowrap flex items-center gap-2"
        >
          🛡️ Yangi Klub Yaratish
        </button>
      </div>

      {/* Filter and Search Matrix */}
      <div className="glass-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Format Tabs */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedFormat === 'all'
                  ? 'bg-[var(--color-xfl-primary)] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Barcha Formatlar ({klublarList.length})
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
                {f.icon} {f.id} Liga
              </button>
            ))}
          </div>

          {/* Search & District Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Klub nomi bo'yicha qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field py-2.5 text-xs font-bold w-full sm:w-64"
            />

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="input-field py-2.5 text-xs font-bold w-full sm:w-52"
            >
              <option value="all">Barcha hududlar</option>
              {tumanlar.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={() => setSelectedClub(club)}
          />
        ))}
        {filteredClubs.length === 0 && (
          <div className="col-span-full py-20 text-center text-[var(--color-xfl-text-dim)] border border-dashed border-[var(--color-xfl-border)] rounded-3xl space-y-3">
            <div className="text-4xl">🔍</div>
            <div className="text-base font-black text-white">Mos keladigan klub topilmadi</div>
            <p className="text-xs text-gray-400">
              Qidiruv so'zini o'zgartiring yoki o'zingiz yangi klub yarating.
            </p>
          </div>
        )}
      </div>

      {/* CLUB DETAILS & TACTICAL PITCH MODAL */}
      {selectedClub && (
        <ClubModal
          club={selectedClub}
          onClose={() => setSelectedClub(null)}
          onStadiumClick={(stadName) => {
            const stad = demoStadionlar.find(s => s.name.toLowerCase().includes(stadName.toLowerCase().split(' ')[0]));
            setSelectedClub(null);
            if (stad) setSelectedStadium(stad);
          }}
        />
      )}

      {/* STADIUM MODAL */}
      {selectedStadium && (
        <StadiumModal
          stadium={selectedStadium}
          onClose={() => setSelectedStadium(null)}
        />
      )}

      {/* CREATE CLUB MODAL */}
      {isCreateClubOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsCreateClubOpen(false)} />

          <div className="relative w-full max-w-xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up z-10 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">YANGI JAMOA</span>
                <h3 className="text-xl font-black text-white mt-0.5">XFL Klubi Yaratish</h3>
              </div>
              <button
                onClick={() => setIsCreateClubOpen(false)}
                className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClubSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Klub Nomi</label>
                <input
                  type="text"
                  placeholder="Masalan: Samarqand Qalqoni FK"
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                  className="input-field py-2.5 text-xs font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Liga Formati</label>
                  <select
                    value={newClubFormat}
                    onChange={(e) => setNewClubFormat(e.target.value)}
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
                    value={newClubDistrict}
                    onChange={(e) => setNewClubDistrict(e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                  >
                    {tumanlar.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Club Colors */}
              <div>
                <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Klub Asosiy Formalari Rangi</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-[var(--color-xfl-bg)] p-2 rounded-xl border border-[var(--color-xfl-border)]">
                    <span className="text-xs text-gray-400">1-Rang:</span>
                    <input
                      type="color"
                      value={newClubColor1}
                      onChange={(e) => setNewClubColor1(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-[var(--color-xfl-bg)] p-2 rounded-xl border border-[var(--color-xfl-border)]">
                    <span className="text-xs text-gray-400">2-Rang:</span>
                    <input
                      type="color"
                      value={newClubColor2}
                      onChange={(e) => setNewClubColor2(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3.5 text-xs font-black justify-center shadow-xl shadow-green-500/25 mt-2"
              >
                🛡️ Klubni Rasmiy Ro'yxatdan O'tkazish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
