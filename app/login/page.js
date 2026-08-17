'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [role, setRole] = useState('player'); // 'player', 'captain', 'owner'
  const [phone, setPhone] = useState('+998 90 123 45 67');
  const [password, setPassword] = useState('******');
  const [name, setName] = useState('Jasurbek Normatov');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Muvaffaqiyatli kirdingiz! Xush kelibsiz, ${name}!`);
    router.push('/profil');
  };

  const handleDemoLogin = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'player') {
      setName("Jasurbek Normatov (O'yinchi)");
    } else if (selectedRole === 'captain') {
      setName("Sardor Usmonov (Klub Sardori)");
    } else {
      setName("Sanjar Raximov (Stadion Egasi)");
    }
    setTimeout(() => {
      router.push('/profil');
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md glass-card p-6 sm:p-8 space-y-6 border border-[var(--color-xfl-border)] shadow-2xl animate-slide-up">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1B5E20] to-[#00E676] mx-auto flex items-center justify-center text-2xl shadow-xl shadow-green-500/25 border border-white/20">
            ⚽
          </div>
          <h2 className="text-2xl font-black text-white">XFL Samarqand</h2>
          <p className="text-xs text-[var(--color-xfl-text-dim)]">
            Rasmiy platformaga xush kelibsiz
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 text-xs font-black">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              tab === 'login'
                ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] font-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Kirish
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              tab === 'register'
                ? 'bg-[var(--color-xfl-accent)] text-[#041B0E] font-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Ro'yxatdan O'tish
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">To'liq Ism</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field py-2.5 text-xs font-bold"
                required
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Telefon Raqam</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field py-2.5 text-xs font-bold"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-300 uppercase block mb-1">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field py-2.5 text-xs font-bold"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-3.5 text-xs font-black justify-center shadow-xl shadow-green-500/25 mt-2"
          >
            {tab === 'login' ? '🚀 Platformaga Kirish' : '✨ Ro\'yxatdan O\'tish'}
          </button>
        </form>

        {/* 1-Click Demo Profiles */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="text-[10px] font-black text-gray-400 uppercase text-center">
            1-Klikda Tezkor Sinov Rejimi (Demo):
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] font-black">
            <button
              onClick={() => handleDemoLogin('player')}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400 text-emerald-300 transition-colors text-center"
            >
              ⚽ O'yinchi
            </button>
            <button
              onClick={() => handleDemoLogin('captain')}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400 text-amber-300 transition-colors text-center"
            >
              🛡️ Sardor
            </button>
            <button
              onClick={() => handleDemoLogin('owner')}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400 text-blue-300 transition-colors text-center"
            >
              🏟️ Maydon
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
            ← Bosh sahifaga qaytish
          </Link>
        </div>

      </div>
    </div>
  );
}
