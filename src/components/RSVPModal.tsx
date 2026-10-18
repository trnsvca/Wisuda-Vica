import React, { useState } from 'react';
import { X, Send, Heart, PartyPopper } from 'lucide-react';
import { Wish } from '../types.ts';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitWish: (wish: Omit<Wish, 'id' | 'timestamp' | 'likes'>) => void;
}

const EMOJI_OPTIONS = [
  '🎓', '🥳', '💐', '🎉', '🥂', '👑', '🔥', '💖',
  '✨', '🧸', '☕', '🧋', '⭐', '🥰', '🤩', '👏',
  '🙌', '💯', '🌻', '🍦', '🍕', '🥹', '🚀', '😎'
];

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  onSubmitWish,
}) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'dateng' | 'usahakan' | 'doa'>('dateng');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎓');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmitWish({
      name: name.trim(),
      attendance,
      message: message.trim() || 'Selamat Wisuda Vica! Sukses selalu!',
      emoji: selectedEmoji,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setMessage('');
      setAttendance('dateng');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white text-[#1b1b4b] border-[3.5px] border-[var(--line)] brutal-shadow-lg rounded-3xl p-6 sm:p-7 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-[var(--line)] bg-[#ffe14d] hover:bg-[#ff4f9a] hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-[#5ce1b5] border-3 border-[var(--line)] rounded-full flex items-center justify-center text-3xl mb-4 brutal-shadow-sm">
              🎉
            </div>
            <h3 className="font-bagel text-2xl text-[#1b1b4b]">
              YEEAY, TERIMA KASIH!
            </h3>
            <p className="font-bold text-neutral-600 mt-2">
              Konfirmasi & ucapanmu sudah tercatat. Ditunggu kedatangannya ya!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">📝</span>
              <h3 className="font-bagel text-2xl tracking-wide text-[#1b1b4b]">
                RSVP & UCAPAN
              </h3>
            </div>
            <p className="text-sm font-semibold text-neutral-600 mb-5">
              Isi namamu & kasih ucapan manis (atau ledek) buat Vica!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider mb-1">
                  Nama Kamu <span className="text-[#ff4f9a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Taehyung pacar Vica"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-3 border-[var(--line)] bg-neutral-50 text-base font-bold placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3d5afe]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider mb-1">
                  Konfirmasi Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('dateng')}
                    className={`py-2 px-1 text-center rounded-xl border-2 border-[var(--line)] text-xs font-extrabold transition-all ${
                      attendance === 'dateng'
                        ? 'bg-[#5ce1b5] brutal-shadow-sm scale-[1.02]'
                        : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    🎉 Pasti Dateng!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('usahakan')}
                    className={`py-2 px-1 text-center rounded-xl border-2 border-[var(--line)] text-xs font-extrabold transition-all ${
                      attendance === 'usahakan'
                        ? 'bg-[#ffe14d] brutal-shadow-sm scale-[1.02]'
                        : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    ✨ Diusahain!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('doa')}
                    className={`py-2 px-1 text-center rounded-xl border-2 border-[var(--line)] text-xs font-extrabold transition-all ${
                      attendance === 'doa'
                        ? 'bg-[#ff4f9a] text-white brutal-shadow-sm scale-[1.02]'
                        : 'bg-neutral-100 hover:bg-neutral-200'
                    }`}
                  >
                    🙏 Kirim Ucapan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider mb-1">
                  Pesan / Ucapan untuk Vica
                </label>
                <textarea
                  rows={3}
                  placeholder="Tulis ucapan selamat, doa terbaik, atau info loker juga boleh..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border-3 border-[var(--line)] bg-neutral-50 text-sm font-semibold placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3d5afe] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider mb-1.5">
                  Pilih Stiker Reaksi
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 rounded-xl bg-neutral-100/70 border border-neutral-200">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-xl w-9 h-9 flex items-center justify-center rounded-lg border-2 border-[var(--line)] transition-transform shrink-0 cursor-pointer ${
                        selectedEmoji === emoji
                          ? 'bg-[#ffe14d] scale-110 brutal-shadow-sm'
                          : 'bg-white hover:bg-neutral-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full bg-[#ff4f9a] text-white font-extrabold text-lg border-3 border-[var(--line)] brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 brutal-shadow-active transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  Kirim Ucapan & Konfirmasi
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
