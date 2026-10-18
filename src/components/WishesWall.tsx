import React, { useState } from 'react';
import { Heart, MessageSquareHeart, CheckCircle, Clock, Sparkles, Trash2 } from 'lucide-react';
import { Wish } from '../types.ts';

interface WishesWallProps {
  wishes: Wish[];
  onLikeWish: (id: string) => void;
  onOpenRSVP: () => void;
  onDeleteWish: (id: string) => void;
  highlightedWishId?: string | null;
}

export const WishesWall: React.FC<WishesWallProps> = ({
  wishes,
  onLikeWish,
  onOpenRSVP,
  onDeleteWish,
  highlightedWishId,
}) => {
  const [selectedWishId, setSelectedWishId] = useState<string | null>(null);

  const getAttendanceBadge = (status: Wish['attendance']) => {
    switch (status) {
      case 'dateng':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-[#5ce1b5] text-[#1b1b4b] px-2 py-0.5 rounded-full border border-[var(--line)]">
            <CheckCircle className="w-3 h-3" /> Pasti Dateng
          </span>
        );
      case 'usahakan':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-[#ffe14d] text-[#1b1b4b] px-2 py-0.5 rounded-full border border-[var(--line)]">
            <Clock className="w-3 h-3" /> Diusahakan
          </span>
        );
      case 'doa':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-[#ff4f9a] text-white px-2 py-0.5 rounded-full border border-[var(--line)]">
            <Sparkles className="w-3 h-3" /> Kirim Ucapan
          </span>
        );
    }
  };

  const attendanceCount = wishes.filter((w) => w.attendance === 'dateng').length;

  return (
    <div id="buku-ucapan" className="w-full mt-4 scroll-mt-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <MessageSquareHeart className="w-6 h-6 text-[#ff4f9a]" />
          <h2 className="font-bagel text-xl sm:text-2xl text-[var(--ink)]">
            BUKU UCAPAN & DOA
          </h2>
        </div>
        <span className="text-xs font-bold bg-white text-[#1b1b4b] px-2.5 py-1 rounded-full border-2 border-[var(--line)] brutal-shadow-sm">
          {attendanceCount} Orang Dateng! 🎉
        </span>
      </div>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {wishes.map((w, idx) => {
          const isSelected = selectedWishId === w.id;
          return (
            <div
              key={w.id}
              onClick={() => setSelectedWishId(isSelected ? null : w.id)}
              className={`bg-white text-[#1b1b4b] border-[2.5px] border-[var(--line)] brutal-shadow-sm rounded-2xl p-3.5 transition-all cursor-pointer ${
                highlightedWishId === w.id
                  ? 'ring-4 ring-[#ff4f9a] bg-pink-50 scale-[1.02]'
                  : isSelected
                  ? 'ring-2 ring-red-400 bg-red-50/20'
                  : 'hover:-translate-y-0.5'
              }`}
              style={{
                transform: highlightedWishId === w.id ? 'none' : `rotate(${idx % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
              }}
              title="Klik ucapan untuk opsi"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl leading-none">{w.emoji}</span>
                  <div>
                    <h4 className="font-bold text-sm leading-tight text-[#1b1b4b]">
                      {w.name}
                    </h4>
                    <div className="mt-0.5">{getAttendanceBadge(w.attendance)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Delete button appears when card is clicked */}
                  {isSelected && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteWish(w.id);
                        setSelectedWishId(null);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-red-600 bg-red-100 hover:bg-red-200 border-2 border-red-500 rounded-full px-2.5 py-0.5 transition-all shadow-xs animate-in fade-in zoom-in-95 duration-150 cursor-pointer"
                      title="Hapus ucapan ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeWish(w.id);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-neutral-600 hover:text-[#ff4f9a] bg-neutral-50 hover:bg-pink-50 border border-neutral-300 rounded-full px-2 py-0.5 transition-colors cursor-pointer"
                    title="Suka ucapan ini"
                  >
                    <Heart className={`w-3.5 h-3.5 ${w.likes > 0 ? 'fill-[#ff4f9a] text-[#ff4f9a]' : ''}`} />
                    <span>{w.likes}</span>
                  </button>
                </div>
              </div>

              <p className="mt-2.5 text-sm font-semibold text-neutral-800 leading-snug whitespace-pre-wrap">
                "{w.message}"
              </p>

              <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 font-bold">
                <span>{isSelected ? 'Klik lagi untuk menutup' : 'Klik kartu untuk opsi'}</span>
                <span>{w.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={onOpenRSVP}
          className="text-xs font-extrabold uppercase tracking-wider text-[#3d5afe] hover:underline bg-white px-3 py-1.5 rounded-full border-2 border-[var(--line)] inline-flex items-center gap-1.5 cursor-pointer brutal-shadow-sm"
        >
          <span>✍️</span> Tulis Ucapanmu di Sini
        </button>
      </div>
    </div>
  );
};
