'use client';

import { useState, useRef } from 'react';

// EA Sports FC 26 Ultimate Team Style Card with 3D Parallax Tilt & Foil Shimmer
export default function PlayerCard({ player, onClick, size = 'standard' }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (!player) return null;

  const isVerified = player.isVerified !== undefined ? player.isVerified : true;
  const rating = Math.round(player.rating ? (player.rating > 10 ? player.rating : player.rating * 10) : 84);
  const position = player.position || 'ST';

  // Stats mapping
  const stats = {
    pac: player.pace || player.skills?.pace || 85,
    sho: player.shooting || player.skills?.shooting || 82,
    pas: player.passing || player.skills?.passing || 76,
    dri: player.dribbling || player.skills?.dribbling || 80,
    def: player.defense || player.skills?.defending || 45,
    phy: player.physical || player.skills?.physical || 78,
  };

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element.
    const y = e.clientY - rect.top;  // y position within element.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    setTilt({
      x: rotateX,
      y: rotateY,
      shadowX: (x - centerX) / 5,
      shadowY: (y - centerY) / 5,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, shadowX: 0, shadowY: 0 });
  };

  // Dimensions based on size prop
  const sizeStyles = {
    small: { width: '180px', height: '265px', ratingText: 'text-2xl', nameText: 'text-xs', statText: 'text-[11px]' },
    standard: { width: '230px', height: '338px', ratingText: 'text-4xl', nameText: 'text-sm', statText: 'text-xs' },
    large: { width: '280px', height: '412px', ratingText: 'text-5xl', nameText: 'text-base', statText: 'text-sm' },
  }[size] || { width: '230px', height: '338px', ratingText: 'text-4xl', nameText: 'text-sm', statText: 'text-xs' };

  // Position accent colors
  const posBadgeColor = {
    GK: '#D97706',
    CB: '#2563EB',
    LB: '#2563EB',
    RB: '#2563EB',
    DEF: '#2563EB',
    CDM: '#059669',
    CM: '#059669',
    CAM: '#059669',
    MID: '#059669',
    LW: '#DC2626',
    RW: '#DC2626',
    ST: '#DC2626',
    CF: '#DC2626',
    FWD: '#DC2626',
  }[position] || '#059669';

  return (
    <div
      ref={cardRef}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height,
        perspective: '1000px',
      }}
      className="relative cursor-pointer select-none group"
      onClick={() => onClick && onClick(player)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Card Body with 3D Tilt transform */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered
            ? `${tilt.shadowX}px ${tilt.shadowY + 20}px 40px -10px ${isVerified ? 'rgba(245, 158, 11, 0.45)' : 'rgba(148, 163, 184, 0.35)'}, 0 0 30px rgba(0, 230, 118, 0.2)`
            : '0 12px 28px -8px rgba(0,0,0,0.7)',
        }}
        className={`relative w-full h-full rounded-[24px] overflow-hidden p-[3px] transition-all duration-300 ${
          isVerified
            ? 'bg-gradient-to-b from-[#FDE047] via-[#D97706] to-[#451A03]'
            : 'bg-gradient-to-b from-[#E2E8F0] via-[#64748B] to-[#0F172A]'
        }`}
      >
        {/* Inner Card Cut Layer */}
        <div
          className={`relative w-full h-full rounded-[21px] overflow-hidden flex flex-col justify-between p-3.5 ${
            isVerified
              ? 'bg-gradient-to-b from-[#221605] via-[#140C03] to-[#080501] text-[#FEF08A]'
              : 'bg-gradient-to-b from-[#131926] via-[#0A0E17] to-[#030508] text-[#F1F5F9]'
          }`}
        >
          {/* Holographic foil shimmer on hover */}
          {isHovered && isVerified && <div className="fc26-foil-overlay" />}

          {/* Transfer Badge Flag */}
          {player.isOnTransfer && (
            <div className="absolute top-0 right-0 z-30 bg-gradient-to-r from-[#00E676] to-[#00B359] text-[#041B0E] text-[9px] font-black tracking-widest px-3 py-1 rounded-bl-xl shadow-lg uppercase">
              TRANSFER
            </div>
          )}

          {/* TOP SECTION: OVR, Position, Nation, Club Crest, Player Silhouette */}
          <div className="relative flex justify-between items-start pt-1 z-10">
            {/* Left Attribute Column */}
            <div className="flex flex-col items-center z-20 min-w-[42px]">
              {/* OVR Number */}
              <div
                className={`font-black tracking-tighter leading-none ${sizeStyles.ratingText} drop-shadow-md ${
                  isVerified
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-[#FFFBEB] to-[#FBBF24]'
                    : 'text-white'
                }`}
              >
                {rating}
              </div>

              {/* Position Tag */}
              <div
                style={{ backgroundColor: posBadgeColor }}
                className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-black text-white tracking-wider shadow-sm"
              >
                {position}
              </div>

              {/* Separator */}
              <div className="w-5 h-[1px] bg-white/20 my-1.5" />

              {/* Uzbekistan Flag */}
              <div className="flex items-center justify-center shadow-sm rounded overflow-hidden" title="O'zbekiston">
                <span className="text-xs">🇺🇿</span>
              </div>

              {/* Club Monogram Crest */}
              <div
                className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[9px] font-black mt-1 text-white shadow-inner"
                title={player.club || "Samarqand"}
              >
                {(player.club || "XFL").substring(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Right Player Image / Avatar Silhouette */}
            <div className="flex-1 h-36 flex items-end justify-center relative -mr-2">
              <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
                {/* Silhouette Glow */}
                <circle cx="100" cy="65" r="36" fill={isVerified ? '#F59E0B' : '#94A3B8'} fillOpacity="0.2" />
                {/* Head */}
                <circle cx="100" cy="65" r="32" fill={isVerified ? '#FBBF24' : '#CBD5E1'} />
                {/* Jersey Body */}
                <path
                  d="M50 110 C50 90, 150 90, 150 110 L160 210 C160 225, 140 235, 100 235 C60 235, 40 225, 40 210 Z"
                  fill={isVerified ? '#D97706' : '#64748B'}
                />
                {/* Collar & Stripes */}
                <path d="M85 100 L100 120 L115 100 Z" fill={isVerified ? '#FEF08A' : '#F8FAFC'} />
                <path d="M100 120 L100 235" stroke={isVerified ? '#FEF08A' : '#F8FAFC'} strokeWidth="3" strokeOpacity="0.6" />
                {/* Player Initial on Chest */}
                <text
                  x="100"
                  y="175"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="28"
                  fontWeight="900"
                  fillOpacity="0.9"
                >
                  {(player.fullName || player.name || 'J')[0]}
                </text>
              </svg>
            </div>
          </div>

          {/* BOTTOM SECTION: Name, Divider, 6 Hex Stats, Verification Ribbon */}
          <div className="relative z-10 space-y-2">
            {/* Player Name */}
            <div className="text-center">
              <h4
                className={`font-black uppercase tracking-wider truncate leading-tight ${sizeStyles.nameText} ${
                  isVerified ? 'text-amber-100 drop-shadow' : 'text-white'
                }`}
              >
                {(player.fullName || player.name || 'O\'yinchi').split(' ').pop()}
              </h4>
              <p className="text-[10px] text-white/50 tracking-tight">
                {player.age || 22} yosh • {player.district || "Samarqand"}
              </p>
            </div>

            {/* Gold Geometric Separator */}
            <div className="flex items-center justify-center gap-1 opacity-60">
              <div className="h-[1px] flex-1 bg-current" />
              <div className="w-1.5 h-1.5 rotate-45 bg-current" />
              <div className="h-[1px] flex-1 bg-current" />
            </div>

            {/* FC 26 Stats Matrix (2 columns x 3 rows) */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 px-1">
              {[
                { key: 'PAC', label: 'TEZ', val: stats.pac },
                { key: 'DRI', label: 'DRI', val: stats.dri },
                { key: 'SHO', label: 'ZAR', val: stats.sho },
                { key: 'DEF', label: 'HIM', val: stats.def },
                { key: 'PAS', label: 'UZA', val: stats.pas },
                { key: 'PHY', label: 'JIS', val: stats.phy },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-white/90">
                  <span className={`font-black ${sizeStyles.statText} tabular-nums ${isVerified ? 'text-amber-300' : 'text-white'}`}>
                    {item.val}
                  </span>
                  <span className="text-[9px] font-bold text-white/60 tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Verification Status Ribbon */}
            <div className="pt-1 flex items-center justify-center">
              {isVerified ? (
                <span className="inline-flex items-center gap-1 text-[8px] font-black tracking-widest text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full uppercase shadow-sm">
                  ★ TASDIQLANGAN (GOLD)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[8px] font-black tracking-widest text-slate-300 bg-slate-400/10 border border-slate-400/20 px-2 py-0.5 rounded-full uppercase">
                  ◇ HAVASKOR (SILVER)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini horizontal card component for search results and compact lists
export function PlayerCardMini({ player, onClick }) {
  if (!player) return null;

  const isVerified = player.isVerified !== undefined ? player.isVerified : true;
  const rating = Math.round(player.rating ? (player.rating > 10 ? player.rating : player.rating * 10) : 84);

  return (
    <div
      onClick={() => onClick && onClick(player)}
      className="glass-card p-3 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-all border border-[var(--color-xfl-border)]"
    >
      {/* OVR Badge */}
      <div
        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-md ${
          isVerified
            ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black'
            : 'bg-gradient-to-br from-slate-300 to-slate-500 text-black'
        }`}
      >
        <span className="text-base font-black leading-none">{rating}</span>
        <span className="text-[9px] font-extrabold uppercase mt-0.5">{player.position || 'ST'}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-black text-white truncate">
          {player.fullName || player.name}
        </h4>
        <p className="text-[10px] text-[var(--color-xfl-text-dim)] truncate">
          {player.club || "Bo'sh O'yinchi"} • {player.district || "Samarqand"}
        </p>
      </div>

      {/* Match Stats */}
      <div className="flex items-center gap-2 text-right shrink-0">
        <div>
          <div className="text-xs font-black text-[var(--color-xfl-accent)]">{player.goals || 0}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase">Gol</div>
        </div>
        <div>
          <div className="text-xs font-black text-amber-400">{player.assists || 0}</div>
          <div className="text-[8px] font-bold text-gray-400 uppercase">Pas</div>
        </div>
      </div>
    </div>
  );
}
