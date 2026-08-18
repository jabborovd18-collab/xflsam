'use client';

import { useState, useRef, useEffect } from 'react';
import sounds from '@/lib/audio';
import { demoOyinchilar } from '@/data/demo-data';

export default function PenaltyGameModal({ onClose }) {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(150);
  const [gameState, setGameState] = useState('aiming'); // 'aiming', 'shooting', 'result'
  const [lastResult, setLastResult] = useState(null); // { isGoal: true/false, message: '' }
  const [selectedStriker, setSelectedStriker] = useState(demoOyinchilar[0] || { fullName: "Jasurbek Normatov", rating: 8.4, shooting: 88 });
  const [ballPos, setBallPos] = useState({ bottom: '15%', left: '50%', scale: 1 });
  const [gkPos, setGkPos] = useState({ left: '50%', dive: 'center' });
  const [aimPos, setAimPos] = useState({ x: 50, y: 35 });
  const [power, setPower] = useState(85);
  const [isPowering, setIsPowering] = useState(false);

  // Power meter animation
  useEffect(() => {
    let interval;
    if (isPowering) {
      interval = setInterval(() => {
        setPower(p => {
          if (p >= 100) return 30;
          return p + 4;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPowering]);

  const handleShoot = (targetX, targetY) => {
    if (gameState !== 'aiming') return;

    setGameState('shooting');
    sounds.playKick();

    // Calculate Goalkeeper Dive (AI Logic based on striker shooting skill)
    const possibleDives = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'];
    const randomDive = possibleDives[Math.floor(Math.random() * possibleDives.length)];

    let gkDiveX = '50%';
    if (randomDive.includes('left')) gkDiveX = '28%';
    if (randomDive.includes('right')) gkDiveX = '72%';

    setGkPos({ left: gkDiveX, dive: randomDive });

    // Animate Ball to Target
    setBallPos({
      bottom: `${100 - targetY}%`,
      left: `${targetX}%`,
      scale: 0.45,
    });

    // Check if Goal or Saved
    setTimeout(() => {
      // Determine match result
      const isTargetCorner = targetX < 35 || targetX > 65 || targetY < 30;
      const isGkSameSide = (targetX < 45 && randomDive.includes('left')) ||
                           (targetX > 55 && randomDive.includes('right')) ||
                           (targetX >= 45 && targetX <= 55 && randomDive === 'center');

      // Higher shooting skill gives higher goal chance even if GK dives close
      const strikerSkillBonus = (selectedStriker.shooting || 80) / 100;
      const isOverpowered = power > 95;

      let goalScored = false;
      let message = "GOOOL!";

      if (isOverpowered && Math.random() > 0.4) {
        goalScored = false;
        message = "To'p to'singa tegib ketdi! (Kuchi oshib ketdi)";
        sounds.playSave();
      } else if (isGkSameSide && Math.random() > (0.2 + strikerSkillBonus * 0.4)) {
        goalScored = false;
        message = "Darvozabon qaytardi! (Ajoyib seyv)";
        sounds.playSave();
      } else {
        goalScored = true;
        sounds.playGoal();
        if (targetY < 25 && (targetX < 30 || targetX > 70)) {
          message = "Daxshatli To'qqizlik! (Top Corner Goal!) 🔥";
        } else if (isTargetCorner) {
          message = "Ajoyib Zarba va GOOOL! ⚽";
        } else {
          message = "Panenka uslubida GOOOL! 🎯";
        }
      }

      setAttempts(a => a + 1);
      if (goalScored) {
        setScore(s => s + 1);
        setStreak(st => st + 1);
        setCoins(c => c + 50 + streak * 10);
      } else {
        setStreak(0);
      }

      setLastResult({ isGoal: goalScored, message });
      setGameState('result');
    }, 600);
  };

  const resetForNextShot = () => {
    setBallPos({ bottom: '15%', left: '50%', scale: 1 });
    setGkPos({ left: '50%', dive: 'center' });
    setGameState('aiming');
    setLastResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" onClick={onClose} />

      {/* Main Game Container */}
      <div className="relative w-full max-w-4xl bg-[var(--color-xfl-card)] border-2 border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-slide-up z-10">

        {/* Top Game Scoreboard Header */}
        <div className="bg-gradient-to-r from-[#04140D] via-[#0D2E1C] to-[#04140D] p-4 border-b border-[var(--color-xfl-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-xl shadow-lg shadow-green-500/30">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">XFL FC 27 Penalty Shootout</h3>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                  ARCADE V1.0
                </span>
              </div>
              <span className="text-[10px] text-gray-300">
                Samarqand darvozasiga zarba bering va XFL Coins yutib oling
              </span>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-2">
            <div className="bg-black/60 px-3 py-1 rounded-xl border border-white/10 text-center">
              <div className="text-xs font-black text-emerald-400 tabular-nums">{score} / {attempts}</div>
              <div className="text-[8px] font-bold text-gray-400 uppercase">Gollar</div>
            </div>

            <div className="bg-black/60 px-3 py-1 rounded-xl border border-amber-500/30 text-center">
              <div className="text-xs font-black text-amber-300 tabular-nums">🪙 {coins}</div>
              <div className="text-[8px] font-bold text-gray-400 uppercase">XFL Coins</div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Striker Selector Ribbon */}
        <div className="bg-black/40 px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs">
          <span className="text-[10px] font-black text-gray-400 uppercase">Zarba Beruvchi:</span>
          <div className="flex gap-2">
            {demoOyinchilar.slice(0, 3).map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedStriker(p)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all border ${
                  selectedStriker.id === p.id
                    ? 'bg-[var(--color-xfl-accent)] text-black border-white shadow'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {p.fullName.split(' ').pop()} ({p.shooting || 85} ZAR)
              </button>
            ))}
          </div>
        </div>

        {/* 3D STADIUM PITCH & GOAL VIEW */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-[#0a1b2a] via-[#113824] to-[#0d2a1a] p-4 flex flex-col justify-between overflow-hidden select-none">

          {/* Stadium Floodlights & Night Crowd Ambience */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none flex justify-between px-8 pt-2">
            <div className="w-16 h-12 bg-yellow-200/20 rounded-full blur-xl animate-pulse" />
            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">
              AFROSIYOB ARENA • 15,000 TOMOSHABIN
            </div>
            <div className="w-16 h-12 bg-yellow-200/20 rounded-full blur-xl animate-pulse" />
          </div>

          {/* THE 3D GOALPOST CONTAINER */}
          <div className="relative w-full max-w-[560px] h-60 mx-auto mt-4 border-t-8 border-x-8 border-white/90 rounded-t-2xl shadow-2xl flex items-center justify-center bg-black/30 overflow-hidden">
            {/* Goal Net Grid Pattern */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Crossbar Shadow */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/60 to-transparent" />

            {/* Target Aim Grid Click Zones */}
            {gameState === 'aiming' && (
              <div className="absolute inset-2 grid grid-cols-3 grid-rows-2 gap-2 z-30">
                {[
                  { label: "Chap Yuqori 🎯", x: 20, y: 18 },
                  { label: "O'rtaga Baland ⚡", x: 50, y: 20 },
                  { label: "O'ng Yuqori 🎯", x: 80, y: 18 },
                  { label: "Chap Pastki ⚽", x: 22, y: 65 },
                  { label: "Panenka 🎩", x: 50, y: 55 },
                  { label: "O'ng Pastki ⚽", x: 78, y: 65 },
                ].map((target, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleShoot(target.x, target.y)}
                    className="border border-dashed border-emerald-400/40 hover:border-emerald-400 hover:bg-emerald-500/20 rounded-xl flex items-center justify-center text-[10px] font-black text-emerald-300 opacity-60 hover:opacity-100 hover:scale-105 transition-all shadow-sm"
                  >
                    {target.label}
                  </button>
                ))}
              </div>
            )}

            {/* 3D GOALKEEPER (SANJAR RAXIMOV) */}
            <div
              style={{
                left: gkPos.left,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
              className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
            >
              {/* Goalkeeper Avatar */}
              <div className="w-16 h-28 flex flex-col items-center">
                {/* Head */}
                <div className="w-8 h-8 rounded-full bg-amber-400 border border-black shadow flex items-center justify-center text-[10px] font-black">
                  🧤
                </div>
                {/* Jersey */}
                <div className="w-14 h-16 bg-amber-500 rounded-t-xl border-2 border-black flex items-center justify-center font-black text-xs text-black shadow-md mt-0.5">
                  #1
                </div>
                {/* Legs */}
                <div className="flex gap-2">
                  <div className="w-3.5 h-8 bg-black rounded-b" />
                  <div className="w-3.5 h-8 bg-black rounded-b" />
                </div>
              </div>
            </div>

          </div>

          {/* GREEN PITCH PENALTY SPOT & BALL */}
          <div className="relative w-full h-36 flex items-center justify-center">
            {/* Penalty Spot Line */}
            <div className="absolute w-32 h-1 bg-white/40 rounded-full bottom-10" />

            {/* 3D Interactive Soccer Ball */}
            <div
              style={{
                bottom: ballPos.bottom,
                left: ballPos.left,
                transform: `translate(-50%, 50%) scale(${ballPos.scale})`,
                transition: gameState === 'shooting' ? 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
              className="absolute z-40 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-3xl cursor-pointer hover:scale-110 transition-transform select-none"
            >
              ⚽
            </div>
          </div>

          {/* RESULT OVERLAY BANNER */}
          {gameState === 'result' && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-slide-up space-y-3">
              <span className="text-6xl animate-bounce">
                {lastResult.isGoal ? "🎉" : "🧤"}
              </span>

              <h2 className={`text-3xl sm:text-4xl font-black ${lastResult.isGoal ? 'gradient-text' : 'text-red-400'}`}>
                {lastResult.message}
              </h2>

              <p className="text-xs text-gray-300">
                {lastResult.isGoal ? "+50 XFL Coins hisobingizga qo'shildi!" : "Darvozabon to'pni qaytardi. Yana urinib ko'ring!"}
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={resetForNextShot}
                  className="btn-primary py-3 px-8 text-xs font-black shadow-xl"
                >
                  ⚡ Yana Zarba Berish
                </button>
                <button
                  onClick={onClose}
                  className="btn-secondary py-3 px-6 text-xs font-bold"
                >
                  Chiqish
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Instructions Footer */}
        <div className="bg-black/80 px-4 py-2.5 border-t border-[var(--color-xfl-border)] flex items-center justify-between text-xs text-gray-400">
          <span>💡 Qanday o'ynaladi: Darvozadagi 6 ta burchakdan birini bosing va zarba bering!</span>
          <span className="font-bold text-amber-300">Streak: {streak}x 🔥</span>
        </div>

      </div>
    </div>
  );
}
