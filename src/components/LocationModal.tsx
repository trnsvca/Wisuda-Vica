import React, { useState } from 'react';
import { X, MapPin, Navigation, Car, Bus, Check, Copy } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const address = 'Departemen Statistika Bisnis, Fakultas Vokasi, Kampus ITS Sukolilo, Surabaya, Jawa Timur 60111';

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-[#1b1b4b] border-[3.5px] border-[var(--line)] brutal-shadow-lg rounded-3xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-[var(--line)] bg-[#ffe14d] hover:bg-[#ff4f9a] hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-6 h-6 text-[#3d5afe]" />
          <h3 className="font-bagel text-2xl text-[#1b1b4b]">
            LOKASI & PANDUAN AKSES
          </h3>
        </div>
        <p className="text-sm font-semibold text-neutral-600 mb-4">
          Petunjuk menuju Departemen Statistika Bisnis ITS
        </p>

        {/* Address Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-100 border-2 border-[var(--line)] mb-4">
          <p className="font-bold text-sm leading-snug">{address}</p>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-300">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white px-2.5 py-1 rounded-lg border border-[var(--line)] hover:bg-[#ffe14d] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Tersalin!' : 'Salin Alamat'}
            </button>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Departemen+Statistika+Bisnis+ITS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#3d5afe] hover:underline"
            >
              <Navigation className="w-3.5 h-3.5" />
              Buka Google Maps
            </a>
          </div>
        </div>

        {/* Access Tips */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#5ce1b5]/20 border border-[var(--line)]">
            <Car className="w-5 h-5 text-[#1b1b4b] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-xs uppercase">Kendaraan Pribadi & Parkir</h5>
              <p className="text-xs font-medium text-neutral-700 mt-0.5">
                Masuk lewat Gerbang Graha (Sebelah utara bundaran ITS) atau Pintu Barat. Area parkir luas tersedia di sekitar Gedung Graha / Fakultas Vokasi / Statistika Bisnis.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#ffe14d]/30 border border-[var(--line)]">
            <Bus className="w-5 h-5 text-[#1b1b4b] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-extrabold text-xs uppercase">Ojek Online & Transportasi Umum</h5>
              <p className="text-xs font-medium text-neutral-700 mt-0.5">
                Ketik drop point: <strong>Departemen Statistika Bisnis ITS Sukolilo</strong>. Suroboyo Bus atau feeder WiraWiri juga berhenti dekat halte utama kampus ITS.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-[#3d5afe] text-white font-extrabold rounded-xl border-2 border-[var(--line)] brutal-shadow-sm hover:scale-[1.01] transition-transform text-sm"
        >
          Siap, Paham!
        </button>
      </div>
    </div>
  );
};
