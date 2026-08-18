'use client';

export default function PlayerRadarHeatmap({ player }) {
  if (!player) return null;

  const stats = {
    pac: player.pace || player.skills?.pace || 85,
    sho: player.shooting || player.skills?.shooting || 82,
    pas: player.passing || player.skills?.passing || 76,
    dri: player.dribbling || player.skills?.dribbling || 80,
    def: player.defense || player.skills?.defending || 45,
    phy: player.physical || player.skills?.physical || 78,
  };

  // Convert 6 stats to 6-axis Radar SVG Polygon Points (center = 100, 100, radius = 75)
  const angleStep = (Math.PI * 2) / 6;
  const points = Object.values(stats).map((val, i) => {
    const r = (val / 100) * 75;
    const angle = i * angleStep - Math.PI / 2;
    const x = 100 + r * Math.cos(angle);
    const y = 100 + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Heatmap hotspots based on position
  const pos = player.position || 'ST';
  const heatSpots = {
    ST: [
      { top: '25%', left: '50%', w: '90px', h: '90px', opacity: '0.75' },
      { top: '35%', left: '45%', w: '70px', h: '70px', opacity: '0.6' },
      { top: '20%', left: '60%', w: '60px', h: '60px', opacity: '0.5' },
    ],
    LW: [
      { top: '30%', left: '25%', w: '90px', h: '90px', opacity: '0.75' },
      { top: '45%', left: '20%', w: '70px', h: '70px', opacity: '0.6' },
      { top: '22%', left: '35%', w: '60px', h: '60px', opacity: '0.5' },
    ],
    CM: [
      { top: '50%', left: '50%', w: '110px', h: '110px', opacity: '0.8' },
      { top: '40%', left: '40%', w: '80px', h: '80px', opacity: '0.6' },
      { top: '60%', left: '60%', w: '80px', h: '80px', opacity: '0.6' },
    ],
    CB: [
      { top: '75%', left: '45%', w: '90px', h: '90px', opacity: '0.75' },
      { top: '70%', left: '55%', w: '80px', h: '80px', opacity: '0.6' },
      { top: '65%', left: '50%', w: '60px', h: '60px', opacity: '0.5' },
    ],
    GK: [
      { top: '88%', left: '50%', w: '100px', h: '100px', opacity: '0.85' },
    ],
  }[pos] || [
    { top: '40%', left: '50%', w: '90px', h: '90px', opacity: '0.7' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/40 p-5 rounded-3xl border border-white/10">
      
      {/* 1. 6-AXIS SOFASCORE SKILL RADAR */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
          📊 6-QIRRALI MAHORAT RADARI
        </span>

        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background Grid Hexagons */}
            {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
              <polygon
                key={idx}
                points={Array.from({ length: 6 }).map((_, i) => {
                  const r = 75 * scale;
                  const angle = i * angleStep - Math.PI / 2;
                  return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                }).join(' ')}
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />
            ))}

            {/* Connecting Axes */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              return (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 75 * Math.cos(angle)}
                  y2={100 + 75 * Math.sin(angle)}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Dynamic Player Skill Polygon */}
            <polygon
              points={points}
              fill="rgba(0, 230, 118, 0.35)"
              stroke="#00E676"
              strokeWidth="2.5"
            />

            {/* Labels */}
            <text x="100" y="15" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="900">TEZ ({stats.pac})</text>
            <text x="175" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="900">DRI ({stats.dri})</text>
            <text x="175" y="150" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="900">ZAR ({stats.sho})</text>
            <text x="100" y="195" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="900">HIM ({stats.def})</text>
            <text x="25" y="150" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="900">UZA ({stats.pas})</text>
            <text x="25" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="900">JIS ({stats.phy})</text>
          </svg>
        </div>
      </div>

      {/* 2. SOFASCORE THERMAL HEATMAP ON PITCH */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
          🔥 MAYDON HARAKAT XARITASI (HEATMAP)
        </span>

        <div className="relative w-full max-w-[200px] aspect-[3/4] rounded-2xl soccer-pitch-bg border border-emerald-400/40 overflow-hidden shadow-inner flex items-center justify-center">
          {/* Pitch Markings */}
          <div className="absolute inset-1.5 border border-white/30 rounded-xl pointer-events-none" />
          <div className="absolute top-1/2 left-1.5 right-1.5 h-[1px] bg-white/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Thermal Glow Spots */}
          {heatSpots.map((spot, idx) => (
            <div
              key={idx}
              style={{
                top: spot.top,
                left: spot.left,
                width: spot.w,
                height: spot.h,
                opacity: spot.opacity,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(239,68,68,0.9) 0%, rgba(245,158,11,0.7) 40%, rgba(16,185,129,0.3) 70%, transparent 100%)',
                filter: 'blur(10px)',
              }}
              className="absolute rounded-full pointer-events-none animate-pulse"
            />
          ))}

          {/* Player Dot */}
          <div className="absolute z-20 px-2 py-0.5 rounded-full bg-black/80 text-[8px] font-black text-amber-300 border border-white/20">
            {pos} ZONASI
          </div>
        </div>
      </div>

    </div>
  );
}
