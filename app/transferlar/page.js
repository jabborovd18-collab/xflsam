'use client';

import { useState } from 'react';
import PlayerCard from '@/components/PlayerCard';
import CreatePlayerModal from '@/components/CreatePlayerModal';
import { demoOyinchilar, pozitsiyalar, tumanlar } from '@/data/demo-data';

export default function TransferlarPage() {
  const [playersList, setPlayersList] = useState(demoOyinchilar);
  const [tab, setTab] = useState('bosh'); // 'bosh' (free agents) or 'barchasi'
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [offerSent, setOfferSent] = useState(false);
  const [offerTeam, setOfferTeam] = useState('');

  // Position groups
  const positionGroups = [
    { id: 'all', label: 'Barcha Pozitsiyalar', icon: '⚽' },
    { id: 'GK', label: 'Darvozabonlar (GK)', icon: '🧤' },
    { id: 'DEF', label: 'Himoyachilar (CB, LB, RB)', icon: '🛡️' },
    { id: 'MID', label: 'Yarim Himoya (CM, CAM, CDM)', icon: '⚡' },
    { id: 'FWD', label: 'Hujumchilar (ST, LW, RW)', icon: '🎯' },
  ];

  // Filter logic
  const filteredPlayers = playersList.filter(player => {
    // Free agent vs all
    if (tab === 'bosh' && player.club !== null && player.club !== undefined) return false;

    // Position filter
    let matchesPos = true;
    if (selectedPosition === 'GK') matchesPos = player.position === 'GK';
    else if (selectedPosition === 'DEF') matchesPos = ['CB', 'LB', 'RB'].includes(player.position);
    else if (selectedPosition === 'MID') matchesPos = ['CM', 'CAM', 'CDM'].includes(player.position);
    else if (selectedPosition === 'FWD') matchesPos = ['ST', 'LW', 'RW', 'CF'].includes(player.position);

    // District filter
    const matchesDist = selectedDistrict === 'all' || player.district === selectedDistrict;

    // Verified only filter
    const matchesVerified = !verifiedOnly || player.isVerified;

    return matchesPos && matchesDist && matchesVerified;
  });

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerTeam) {
      alert("Iltimos, jamoangiz nomini kiriting!");
      return;
    }
    setOfferSent(true);
  };

  return (
    <div className="page-container pb-28 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-xfl-border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase mb-3">
            <span>🔄 SAMARQAND FUTBOLCHI BOZORI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black gradient-text-orange tracking-tight">
            Transfer Oynasi
          </h1>
          <p className="text-[var(--color-xfl-text-dim)] text-sm sm:text-base mt-1">
            EA Sports FC 26 elektron kartangizni yarating yoki yangi o'yinchilarni jamoangizga tanlang
          </p>
        </div>

        {/* Action Button & Market Status Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-[var(--color-xfl-card)] p-1 rounded-2xl border border-[var(--color-xfl-border)] text-xs font-black">
            <button
              onClick={() => setTab('bosh')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tab === 'bosh'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-[#041B0E] shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🟢 Bo'sh Agentlar
            </button>
            <button
              onClick={() => setTab('barchasi')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tab === 'barchasi'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-[#041B0E] shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👥 Barcha Futbolchilar
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-orange py-3.5 px-6 text-xs font-black shadow-xl shadow-orange-500/25 whitespace-nowrap flex items-center gap-2"
          >
            ⚽ Karta Yaratish (FC 26)
          </button>
        </div>
      </div>

      {/* Filter and Position Bar */}
      <div className="glass-card p-5 space-y-4">
        {/* Position Group Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          {positionGroups.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPosition(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                selectedPosition === p.id
                  ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] border-white shadow-md shadow-green-500/20'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        {/* District & Verified Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="input-field py-2 text-xs font-bold w-full sm:w-60"
          >
            <option value="all">Barcha Samarqand hududlari</option>
            {tumanlar.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-2 ${
              verifiedOnly
                ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/20'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <span>★</span>
            <span>Faqat Tasdiqlangan Oltin Kartalar</span>
          </button>
        </div>
      </div>

      {/* Players Grid — 3D FC 26 Interactive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {filteredPlayers.map(player => (
          <div key={player.id} className="flex flex-col items-center gap-3">
            <PlayerCard
              player={player}
              onClick={() => {
                setSelectedPlayer(player);
                setOfferSent(false);
              }}
              size="standard"
            />
            
            {/* Quick Action Button under card */}
            <button
              onClick={() => {
                setSelectedPlayer(player);
                setOfferSent(false);
              }}
              className="btn-secondary py-1.5 px-4 text-xs font-black rounded-full"
            >
              📩 Taklif Yuborish
            </button>
          </div>
        ))}

        {filteredPlayers.length === 0 && (
          <div className="col-span-full py-20 text-center text-[var(--color-xfl-text-dim)] border border-dashed border-[var(--color-xfl-border)] rounded-3xl w-full space-y-3">
            <div className="text-4xl">🔍</div>
            <div className="text-base font-black text-white">Ushbu filtrlarga mos o'yinchilar topilmadi</div>
            <p className="text-xs text-gray-400">
              Boshqa pozitsiya yoki tumanlarni tanlab ko'ring.
            </p>
          </div>
        )}
      </div>

      {/* CREATE PLAYER CARD MODAL */}
      {isModalOpen && (
        <CreatePlayerModal
          onClose={() => setIsModalOpen(false)}
          onCreated={(newPlayer) => {
            setPlayersList([newPlayer, ...playersList]);
            setIsModalOpen(false);
          }}
        />
      )}

      {/* SEND OFFER / PLAYER PROFILE MODAL */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedPlayer(null)} />

          <div className="relative w-full max-w-2xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-slide-up z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">FUTBOLCHI PROFILI</span>
                <h3 className="text-xl font-black text-white mt-0.5">{selectedPlayer.fullName || selectedPlayer.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="shrink-0 transform scale-95">
                <PlayerCard player={selectedPlayer} size="standard" />
              </div>

              {/* Offer Form */}
              <div className="flex-1 w-full space-y-4">
                {!offerSent ? (
                  <form onSubmit={handleSendOffer} className="space-y-3 bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)]">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      O'yinchini jamoangizga taklif qiling:
                    </h4>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                        Sizning Klubingiz Nomi
                      </label>
                      <input
                        type="text"
                        placeholder="Masalan: Afrosiyob FC"
                        value={offerTeam}
                        onChange={(e) => setOfferTeam(e.target.value)}
                        className="input-field py-2 text-xs font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                        Taklif Mazmuni / O'yin Vaqti
                      </label>
                      <textarea
                        rows="2"
                        placeholder="Masalan: Shanba kungi o'rtoqlik o'yiniga hujumchi sifatida taklif qilamiz."
                        className="input-field py-2 text-xs font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-3 text-xs font-black justify-center shadow-lg"
                    >
                      📩 Rasmiy Taklif Yuborish
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-950/40 border border-emerald-500 p-5 rounded-2xl text-center space-y-2 animate-slide-up">
                    <span className="text-3xl">✅</span>
                    <h4 className="text-sm font-black text-emerald-400">Taklif Muvaffaqiyatli Yuborildi!</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <strong>{offerTeam}</strong> klubi taklifi <strong>{selectedPlayer.fullName || selectedPlayer.name}</strong> ga yuborildi. O'yinchi rozilik bildirsa, siz bilan bog'lanadi.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
