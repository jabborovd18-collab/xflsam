'use client';
import { demoOyinlar, topSkorlar, ligJadvali, demoKlublar, demoStadionlar, demoOyinchilar } from '@/data/demo-data';
import Link from 'next/link';

export default function Home() {
  const upcomingMatches = demoOyinlar?.filter(m => m.status === 'scheduled') || [];
  const recentResults = demoOyinlar?.filter(m => m.status === 'completed') || [];
  const topTeams = ligJadvali?.slice(0, 5) || [];
  const scorers = topSkorlar || [];

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-16">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 overflow-hidden rounded-3xl glass-card">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 animate-[float_3s_ease-in-out_infinite] opacity-20">
          <svg className="w-16 h-16 text-xfl-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18A8 8 0 1 1 20 12A8 8 0 0 1 12 20Z"/></svg>
        </div>
        <div className="absolute bottom-10 right-10 animate-[float_4s_ease-in-out_infinite_reverse] opacity-20">
           <svg className="w-20 h-20 text-xfl-orange" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18A8 8 0 1 1 20 12A8 8 0 0 1 12 20Z"/></svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-xfl-accent to-xfl-primary-light">
          Samarqand xavaskor futbolining yangi davri
        </h1>
        <p className="text-xl md:text-2xl text-xfl-text-dim mb-10 max-w-2xl">
          Jamoa top, raqib top, maydon top — hammasi bir joyda
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-xfl-primary to-xfl-primary-light text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(27,94,32,0.6)]">
            Jamoalarga qo'shiling
          </button>
          <button className="px-8 py-4 rounded-full border-2 border-xfl-orange text-xfl-orange font-bold text-lg hover:bg-xfl-orange hover:text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,111,0,0.3)] hover:shadow-[0_0_25px_rgba(255,111,0,0.6)]">
            O'yinchi kartasi yarating
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl border-t border-xfl-border pt-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">8</span>
            <span className="text-xfl-text-dim">Klublar</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">50+</span>
            <span className="text-xfl-text-dim">O'yinchilar</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">8</span>
            <span className="text-xfl-text-dim">Stadionlar</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white mb-2">26</span>
            <span className="text-xfl-text-dim">O'yinlar</span>
          </div>
        </div>
      </section>

      {/* THREE MAIN CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/klublar" className="glass-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform border-t-4 border-t-xfl-primary">
           <div className="w-16 h-16 rounded-full bg-xfl-bg flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,230,118,0.5)] transition-shadow">
             <span className="text-3xl">🛡️</span>
           </div>
           <h3 className="text-xl font-bold mb-2">Klublar</h3>
           <p className="text-xfl-text-dim">Barcha jamoalar ro'yxati, tarkiblar va statistika bilan tanishing.</p>
        </Link>
        <Link href="/transferlar" className="glass-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform border-t-4 border-t-xfl-orange">
           <div className="w-16 h-16 rounded-full bg-xfl-bg flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(255,111,0,0.5)] transition-shadow">
             <span className="text-3xl">🔄</span>
           </div>
           <h3 className="text-xl font-bold mb-2">Transfer Oynasi</h3>
           <p className="text-xfl-text-dim">Erkin agentlar va jamoa izlayotgan o'yinchilar.</p>
        </Link>
        <Link href="/stadionlar" className="glass-card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform border-t-4 border-t-xfl-accent">
           <div className="w-16 h-16 rounded-full bg-xfl-bg flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,230,118,0.5)] transition-shadow">
             <span className="text-3xl">🏟️</span>
           </div>
           <h3 className="text-xl font-bold mb-2">Stadionlar</h3>
           <p className="text-xfl-text-dim">O'yinlar o'tkaziladigan maydonlar va ularning joylashuvi.</p>
        </Link>
      </section>

      {/* MATCHES & LEAGUE TABLE ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* UPCOMING MATCHES */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-xfl-accent rounded-full"></span>
              Kelgusi O'yinlar
            </h2>
            <div className="grid gap-4">
              {upcomingMatches.slice(0, 2).map((match, idx) => (
                <div key={idx} className="glass-card p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-xfl-card-hover transition-colors">
                  <div className="flex-1 text-right font-semibold text-lg">{match.homeTeam}</div>
                  <div className="flex flex-col items-center px-6 py-2 bg-xfl-bg rounded-lg">
                    <span className="text-sm text-xfl-text-dim">{match.date}</span>
                    <span className="font-bold text-xfl-accent">VS</span>
                  </div>
                  <div className="flex-1 text-left font-semibold text-lg">{match.awayTeam}</div>
                  <div className="w-full md:w-auto text-center md:text-right text-xs text-xfl-text-dim mt-2 md:mt-0">
                    🏟️ {match.stadium}
                  </div>
                </div>
              ))}
              {upcomingMatches.length === 0 && (
                <div className="text-xfl-text-dim italic text-center p-4">Kelgusi o'yinlar topilmadi.</div>
              )}
            </div>
          </div>

          {/* RECENT RESULTS */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-xfl-orange rounded-full"></span>
              So'nggi Natijalar
            </h2>
            <div className="grid gap-4">
              {recentResults.slice(0, 2).map((match, idx) => (
                <div key={idx} className="glass-card p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-xfl-card-hover transition-colors">
                  <div className="flex-1 text-right font-semibold text-lg">{match.homeTeam}</div>
                  <div className="flex flex-col items-center px-6 py-2 bg-xfl-bg rounded-lg shadow-inner">
                    <span className="text-2xl font-black">{match.homeScore} - {match.awayScore}</span>
                  </div>
                  <div className="flex-1 text-left font-semibold text-lg">{match.awayTeam}</div>
                </div>
              ))}
               {recentResults.length === 0 && (
                <div className="text-xfl-text-dim italic text-center p-4">So'nggi natijalar topilmadi.</div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR: LEAGUE TABLE & TOP SCORERS */}
        <div className="flex flex-col gap-8">
          {/* LEAGUE TABLE */}
          <div className="glass-card p-4">
            <h2 className="text-xl font-bold mb-4">Turnir jadvali</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-xfl-text-dim border-b border-xfl-border">
                  <tr>
                    <th className="py-2">#</th>
                    <th className="py-2">Klub</th>
                    <th className="py-2 text-center">O'</th>
                    <th className="py-2 text-center text-xfl-accent">G'</th>
                    <th className="py-2 text-center">D</th>
                    <th className="py-2 text-center text-red-400">M</th>
                    <th className="py-2 text-center font-bold">O</th>
                  </tr>
                </thead>
                <tbody>
                  {topTeams.map((team, idx) => (
                    <tr key={idx} className="border-b border-xfl-border/50 last:border-0 hover:bg-xfl-card-hover/50 transition-colors">
                      <td className="py-3 font-semibold">{idx + 1}</td>
                      <td className="py-3 font-semibold truncate max-w-[100px]">{team.name}</td>
                      <td className="py-3 text-center">{team.played}</td>
                      <td className="py-3 text-center">{team.won}</td>
                      <td className="py-3 text-center">{team.drawn}</td>
                      <td className="py-3 text-center">{team.lost}</td>
                      <td className="py-3 text-center font-bold text-xfl-accent">{team.points}</td>
                    </tr>
                  ))}
                  {topTeams.length === 0 && (
                     <tr><td colSpan="7" className="py-4 text-center text-xfl-text-dim">Jadval bo'sh</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* TOP SCORERS */}
          <div className="glass-card p-4">
            <h2 className="text-xl font-bold mb-4">To'purarlar</h2>
            <div className="flex flex-col gap-3">
              {scorers.slice(0, 5).map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-xfl-card-hover transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-xfl-primary to-xfl-accent flex items-center justify-center font-bold text-sm shadow-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-xs text-xfl-text-dim">{player.club}</div>
                    </div>
                  </div>
                  <div className="font-black text-xl text-xfl-orange">{player.goals}</div>
                </div>
              ))}
               {scorers.length === 0 && (
                  <div className="text-center text-xfl-text-dim py-4">To'purarlar ro'yxati bo'sh</div>
               )}
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-16 pt-8 border-t border-xfl-border text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
        <div>
           <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-xfl-primary-light to-xfl-accent mb-2">XFL</div>
           <p className="text-xfl-text-dim text-sm max-w-sm">Samarqand xavaskor futbol ligasi platformasi. Futbolni biz bilan birga rivojlantiring.</p>
        </div>
        <div className="flex gap-6 text-sm text-xfl-text-dim">
           <Link href="#" className="hover:text-xfl-accent transition-colors">Qoidalar</Link>
           <Link href="#" className="hover:text-xfl-accent transition-colors">Biz haqimizda</Link>
           <Link href="#" className="hover:text-xfl-accent transition-colors">Aloqa</Link>
        </div>
        <div className="text-sm text-xfl-text-dim text-right">
           <p>📍 Samarqand, O'zbekiston 🇺🇿</p>
           <p className="mt-1">© 2025 XFL. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
