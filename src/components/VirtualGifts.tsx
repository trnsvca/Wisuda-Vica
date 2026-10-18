import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { VirtualGift } from '../types.ts';

interface VirtualGiftsProps {
  gifts: VirtualGift[];
  onSendGift: (id: string) => void;
}

export const VirtualGifts: React.FC<VirtualGiftsProps> = ({ gifts, onSendGift }) => {
  const totalGifts = gifts.reduce((acc, g) => acc + g.count, 0);

  return (
    <div className="w-full bg-white text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow rounded-2xl p-4 my-2 rotate-[-0.5deg]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <Gift className="w-5 h-5 text-[#ff4f9a]" />
          <h3 className="font-bagel text-lg sm:text-xl text-[#1b1b4b]">
            KIRIM KADO VIRTUAL
          </h3>
        </div>
        <span className="text-[11px] font-extrabold bg-[#ffe14d] px-2 py-0.5 rounded-full border border-[var(--line)]">
          {totalGifts} Kado Terkumpul! ✨
        </span>
      </div>
      <p className="text-xs font-semibold text-neutral-600 mb-3">
        Belum sempat bawa kado fisik? Kirim kado virtual buat semangatin Vica! (Bisa diklik berkali-kali)
      </p>

      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            type="button"
            onClick={() => onSendGift(gift.id)}
            className="flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl bg-neutral-50 hover:bg-[#ffe14d] border-2 border-[var(--line)] transition-all hover:scale-105 active:scale-95 cursor-pointer brutal-shadow-sm group"
            title={`Kirim ${gift.name}`}
          >
            <span className="text-xl sm:text-3xl transition-transform group-hover:scale-125 group-active:rotate-12">
              {gift.icon}
            </span>
            <span className="text-[9px] sm:text-xs font-extrabold mt-0.5 sm:mt-1 text-center line-clamp-1 leading-tight">
              {gift.name}
            </span>
            <span className="mt-0.5 text-[9px] sm:text-[10px] font-black bg-white px-1.5 py-0.2 rounded-full border border-[var(--line)]">
              {gift.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
