'use client';

import { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import { pozitsiyalar, tumanlar } from '@/data/demo-data';

export default function CreatePlayerModal({ onClose, onCreated }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const posKeys = Object.keys(pozitsiyalar);

  const [formData, setFormData] = useState({
    fullName: "Jasurbek Samarqandiy",
    age: 21,
    position: 'ST',
    district: "Samarqand shahar",
    club: null,
    isOnTransfer: true,
    isVerified: true,
    rating: 8.4,
    pace: 86,
    shooting: 84,
    passing: 75,
    dribbling: 82,
    defense: 45,
    physical: 79,
    matches: 18,
    goals: 12,
    assists: 6,
    preferredFoot: 'O\'ng',
    height: 182,
    weight: 76,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateOvr = (data) => {
    const avg = (data.pace + data.shooting + data.passing + data.dribbling + data.defense + data.physical) / 6;
    return (avg / 10).toFixed(1);
  };

  const handleStatChange = (stat, value) => {
    const numVal = parseInt(value) || 30;
    setFormData(prev => {
      const updated = { ...prev, [stat]: numVal };
      const newRating = calculateOvr(updated);
      return { ...updated, rating: parseFloat(newRating) };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    if (onCreated) onCreated(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[var(--color-xfl-card)] border border-[var(--color-xfl-border)] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh] animate-slide-up z-10">

        {/* Left Form Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-[var(--color-xfl-border)]">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                ⚡ EA SPORTS FC 26 STUDIO
              </div>
              <h2 className="text-2xl font-black text-white mt-1">O'yinchi Kartangizni Yarating</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center font-bold"
            >
              ✕
            </button>
          </div>

          {!savedSuccess ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">To'liq Ismingiz</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                    placeholder="Ism va Familiya"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Yoshingiz</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={e => handleChange('age', parseInt(e.target.value) || 18)}
                    className="input-field py-2.5 text-xs font-bold"
                    min="14" max="50"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">O'ynaydigan Pozitsiyangiz</label>
                  <select
                    value={formData.position}
                    onChange={e => handleChange('position', e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                  >
                    {posKeys.map(k => (
                      <option key={k} value={k}>{pozitsiyalar[k].name} ({k})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Samarqand Tumani / Hududi</label>
                  <select
                    value={formData.district}
                    onChange={e => handleChange('district', e.target.value)}
                    className="input-field py-2.5 text-xs font-bold"
                  >
                    {tumanlar.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gold vs Silver Edition & Transfer Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3.5 bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] rounded-2xl">
                  <div>
                    <div className="font-black text-xs text-white">Karta Maqomi</div>
                    <div className="text-[10px] text-gray-400">
                      {formData.isVerified ? '★ Oltin (FC26 Gold)' : '◇ Kumush (FC26 Silver)'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('isVerified', !formData.isVerified)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      formData.isVerified
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black shadow-md shadow-amber-500/20'
                        : 'bg-slate-700 text-gray-200'
                    }`}
                  >
                    {formData.isVerified ? '★ Oltin Karta' : '◇ Kumush Karta'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[var(--color-xfl-bg)] border border-[var(--color-xfl-border)] rounded-2xl">
                  <div>
                    <div className="font-black text-xs text-white">Transfer Bozori</div>
                    <div className="text-[10px] text-gray-400">Klublar sizni topa olishi uchun</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('isOnTransfer', !formData.isOnTransfer)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      formData.isOnTransfer
                        ? 'bg-[var(--color-xfl-accent)] text-black shadow-md shadow-green-500/20'
                        : 'bg-slate-700 text-gray-300'
                    }`}
                  >
                    {formData.isOnTransfer ? 'ON (Ochiq)' : 'OFF (Yopiq)'}
                  </button>
                </div>
              </div>

              {/* 6 Core FC26 Skill Sliders */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    FC 26 Texnik Ko'rsatkichlari (30 - 99)
                  </h3>
                  <span className="text-xs font-black text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                    OVR: {Math.round(formData.rating * 10)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'pace', label: 'TEZ — Tezlik (Pace)', val: formData.pace, col: 'accent-blue-500' },
                    { id: 'shooting', label: 'ZAR — Zarba (Shooting)', val: formData.shooting, col: 'accent-red-500' },
                    { id: 'passing', label: 'UZA — Uzatish (Passing)', val: formData.passing, col: 'accent-yellow-500' },
                    { id: 'dribbling', label: 'DRI — Dribling (Dribbling)', val: formData.dribbling, col: 'accent-purple-500' },
                    { id: 'defense', label: 'HIM — Himoya (Defense)', val: formData.defense, col: 'accent-green-500' },
                    { id: 'physical', label: 'JIS — Jismoniy (Physical)', val: formData.physical, col: 'accent-orange-500' },
                  ].map(item => (
                    <div key={item.id} className="bg-[var(--color-xfl-bg)] p-3 rounded-2xl border border-[var(--color-xfl-border)]">
                      <div className="flex justify-between text-xs font-black mb-1">
                        <span className="text-gray-300">{item.label}</span>
                        <span className="text-[var(--color-xfl-accent)]">{item.val}</span>
                      </div>
                      <input
                        type="range"
                        min="35" max="99"
                        value={item.val}
                        onChange={e => handleStatChange(item.id, e.target.value)}
                        className="w-full cursor-pointer accent-[var(--color-xfl-accent)]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-sm font-black justify-center shadow-xl shadow-green-500/25"
              >
                ⚽ FC 26 Kartasini Saqlash va Transferga Chiqish
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4 animate-slide-up">
              <span className="text-5xl">🏆</span>
              <h3 className="text-xl font-black text-emerald-400">
                Kartangiz Muvaffaqiyatli Saqlandi!
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Tabriklaymiz, <strong>{formData.fullName}</strong>! Sizning <strong>{Math.round(formData.rating * 10)} OVR</strong> reytingli FC 26 elektron kartangiz XFL Transfer oynasiga joylashtirildi. Samarqand klublari endi sizga taklif yubora oladi.
              </p>
              <button
                onClick={onClose}
                className="btn-primary py-3 px-8 text-xs font-black mt-2"
              >
                Transfer Bozoriga O'tish
              </button>
            </div>
          )}
        </div>

        {/* Right Live 3D FC26 Preview Area */}
        <div className="w-full lg:w-96 bg-black/60 border-t lg:border-t-0 lg:border-l border-[var(--color-xfl-border)] p-6 sm:p-8 flex flex-col items-center justify-center relative">
          <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span>★ JONLI FC 26 3D PREVIEW</span>
          </div>

          <div className="transform scale-105 my-2">
            <PlayerCard player={formData} size="standard" />
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-4">
            Sichqonchani karta ustiga olib borsangiz — 3D Parallax va Oltin jilo animatsiyasini ko'rasiz!
          </p>
        </div>

      </div>
    </div>
  );
}
