'use client';

import { useState } from 'react';
import Link from 'next/link';
import { demoOyinlar, topSkorlar, ligJadvali, demoKlublar, demoStadionlar, demoOyinchilar, formatlar } from '@/data/demo-data';
import PlayerCard from '@/components/PlayerCard';
import CreatePlayerModal from '@/components/CreatePlayerModal';
import ClubModal from '@/components/ClubModal';
import StadiumModal from '@/components/StadiumModal';

export default function Home() {
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activeFormat, setActiveFormat] = useState('all');

  const upcomingMatches = demoOyinlar?.filter(m => m.status === 'scheduled') || [];
  const recentResults = demoOyinlar?.filter(m => m.status === 'completed') || [];
  const topTeams = ligJadvali || [];
  const scorers = topSkorlar || [];

  // Top featured player for the spotlight card
  const featuredPlayer = demoOyinchilar[0];

  // Filtered clubs by format
  const filteredClubs = demoKlublar.filter(c => activeFormat === 'all' || c.format === activeFormat);
  // Filtered stadiums by format
  const filteredStadiums = demoStadionlar.filter(s => activeFormat === 'all' || s.fieldSize === activeFormat);

  return (
    <div className="page-container pb-24 space-y-16">

      {/* HERO SECTION WITH FEATURED FC26 CARD */}
      <section className="relative glass-card p-6 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Glowing Background Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[var(--color-xfl-primary)]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--color-xfl-accent)]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Left Content */}
        <div className="flex-1 text-center lg:text-left z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
            <span>⚡ SAMARQAND VILOYATI RASMIY PLATFORMASI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
            Samarqand <span className="gradient-text">Havaskor Futbol</span> Ligasi
          </h1>

          <p className="text-base sm:text-xl text-[var(--color-xfl-text-dim)] max-w-xl">
            6x6, 9x9 va 11x11 formatlarda jamoa toping, FC26 o'yinchi kartangizni yarating va stadionlarni bron qiling.
          </p>

          {/* Interactive Hero Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <Link
              href="/klublar"
              className="btn-primary py-4 px-8 text-sm font-black shadow-lg shadow-green-500/25 flex items-center gap-2"
            >
              🛡️ Jamoalarga Qo'shilish
            </Link>

            <button
              onClick={() => setIsCreateCardOpen(true)}
              className="btn-orange py-4 px-8 text-sm font-black shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              ⚽ FC26 O'yinchi Karta Yaratish
            </button>
          </div>

          {/* Quick Counter Stats */}
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-[var(--color-xfl-border)] text-center lg:text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{demoKlublar.length} ta</div>
              <div className="text-[10px] font-extrabold text-[var(--color-xfl-text-dim)] uppercase">Klublar</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--color-xfl-accent)]">{demoOyinchilar.length * 5}+</div>
              <div className="text-[10px] font-extrabold text-[var(--color-xfl-text-dim)] uppercase">O'yinchilar</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{demoStadionlar.length} ta</div>
              <div className="text-[10px] font-extrabold text-[var(--color-xfl-text-dim)] uppercase">Stadionlar</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">3 ta</div>
              <div className="text-[10px] font-extrabold text-[var(--color-xfl-text-dim)] uppercase">Ligalari</div>
            </div>
          </div>
        </div>

        {/* Hero Right: Featured FC26 Player Spotlight */}
        <div className="z-10 flex flex-col items-center shrink-0">
          <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <span>★ HAFTA O'YINCHISI (FC26 SPOTLIGHT)</span>
          </div>

          <div
            className="transform hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-2xl"
            onClick={() => setSelectedPlayer(featuredPlayer)}
          >
            <PlayerCard player={featuredPlayer} />
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs font-bold text-gray-300">Jasurbek Normatov • Afrosiyob FC</span>
            <div className="text-[10px] text-emerald-400 font-extrabold">18 Gol • 8.4 Rating</div>
          </div>
        </div>
      </section>

      {/* 3 FORMAT QUICK NAVIGATION (6x6, 9x9, 11x11) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[var(--color-xfl-accent)] rounded-full" />
              Liga Formatlari (6x6, 9x9, 11x11)
            </h2>
            <p className="text-xs text-[var(--color-xfl-text-dim)] mt-1">
              O'zingizga mos keladigan o'yin formatini tanlang
            </p>
          </div>

          <div className="flex bg-[var(--color-xfl-card)] p-1 rounded-xl border border-[var(--color-xfl-border)]">
            <button
              onClick={() => setActiveFormat('all')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                activeFormat === 'all' ? 'bg-[var(--color-xfl-primary)] text-white shadow' : 'text-[var(--color-xfl-text-dim)]'
              }`}
            >
              Barchasi
            </button>
            {formatlar.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFormat(f.id)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                  activeFormat === f.id ? 'bg-[var(--color-xfl-accent)] text-black shadow font-black' : 'text-[var(--color-xfl-text-dim)]'
                }`}
              >
                {f.icon} {f.id}
              </button>
            ))}
          </div>
        </div>

        {/* 3 MAIN NAVIGATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/klublar"
            className="glass-card p-6 flex flex-col justify-between group hover:scale-[1.03] transition-all border-t-4 border-t-emerald-500"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Klublar Bo'limi
              </h3>
              <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed">
                Samarqanddagi barcha 6x6, 9x9 va 11x11 klublar, ularning tarkibi va natijalari bilan tanishing.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-extrabold text-emerald-400">
              <span>{filteredClubs.length} ta jamoa mavjud</span>
              <span>Kirish →</span>
            </div>
          </Link>

          <Link
            href="/transferlar"
            className="glass-card p-6 flex flex-col justify-between group hover:scale-[1.03] transition-all border-t-4 border-t-amber-500"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                🔄
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                Transfer Oynasi
              </h3>
              <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed">
                Erkin o'yinchilar bozori. FC26 kartochkangizni yaratib o'zingizga mos jamoa toping.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-extrabold text-amber-400">
              <span>{demoOyinchilar.length} ta o'yinchi bozorida</span>
              <span>Kirish →</span>
            </div>
          </Link>

          <Link
            href="/stadionlar"
            className="glass-card p-6 flex flex-col justify-between group hover:scale-[1.03] transition-all border-t-4 border-t-blue-500"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-3xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                🏟️
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
                Stadionlar Tizimi
              </h3>
              <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed">
                6x6, 9x9 va 11x11 futbol maydonlarini qidiring va band qilingan vaqtlarni real-vaqtda ko'ring.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-extrabold text-blue-400">
              <span>{filteredStadiums.length} ta maydon ochiq</span>
              <span>Kirish →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* MATCHES & SIDEBAR (LEAGUE TABLE + TOP SCORERS) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT 2 COLS: UPCOMING & RECENT MATCHES */}
        <div className="lg:col-span-2 space-y-8">

          {/* UPCOMING MATCHES */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>📅</span> Navbatdagi O'yinlar
              </h3>
              <Link href="/klublar" className="text-xs font-bold text-[var(--color-xfl-accent)] hover:underline">
                Hammasi →
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingMatches.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)] flex flex-col sm:flex-row justify-between items-center gap-4 hover:border-[var(--color-xfl-accent)] transition-all"
                >
                  <div className="flex-1 text-center sm:text-right font-extrabold text-sm text-white">
                    {m.homeTeam}
                  </div>

                  <div className="px-4 py-1.5 rounded-xl bg-black/60 border border-white/10 text-center shrink-0">
                    <span className="text-[10px] text-gray-400 font-bold block">{m.date}</span>
                    <span className="text-xs font-black text-[var(--color-xfl-accent)]">VS</span>
                    <span className="text-[9px] text-amber-400 font-black block">{m.format || '11x11'}</span>
                  </div>

                  <div className="flex-1 text-center sm:text-left font-extrabold text-sm text-white">
                    {m.awayTeam}
                  </div>

                  <div
                    onClick={() => {
                      const stad = demoStadionlar.find(s => s.name.includes(m.stadium.split(' ')[0]));
                      if (stad) setSelectedStadium(stad);
                    }}
                    className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/30 cursor-pointer hover:bg-blue-500/20"
                  >
                    🏟️ {m.stadium}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT MATCH RESULTS */}
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🏆</span> So'nggi Natijalar
              </h3>
              <span className="text-xs text-[var(--color-xfl-text-dim)] font-semibold">Tugallangan o'yinlar</span>
            </div>

            <div className="space-y-3">
              {recentResults.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-[var(--color-xfl-border)] flex justify-between items-center gap-4"
                >
                  <div className="flex-1 text-right font-extrabold text-sm text-white">
                    {m.homeTeam}
                  </div>

                  <div className="px-5 py-2 rounded-xl bg-black/80 border border-emerald-500/30 text-center shrink-0">
                    <span className="text-base font-black text-[var(--color-xfl-accent)]">
                      {m.homeScore} - {m.awayScore}
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold block">{m.date}</span>
                  </div>

                  <div className="flex-1 text-left font-extrabold text-sm text-white">
                    {m.awayTeam}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT 1 COL: INTERACTIVE LEAGUE TABLE & TOP SCORERS */}
        <div className="space-y-8">

          {/* LEAGUE TABLE (Clicking team opens ClubModal) */}
          <div className="glass-card p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>📊</span> Turnir Jadvali
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold">11x11 / 9x9</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] font-black text-[var(--color-xfl-text-dim)] border-b border-[var(--color-xfl-border)] uppercase">
                  <tr>
                    <th className="py-2 px-1">#</th>
                    <th className="py-2">Klub</th>
                    <th className="py-2 text-center">O'</th>
                    <th className="py-2 text-center text-green-400">G'</th>
                    <th className="py-2 text-center">D</th>
                    <th className="py-2 text-center text-red-400">M</th>
                    <th className="py-2 text-center font-black text-white">O</th>
                  </tr>
                </thead>
                <tbody>
                  {topTeams.map((team, idx) => (
                    <tr
                      key={idx}
                      onClick={() => {
                        const clubObj = demoKlublar.find(c => c.name === team.club);
                        if (clubObj) setSelectedClub(clubObj);
                      }}
                      className="border-b border-[var(--color-xfl-border)]/50 last:border-0 hover:bg-[var(--color-xfl-card-hover)] cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-1 font-black text-gray-400">{idx + 1}</td>
                      <td className="py-2.5 font-bold text-white truncate max-w-[110px]">{team.club}</td>
                      <td className="py-2.5 text-center text-gray-300">{team.played}</td>
                      <td className="py-2.5 text-center font-bold text-green-400">{team.won}</td>
                      <td className="py-2.5 text-center text-gray-400">{team.drawn}</td>
                      <td className="py-2.5 text-center text-red-400">{team.lost}</td>
                      <td className="py-2.5 text-center font-black text-[var(--color-xfl-accent)]">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-[var(--color-xfl-text-dim)] mt-3 text-center italic">
              Klub ustiga bosing — tarkibi va natijalarini ko'rasiz
            </p>
          </div>

          {/* TOP SCORERS */}
          <div className="glass-card p-5">
            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <span>🎯</span> Eng Yaxshi To'purarlar
            </h3>
            <div className="space-y-2.5">
              {scorers.map((pl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const plObj = demoOyinchilar.find(p => p.fullName === pl.name) || {
                      fullName: pl.name,
                      club: pl.club,
                      position: 'ST',
                      rating: 8.0,
                      goals: pl.goals,
                      matches: 20,
                      isVerified: true
                    };
                    setSelectedPlayer(plObj);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] hover:border-amber-500/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-white">{pl.name}</div>
                      <div className="text-[10px] text-[var(--color-xfl-text-dim)]">{pl.club}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-amber-400">{pl.goals}</span>
                    <span className="text-[9px] text-gray-400 font-bold block">GOL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* MODALS */}

      {/* CREATE PLAYER CARD MODAL */}
      {isCreateCardOpen && (
        <CreatePlayerModal onClose={() => setIsCreateCardOpen(false)} />
      )}

      {/* CLUB MODAL */}
      {selectedClub && (
        <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)} />
      )}

      {/* STADIUM MODAL */}
      {selectedStadium && (
        <StadiumModal stadium={selectedStadium} onClose={() => setSelectedStadium(null)} />
      )}

      {/* PLAYER MODAL (FC26 PREVIEW) */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPlayer(null)} />
          <div className="relative z-10 animate-[slideUp_0.3s_ease-out]">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <PlayerCard player={selectedPlayer} />
          </div>
        </div>
      )}

    </div>
  );
}
