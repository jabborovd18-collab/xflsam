'use client';
import { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { pozitsiyalar, tumanlar } from '@/data/demo-data';

export default function CreatePlayerModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const posKeys = Object.keys(pozitsiyalar);

  const [formData, setFormData] = useState({
    fullName: "Yangi O'yinchi",
    age: 21,
    position: 'ST',
    district: tumanlar[0]?.name || "Samarqand shahar",
    isOnTransfer: true,
    isVerified: false,
    rating: 7.5,
    pace: 75,
    shooting: 70,
    passing: 68,
    dribbling: 72,
    defense: 45,
    physical: 65,
    matches: 0,
    goals: 0,
    assists: 0,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateRating = (data) => {
    const avg = (data.pace + data.shooting + data.passing + data.dribbling + data.defense + data.physical) / 6;
    return (avg / 10).toFixed(1);
  };

  const handleStatChange = (stat, value) => {
    const numVal = parseInt(value) || 0;
    setFormData(prev => {
      const updated = { ...prev, [stat]: numVal };
      const newRating = calculateRating(updated);
      return { ...updated, rating: parseFloat(newRating) };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh] animate-[slideUp_0.3s_ease-out] z-10">

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--color-xfl-text)]">FC26 O'yinchi Karta Yaratish</h2>
              <p className="text-xs text-[var(--color-xfl-text-dim)]">O'zingizning elektron futbol kartangizni moslashtiring</p>
            </div>
            <button onClick={onClose} className="md:hidden text-white bg-black/50 w-8 h-8 rounded-full">✕</button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--color-xfl-text-dim)] mb-1">To'liq ism</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  className="input-field"
                  placeholder="Ism va Familiya"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-xfl-text-dim)] mb-1">Yosh</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => handleChange('age', parseInt(e.target.value) || 18)}
                  className="input-field"
                  min="14" max="50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-xfl-text-dim)] mb-1">Pozitsiya</label>
                <select
                  value={formData.position}
                  onChange={e => handleChange('position', e.target.value)}
                  className="input-field"
                >
                  {posKeys.map(k => (
                    <option key={k} value={k}>{pozitsiyalar[k].name} ({k})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--color-xfl-text-dim)] mb-1">Tuman / Hudud</label>
                <select
                  value={formData.district}
                  onChange={e => handleChange('district', e.target.value)}
                  className="input-field"
                >
                  {tumanlar.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Verification & Transfer Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] rounded-xl">
                <div>
                  <div className="font-bold text-sm text-[var(--color-xfl-text)]">Karta Turi</div>
                  <div className="text-[11px] text-[var(--color-xfl-text-dim)]">
                    {formData.isVerified ? '★ Oltin Tasdiqlangan' : '◇ Kumush Oddiy'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('isVerified', !formData.isVerified)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                    formData.isVerified
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-300 text-amber-950 shadow-lg shadow-amber-500/20'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {formData.isVerified ? 'Oltin (FC26)' : 'Kumush (FC26)'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] rounded-xl">
                <div>
                  <div className="font-bold text-sm text-[var(--color-xfl-text)]">Transfer Bozori</div>
                  <div className="text-[11px] text-[var(--color-xfl-text-dim)]">Transfer oynasida ko'rinish</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isOnTransfer}
                    onChange={e => handleChange('isOnTransfer', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-xfl-accent)]"></div>
                </label>
              </div>
            </div>

            {/* FC26 Skill Parameters */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-[var(--color-xfl-text)]">FC26 Mahorat Ko'rsatkichlari</h3>
                <span className="text-xs font-extrabold text-[var(--color-xfl-accent)]">
                  OVR: {Math.round(formData.rating * 10)}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { id: 'pace', label: 'TEZ — Tezlik' },
                  { id: 'shooting', label: 'ZAR — Zarba' },
                  { id: 'passing', label: 'UZA — Uzatish' },
                  { id: 'dribbling', label: 'DRI — Dribling' },
                  { id: 'defense', label: 'HIM — Himoya' },
                  { id: 'physical', label: 'JIS — Jismoniy' },
                ].map(skill => (
                  <div key={skill.id} className="bg-[var(--color-xfl-bg)] p-2.5 rounded-lg border border-[var(--color-xfl-border)]">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[var(--color-xfl-text-dim)]">{skill.label}</span>
                      <span className="text-[var(--color-xfl-accent)]">{formData[skill.id]}</span>
                    </div>
                    <input
                      type="range"
                      min="30" max="99"
                      value={formData[skill.id]}
                      onChange={e => handleStatChange(skill.id, e.target.value)}
                      className="w-full accent-[var(--color-xfl-accent)] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                alert("O'yinchi kartasi muvaffaqiyatli saqlandi!");
                onClose();
              }}
              className="btn-primary w-full py-4 justify-center text-base font-extrabold shadow-lg shadow-green-500/20"
            >
              ⚽ Kartani Saqlash Va Transferga Qo'yish
            </button>
          </div>
        </div>

        {/* Live FC26 Preview Area */}
        <div className="w-full md:w-80 bg-black/60 border-t md:border-t-0 md:border-l border-[var(--color-xfl-border)] p-6 flex flex-col items-center justify-center relative">
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-4 right-4 text-white bg-black/50 hover:bg-black w-8 h-8 rounded-full items-center justify-center transition-colors"
          >
            ✕
          </button>
          <div className="text-xs font-extrabold text-[var(--color-xfl-accent)] tracking-widest uppercase mb-4">
            FC26 JONLI PREVIEW
          </div>
          <div className="transform scale-110">
            <PlayerCard player={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}
