import React, { useState } from 'react';
import { Camera, Sparkles, Smile, GraduationCap, Coffee } from 'lucide-react';

interface MemoryCard {
  id: string;
  tag: string;
  icon: string;
  title: string;
  description: string;
  rotation: string;
  bgBadge: string;
}

const MEMORIES: MemoryCard[] = [
  {
    id: '1',
    tag: 'Fakta 01',
    icon: '☕',
    title: 'Me & My Skrispi',
    description: 'R² cimit i lawan, tp sambil ngabisin ratusan cup es kopi & puluhan jurnal until ACC sidang akhir!',
    rotation: '-rotate-2',
    bgBadge: 'bg-[#ffe14d]',
  },
  {
    id: '2',
    tag: 'Fakta 02',
    icon: '📊',
    title: 'College Life',
    description: 'Gebang pride, dimsum hau my fav gueh, kopsul 24/7, transum for life, mall 7/7, asking "makan siang apa kita hari ini?" everyday.',
    rotation: 'rotate-2',
    bgBadge: 'bg-[#5ce1b5]',
  },
  {
    id: '3',
    tag: 'Fakta 03',
    icon: '🎓',
    title: 'Sah Jadi Sarjana',
    description: 'Resmi menyandang gelar S.Tr.Stat di Wisuda 134 Institut Teknologi Sepuluh Nopember! Yaeyy',
    rotation: '-rotate-1',
    bgBadge: 'bg-[#ff4f9a] text-white',
  },
];

export const PhotoBooth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full bg-white text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow rounded-2xl p-4 my-2 rotate-[0.6deg]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Camera className="w-5 h-5 text-[#3d5afe]" />
          <h3 className="font-bagel text-lg sm:text-xl text-[#1b1b4b]">
            CORNER KENANGAN VICA
          </h3>
        </div>
        <span className="text-[11px] font-extrabold bg-neutral-100 px-2 py-0.5 rounded-full border border-[var(--line)]">
          🎓 Statistika Bisnis ITS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MEMORIES.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveTab(idx)}
            className={`cursor-pointer p-3.5 rounded-xl border-2 border-[var(--line)] transition-all hover:scale-[1.03] ${item.rotation} ${
              activeTab === idx
                ? 'bg-amber-50 border-3 ring-2 ring-[#3d5afe] brutal-shadow-sm'
                : 'bg-neutral-50 hover:bg-neutral-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-[var(--line)] ${item.bgBadge}`}>
                {item.tag}
              </span>
              <span className="text-xl">{item.icon}</span>
            </div>
            <h4 className="font-bold text-sm text-[#1b1b4b] leading-tight">
              {item.title}
            </h4>
            <p className="text-xs font-semibold text-neutral-600 mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 p-2.5 rounded-xl bg-[#5ce1b5]/30 border border-[var(--line)] text-center text-xs font-bold text-[#1b1b4b] flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#ff4f9a]" />
        <span>Dress Code: Pakaian bebas, rapi, sopan & warna ceria untuk foto bareng! 📸</span>
      </div>
    </div>
  );
};
