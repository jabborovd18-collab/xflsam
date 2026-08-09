'use client';

import { useState } from 'react';

export default function AddStadiumModal({ isOpen, onClose, tumanlar }) {
  const [formData, setFormData] = useState({
    nomi: '',
    manzil: '',
    tuman: '',
    tavsif: '',
    sigim: '',
    narx: '',
    telefon: '',
    qoplama: "Sun'iy",
    maydonHajmi: "To'liq",
    qulayliklar: {
      yoritgich: false,
      parking: false,
      dush: false,
      kiyinish_xonasi: false,
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      qulayliklar: { ...prev.qulayliklar, [name]: checked }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    console.log('Submitted stadium data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[var(--xfl-card)] border border-[var(--xfl-border)] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[var(--xfl-border)] flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--xfl-primary)] to-[var(--xfl-accent)]">
            Stadion qo'shish
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[var(--xfl-bg)] rounded-full transition-colors text-[var(--xfl-text-dim)]">
            ✕
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="add-stadium-form" onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Stadion nomi *</label>
                <input 
                  required
                  type="text" 
                  name="nomi"
                  value={formData.nomi}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                  placeholder="Masalan: Paxtakor o'yingohi"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Tuman *</label>
                <select 
                  required
                  name="tuman"
                  value={formData.tuman}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                >
                  <option value="" disabled>Tuman tanlang</option>
                  {tumanlar.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-[var(--xfl-text-dim)]">To'liq manzil *</label>
              <input 
                required
                type="text" 
                name="manzil"
                value={formData.manzil}
                onChange={handleChange}
                className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                placeholder="Ko'cha, uy raqami va mo'ljal"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Qoplama turi</label>
                <select 
                  name="qoplama"
                  value={formData.qoplama}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                >
                  <option value="Sun'iy">Sun'iy</option>
                  <option value="Tabiiy">Tabiiy</option>
                  <option value="Asfalt">Asfalt</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Maydon hajmi</label>
                <select 
                  name="maydonHajmi"
                  value={formData.maydonHajmi}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                >
                  <option value="To'liq">To'liq (11x11)</option>
                  <option value="Yarim">Yarim (7x7 / 8x8)</option>
                  <option value="Mini">Mini (5x5)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Narx (so'm/soat) *</label>
                <input 
                  required
                  type="text" 
                  name="narx"
                  value={formData.narx}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                  placeholder="Masalan: 150000"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Sig'im (tomoshabin)</label>
                <input 
                  type="text" 
                  name="sigim"
                  value={formData.sigim}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                  placeholder="Masalan: 200"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-[var(--xfl-text-dim)]">Telefon raqam *</label>
                <input 
                  required
                  type="text" 
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none"
                  placeholder="+998"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm text-[var(--xfl-text-dim)]">Qulayliklar</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--xfl-border)] bg-[var(--xfl-bg)] cursor-pointer hover:border-[var(--xfl-accent)] transition-colors">
                  <input type="checkbox" name="yoritgich" checked={formData.qulayliklar.yoritgich} onChange={handleCheckbox} className="accent-[var(--xfl-accent)] w-4 h-4" />
                  <span className="text-sm">Yoritgich 💡</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--xfl-border)] bg-[var(--xfl-bg)] cursor-pointer hover:border-[var(--xfl-accent)] transition-colors">
                  <input type="checkbox" name="parking" checked={formData.qulayliklar.parking} onChange={handleCheckbox} className="accent-[var(--xfl-accent)] w-4 h-4" />
                  <span className="text-sm">Parking 🅿️</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--xfl-border)] bg-[var(--xfl-bg)] cursor-pointer hover:border-[var(--xfl-accent)] transition-colors">
                  <input type="checkbox" name="dush" checked={formData.qulayliklar.dush} onChange={handleCheckbox} className="accent-[var(--xfl-accent)] w-4 h-4" />
                  <span className="text-sm">Dush 🚿</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-lg border border-[var(--xfl-border)] bg-[var(--xfl-bg)] cursor-pointer hover:border-[var(--xfl-accent)] transition-colors">
                  <input type="checkbox" name="kiyinish_xonasi" checked={formData.qulayliklar.kiyinish_xonasi} onChange={handleCheckbox} className="accent-[var(--xfl-accent)] w-4 h-4" />
                  <span className="text-sm">Kiyinish xonasi 🔒</span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-[var(--xfl-text-dim)]">Qo'shimcha ma'lumot (Tavsif)</label>
              <textarea 
                name="tavsif"
                value={formData.tavsif}
                onChange={handleChange}
                rows="3"
                className="w-full bg-[var(--xfl-bg)] border border-[var(--xfl-border)] rounded-lg p-2.5 focus:ring-[var(--xfl-accent)] focus:border-[var(--xfl-accent)] outline-none resize-none"
                placeholder="Stadion haqida qo'shimcha ma'lumotlar..."
              ></textarea>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[var(--xfl-border)] flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-[var(--xfl-border)] text-[var(--xfl-text)] hover:bg-[var(--xfl-bg)] transition-colors font-medium"
          >
            Bekor qilish
          </button>
          <button 
            type="submit"
            form="add-stadium-form"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--xfl-primary)] to-[var(--xfl-accent)] text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-green-900/20"
          >
            Stadion qo'shish
          </button>
        </div>

      </div>
    </div>
  );
}
