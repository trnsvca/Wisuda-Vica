import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Info } from 'lucide-react';

interface EventCardsProps {
  onOpenMapGuide?: () => void;
}

export const EventCards: React.FC<EventCardsProps> = ({ onOpenMapGuide }) => {
  return (
    <div className="w-full flex flex-col gap-3.5 my-2">
      {/* Date Card */}
      <div className="block bg-white text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow rounded-2xl py-3 px-5 -rotate-[1.5deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#ff4f9a]" />
          <small className="block text-[12px] sm:text-[13px] tracking-[2.5px] font-bold text-[#ff4f9a] uppercase">
            HARI / TANGGAL
          </small>
        </div>
        <strong className="block text-xl sm:text-2xl md:text-[26px] leading-tight font-extrabold mt-0.5">
          Minggu, 25 Oktober 2026
        </strong>
      </div>

      {/* Time Card */}
      <div className="block bg-[#5ce1b5] text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow rounded-2xl py-3 px-5 rotate-[1.2deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1b1b4b]" />
          <small className="block text-[12px] sm:text-[13px] tracking-[2.5px] font-bold uppercase text-[#1b1b4b]">
            JAM
          </small>
        </div>
        <strong className="block text-xl sm:text-2xl md:text-[26px] leading-tight font-extrabold mt-0.5">
          13.00 – 14.30 WIB
        </strong>
      </div>

      {/* Location Card */}
      <div className="block bg-white text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow rounded-2xl py-3 px-5 -rotate-[0.8deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-200 group">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#3d5afe]" />
          <small className="block text-[12px] sm:text-[13px] tracking-[2.5px] font-bold text-[#3d5afe] uppercase">
            LOKASI
          </small>
        </div>
        <strong className="block text-xl sm:text-2xl md:text-[26px] leading-tight font-extrabold mt-0.5">
          Departemen Statistika Bisnis ITS
        </strong>
        <p className="text-xs text-neutral-600 font-semibold mt-0.5">
          Kampus ITS Sukolilo, Surabaya, Jawa Timur
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t-2 border-dashed border-neutral-300">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Departemen+Statistika+Bisnis+ITS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#3d5afe] hover:underline"
          >
            Buka di Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {onOpenMapGuide && (
            <button
              type="button"
              onClick={onOpenMapGuide}
              className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded-md border border-[var(--line)]"
            >
              <Info className="w-3 h-3 text-[#ff4f9a]" />
              Panduan Akses & Parkir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
