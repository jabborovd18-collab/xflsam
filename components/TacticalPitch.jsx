'use client';

export default function TacticalPitch({ format = '11x11', roster = [], onPlayerClick }) {
  // Lineup positions based on format
  const formations = {
    '11x11': [
      { role: 'GK', label: 'Darvozabon', top: '88%', left: '50%' },
      { role: 'LB', label: 'Chap Himoyachi', top: '70%', left: '15%' },
      { role: 'CB', label: 'Markaziy Himoya', top: '72%', left: '38%' },
      { role: 'CB', label: 'Markaziy Himoya', top: '72%', left: '62%' },
      { role: 'RB', label: 'O\'ng Himoyachi', top: '70%', left: '85%' },
      { role: 'CDM', label: 'Tayanch Yarim', top: '52%', left: '50%' },
      { role: 'CM', label: 'Markaziy Yarim', top: '42%', left: '30%' },
      { role: 'CAM', label: 'Hujumkor Yarim', top: '38%', left: '70%' },
      { role: 'LW', label: 'Chap Qanot', top: '20%', left: '18%' },
      { role: 'ST', label: 'Markaziy Hujum', top: '14%', left: '50%' },
      { role: 'RW', label: 'O\'ng Qanot', top: '20%', left: '82%' },
    ],
    '9x9': [
      { role: 'GK', label: 'Darvozabon', top: '88%', left: '50%' },
      { role: 'CB', label: 'Chap Himoya', top: '68%', left: '25%' },
      { role: 'CB', label: 'Markaziy Himoya', top: '70%', left: '50%' },
      { role: 'CB', label: 'O\'ng Himoya', top: '68%', left: '75%' },
      { role: 'CM', label: 'Chap Yarim', top: '45%', left: '30%' },
      { role: 'CM', label: 'O\'ng Yarim', top: '45%', left: '70%' },
      { role: 'CAM', label: 'Pley-meyker', top: '35%', left: '50%' },
      { role: 'ST', label: 'Chap Hujum', top: '18%', left: '35%' },
      { role: 'ST', label: 'O\'ng Hujum', top: '18%', left: '65%' },
    ],
    '6x6': [
      { role: 'GK', label: 'Darvozabon', top: '88%', left: '50%' },
      { role: 'DEF', label: 'Chap Himoya', top: '66%', left: '28%' },
      { role: 'DEF', label: 'O\'ng Himoya', top: '66%', left: '72%' },
      { role: 'MID', label: 'Markaziy Yarim', top: '42%', left: '50%' },
      { role: 'FWD', label: 'Chap Hujumchi', top: '18%', left: '32%' },
      { role: 'FWD', label: 'O\'ng Hujumchi', top: '18%', left: '68%' },
    ],
  };

  const activeLineup = formations[format] || formations['11x11'];

  return (
    <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto rounded-3xl overflow-hidden soccer-pitch-bg border-4 border-[#285e3a] shadow-2xl p-4 select-none">
      {/* Outer Field Boundary Line */}
      <div className="absolute inset-3 border-2 border-white/40 rounded-2xl pointer-events-none" />

      {/* Halfway Line */}
      <div className="absolute top-1/2 left-3 right-3 h-[2px] bg-white/40 -translate-y-1/2 pointer-events-none" />

      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 w-28 h-28 border-2 border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-white/60 rounded-full" />
      </div>

      {/* Top Penalty Area (Raqib darvozasi) */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-48 h-20 border-b-2 border-x-2 border-white/40 rounded-b-xl pointer-events-none flex items-start justify-center">
        <div className="w-24 h-8 border-b-2 border-x-2 border-white/30" />
      </div>

      {/* Bottom Penalty Area (Bizning darvoza) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-48 h-20 border-t-2 border-x-2 border-white/40 rounded-t-xl pointer-events-none flex items-end justify-center">
        <div className="w-24 h-8 border-t-2 border-x-2 border-white/30" />
      </div>

      {/* Tactical Nodes / Players */}
      {activeLineup.map((pos, idx) => {
        const assignedPlayer = roster[idx] || {
          name: pos.role === 'GK' ? 'Darvozabon' : `O'yinchi #${idx + 1}`,
          number: idx === 0 ? 1 : idx + 2,
          rating: 7.5,
          pos: pos.role,
        };

        return (
          <div
            key={idx}
            style={{ top: pos.top, left: pos.left }}
            onClick={() => onPlayerClick && onPlayerClick(assignedPlayer)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20 transition-transform duration-200 hover:scale-125"
          >
            {/* Player Node / Jersey Circle */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shadow-xl border-2 transition-all ${
                pos.role === 'GK'
                  ? 'bg-amber-500 border-amber-200 text-black shadow-amber-500/50'
                  : 'bg-emerald-600 border-emerald-200 text-white shadow-emerald-600/50 group-hover:bg-[var(--color-xfl-accent)] group-hover:text-black'
              }`}
            >
              #{assignedPlayer.number || idx + 1}
            </div>

            {/* Player Name Pill */}
            <div className="mt-1 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9px] font-extrabold text-white border border-white/20 whitespace-nowrap shadow-md flex items-center gap-1">
              <span>{assignedPlayer.name.split(' ').pop()}</span>
              <span className="text-amber-400">★{assignedPlayer.rating || '7.8'}</span>
            </div>
          </div>
        );
      })}

      {/* Formation Badge at bottom right */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-[10px] font-black text-emerald-400 px-3 py-1 rounded-xl border border-white/10">
        Taktika: {format === '6x6' ? '2-1-2' : format === '9x9' ? '3-2-1-2' : '4-3-3'}
      </div>
    </div>
  );
}
