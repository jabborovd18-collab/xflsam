// Export FC26 Player Card as Ultra High-Resolution PNG Image
// Ideal for Instagram Stories, Telegram Avatars, and sharing

export function exportPlayerCardAsPNG(player) {
  if (!player || typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // High-res dimensions (1080x1400)
  canvas.width = 1080;
  canvas.height = 1440;

  const rating = Math.round((player.rating ? (player.rating > 10 ? player.rating : player.rating * 10) : 84));
  const position = player.position || 'ST';
  const name = (player.fullName || player.name || 'FUTBOLCHI').toUpperCase();
  const district = (player.district || 'Samarqand').toUpperCase();
  const isVerified = player.isVerified !== undefined ? player.isVerified : true;

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1440);
  if (isVerified) {
    bgGrad.addColorStop(0, '#3D2B0F');
    bgGrad.addColorStop(0.2, '#C6972F');
    bgGrad.addColorStop(0.45, '#F5D77A');
    bgGrad.addColorStop(0.7, '#A67C1A');
    bgGrad.addColorStop(1, '#1A1205');
  } else {
    bgGrad.addColorStop(0, '#1E293B');
    bgGrad.addColorStop(0.5, '#475569');
    bgGrad.addColorStop(1, '#0F172A');
  }

  // Draw Card Outer Shield
  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  ctx.roundRect(40, 40, 1000, 1360, 60);
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = isVerified ? '#FDE047' : '#94A3B8';
  ctx.stroke();

  // Inner Dark Card Cut
  const innerGrad = ctx.createLinearGradient(0, 0, 0, 1440);
  innerGrad.addColorStop(0, isVerified ? '#221605' : '#0F172A');
  innerGrad.addColorStop(0.6, isVerified ? '#140C03' : '#090D16');
  innerGrad.addColorStop(1, '#000000');

  ctx.fillStyle = innerGrad;
  ctx.beginPath();
  ctx.roundRect(70, 70, 940, 1300, 45);
  ctx.fill();

  // Top Rating & Position
  ctx.fillStyle = isVerified ? '#FBBF24' : '#FFFFFF';
  ctx.font = '900 130px Inter, sans-serif';
  ctx.fillText(`${rating}`, 130, 240);

  ctx.fillStyle = '#DC2626';
  ctx.beginPath();
  ctx.roundRect(130, 270, 140, 50, 12);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 36px Inter, sans-serif';
  ctx.fillText(position, 160, 310);

  // Country Flag Symbol (UZ)
  ctx.font = '60px Inter, sans-serif';
  ctx.fillText('🇺🇿', 130, 390);

  // Player Silhouette / Initial Crest
  ctx.fillStyle = isVerified ? '#F59E0B' : '#64748B';
  ctx.beginPath();
  ctx.arc(640, 350, 180, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 160px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name.charAt(0), 640, 410);

  // Player Name
  ctx.fillStyle = isVerified ? '#FEF08A' : '#FFFFFF';
  ctx.font = '900 70px Inter, sans-serif';
  ctx.fillText(name, 540, 720);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 36px Inter, sans-serif';
  ctx.fillText(`${player.age || 22} YOSH • 📍 ${district}`, 540, 780);

  // Divider Line
  ctx.strokeStyle = isVerified ? '#F59E0B' : '#475569';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(150, 830);
  ctx.lineTo(930, 830);
  ctx.stroke();

  // Stats Grid (6 Attributes)
  const stats = [
    { label: 'TEZ', val: player.pace || 86 },
    { label: 'DRI', val: player.dribbling || 82 },
    { label: 'ZAR', val: player.shooting || 88 },
    { label: 'HIM', val: player.defense || 45 },
    { label: 'UZA', val: player.passing || 75 },
    { label: 'JIS', val: player.physical || 80 },
  ];

  ctx.font = '900 55px Inter, sans-serif';
  ctx.textAlign = 'left';

  // Column 1
  ctx.fillStyle = isVerified ? '#FDE047' : '#FFFFFF';
  ctx.fillText(`${stats[0].val}`, 220, 930);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(stats[0].label, 320, 930);

  ctx.fillStyle = isVerified ? '#FDE047' : '#FFFFFF';
  ctx.fillText(`${stats[2].val}`, 220, 1030);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(stats[2].label, 320, 1030);

  ctx.fillStyle = isVerified ? '#FDE047' : '#FFFFFF';
  ctx.fillText(`${stats[4].val}`, 220, 1130);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(stats[4].label, 320, 1130);

  // Column 2
  ctx.fillStyle = isVerified ? '#FDE047' : '#FFFFFF';
  ctx.fillText(`${stats[1].val}`, 620, 930);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(stats[1].label, 720, 930);

  ctx.fillStyle = isVerified ? '#FDE047' : '#FFFFFF';
  ctx.fillText(`${stats[3].val}`, 620, 1030);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(stats[3].label, 720, 1030);

  ctx.fillStyle = isVerified ? '#FDE047' : '#FFFFFF';
  ctx.fillText(`${stats[5].val}`, 620, 1130);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(stats[5].label, 720, 1130);

  // Bottom Verified Badge
  ctx.fillStyle = isVerified ? '#F59E0B' : '#475569';
  ctx.beginPath();
  ctx.roundRect(300, 1220, 480, 70, 35);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = '900 32px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(isVerified ? '★ TASDIQLANGAN (GOLD) ★' : '◇ HAVASKOR (SILVER) ◇', 540, 1268);

  // Download Action
  const link = document.createElement('a');
  link.download = `XFL_FC26_${name.replace(/\s+/g, '_')}_Card.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
