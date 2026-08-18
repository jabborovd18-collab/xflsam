'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import sounds from '@/lib/audio';
import { demoKlublar, demoOyinchilar } from '@/data/demo-data';
import PlayerCard from '@/components/PlayerCard';
import PackOpeningModal from '@/components/PackOpeningModal';

export default function FC27MatchPage() {
  const [activeMode, setActiveMode] = useState('match'); // 'match', 'tournament', 'squad'
  const [homeClub, setHomeClub] = useState(demoKlublar[0]); // Afrosiyob FC
  const [awayClub, setAwayClub] = useState(demoKlublar[2]); // Registon FC
  const [format, setFormat] = useState('11x11');
  const [matchState, setMatchState] = useState('prematch'); // 'prematch', 'playing', 'action_moment', 'fulltime'
  
  // Game simulation state
  const [minute, setMinute] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [commentary, setCommentary] = useState([]);
  const [events, setEvents] = useState([]);
  const [actionMoment, setActionMoment] = useState(null);
  const [coinsWon, setCoinsWon] = useState(0);
  const [isPackModalOpen, setIsPackModalOpen] = useState(false);

  // Direct Interactive Ball & Player Physics
  const [userPlayerPos, setUserPlayerPos] = useState({ x: 30, y: 50 });
  const [defenders, setDefenders] = useState([
    { id: 1, x: 65, y: 35 },
    { id: 2, x: 70, y: 65 },
  ]);
  const [gkPos, setGkPos] = useState({ x: 92, y: 50 });
  const [ballControlled, setBallControlled] = useState(true);
  const [sprintEnergy, setSprintEnergy] = useState(100);

  // Tournament Bracket State
  const [tournamentStage, setTournamentStage] = useState('quarter'); // 'quarter', 'semi', 'final', 'won'
  const [tournamentMatches, setTournamentMatches] = useState([
    { id: 1, round: "Chorak Final", team1: "Afrosiyob FC", team2: "Bulung'ur FK", score1: 3, score2: 1, status: "completed", winner: "Afrosiyob FC" },
    { id: 2, round: "Chorak Final", team1: "Urgut Arslon", team2: "Pastdarg'om FK", score1: 2, score2: 0, status: "completed", winner: "Urgut Arslon" },
    { id: 3, round: "Chorak Final", team1: "Registon FC", team2: "Kattaqo'rg'on United", score1: 4, score2: 2, status: "completed", winner: "Registon FC" },
    { id: 4, round: "Chorak Final", team1: "Jomboy Stars", team2: "Narpay Qalqoni", score1: 1, score2: 0, status: "completed", winner: "Jomboy Stars" },
  ]);

  // Squad Builder State (Custom Dream Team Chemistry)
  const [customSquad, setCustomSquad] = useState([
    { pos: "GK", player: demoOyinchilar.find(p => p.position === 'GK') || demoOyinchilar[3], num: 1 },
    { pos: "CB", player: demoOyinchilar.find(p => p.position === 'CB') || demoOyinchilar[2], num: 4 },
    { pos: "CB", player: demoOyinchilar[1], num: 5 },
    { pos: "CM", player: demoOyinchilar[0], num: 8 },
    { pos: "LW", player: demoOyinchilar[2], num: 11 },
    { pos: "ST", player: demoOyinchilar[0], num: 9 },
  ]);

  // Calculate Squad Chemistry (0 - 33★)
  const calculateChemistry = () => {
    let chem = 18;
    const sameDistrict = customSquad.filter(s => s.player?.district === "Samarqand shahar").length;
    chem += sameDistrict * 2;
    return Math.min(33, chem);
  };

  const timerRef = useRef(null);

  // START MATCH
  const startMatch = () => {
    setMinute(0);
    setHomeScore(0);
    setAwayScore(0);
    setEvents([]);
    setUserPlayerPos({ x: 30, y: 50 });
    setBallControlled(true);
    setCommentary([
      { minute: "0'", text: `Hakam hushtagi chalindi! ${homeClub.name} vs ${awayClub.name} matchi boshlandi.`, type: "info" }
    ]);
    setMatchState('playing');
    sounds.playGoal();
  };

  // REAL-TIME MATCH LOOP
  useEffect(() => {
    if (matchState !== 'playing') return;

    const tickInterval = 1000 / speed;

    timerRef.current = setInterval(() => {
      setMinute((prevMin) => {
        const nextMin = prevMin + 1;

        // Move defenders dynamically
        setDefenders(defs => defs.map(d => ({
          ...d,
          y: Math.max(20, Math.min(80, d.y + (Math.random() - 0.5) * 12)),
          x: Math.max(55, Math.min(82, d.x + (Math.random() - 0.5) * 6)),
        })));

        // Regenerate sprint energy
        setSprintEnergy(e => Math.min(100, e + 3));

        // Action moments at key minutes
        if ((nextMin === 28 || nextMin === 72) && !actionMoment) {
          clearInterval(timerRef.current);
          setMatchState('action_moment');
          setActionMoment({
            minute: nextMin,
            player: homeClub.roster?.[0]?.name || "Jasurbek Normatov",
            scenario: "Jarima maydoniga yaqinlashdingiz! Himoyachi sizga tashlandi. Qanday harakat qilasiz?",
          });
          return nextMin;
        }

        // Random events simulation
        if (Math.random() < 0.16) {
          simulateRandomGoalOrChance(nextMin);
        }

        if (nextMin >= 90) {
          clearInterval(timerRef.current);
          setMatchState('fulltime');
          sounds.playGoal();
          setCoinsWon(150 + (homeScore > awayScore ? 200 : 50));
          return 90;
        }

        return nextMin;
      });
    }, tickInterval);

    return () => clearInterval(timerRef.current);
  }, [matchState, speed, homeScore, awayScore, homeClub, awayClub]);

  const simulateRandomGoalOrChance = (currentMin) => {
    const isHome = Math.random() > 0.45;
    const team = isHome ? homeClub : awayClub;
    const player = team.roster?.[Math.floor(Math.random() * (team.roster?.length || 4))]?.name || "Hujumchi";

    if (Math.random() < 0.3) {
      sounds.playGoal();
      if (isHome) setHomeScore(s => s + 1);
      else setAwayScore(s => s + 1);
      const text = `⚽ GOOOL! ${currentMin}'-daqiqa: ${player} (${team.name}) to'pni darvozaga kiritdi!`;
      setEvents(prev => [{ minute: currentMin, text: `${player} (${team.name})`, isHome }, ...prev]);
      setCommentary(prev => [{ minute: `${currentMin}'`, text, type: 'goal' }, ...prev]);
    } else {
      sounds.playKick();
      const text = `🔥 Xavfli zarba! ${player} darvoza to'sinini titratdi!`;
      setCommentary(prev => [{ minute: `${currentMin}'`, text, type: 'chance' }, ...prev]);
    }
  };

  // DIRECT JOYSTICK CONTROLS (MOVE PLAYER ON PITCH)
  const movePlayer = (dx, dy) => {
    if (matchState !== 'playing') return;
    setUserPlayerPos(prev => ({
      x: Math.max(10, Math.min(88, prev.x + dx)),
      y: Math.max(10, Math.min(90, prev.y + dy)),
    }));
  };

  // MANUAL SHOOT BUTTON
  const manualShoot = () => {
    if (matchState !== 'playing') return;
    sounds.playKick();
    
    // Check distance to goal (if x > 65, high chance of goal)
    const isClose = userPlayerPos.x > 60;
    const isSuccess = isClose ? Math.random() > 0.3 : Math.random() > 0.7;

    if (isSuccess) {
      sounds.playGoal();
      setHomeScore(s => s + 1);
      const text = `🎯 AQLBOVAR QILMAS ZARBA VA GOOOL! ${minute}'-daqiqa: Masofadan daxshatli gol urdingiz!`;
      setEvents(prev => [{ minute, text: "Sizning Masofaviy Zarbaniz", isHome: true }, ...prev]);
      setCommentary(prev => [{ minute: `${minute}'`, text, type: 'goal' }, ...prev]);
    } else {
      sounds.playSave();
      setCommentary(prev => [{ minute: `${minute}'`, text: `🧤 Kuchli zarba yo'lladingiz, darvozabon qiyinchilik bilan to'pni qaytardi.`, type: 'chance' }, ...prev]);
    }
  };

  // MANUAL SPRINT BUTTON
  const manualSprint = () => {
    if (sprintEnergy < 20) return;
    setSprintEnergy(e => Math.max(0, e - 25));
    setUserPlayerPos(prev => ({ ...prev, x: Math.min(85, prev.x + 12) }));
  };

  // ACTION MOMENT RESOLUTION
  const handleActionChoice = (choice) => {
    sounds.playKick();
    let isSuccess = false;
    let text = "";

    if (choice === 'shoot') {
      isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        sounds.playGoal();
        setHomeScore(s => s + 1);
        text = `🎯 DAXSHATLI TO'QQIZLIK! Sizning zarbangiz darvoza to'riga sanchildi! GOOOL!`;
        setEvents(prev => [{ minute, text: `${actionMoment.player} (Zarba)`, isHome: true }, ...prev]);
      } else {
        sounds.playSave();
        text = `🧤 Darvozabon qahramonlik ko'rsatib, to'pni burchakka urib yubordi.`;
      }
    } else if (choice === 'pass') {
      isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        sounds.playGoal();
        setHomeScore(s => s + 1);
        text = `🎩 ZARGARONA PAS! Sherigingiz to'pni bo'sh darvozaga kiritdi! GOOOL!`;
        setEvents(prev => [{ minute, text: `Gol (Sizning pasingiz)`, isHome: true }, ...prev]);
      } else {
        text = `🛡️ Himoyachi pasni ilib ketdi.`;
      }
    } else if (choice === 'dribble') {
      isSuccess = Math.random() > 0.4;
      if (isSuccess) {
        sounds.playGoal();
        setHomeScore(s => s + 1);
        text = `⚡ FINTE VA GOL! Darvozabonni ham aldab o'tib gol urdingiz! GOOOL!`;
        setEvents(prev => [{ minute, text: `${actionMoment.player} (Solo Finte)`, isHome: true }, ...prev]);
      } else {
        text = `⚠️ Dribling vaqtida to'p maydondan chiqib ketdi.`;
      }
    }

    setCommentary(prev => [{ minute: `${minute}'`, text, type: isSuccess ? 'goal' : 'info' }, ...prev]);
    setActionMoment(null);
    setMatchState('playing');
  };

  return (
    <div className="page-container pb-28 space-y-8 select-none">

      {/* TOP ARENA NAVIGATION (MATCH, TOURNAMENT KUBOK, SQUAD BUILDER) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[var(--color-xfl-border)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase mb-2">
            <span>🎮 FC 27 ULTIMATE SAMARQAND ARENA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black gradient-text tracking-tight">
            XFL FC 27 Match Arena
          </h1>
        </div>

        {/* 3 Game Mode Selector */}
        <div className="flex bg-[var(--color-xfl-card)] p-1 rounded-2xl border border-[var(--color-xfl-border)] text-xs font-black">
          <button
            onClick={() => setActiveMode('match')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeMode === 'match'
                ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] font-black shadow-md shadow-green-500/25'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <span>⚽</span>
            <span>Match O'ynash</span>
          </button>

          <button
            onClick={() => setActiveMode('tournament')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeMode === 'tournament'
                ? 'bg-amber-400 text-black font-black shadow-md shadow-amber-400/25'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <span>🏆</span>
            <span>XFL Kubogi</span>
          </button>

          <button
            onClick={() => setActiveMode('squad')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeMode === 'squad'
                ? 'bg-blue-500 text-white font-black shadow-md shadow-blue-500/25'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <span>👥</span>
            <span>Squad Builder</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODE 1: DIRECT INTERACTIVE MATCH WITH JOYPAD CONTROLS */}
      {/* ------------------------------------------------------------- */}
      {activeMode === 'match' && (
        <div className="space-y-6">

          {/* Scoreboard HUD */}
          <div className="glass-card p-6 border-2 border-[var(--color-xfl-border)] relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Home Team */}
              <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                <div
                  style={{ backgroundColor: homeClub.color1 || '#1B5E20' }}
                  className="w-16 h-16 rounded-2xl border-2 border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-xl"
                >
                  {homeClub.name.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">SIZNING JAMOA</span>
                  <h2 className="text-xl font-black text-white leading-tight">{homeClub.name}</h2>
                  <span className="text-xs text-gray-400 font-bold">★ 8.4 OVR</span>
                </div>
              </div>

              {/* Score & Clock */}
              <div className="flex flex-col items-center px-6 py-3 rounded-2xl bg-black/80 border border-white/10 text-center min-w-[190px] shadow-2xl">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-2 h-2 rounded-full ${matchState === 'playing' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                    {matchState === 'prematch' ? 'TAYYOR' : matchState === 'fulltime' ? 'TUGADI' : `${minute}' DAQIQA`}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black gradient-text tabular-nums tracking-wider my-0.5">
                  {homeScore} : {awayScore}
                </div>

                {matchState === 'playing' && (
                  <div className="flex gap-1.5 mt-1.5">
                    {[1, 2, 4].map(s => (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black border transition-all ${
                          speed === s ? 'bg-[var(--color-xfl-accent)] text-black border-white' : 'bg-white/5 border-white/10 text-gray-400'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-4 flex-1 justify-center md:justify-end text-center md:text-right flex-row-reverse md:flex-row">
                <div>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">RAQIB JAMOA</span>
                  <h2 className="text-xl font-black text-white leading-tight">{awayClub.name}</h2>
                  <span className="text-xs text-gray-400 font-bold">★ 7.9 OVR</span>
                </div>
                <div
                  style={{ backgroundColor: awayClub.color1 || '#D97706' }}
                  className="w-16 h-16 rounded-2xl border-2 border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-xl"
                >
                  {awayClub.name.charAt(0)}
                </div>
              </div>

            </div>

            {matchState === 'prematch' && (
              <div className="mt-6 pt-5 border-t border-[var(--color-xfl-border)] flex justify-center">
                <button
                  onClick={startMatch}
                  className="btn-primary py-3.5 px-10 text-sm font-black shadow-xl shadow-green-500/25 flex items-center gap-2"
                >
                  ⚽ MATCHNI BOSHLASH (START GAME)
                </button>
              </div>
            )}
          </div>

          {/* PLAYABLE 2D PITCH WITH INTERACTIVE PLAYER CONTROLLER */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Pitch + Controller Screen */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-card p-5 relative overflow-hidden border border-[var(--color-xfl-border)]">
                
                {/* Visual Soccer Pitch Canvas */}
                <div className="relative w-full aspect-[16/9] max-h-[380px] rounded-2xl soccer-pitch-bg border-2 border-emerald-400/50 shadow-2xl overflow-hidden flex items-center justify-center select-none">
                  
                  {/* Markings */}
                  <div className="absolute inset-2 border border-white/30 rounded-xl pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/30 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 w-28 h-28 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  
                  {/* Opponent Goal Net */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-32 border-l-2 border-y-2 border-white/60 bg-black/20 pointer-events-none" />

                  {/* USER CONTROLLED STRIKER (YOU) */}
                  <div
                    style={{
                      left: `${userPlayerPos.x}%`,
                      top: `${userPlayerPos.y}%`,
                      transition: 'all 0.15s ease-out',
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 pointer-events-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow-xl flex items-center justify-center text-xs font-black text-white animate-pulse">
                      #9
                    </div>
                    <div className="bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-black text-amber-300 border border-white/20 whitespace-nowrap mt-0.5">
                      Siz (Normatov)
                    </div>
                    {/* Ball attached to user feet */}
                    <div className="w-4 h-4 rounded-full bg-white shadow-lg text-[10px] flex items-center justify-center -mt-1">
                      ⚽
                    </div>
                  </div>

                  {/* DEFENDERS (AI) */}
                  {defenders.map(d => (
                    <div
                      key={d.id}
                      style={{
                        left: `${d.x}%`,
                        top: `${d.y}%`,
                        transition: 'all 0.4s ease-out',
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none"
                    >
                      <div className="w-7 h-7 rounded-full bg-amber-500 border border-black shadow flex items-center justify-center text-[10px] font-black text-black">
                        #{d.id + 3}
                      </div>
                      <span className="text-[7px] text-gray-300 bg-black/60 px-1 rounded">Himoyachi</span>
                    </div>
                  ))}

                  {/* GOALKEEPER (AI) */}
                  <div
                    style={{
                      left: `${gkPos.x}%`,
                      top: `${gkPos.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600 border border-white shadow flex items-center justify-center text-xs font-black text-white">
                      🧤
                    </div>
                  </div>

                </div>

                {/* DIRECT ACTION MOMENT POPUP */}
                {matchState === 'action_moment' && actionMoment && (
                  <div className="absolute inset-4 bg-black/90 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center animate-slide-up z-50 border-2 border-amber-400 space-y-4">
                    <div className="text-[10px] font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                      ⚡ QAROR LAHZASI ({actionMoment.minute}'-daqiqa)
                    </div>

                    <h3 className="text-xl font-black text-white max-w-md leading-tight">
                      {actionMoment.scenario}
                    </h3>

                    <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-2">
                      <button
                        onClick={() => handleActionChoice('shoot')}
                        className="p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg transition-transform hover:scale-105"
                      >
                        🎯 Zarba (Shoot)
                      </button>
                      <button
                        onClick={() => handleActionChoice('pass')}
                        className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition-transform hover:scale-105"
                      >
                        👟 Pas (Pass)
                      </button>
                      <button
                        onClick={() => handleActionChoice('dribble')}
                        className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-lg transition-transform hover:scale-105"
                      >
                        ⚡ Dribling (Skill)
                      </button>
                    </div>
                  </div>
                )}

                {/* ON-SCREEN JOYSTICK & ACTION BUTTONS CONTROLLER */}
                {matchState === 'playing' && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* D-Pad / Arrow Directional Buttons */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => movePlayer(0, -8)}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-500 text-white font-black flex items-center justify-center active:scale-90 transition-all border border-white/20"
                      >
                        ▲
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => movePlayer(-8, 0)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-500 text-white font-black flex items-center justify-center active:scale-90 transition-all border border-white/20"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => movePlayer(0, 8)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-500 text-white font-black flex items-center justify-center active:scale-90 transition-all border border-white/20"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => movePlayer(8, 0)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-500 text-white font-black flex items-center justify-center active:scale-90 transition-all border border-white/20"
                        >
                          ▶
                        </button>
                      </div>
                    </div>

                    {/* Sprint Meter */}
                    <div className="w-full sm:w-44 space-y-1">
                      <div className="flex justify-between text-[10px] font-black text-gray-300">
                        <span>⚡ TEZLIK ENERGIYASI</span>
                        <span className="text-amber-400">{sprintEnergy}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300" style={{ width: `${sprintEnergy}%` }} />
                      </div>
                    </div>

                    {/* Action Shoot / Sprint Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={manualSprint}
                        className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs shadow-lg transition-transform active:scale-90 border border-white/20"
                      >
                        ⚡ Tezlik (Sprint)
                      </button>

                      <button
                        onClick={manualShoot}
                        className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/30 transition-transform active:scale-90 border border-white/20"
                      >
                        🎯 ZARBA BERISH!
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Play-by-Play Commentary */}
              <div className="glass-card p-5 space-y-3">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>🎙️</span> Jonli Matnli Sharh
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {commentary.map((c, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                        c.type === 'goal' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold' : 'bg-white/5 border-white/5 text-gray-300'
                      }`}
                    >
                      <span className="font-black text-amber-400 shrink-0">{c.minute}</span>
                      <span>{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Match Stats & Goalscorers */}
            <div className="space-y-4">
              <div className="glass-card p-5 space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-wider pb-2 border-b border-white/10">
                  📊 O'yin Statistikasi
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-emerald-400 font-black">{homeScore} ta</span>
                    <span className="text-gray-400">Gollar</span>
                    <span className="text-amber-400 font-black">{awayScore} ta</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white font-bold">58%</span>
                    <span className="text-gray-400">To'p Nazorati</span>
                    <span className="text-white font-bold">42%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white font-bold">7</span>
                    <span className="text-gray-400">Zarbalar</span>
                    <span className="text-white font-bold">4</span>
                  </div>
                </div>
              </div>

              {/* Goalscorers */}
              <div className="glass-card p-5 space-y-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  ⚽ Gollar Ro'yxati
                </h4>
                <div className="space-y-1.5">
                  {events.map((e, idx) => (
                    <div key={idx} className="flex justify-between text-xs bg-black/40 p-2 rounded-xl border border-white/5">
                      <span className="font-bold text-white truncate">{e.text}</span>
                      <span className="font-black text-emerald-400">{e.minute}'</span>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <p className="text-[10px] text-gray-500 italic text-center py-2">Gollar kutilmoqda</p>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Fulltime Rewards */}
          {matchState === 'fulltime' && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-green-900/40 to-black border border-emerald-500 text-center space-y-3 animate-slide-up">
              <div className="text-4xl">🏆</div>
              <h3 className="text-2xl font-black gradient-text">Uchrashuv Muvaffaqiyatli Tugadi!</h3>
              <p className="text-xs text-gray-200">
                O'yindagi g'alabangiz uchun <strong>+{coinsWon} XFL Coins</strong> va Oltin Pak tokeni berildi!
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODE 2: SAMARQAND XFL CHAMPIONS CUP (TOURNAMENT BRACKET) */}
      {/* ------------------------------------------------------------- */}
      {activeMode === 'tournament' && (
        <div className="glass-card p-6 sm:p-8 space-y-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">PLEY-OFF BOSQICHI</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">Samarqand XFL Kubogi 2026</h2>
              <p className="text-xs text-gray-400">8 ta tuman jamoasi o'rtasidagi bosh kubok poygasi</p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-amber-400/20 border border-amber-400 text-amber-300 text-xs font-black flex items-center gap-2">
              <span>🏆 Bosh Sovrin:</span>
              <span>10,000,000 so'm + Oltin Kubok</span>
            </div>
          </div>

          {/* Interactive Bracket Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

            {/* CHORAK FINAL */}
            <div className="space-y-3">
              <div className="text-xs font-black text-emerald-400 uppercase pb-2 border-b border-white/10">
                1/4 CHORAK FINAL
              </div>

              {tournamentMatches.map((m) => (
                <div key={m.id} className="bg-[var(--color-xfl-bg)] p-3.5 rounded-2xl border border-[var(--color-xfl-border)] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-bold ${m.winner === m.team1 ? 'text-emerald-400 font-black' : 'text-white'}`}>
                      {m.team1}
                    </span>
                    <span className="font-black text-white">{m.score1}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-bold ${m.winner === m.team2 ? 'text-emerald-400 font-black' : 'text-gray-400'}`}>
                      {m.team2}
                    </span>
                    <span className="font-black text-gray-400">{m.score2}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* YARIM FINAL */}
            <div className="space-y-3">
              <div className="text-xs font-black text-blue-400 uppercase pb-2 border-b border-white/10">
                1/2 YARIM FINAL
              </div>

              <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-blue-500/40 space-y-3">
                <div className="flex justify-between items-center text-xs font-black text-white">
                  <span>Afrosiyob FC</span>
                  <span className="text-emerald-400">3</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                  <span>Urgut Arslon</span>
                  <span>1</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-black text-right pt-1 border-t border-white/5">
                  Afrosiyob Finalda! ★
                </div>
              </div>

              <div className="bg-[var(--color-xfl-bg)] p-4 rounded-2xl border border-blue-500/40 space-y-3">
                <div className="flex justify-between items-center text-xs font-black text-white">
                  <span>Registon FC</span>
                  <span className="text-emerald-400">2</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                  <span>Jomboy Stars</span>
                  <span>1</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-black text-right pt-1 border-t border-white/5">
                  Registon Finalda! ★
                </div>
              </div>
            </div>

            {/* GRAND FINAL */}
            <div className="space-y-3">
              <div className="text-xs font-black text-amber-400 uppercase pb-2 border-b border-white/10">
                👑 GRAND FINAL (EL-CLASICO)
              </div>

              <div className="bg-gradient-to-b from-amber-950/40 via-black to-black p-5 rounded-2xl border-2 border-amber-400 space-y-4 text-center">
                <div className="text-3xl">🏆</div>
                <h4 className="text-sm font-black text-white">
                  Afrosiyob FC vs Registon FC
                </h4>
                <p className="text-[10px] text-gray-300">
                  Samarqand Derbisi • Shanba 19:00, Afrosiyob Arenada
                </p>
                <button
                  onClick={() => {
                    setHomeClub(demoKlublar[0]);
                    setAwayClub(demoKlublar[2]);
                    setActiveMode('match');
                    startMatch();
                  }}
                  className="btn-primary w-full py-3 text-xs font-black justify-center shadow-lg"
                >
                  ⚡ Final Matchini O'ynash
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODE 3: SQUAD BUILDER & ULTIMATE TEAM CHEMISTRY */}
      {/* ------------------------------------------------------------- */}
      {activeMode === 'squad' && (
        <div className="glass-card p-6 sm:p-8 space-y-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">ULTIMATE TEAM</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">XFL Squad Builder</h2>
              <p className="text-xs text-gray-400">O'z orzuingizdagi Samarqand terma jamoasini yig'ing va Kimyo (Chemistry)ni oshiring</p>
            </div>

            <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center gap-2 shadow-lg">
              <span>★ Kimyo (Chemistry):</span>
              <span className="text-amber-300">{calculateChemistry()} / 33</span>
            </div>
          </div>

          {/* 6-Player Tactical Squad Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {customSquad.map((slot, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-xfl-bg)] p-3 rounded-2xl border border-[var(--color-xfl-border)] hover:border-emerald-400 transition-all flex flex-col items-center text-center space-y-2 cursor-pointer group"
              >
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-black text-white">
                  {slot.pos}
                </span>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-black font-black text-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  {Math.round((slot.player?.rating || 8.0) * 10)}
                </div>

                <div className="w-full">
                  <div className="font-bold text-xs text-white truncate">{slot.player?.fullName || "O'yinchi"}</div>
                  <div className="text-[9px] text-emerald-400 truncate">{slot.player?.club || "Erkin"}</div>
                </div>

                <div className="text-[8px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full">
                  ★★★ 3 Chem
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-gray-300">
              💡 <strong>Maslahat:</strong> Bir xil Samarqand tumanidan (masalan, Urgut yoki Registon) bo'lgan o'yinchilar jamoa kimyosini +3 ga oshiradi!
            </span>
            <button
              onClick={() => {
                setActiveMode('match');
                startMatch();
              }}
              className="btn-primary py-2.5 px-6 font-black text-xs whitespace-nowrap"
            >
              Ushbu Tarkib Bilan O'ynash →
            </button>
          </div>
        </div>
      )}

      {/* Pack Modal Reward */}
      {isPackModalOpen && (
        <PackOpeningModal onClose={() => setIsPackModalOpen(false)} />
      )}

    </div>
  );
}
