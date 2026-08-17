'use client';

import { useState } from 'react';
import Link from 'next/link';
import { demoOyinlar, topSkorlar, ligJadvali, demoKlublar, demoStadionlar, demoOyinchilar, formatlar, tumanlar } from '@/data/demo-data';
import PlayerCard from '@/components/PlayerCard';
import CreatePlayerModal from '@/components/CreatePlayerModal';
import ClubModal from '@/components/ClubModal';
import StadiumModal from '@/components/StadiumModal';
import MatchDetailModal from '@/components/MatchDetailModal';

export default function Home() {
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeFormat, setActiveFormat] = useState('all');
  const [activeDistrict, setActiveDistrict] = useState('all');

  const upcomingMatches = demoOyinlar?.filter(m => m.status === 'scheduled') || [
    {
      id: 'm-up-1',
      homeTeam: "Afrosiyob FC",
      awayTeam: "Registon FC",
      homeScore: 0,
      awayScore: 0,
      date: "2025-08-23 (Shanba)",
      stadium: "Afrosiyob Arena",
      status: "scheduled",
      format: "11x11",
    },
    {
      id: 'm-up-2',
      homeTeam: "Urgut Arslon",
      awayTeam: "Jomboy Stars",
      homeScore: 0,
      awayScore: 0,
      date: "2025-08-24 (Yakshanba)",
      stadium: "Urgut Tog' Majmuasi",
      status: "scheduled",
      format: "9x9",
    }
  ];

  const recentResults = demoOyinlar?.filter(m => m.status === 'completed') || [];
  const topTeams = ligJadvali || [];
  const scorers = topSkorlar || [];

  // Top featured player for the spotlight card
  const featuredPlayer = demoOyinchilar[0] || {
    fullName: "Jasurbek Normatov",
    position: "ST",
    age: 23,
    district: "Samarqand shahar",
    club: "Afrosiyob FC",
    rating: 8.4,
    pace: 88,
    shooting: 86,
    passing: 75,
    dribbling: 82,
    defense: 40,
    physical: 80,
    goals: 18,
    assists: 7,
    matches: 24,
    isVerified: true,
    isOnTransfer: false,
  };

  // Filtered clubs by format & district
  const filteredClubs = demoKlublar.filter(c => {
    const matchesFormat = activeFormat === 'all' || c.format === activeFormat;
    const matchesDist = activeDistrict === 'all' || c.district === activeDistrict;
    return matchesFormat && matchesDist;
  });

  // Filtered stadiums
  const filteredStadiums = demoStadionlar.filter(s => {
    const matchesFormat = activeFormat === 'all' || s.fieldSize === activeFormat;
    const matchesDist = activeDistrict === 'all' || s.district === activeDistrict;
    return matchesFormat && matchesDist;
  });

  return (
    <div className="page-container pb-28 space-y-16">

      {/* HERO SECTION WITH ATMOSPHERIC SPOTLIGHT */}
      <section className="relative glass-card p-6 sm:p-10 lg:p-14 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 border border-[var(--color-xfl-border)]">
        {/* Stadium Floodlight Radial Ambience */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[var(--color-xfl-accent)]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Left Content */}
        <div className="flex-1 text-center lg:text-left z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-live" />
            <span>SAMARQAND VILOYATI RASMIY FUTBOL PLATFORMASI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white">
            Samarqand <span className="gradient-text">Havaskor Futbol</span> Ligasi
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-xfl-text-dim)] max-w-xl leading-relaxed">
            6x6, 9x9 va 11x11 formatlarda jamoangiz bilan qatnashing, <strong>EA Sports FC 26</strong> uslubidagi elektron kartangizni yarating va maydonlarni real-vaqtda bron qiling.
          </p>

          {/* Interactive Hero CTAs */}
          <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start pt-2">
            <Link
              href="/klublar"
              className="btn-primary py-3.5 px-8 text-sm font-black shadow-xl shadow-green-500/25 flex items-center gap-2"
            >
              🛡️ Jamoalarga Qo'shilish
            </Link>

            <button
              onClick={() => setIsCreateCardOpen(true)}
              className="btn-orange py-3.5 px-8 text-sm font-black shadow-xl shadow-orange-500/30 flex items-center gap-2"
            >
              ⚽ FC 26 Karta Yaratish
            </button>

            <Link
              href="/stadionlar"
              className="btn-secondary py-3.5 px-6 text-sm font-bold flex items-center gap-2"
            >
              🏟️ Stadion Bron Qilish
            </Link>
          </div>

          {/* Live Platform Counters */}
          <div className="grid grid-cols-4 gap-3 pt-6 border-t border-[var(--color-xfl-border)] text-center lg:text-left">
            <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-white">{demoKlublar.length} ta</div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Klublar</div>
            </div>
            <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-[var(--color-xfl-accent)]">{demoOyinchilar.length * 4}+</div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">O'yinchilar</div>
            </div>
            <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-white">{demoStadionlar.length} ta</div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Stadionlar</div>
            </div>
            <div className="bg-black/30 p-2.5 rounded-2xl border border-white/5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">3 ta</div>
              <div className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Format (6/9/11)</div>
            </div>
          </div>
        </div>

        {/* Hero Right: 3D Parallax FC26 Spotlight Card */}
        <div className="z-10 flex flex-col items-center shrink-0">
          <div className="text-[10px] font-black text-amber-300 bg-amber-400/20 border border-amber-400/40 px-3 py-1 rounded-full uppercase tracking-widest mb-3 flex items-center gap-1.5 shadow-lg">
            <span>★ HAFTA O'YINCHISI (SPOTLIGHT)</span>
          </div>

          <div
            className="transform hover:scale-105 transition-all duration-300 cursor-pointer drop-shadow-2xl"
            onClick={() => setSelectedPlayer(featuredPlayer)}
          >
            <PlayerCard player={featuredPlayer} size="standard" />
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs font-black text-white">{featuredPlayer.fullName} • {featuredPlayer.club}</span>
            <div className="text-[10px] text-emerald-400 font-extrabold">18 Gol • 8.4 Rating • ST</div>
          </div>
        </div>
      </section>

      {/* 3 CORE PILLARS SECTION (KLUBLAR, TRANSFERLAR, STADIONLAR) */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-7 bg-[var(--color-xfl-accent)] rounded-full" />
              Asosiy Xizmatlar & Formatlar (6x6, 9x9, 11x11)
            </h2>
            <p className="text-xs text-[var(--color-xfl-text-dim)] mt-1">
              Samarqand viloyati havaskor futbolining uchta asosiy ustuni
            </p>
          </div>

          {/* Format selector buttons */}
          <div className="flex flex-wrap bg-[var(--color-xfl-card)] p-1 rounded-2xl border border-[var(--color-xfl-border)] text-xs font-black">
            <button
              onClick={() => setActiveFormat('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeFormat === 'all'
                  ? 'bg-[var(--color-xfl-primary)] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Barcha Formatlar
            </button>
            {formatlar.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFormat(f.id)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  activeFormat === f.id
                    ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] font-black shadow-md shadow-green-500/25'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f.icon} {f.id}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Luxury Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Klublar */}
          <Link
            href="/klublar"
            className="glass-card p-6 sm:p-7 flex flex-col justify-between group border-t-4 border-t-emerald-500"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-emerald-500/20">
                🛡️
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase text-emerald-400">JAMOALAR EKOTIZIMI</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Klublar Maydoni
              </h3>
              <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed">
                Samarqanddagi barcha rasmiy jamoalar tarkibi, klub formalari, murabbiylar va taktik 2D maydon joylashuvi.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-xfl-border)] flex items-center justify-between text-xs font-black text-emerald-400">
              <span>{filteredClubs.length} ta jamoa faol</span>
              <span className="group-hover:translate-x-1 transition-transform">Ro'yxatni ko'rish →</span>
            </div>
          </Link>

          {/* Card 2: Transferlar */}
          <Link
            href="/transferlar"
            className="glass-card p-6 sm:p-7 flex flex-col justify-between group border-t-4 border-t-amber-500"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-amber-500/20">
                🔄
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase text-amber-400">BOZOR VA ERKIN AGENTLAR</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                Transfer Oynasi
              </h3>
              <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed">
                Erkin agentlar bozori. FC26 elektron kartangizni e'lon qiling yoki jamoangizga tajribali hujumchi va darvozabon toping.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-xfl-border)] flex items-center justify-between text-xs font-black text-amber-400">
              <span>{demoOyinchilar.length} ta o'yinchi bozorida</span>
              <span className="group-hover:translate-x-1 transition-transform">Kartalarni ko'rish →</span>
            </div>
          </Link>

          {/* Card 3: Stadionlar */}
          <Link
            href="/stadionlar"
            className="glass-card p-6 sm:p-7 flex flex-col justify-between group border-t-4 border-t-blue-500"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-blue-500/20">
                🏟️
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase text-blue-400">ONLAYN BAND QILISH</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">
                Stadionlar Tizimi
              </h3>
              <p className="text-xs text-[var(--color-xfl-text-dim)] leading-relaxed">
                6x6, 9x9 va 11x11 maydonlarning aniq manzili, soatlik narxi va bugungi bandlik grafigini real-vaqtda tekshiring.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--color-xfl-border)] flex items-center justify-between text-xs font-black text-blue-400">
              <span>{filteredStadiums.length} ta maydon ochiq</span>
              <span className="group-hover:translate-x-1 transition-transform">Bron qilish →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* MATCH CENTER & SIDEBAR (STANDINGS + GOLDEN BOOT) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT 2 COLUMNS: MATCH CENTER (UPCOMING & RECENT) */}
        <div className="lg:col-span-2 space-y-8">

          {/* UPCOMING MATCHES */}
          <div className="glass-card p-6 sm:p-7 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  MATCHDAY JADVALI
                </span>
                <h3 className="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                  <span>📅</span> Navbatdagi O'yinlar
                </h3>
              </div>
              <Link href="/klublar" className="text-xs font-bold text-[var(--color-xfl-accent)] hover:underline">
                Barcha O'yinlar →
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingMatches.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMatch(m)}
                  className="bg-[var(--color-xfl-bg)] p-4 sm:p-5 rounded-2xl border border-[var(--color-xfl-border)] flex flex-col sm:flex-row justify-between items-center gap-4 hover:border-[var(--color-xfl-accent)] cursor-pointer transition-all hover:scale-[1.01] group"
                >
                  <div className="flex-1 text-center sm:text-right font-black text-sm text-white truncate max-w-full">
                    {m.homeTeam}
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-black/70 border border-white/10 text-center shrink-0 shadow-inner">
                    <span className="text-[10px] text-gray-400 font-bold block">{m.date}</span>
                    <span className="text-xs font-black text-[var(--color-xfl-accent)]">VS</span>
                    <span className="text-[9px] text-amber-400 font-black block">{m.format || '11x11'} Liga</span>
                  </div>

                  <div className="flex-1 text-center sm:text-left font-black text-sm text-white truncate max-w-full">
                    {m.awayTeam}
                  </div>

                  <div className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/30 shrink-0 group-hover:bg-blue-500/20">
                    🏟️ {m.stadium}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT MATCH RESULTS */}
          <div className="glass-card p-6 sm:p-7 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  SO'NGGI TUR NATIJALARI
                </span>
                <h3 className="text-xl font-black text-white flex items-center gap-2 mt-0.5">
                  <span>🏆</span> Tugallangan Uchrashuvlar
                </h3>
              </div>
              <span className="text-xs text-gray-400 font-semibold">Hisob va Natijalar</span>
            </div>

            <div className="space-y-3">
              {recentResults.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMatch(m)}
                  className="bg-[var(--color-xfl-bg)] p-4 sm:p-5 rounded-2xl border border-[var(--color-xfl-border)] flex justify-between items-center gap-4 hover:border-white/30 cursor-pointer transition-all"
                >
                  <div className="flex-1 text-right font-black text-sm text-white truncate">
                    {m.homeTeam}
                  </div>

                  <div className="px-5 py-2 rounded-2xl bg-black/80 border border-emerald-500/30 text-center shrink-0">
                    <span className="text-lg font-black gradient-text tabular-nums">
                      {m.homeScore} - {m.awayScore}
                    </span>
                    <span className="text-[9px] text-gray-400 font-bold block">{m.date}</span>
                  </div>

                  <div className="flex-1 text-left font-black text-sm text-white truncate">
                    {m.awayTeam}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT 1 COLUMN: STANDINGS & GOLDEN BOOT */}
        <div className="space-y-8">

          {/* LEAGUE TABLE (SOFASCORE STYLE) */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400">RASMIY REYTING</span>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>📊</span> Turnir Jadvali
                </h3>
              </div>
              <span className="text-[10px] text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/30">
                11x11 / 9x9
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] font-black text-[var(--color-xfl-text-dim)] border-b border-white/10 uppercase tracking-wider">
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
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer transition-colors"
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

            <p className="text-[10px] text-gray-400 text-center italic pt-1">
              Klub ustiga bosing — to'liq tarkib va taktikani ko'rasiz
            </p>
          </div>

          {/* TOP SCORERS / GOLDEN BOOT RACE */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-xfl-border)]">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400">OLTIN BUTSA</span>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>🎯</span> To'purarlar Poygasi
                </h3>
              </div>
              <span className="text-xs text-amber-300 font-bold">2025/26</span>
            </div>

            <div className="space-y-2.5">
              {scorers.map((pl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const plObj = demoOyinchilar.find(p => p.fullName === pl.name) || {
                      fullName: pl.name,
                      club: pl.club,
                      position: 'ST',
                      rating: 8.2,
                      goals: pl.goals,
                      matches: 22,
                      isVerified: true
                    };
                    setSelectedPlayer(plObj);
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] hover:border-amber-400/50 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 shadow-md ${
                        idx === 0
                          ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-black'
                          : idx === 1
                          ? 'bg-gradient-to-tr from-slate-300 to-slate-100 text-black'
                          : idx === 2
                          ? 'bg-gradient-to-tr from-amber-700 to-amber-500 text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-black text-xs text-white">{pl.name}</div>
                      <div className="text-[10px] text-gray-400">{pl.club}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-amber-400 tabular-nums">{pl.goals}</span>
                    <span className="text-[9px] font-extrabold text-gray-400 block uppercase">GOL</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="pt-12 border-t border-[var(--color-xfl-border)] text-xs text-[var(--color-xfl-text-dim)] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-2xl font-black gradient-text">XFL SAMARQAND</div>
          <p className="max-w-md text-gray-400">
            Samarqand viloyati rasmiy elektron havaskor futbol ligasi. Jamoalar, transferlar va stadionlar yagona platformada.
          </p>
        </div>

        <div className="flex gap-6 font-bold text-gray-300">
          <Link href="/klublar" className="hover:text-emerald-400 transition-colors">Klublar</Link>
          <Link href="/transferlar" className="hover:text-emerald-400 transition-colors">Transferlar</Link>
          <Link href="/stadionlar" className="hover:text-emerald-400 transition-colors">Stadionlar</Link>
          <Link href="/profil" className="hover:text-emerald-400 transition-colors">Mening Profilim</Link>
        </div>

        <div className="text-center md:text-right">
          <p className="text-white font-bold">📍 Samarqand, O'zbekiston 🇺🇿</p>
          <p className="text-[11px] text-gray-500 mt-0.5">© 2025-2026 XFL. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

      {/* MODALS */}
      {isCreateCardOpen && (
        <CreatePlayerModal onClose={() => setIsCreateCardOpen(false)} />
      )}

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

      {selectedStadium && (
        <StadiumModal
          stadium={selectedStadium}
          onClose={() => setSelectedStadium(null)}
        />
      )}

      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onStadiumClick={(stadName) => {
            const stad = demoStadionlar.find(s => s.name.toLowerCase().includes(stadName.toLowerCase().split(' ')[0]));
            setSelectedMatch(null);
            if (stad) setSelectedStadium(stad);
          }}
        />
      )}

      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedPlayer(null)} />
          <div className="relative z-10 animate-slide-up">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <PlayerCard player={selectedPlayer} size="standard" />
          </div>
        </div>
      )}

    </div>
  );
}
