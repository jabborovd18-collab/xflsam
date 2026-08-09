'use client';

import { useState } from 'react';

// FC26 card — Tasdiqlangan va Tasdiqlanmagan
export default function PlayerCard({ player, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!player) return null;

  const isVerified = player.isVerified || false;
  const rating = Math.round(player.rating * 10) || 75;
  const position = player.position || 'CM';

  // Stats mapping — demo data format support
  const stats = {
    pac: player.pace || player.skills?.pace || 70,
    sho: player.shooting || player.skills?.shooting || 65,
    pas: player.passing || player.skills?.passing || 72,
    dri: player.dribbling || player.skills?.dribbling || 68,
    def: player.defense || player.skills?.defending || 50,
    phy: player.physical || player.skills?.physical || 65,
  };

  // Card theme based on verification status
  const theme = isVerified
    ? {
        // TASDIQLANGAN — Oltin/Premium FC26
        bgGradient: 'linear-gradient(165deg, #3D2B0F 0%, #C6972F 20%, #F5D77A 40%, #DBAD3E 55%, #A67C1A 75%, #5C3E0A 100%)',
        borderColor: '#C6972F',
        glowColor: 'rgba(198, 151, 47, 0.5)',
        textPrimary: '#3D2B0F',
        textSecondary: '#5C3E0A',
        statLabel: '#6B4C14',
        statValue: '#3D2B0F',
        dividerColor: 'rgba(61, 43, 15, 0.3)',
        accentLine: '#3D2B0F',
        badgeText: 'TASDIQLANGAN',
        badgeBg: 'rgba(61, 43, 15, 0.8)',
        badgeColor: '#F5D77A',
      }
    : {
        // TASDIQLANMAGAN — Kumush/Oddiy
        bgGradient: 'linear-gradient(165deg, #2A2D35 0%, #4A5568 20%, #8B95A5 40%, #6B7B8D 55%, #4A5568 75%, #2A2D35 100%)',
        borderColor: '#6B7B8D',
        glowColor: 'rgba(107, 123, 141, 0.3)',
        textPrimary: '#1A1D23',
        textSecondary: '#2A2D35',
        statLabel: '#2D333B',
        statValue: '#1A1D23',
        dividerColor: 'rgba(26, 29, 35, 0.3)',
        accentLine: '#2D333B',
        badgeText: 'TASDIQLANMAGAN',
        badgeBg: 'rgba(26, 29, 35, 0.6)',
        badgeColor: '#8B95A5',
      };

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: '220px', aspectRatio: '0.68' }}
      onClick={() => onClick && onClick(player)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          background: theme.bgGradient,
          clipPath: 'polygon(10% 0%, 90% 0%, 100% 5%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 5%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'scale(1.05) translateY(-8px)' : 'scale(1)',
          boxShadow: isHovered
            ? `0 20px 50px ${theme.glowColor}, 0 0 30px ${theme.glowColor}`
            : `0 8px 20px rgba(0,0,0,0.4)`,
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        }}
      >
        {/* Inner border line */}
        <div
          className="absolute inset-[3px]"
          style={{
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 5%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 5%)',
            border: `1px solid ${theme.dividerColor}`,
          }}
        />

        {/* Transfer badge */}
        {player.isOnTransfer && (
          <div
            className="absolute top-2 right-0 z-20 px-2 py-0.5 text-[8px] font-black tracking-wider"
            style={{
              background: '#00E676',
              color: '#000',
              clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
              paddingLeft: '12px',
            }}
          >
            TRANSFER
          </div>
        )}

        {/* === TOP SECTION: Rating + Position + Player Image === */}
        <div className="relative" style={{ height: '55%' }}>
          {/* Rating & Position Column — Left Side */}
          <div className="absolute left-3 top-4 z-10 flex flex-col items-center" style={{ width: '40px' }}>
            {/* Overall Rating */}
            <div
              className="font-black leading-none"
              style={{
                fontSize: '36px',
                color: theme.textPrimary,
                textShadow: '0 1px 2px rgba(255,255,255,0.2)',
                letterSpacing: '-2px',
              }}
            >
              {rating}
            </div>
            {/* Position */}
            <div
              className="font-bold leading-none mt-0.5"
              style={{
                fontSize: '13px',
                color: theme.textPrimary,
                letterSpacing: '1px',
              }}
            >
              {position}
            </div>

            {/* Separator line */}
            <div className="w-5 my-1.5" style={{ height: '1px', background: theme.accentLine }} />

            {/* Flag placeholder — UZB */}
            <div
              className="flex items-center justify-center rounded-sm overflow-hidden"
              style={{ width: '18px', height: '12px', background: theme.dividerColor }}
            >
              <span style={{ fontSize: '8px', color: theme.textPrimary, fontWeight: 700 }}>UZ</span>
            </div>

            {/* Club placeholder */}
            <div
              className="mt-1 flex items-center justify-center rounded-sm"
              style={{
                width: '20px',
                height: '20px',
                background: theme.dividerColor,
                fontSize: '8px',
                fontWeight: 800,
                color: theme.textPrimary,
              }}
            >
              {player.club ? player.club.substring(0, 2).toUpperCase() : 'XF'}
            </div>
          </div>

          {/* Player Silhouette / Avatar */}
          <div className="absolute right-2 bottom-0 z-10" style={{ width: '65%', height: '90%' }}>
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Player silhouette SVG */}
              <svg
                viewBox="0 0 200 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ opacity: 0.85 }}
              >
                {/* Head */}
                <circle cx="100" cy="60" r="35" fill={theme.textPrimary} opacity="0.25" />
                {/* Body */}
                <path
                  d="M55 100 C55 85, 145 85, 145 100 L155 220 C155 240, 130 260, 100 260 C70 260, 45 240, 45 220 Z"
                  fill={theme.textPrimary}
                  opacity="0.2"
                />
                {/* Jersey lines */}
                <path d="M75 110 L75 180" stroke={theme.textPrimary} strokeWidth="1" opacity="0.15" />
                <path d="M125 110 L125 180" stroke={theme.textPrimary} strokeWidth="1" opacity="0.15" />
                {/* Shorts */}
                <path
                  d="M65 190 L60 240 L100 235 L140 240 L135 190 Z"
                  fill={theme.textPrimary}
                  opacity="0.18"
                />
                {/* Player initial */}
                <text
                  x="100"
                  y="160"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={theme.textPrimary}
                  fontSize="48"
                  fontWeight="900"
                  opacity="0.15"
                >
                  {(player.fullName || player.name || 'X')[0]}
                </text>
              </svg>
            </div>
          </div>

          {/* Decorative pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${theme.textPrimary} 10px, ${theme.textPrimary} 11px)`,
            }}
          />
        </div>

        {/* === BOTTOM SECTION: Name + Stats === */}
        <div className="relative" style={{ height: '45%' }}>
          {/* Divider line with diamond */}
          <div className="relative flex items-center justify-center px-4" style={{ height: '14px' }}>
            <div className="flex-1" style={{ height: '1px', background: theme.accentLine, opacity: 0.5 }} />
            <div
              className="mx-2"
              style={{
                width: '8px',
                height: '8px',
                background: theme.accentLine,
                transform: 'rotate(45deg)',
                opacity: 0.6,
              }}
            />
            <div className="flex-1" style={{ height: '1px', background: theme.accentLine, opacity: 0.5 }} />
          </div>

          {/* Player Name */}
          <div className="text-center px-3 mt-0.5">
            <div
              className="font-black uppercase tracking-wider truncate"
              style={{
                fontSize: '14px',
                color: theme.textPrimary,
                lineHeight: '1.1',
                textShadow: '0 1px 1px rgba(255,255,255,0.15)',
              }}
            >
              {(player.fullName || player.name || 'Noma\'lum').split(' ').pop()}
            </div>
          </div>

          {/* Stats Grid — FC26 Style */}
          <div className="px-4 mt-2">
            <div className="grid grid-cols-3 gap-x-3 gap-y-1">
              {[
                { label: 'TEZ', value: stats.pac },
                { label: 'ZAR', value: stats.sho },
                { label: 'UZA', value: stats.pas },
                { label: 'DRI', value: stats.dri },
                { label: 'HIM', value: stats.def },
                { label: 'JIS', value: stats.phy },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-center gap-1.5">
                  <span
                    className="font-black"
                    style={{ fontSize: '13px', color: theme.statValue, lineHeight: 1 }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-semibold"
                    style={{ fontSize: '9px', color: theme.statLabel, letterSpacing: '0.5px', lineHeight: 1 }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex justify-center mt-2">
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: theme.badgeBg,
                fontSize: '7px',
                fontWeight: 800,
                color: theme.badgeColor,
                letterSpacing: '1.5px',
              }}
            >
              {isVerified && (
                <svg width="8" height="8" viewBox="0 0 16 16" fill={theme.badgeColor}>
                  <path d="M8 0L10 5.3 16 6.2 11.8 10 13 16 8 13.2 3 16 4.2 10 0 6.2 6 5.3z" />
                </svg>
              )}
              {theme.badgeText}
            </div>
          </div>

          {/* Match stats row */}
          <div className="flex justify-center gap-3 mt-1.5 px-3">
            {[
              { label: "O'YIN", value: player.matches || 0 },
              { label: 'GOL', value: player.goals || 0 },
              { label: 'PAS', value: player.assists || 0 },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-black" style={{ fontSize: '11px', color: theme.textPrimary, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '6px', color: theme.statLabel, fontWeight: 700, letterSpacing: '0.5px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shine effect on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)',
              animation: 'cardShine 0.8s ease forwards',
            }}
          />
        )}
      </div>
    </div>
  );
}

// Mini versiyasi — ro'yxat uchun
export function PlayerCardMini({ player, onClick }) {
  if (!player) return null;

  const isVerified = player.isVerified || false;
  const rating = Math.round(player.rating * 10) || 75;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[rgba(26,35,64,0.6)] group"
      style={{ border: '1px solid var(--color-xfl-border)' }}
      onClick={() => onClick && onClick(player)}
    >
      {/* Mini card rating badge */}
      <div
        className="flex-shrink-0 w-12 h-14 flex flex-col items-center justify-center rounded-lg font-black"
        style={{
          background: isVerified
            ? 'linear-gradient(165deg, #C6972F, #F5D77A)'
            : 'linear-gradient(165deg, #4A5568, #8B95A5)',
          color: isVerified ? '#3D2B0F' : '#1A1D23',
        }}
      >
        <span className="text-lg leading-none">{rating}</span>
        <span className="text-[8px] font-bold mt-0.5">{player.position}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-[var(--color-xfl-text)] truncate">
          {player.fullName || player.name}
        </div>
        <div className="text-xs text-[var(--color-xfl-text-dim)] flex items-center gap-2 mt-0.5">
          <span>{player.age || 20} yosh</span>
          <span>•</span>
          <span>{player.district}</span>
        </div>
        <div className="text-xs mt-1 flex gap-2">
          {player.club ? (
            <span className="text-blue-400">{player.club}</span>
          ) : (
            <span className="text-[var(--color-xfl-accent)]">Bo'sh o'yinchi</span>
          )}
          {isVerified && (
            <span className="text-yellow-500 flex items-center gap-0.5 text-[10px]">
              ★ Tasdiqlangan
            </span>
          )}
        </div>
      </div>

      {/* Stats mini */}
      <div className="flex gap-3 text-center flex-shrink-0">
        <div>
          <div className="text-sm font-bold text-[var(--color-xfl-text)]">{player.goals || 0}</div>
          <div className="text-[9px] text-[var(--color-xfl-text-dim)]">GOL</div>
        </div>
        <div>
          <div className="text-sm font-bold text-[var(--color-xfl-text)]">{player.assists || 0}</div>
          <div className="text-[9px] text-[var(--color-xfl-text-dim)]">PAS</div>
        </div>
      </div>

      {/* Transfer indicator */}
      {player.isOnTransfer && (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-xfl-accent)] animate-pulse" />
      )}
    </div>
  );
}
