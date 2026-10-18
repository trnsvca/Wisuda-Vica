import React, { useState } from 'react';
import { X, Share2, Copy, Check, Calendar, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = 'https://my-grad-inv.vercel.app/';

  const shareText = `Halo! Kamu diundang ke Wisuda 134 ITS - Vica! 🎓✨\n\n🗓️ Minggu, 25 Oktober 2026\n⏰ 13.00 - 14.30 WIB\n📍 Departemen Statistika Bisnis ITS\n\nYuk rame-rame dateng dan rayain bareng! Info lengkap & RSVP klik link ini:\n${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wisuda 134 ITS Vica//ID',
      'BEGIN:VEVENT',
      'SUMMARY:Wisuda 134 ITS - Vica',
      'DESCRIPTION:Acara Wisuda 134 ITS - Trian Servica S.Tr.Stat. Ayo rayain bareng!',
      'LOCATION:Departemen Statistika Bisnis ITS, Surabaya',
      'DTSTART:20261025T060000Z',
      'DTEND:20261025T073000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wisuda-134-vica.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white text-[#1b1b4b] border-[3.5px] border-[var(--line)] brutal-shadow-lg rounded-3xl p-6 sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-[var(--line)] bg-[#ffe14d] hover:bg-[#ff4f9a] hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Share2 className="w-6 h-6 text-[#ff4f9a]" />
          <h3 className="font-bagel text-2xl text-[#1b1b4b]">
            BAGIKAN UNDANGAN
          </h3>
        </div>
        <p className="text-sm font-semibold text-neutral-600 mb-5">
          Ajak temen-temen, keluarga, dan rombongan geng kamu buat dateng!
        </p>

        <div className="space-y-3">
          {/* WhatsApp Share */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3 px-4 rounded-2xl bg-[#25D366] text-white font-extrabold text-base border-2.5 border-[var(--line)] brutal-shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            Kirim lewat WhatsApp
          </button>

          {/* Copy Link */}
          <div className="flex items-center gap-2 p-1.5 bg-neutral-100 rounded-2xl border-2 border-[var(--line)]">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs font-bold text-neutral-700 px-3 py-1 flex-1 outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-[#ffe14d] text-xs font-black border border-[var(--line)] hover:bg-[#ff4f9a] hover:text-white transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Disalin!' : 'Salin'}
            </button>
          </div>

          {/* iCal / Apple Calendar Download */}
          <button
            type="button"
            onClick={handleDownloadICS}
            className="w-full py-2.5 px-4 rounded-xl bg-white text-[#1b1b4b] font-bold text-xs border-2 border-[var(--line)] hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#3d5afe]" />
            Download File Kalender (.ics untuk iPhone/Outlook)
          </button>
        </div>
      </div>
    </div>
  );
};
