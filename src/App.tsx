/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Share2,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Sparkles,
  Heart,
  PartyPopper,
  MessageSquareHeart,
  Smile,
} from 'lucide-react';
import { GraduationCap } from './components/GraduationCap.tsx';
import { Countdown } from './components/Countdown.tsx';
import { EventCards } from './components/EventCards.tsx';
import { RSVPModal } from './components/RSVPModal.tsx';
import { WishesWall } from './components/WishesWall.tsx';
import { VirtualGifts } from './components/VirtualGifts.tsx';
import { PhotoBooth } from './components/PhotoBooth.tsx';
import { ShareModal } from './components/ShareModal.tsx';
import { LocationModal } from './components/LocationModal.tsx';
import { playPopSound, playCelebrationSound, playPartyHornSound } from './utils/audio.ts';
import { Wish, VirtualGift } from './types.ts';

const INITIAL_WISHES: Wish[] = [
  {
    id: 'w1',
    name: 'Warga Gebang',
    attendance: 'dateng',
    message: 'PROUD OF YOU VICA!! Dari maba ngerjain praktikum bareng sampe wisuda bareng. Wajib foto pake selempang yaa! ✨🥳',
    emoji: '🥳',
    timestamp: 'Hari ini',
    likes: 1,
  },
  {
    id: 'w2',
    name: 'Me to Me',
    attendance: 'dateng',
    message: `Me to myself, heyyy congrats! dah selesaiin 4th kuliahnya.. Kalo udh selesai gini rasanya kek cepet bgt ya, padahal kemarin ngejalaninnya sambil nangis" wkwk. I am so proud of you, keren bgt udh bisa melewati college life inii.. til finally got that first degree before first college boyfiee HALAH HALAH ALAY. Dah lah gitu aja, semoga ilmunya berkah dan segera melangkah ke karir impian!`,
    emoji: '💐',
    timestamp: 'Hari ini',
    likes: 1,
  }
];

const INITIAL_GIFTS: VirtualGift[] = [
  { id: 'g1', name: 'Buket Bunga', icon: '💐', count: 10 },
  { id: 'g2', name: 'Boneka Toga', icon: '🧸', count: 10 },
  { id: 'g3', name: 'Es Kopi', icon: '☕', count: 10 },
  { id: 'g4', name: 'Medali', icon: '🏅', count: 10 },
  { id: 'g5', name: 'Boba Milktea', icon: '🧋', count: 10 },
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rsvpButtonText, setRsvpButtonText] = useState('Aku pasti dateng!');
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // User custom wishes (submitted via form) stored separately from INITIAL_WISHES
  const [customWishes, setCustomWishes] = useState<Wish[]>(() => {
    try {
      localStorage.removeItem('vica_wisuda_wishes');
      const saved = localStorage.getItem('vica_wisuda_custom_wishes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track likes for wishes
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('vica_wisuda_likes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track additional virtual gifts sent by users
  const [extraGifts, setExtraGifts] = useState<Record<string, number>>(() => {
    try {
      localStorage.removeItem('vica_wisuda_gifts');
      const saved = localStorage.getItem('vica_wisuda_gifts_extra');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Combined wishes: custom user wishes on top, followed by current INITIAL_WISHES
  const wishes: Wish[] = [
    ...customWishes.map((w) => ({
      ...w,
      likes: (w.likes || 1) + (likesMap[w.id] || 0),
    })),
    ...INITIAL_WISHES.map((w) => ({
      ...w,
      likes: (w.likes || 1) + (likesMap[w.id] || 0),
    })),
  ];

  // Combined gifts with base counts from INITIAL_GIFTS plus user interaction
  const gifts: VirtualGift[] = INITIAL_GIFTS.map((g) => ({
    ...g,
    count: g.count + (extraGifts[g.id] || 0),
  }));

  useEffect(() => {
    document.title = "Vica's Grad Inv";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Confetti blaster matching the exact theme colors
  const fireConfetti = (originX = 0.5, originY = 0.6) => {
    const colors = ['#ff4f9a', '#3d5afe', '#5ce1b5', '#ffffff', '#ffe14d'];

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: originX, y: originY },
      colors,
      disableForReducedMotion: true,
    });

    // Secondary delayed burst for fireworks effect
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: Math.max(0.1, originX - 0.2), y: originY },
        colors,
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: Math.min(0.9, originX + 0.2), y: originY },
        colors,
      });
    }, 150);
  };

  const handleRSVPClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    setRsvpButtonText('Yeay, ditunggu ya!');
    fireConfetti(x, y);

    if (soundEnabled) {
      playPartyHornSound();
    }

    // Open RSVP modal after brief moment so user can also leave a message
    setTimeout(() => {
      setIsRSVPOpen(true);
    }, 700);
  };

  const handleCapToss = () => {
    fireConfetti(0.5, 0.25);
    if (soundEnabled) {
      playCelebrationSound();
    }
  };

  const handleSendGift = (giftId: string) => {
    setExtraGifts((prev) => {
      const updated = { ...prev, [giftId]: (prev[giftId] || 0) + 1 };
      try {
        localStorage.setItem('vica_wisuda_gifts_extra', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    fireConfetti(0.5, 0.7);
    if (soundEnabled) {
      playPopSound();
    }
  };

  const handleAddWish = (newWishData: Omit<Wish, 'id' | 'timestamp' | 'likes'>) => {
    const newWish: Wish = {
      ...newWishData,
      id: 'w_' + Date.now(),
      timestamp: 'Baru saja',
      likes: 1,
    };
    setCustomWishes((prev) => {
      const updated = [newWish, ...prev];
      try {
        localStorage.setItem('vica_wisuda_custom_wishes', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    fireConfetti(0.5, 0.5);
    if (soundEnabled) {
      playCelebrationSound();
    }
  };

  const handleLikeWish = (wishId: string) => {
    setLikesMap((prev) => {
      const updated = { ...prev, [wishId]: (prev[wishId] || 0) + 1 };
      try {
        localStorage.setItem('vica_wisuda_likes', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
    if (soundEnabled) {
      playPopSound();
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    if (soundEnabled) playPopSound();
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen pattern-dots overflow-x-hidden selection:bg-[#ff4f9a] selection:text-white">
      {/* Decorative Background Blobs */}
      <div
        className="absolute -top-[70px] -right-[70px] w-[220px] h-[220px] rounded-full bg-[#ff4f9a] pointer-events-none opacity-80 blur-[1px] z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[80px] -left-[60px] w-[240px] h-[240px] rounded-full bg-[#5ce1b5] pointer-events-none opacity-80 blur-[1px] z-0"
        aria-hidden="true"
      />

      {/* Top Floating Control Bar */}
      <header className="relative z-20 max-w-[560px] mx-auto px-4 pt-4 pb-1 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#1b1b4b] border-2 border-[var(--line)] brutal-shadow-sm text-xs font-black">
          <span>🎓</span>
          <span>WISUDA 134 ITS</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-full bg-white text-[#1b1b4b] border-2 border-[var(--line)] brutal-shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#ff4f9a]" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white text-[#1b1b4b] border-2 border-[var(--line)] brutal-shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={theme === 'light' ? 'Mode Malam' : 'Mode Terang'}
            aria-label="Toggle Tema"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#3d5afe]" />
            ) : (
              <Sun className="w-4 h-4 text-[#ffe14d]" />
            )}
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            className="p-2 rounded-full bg-white text-[#1b1b4b] border-2 border-[var(--line)] brutal-shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Bagikan Undangan"
            aria-label="Bagikan Undangan"
          >
            <Share2 className="w-4 h-4 text-[#1b1b4b]" />
          </button>
        </div>
      </header>

      {/* Main Wrap */}
      {/* Main Wrap */}
      <main className="relative z-10 max-w-[560px] mx-auto px-3.5 sm:px-4 pb-16 pt-1 sm:pt-2 flex flex-col items-center gap-4 sm:gap-5 w-full">
        {/* Floating Cap and Pill Badge */}
        <div className="relative w-full flex items-center justify-center pt-1 sm:pt-2">
          <div className="absolute left-0 sm:left-1 -top-1">
            <GraduationCap onToss={handleCapToss} />
          </div>

          <div className="bg-[var(--line)] text-white font-extrabold text-[13px] sm:text-[15px] md:text-[17px] tracking-[1.5px] sm:tracking-[2px] py-1 sm:py-1.5 px-4 sm:px-6 rounded-full -rotate-4 brutal-shadow-sm border-2 border-white select-none">
            PSST, KAMU DIUNDANG!
          </div>
        </div>

        {/* Hero Section */}
        <section
          className="relative w-full text-center mt-1 select-none overflow-visible"
          aria-label="Undangan Kelulusan"
        >
          <h1 className="font-bagel text-white text-[clamp(62px,19vw,128px)] leading-[0.9] -rotate-3 stroke-title tracking-tight m-0">
            VICA
          </h1>
          <div
            className="font-bagel text-[#ff4f9a] text-[clamp(62px,19vw,128px)] leading-[0.9] rotate-2 stroke-title tracking-tight m-0"
            role="presentation"
          >
            LULUS!
          </div>

          {/* Sticker YEAY! */}
          <div className="absolute left-0 sm:left-1 top-[30%] sm:top-[34%] bg-white text-[#ff4f9a] font-bagel text-lg sm:text-2xl md:text-[26px] leading-[1.3] px-2.5 sm:px-3.5 py-0.5 rounded-xl sm:rounded-2xl rounded-bl-xs border-2 sm:border-3 border-[var(--line)] brutal-shadow -rotate-12 transition-transform hover:scale-110 cursor-pointer">
            YEAY!
          </div>

          {/* Sticker WAJIB DATENG! */}
          <div className="absolute right-0 top-[18%] sm:top-[20%] w-[68px] sm:w-[88px] md:w-[104px] aspect-square rounded-full bg-[#3d5afe] text-white flex items-center justify-center text-center font-extrabold text-[11px] sm:text-sm md:text-[18px] leading-tight rotate-14 border-2 sm:border-3 border-[var(--line)] brutal-shadow transition-transform hover:scale-110 cursor-pointer">
            WAJIB
            <br />
            DATENG!
          </div>
        </section>

        {/* Tag Wisuda 134 ITS */}
        <div className="bg-[#3d5afe] text-white border-2 sm:border-3 border-[var(--line)] brutal-shadow rounded-2xl py-1 px-5 sm:px-6 text-lg sm:text-2xl font-extrabold rotate-2 hover:rotate-0 transition-transform cursor-default">
          Wisuda 134 ITS
        </div>

        {/* Lead Greeting */}
        <p className="text-center text-base sm:text-xl font-bold leading-snug my-0.5 text-[var(--ink)]">
          Yuk rame-rame rayain hari spesial ini!
        </p>

        {/* Countdown Timer */}
        <Countdown />

        {/* Event Cards: Hari/Tanggal, Jam, Lokasi */}
        <EventCards onOpenMapGuide={() => setIsLocationOpen(true)} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center w-full max-w-sm sm:max-w-none mt-1">
          {/* Main RSVP Confetti Button */}
          <button
            type="button"
            onClick={handleRSVPClick}
            className="font-baloo font-bold text-base sm:text-xl min-h-[48px] sm:min-h-[50px] px-5 sm:px-6 py-2 rounded-full border-3 border-[var(--line)] brutal-shadow brutal-shadow-active bg-[#ff4f9a] text-white cursor-pointer inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <PartyPopper className="w-5 h-5" />
            <span>{rsvpButtonText}</span>
          </button>

          {/* Google Calendar Link */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Wisuda 134 ITS - Vica')}&dates=20261025T130000/20261025T143000&ctz=Asia/Jakarta&location=${encodeURIComponent('Departemen Statistika Bisnis ITS')}&details=${encodeURIComponent('Acara Wisuda 134 ITS - Trian Servica S.Tr.Stat. Ayo rayain bareng!')}`}
            className="font-baloo font-bold text-base sm:text-xl min-h-[48px] sm:min-h-[50px] px-5 sm:px-6 py-2 rounded-full border-3 border-[var(--line)] brutal-shadow brutal-shadow-active bg-white text-[#1b1b4b] cursor-pointer inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <Calendar className="w-5 h-5 text-[#3d5afe]" />
            <span>Simpan ke kalender</span>
          </a>
        </div>

        {/* Promo Badge */}
        <div className="bg-[#ff4f9a] text-white border-2 sm:border-3 border-[var(--line)] brutal-shadow rounded-full py-1 sm:py-1.5 px-4 sm:px-6 font-extrabold text-xs sm:text-base -rotate-5 transition-transform hover:rotate-0 cursor-pointer text-center">
          Gratis foto sama seleb! (Aku)
        </div>

        {/* Virtual Gifts Bar */}
        <VirtualGifts gifts={gifts} onSendGift={handleSendGift} />

        {/* Memories & Facts Corner */}
        <PhotoBooth />

        {/* Guestbook & Wishes Wall */}
        <WishesWall
          wishes={wishes}
          onLikeWish={handleLikeWish}
          onOpenRSVP={() => setIsRSVPOpen(true)}
        />

        {/* Foot Warning Joke */}
        <div className="w-full text-center mt-3">
          <p className="font-extrabold text-lg sm:text-xl text-[var(--ink)] leading-snug -rotate-1">
            Awas ya kalau nggak dateng,
            <br />
            kita unfriend 1 hari 😤
          </p>

          <div className="mt-4 pt-3 border-t-2 border-dashed border-[var(--ink)]/25 text-xs font-bold text-[var(--ink)]/80 transition-colors">
            Coded with love, powered by dreams & finally, a degree! - Trian Servica, S.Tr.Stat ✨
          </div>
        </div>
      </main>

      {/* Interactive Modals */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => {
          setIsRSVPOpen(false);
          setRsvpButtonText('Aku pasti dateng!');
        }}
        onSubmitWish={handleAddWish}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  );
}
