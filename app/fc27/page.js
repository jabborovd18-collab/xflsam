'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import sounds from '@/lib/audio';
import { demoKlublar, demoOyinchilar } from '@/data/demo-data';
import TacticalPitch from '@/components/TacticalPitch';
import PackOpeningModal from '@/components/PackOpeningModal';

export default function FC27MatchPage() {
  const [homeClub, setHomeClub] = useState(demoKlublar[0]); // Afrosiyob FC
  const [awayClub, setAwayClub] = useState(demoKlublar[2]); // Registon FC
  const [format, setFormat] = useState('11x11'); // '6x6', '9x9', '11x11'
  const [matchState, setMatchState] = useState('prematch'); // 'prematch', 'playing', 'action_moment', 'halftime', 'fulltime'
  
  // In-Game State
  const [minute, setMinute] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 4x
  const [commentary, setCommentary] = useState([]);
  const [events, setEvents] = useState([]); // [{ minute, text, type: 'goal'|'card'|'chance' }]
  const [actionMoment, setActionMoment] = useState(null);
  const [stats, setStats] = useState({
    homePossession: 55,
    awayPossession: 45,
    homeShots: 0,
    awayShots: 0,
    homeShotsOnTarget: 0,
    awayShotsOnTarget: 0,
    homeCorners: 0,
    awayCorners: 0,
    homeFouls: 0,
    awayFouls: 0,
  });

  // Animated Ball and Player Positions on 2D Radar
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const [coinsWon, setCoinsWon] = useState(0);
  const [isPackModalOpen, setIsPackModalOpen] = useState(false);

  const timerRef = useRef(null);

  // START MATCH
  const startMatch = () => {
    setMinute(0);
    setHomeScore(0);
    setAwayScore(0);
    setEvents([]);
    setCommentary([
      { minute: "0'", text: `Hakam hushtagi chalindi! ${homeClub.name} vs ${awayClub.name} o'yini boshlandi.`, type: "info" }
    ]);
    setStats({
      homePossession: 52,
      awayPossession: 48,
      homeShots: 0,
      awayShots: 0,
      homeShotsOnTarget: 0,
      awayShotsOnTarget: 0,
      homeCorners: 0,
      awayCorners: 0,
      homeFouls: 0,
      awayFouls: 0,
    });
    setMatchState('playing');
    sounds.playGoal();
  };

  // MATCH LOOP SIMULATION TICKER
  useEffect(() => {
    if (matchState !== 'playing') return;

    const tickInterval = 1000 / speed;

    timerRef.current = setInterval(() => {
      setMinute((prevMin) => {
        const nextMin = prevMin + 1;

        // Move Ball randomly on radar
        setBallPos({
          x: Math.max(15, Math.min(85, 50 + (Math.random() - 0.5) * 60)),
          y: Math.max(15, Math.min(85, 50 + (Math.random() - 0.5) * 60)),
        });

        // Trigger Tactical Action Moments at random key minutes
        if ((nextMin === 24 || nextMin === 68) && !actionMoment) {
          clearInterval(timerRef.current);
          setMatchState('action_moment');
          setActionMoment({
            minute: nextMin,
            player: homeClub.roster?.[0]?.name || "Jasurbek Normatov",
            scenario: "Jarima maydonchasi ichida bo'sh joy topdingiz! Darvozabon oldinga chiqdi. Qanday qaror qabul qilasiz?",
          });
          return nextMin;
        }

        // Random Match Events (Gollar, Zarbalar, Paslar)
        if (Math.random() < 0.18) {
          simulateRandomEvent(nextMin);
        }

        // Halftime at 45'
        if (nextMin === 45) {
          setCommentary(prev => [
            { minute: "45'", text: "Birinchi bo'lim yakunlandi. Jamoalar tanaffusga yo'l oldi.", type: "whistle" },
            ...prev
          ]);
        }

        // Fulltime at 90'
        if (nextMin >= 90) {
          clearInterval(timerRef.current);
          setMatchState('fulltime');
          sounds.playGoal();
          const earnedCoins = 100 + (homeScore > awayScore ? 150 : 50);
          setCoinsWon(earnedCoins);
          setCommentary(prev => [
            { minute: "90'", text: `O'yin tugadi! Yakuniy hisob: ${homeClub.name} ${homeScore} - ${awayScore} ${awayClub.name}`, type: "whistle" },
            ...prev
          ]);
          return 90;
        }

        return nextMin;
      });
    }, tickInterval);

    return () => clearInterval(timerRef.current);
  }, [matchState, speed, homeScore, awayScore, homeClub, awayClub]);

  // RANDOM MATCH ENGINE EVENT
  const simulateRandomEvent = (currentMin) => {
    const isHome = Math.random() > 0.45;
    const team = isHome ? homeClub : awayClub;
    const oppTeam = isHome ? awayClub : homeClub;
    const player = team.roster?.[Math.floor(Math.random() * (team.roster?.length || 5))]?.name || "Hujumchi";

    const rand = Math.random();

    if (rand < 0.25) {
      // GOAL EVENT!
      sounds.playGoal();
      if (isHome) {
        setHomeScore(s => s + 1);
        setStats(st => ({ ...st, homeShots: st.homeShots + 1, homeShotsOnTarget: st.homeShotsOnTarget + 1 }));
      } else {
        setAwayScore(s => s + 1);
        setStats(st => ({ ...st, awayShots: st.awayShots + 1, awayShotsOnTarget: st.awayShotsOnTarget + 1 }));
      }

      const goalText = `⚽ GOOOL! ${currentMin}'-daqiqa: ${player} (${team.name}) to'pni darvoza to'riga aniq joyladi!`;
      setEvents(prev => [{ minute: currentMin, text: `${player} (${team.name})`, type: 'goal', isHome }, ...prev]);
      setCommentary(prev => [{ minute: `${currentMin}'`, text: goalText, type: 'goal' }, ...prev]);

    } else if (rand < 0.65) {
      // SHOT / SAVE EVENT
      sounds.playKick();
      if (isHome) {
        setStats(st => ({ ...st, homeShots: st.homeShots + 1, homeShotsOnTarget: st.homeShotsOnTarget + (Math.random() > 0.4 ? 1 : 0) }));
      } else {
        setStats(st => ({ ...st, awayShots: st.awayShots + 1, awayShotsOnTarget: st.awayShotsOnTarget + (Math.random() > 0.4 ? 1 : 0) }));
      }
      const shotText = `🔥 Xavfli vaziyat! ${player} kuchli zarba yo'lladi, to'p darvoza ustidan o'tib ketdi.`;
      setCommentary(prev => [{ minute: `${currentMin}'`, text: shotText, type: 'chance' }, ...prev]);

    } else {
      // FOUL / CORNER EVENT
      if (isHome) {
        setStats(st => ({ ...st, homeCorners: st.homeCorners + 1 }));
      } else {
        setStats(st => ({ ...st, awayCorners: st.awayCorners + 1 }));
      }
      setCommentary(prev => [{ minute: `${currentMin}'`, text: `⚡ ${team.name} burchak to'pi ishlab oldi.`, type: 'info' }, ...prev]);
    }
  };

  // HANDLE INTERACTIVE ACTION MOMENT CHOICE
  const handleActionChoice = (choice) => {
    sounds.playKick();
    let isSuccess = false;
    let comment = "";

    if (choice === 'shoot') {
      isSuccess = Math.random() > 0.35;
      if (isSuccess) {
        sounds.playGoal();
        setHomeScore(s => s + 1);
        comment = `🎯 SIZNING QARORINGIZ GOL BO'LDI! ${actionMoment.player} ajoyib zarba bilan to'qqizlikni aniq nishonga oldi!`;
        setEvents(prev => [{ minute: minute, text: `${actionMoment.player} (Sizning qaroringiz)`, type: 'goal', isHome: true }, ...prev]);
      } else {
        sounds.playSave();
        comment = `🧤 Kuchli zarba yo'lladingiz, lekin darvozabon qiyinchilik bilan to'pni burchakka chiqarib yubordi.`;
      }
    } else if (choice === 'pass') {
      isSuccess = Math.random() > 0.25;
      if (isSuccess) {
        sounds.playGoal();
        setHomeScore(s => s + 1);
        comment = `🎩 AQLBOVAR QILMAS PAS! Bo'sh turgan sherigingiz darvozani ishg'ol qildi! GOOOL!`;
        setEvents(prev => [{ minute: minute, text: `Gol (Sizning assistentingiz)`, type: 'goal', isHome: true }, ...prev]);
      } else {
        comment = `🛡️ Himoyachi pas yo'lini to'sib qoldi.`;
      }
    } else if (choice === 'dribble') {
      isSuccess = Math.random() > 0.45;
      if (isSuccess) {
        sounds.playGoal();
        setHomeScore(s => s + 1);
        comment = `⚡ DAXSHATLI DRIBLING! 2 ta himoyachini aldab o'tib, to'pni darvoza to'riga kiritdingiz! GOOOL!`;
        setEvents(prev => [{ minute: minute, text: `${actionMoment.player} (Solo Gol)`, type: 'goal', isHome: true }, ...prev]);
      } else {
        comment = `⚠️ Dribling paytida to'p olib qo'yildi.`;
      }
    }

    setCommentary(prev => [{ minute: `${minute}'`, text: comment, type: isSuccess ? 'goal' : 'info' }, ...prev]);
    setActionMoment(null);
    setMatchState('playing');
  };

  return (
    <div className="page-container pb-28 space-y-8">

      {/* MATCH HEADER HUD */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden border-2 border-[var(--color-xfl-border)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

          {/* Home Team */}
          <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
            <div
              style={{ backgroundColor: homeClub.color1 || '#1B5E20' }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-xl"
            >
              {homeClub.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">MEZBON JAMOA</span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{homeClub.name}</h2>
              <span className="text-xs text-gray-400 font-bold">★ 8.2 OVR • {format}</span>
            </div>
          </div>

          {/* Scoreboard & Clock Center */}
          <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-black/70 border border-white/10 text-center min-w-[200px] shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${matchState === 'playing' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                {matchState === 'prematch' ? 'O\'YIN BOSHLANMAGAN' : matchState === 'fulltime' ? 'TUGALLANDI' : `${minute}' DAQIQA`}
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black gradient-text tabular-nums tracking-wider my-0.5">
              {homeScore} : {awayScore}
            </div>

            {matchState === 'playing' && (
              <div className="flex gap-1.5 mt-2">
                {[1, 2, 4].map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black border transition-all ${
                      speed === s
                        ? 'bg-[var(--color-xfl-accent)] text-black border-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {s}x Tezlik
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-4 flex-1 justify-center md:justify-end text-center md:text-right flex-row-reverse md:flex-row">
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">MEHMON JAMOA</span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{awayClub.name}</h2>
              <span className="text-xs text-gray-400 font-bold">★ 7.9 OVR • {format}</span>
            </div>
            <div
              style={{ backgroundColor: awayClub.color1 || '#D97706' }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-xl"
            >
              {awayClub.name.charAt(0)}
            </div>
          </div>

        </div>

        {/* Prematch Action Controls */}
        {matchState === 'prematch' && (
          <div className="mt-8 pt-6 border-t border-[var(--color-xfl-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="text-gray-400 py-1.5">Format:</span>
              {['6x6', '9x9', '11x11'].map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-3 py-1 rounded-xl transition-all border ${
                    format === f
                      ? 'bg-[var(--color-xfl-accent)] text-black font-black border-white shadow'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={startMatch}
              className="btn-primary py-4 px-10 text-sm font-black shadow-xl shadow-green-500/30 flex items-center gap-2"
            >
              ⚽ O'YINNI BOSHLASH (START MATCH)
            </button>
          </div>
        )}
      </div>

      {/* 2-COLUMN MAIN BATTLEGROUND */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT 2 COLUMNS: 2D TACTICAL RADAR PITCH + ACTION MOMENTS */}
        <div className="lg:col-span-2 space-y-6">

          {/* 2D PITCH LIVE VISUALIZER */}
          <div className="glass-card p-6 relative overflow-hidden border border-[var(--color-xfl-border)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>🟢</span> 2D Jonli Maydon Radari
              </h3>
              <span className="text-xs text-emerald-400 font-bold">Afrosiyob Arena</span>
            </div>

            {/* Simulated 2D Soccer Pitch */}
            <div className="relative w-full aspect-[16/9] max-h-[360px] rounded-2xl soccer-pitch-bg border-2 border-emerald-400/40 shadow-inner overflow-hidden flex items-center justify-center select-none">
              
              {/* Pitch Markings */}
              <div className="absolute inset-2 border border-white/30 rounded-xl pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/30 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              {/* Home Goal Box */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-16 h-28 border-r border-y border-white/30 pointer-events-none" />
              {/* Away Goal Box */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-28 border-l border-y border-white/30 pointer-events-none" />

              {/* Animated 2D Ball */}
              {matchState === 'playing' && (
                <div
                  style={{
                    left: `${ballPos.x}%`,
                    top: `${ballPos.y}%`,
                    transition: `all ${0.8 / speed}s cubic-bezier(0.25, 1, 0.5, 1)`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-xl shadow-yellow-300 flex items-center justify-center text-xs animate-bounce pointer-events-none z-30"
                >
                  ⚽
                </div>
              )}

              {/* Team Players Dots */}
              <div className="absolute left-[20%] top-[40%] w-5 h-5 rounded-full bg-emerald-500 border border-white shadow flex items-center justify-center text-[9px] font-black text-white">
                #9
              </div>
              <div className="absolute left-[35%] top-[65%] w-5 h-5 rounded-full bg-emerald-500 border border-white shadow flex items-center justify-center text-[9px] font-black text-white">
                #7
              </div>
              <div className="absolute right-[20%] top-[45%] w-5 h-5 rounded-full bg-amber-500 border border-white shadow flex items-center justify-center text-[9px] font-black text-black">
                #10
              </div>
              <div className="absolute right-[35%] top-[25%] w-5 h-5 rounded-full bg-amber-500 border border-white shadow flex items-center justify-center text-[9px] font-black text-black">
                #4
              </div>

            </div>

            {/* ACTION MOMENT INTERACTIVE POPUP */}
            {matchState === 'action_moment' && actionMoment && (
              <div className="absolute inset-4 bg-black/90 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center animate-slide-up z-40 border-2 border-amber-400 space-y-4">
                <div className="text-[10px] font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                  ⚡ QAROR LAHZASI ({actionMoment.minute}'-daqiqa)
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white max-w-lg leading-tight">
                  {actionMoment.scenario}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md pt-2">
                  <button
                    onClick={() => handleActionChoice('shoot')}
                    className="p-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg transition-transform hover:scale-105 border border-red-400"
                  >
                    🎯 To'g'ridan-to'g'ri Zarba
                  </button>

                  <button
                    onClick={() => handleActionChoice('pass')}
                    className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition-transform hover:scale-105 border border-emerald-400"
                  >
                    👟 Bo'sh Sherigingizga Pas
                  </button>

                  <button
                    onClick={() => handleActionChoice('dribble')}
                    className="p-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-lg transition-transform hover:scale-105 border border-amber-300"
                  >
                    ⚡ Finte & Dribling
                  </button>
                </div>
              </div>
            )}

            {/* FULLTIME REWARDS POPUP */}
            {matchState === 'fulltime' && (
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-green-900/40 to-black border border-emerald-500 text-center space-y-3 animate-slide-up">
                <div className="text-4xl">🏆</div>
                <h3 className="text-2xl font-black gradient-text">Uchrashuv Yakunlandi!</h3>
                <p className="text-xs text-gray-200">
                  O'yindagi faol ishtirokingiz uchun <strong>+{coinsWon} XFL Coins</strong> qo'lga kiritdingiz!
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsPackModalOpen(true)}
                    className="btn-primary py-3 px-6 text-xs font-black shadow-xl"
                  >
                    🎁 Yutuqli FC Pak Ochish
                  </button>

                  <button
                    onClick={startMatch}
                    className="btn-secondary py-3 px-6 text-xs font-bold"
                  >
                    Qaytadan O'ynash
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* LIVE PLAY-BY-PLAY COMMENTARY */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>🎙️</span> Jonli Matnli Sharh (Play-by-Play)
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {commentary.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                    c.type === 'goal'
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 font-bold'
                      : c.type === 'chance'
                      ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-300'
                  }`}
                >
                  <span className="font-black text-amber-400 shrink-0">{c.minute}</span>
                  <span className="leading-relaxed">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT 1 COLUMN: SOFASCORE LIVE MATCH STATS */}
        <div className="space-y-6">

          {/* MATCH STATS (SOFASCORE STYLE) */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
              <span>📊</span> O'yin Statistikasi
            </h3>

            <div className="space-y-4 text-xs">
              {/* Possession */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-gray-300">
                  <span className="text-emerald-400 font-black">{stats.homePossession}%</span>
                  <span className="text-[10px] text-gray-400 uppercase">To'p Nazorati</span>
                  <span className="text-amber-400 font-black">{stats.awayPossession}%</span>
                </div>
                <div className="w-full h-2 bg-amber-500/40 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: `${stats.homePossession}%` }} />
                </div>
              </div>

              {/* Shots on target */}
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="font-black text-white text-sm">{stats.homeShotsOnTarget}</span>
                <span className="text-[11px] text-gray-400">Aniq Zarbalar</span>
                <span className="font-black text-white text-sm">{stats.awayShotsOnTarget}</span>
              </div>

              {/* Total Shots */}
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="font-black text-white text-sm">{stats.homeShots}</span>
                <span className="text-[11px] text-gray-400">Jami Zarbalar</span>
                <span className="font-black text-white text-sm">{stats.awayShots}</span>
              </div>

              {/* Corners */}
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="font-black text-white text-sm">{stats.homeCorners}</span>
                <span className="text-[11px] text-gray-400">Burchak To'plari</span>
                <span className="font-black text-white text-sm">{stats.awayCorners}</span>
              </div>

              {/* Fouls */}
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="font-black text-white text-sm">{stats.homeFouls}</span>
                <span className="text-[11px] text-gray-400">Qoidabuzarliklar</span>
                <span className="font-black text-white text-sm">{stats.awayFouls}</span>
              </div>
            </div>
          </div>

          {/* GOALSCORERS LIST */}
          <div className="glass-card p-6 space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>⚽</span> Gollar Mualliflari
            </h3>

            <div className="space-y-2">
              {events.filter(e => e.type === 'goal').map((ev, i) => (
                <div key={i} className="flex justify-between items-center text-xs bg-black/40 p-2.5 rounded-xl border border-white/5">
                  <span className="font-bold text-white truncate max-w-[150px]">{ev.text}</span>
                  <span className="font-black text-emerald-400">{ev.minute}'</span>
                </div>
              ))}
              {events.filter(e => e.type === 'goal').length === 0 && (
                <div className="text-[11px] text-gray-500 text-center py-4 italic">
                  Hozircha gollar urilmadi
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Pack Modal Reward */}
      {isPackModalOpen && (
        <PackOpeningModal onClose={() => setIsPackModalOpen(false)} />
      )}

    </div>
  );
}
