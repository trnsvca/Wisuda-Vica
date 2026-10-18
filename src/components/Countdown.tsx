import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC = () => {
  // Target: Minggu, 25 Oktober 2026 13:00 WIB (UTC+7)
  const targetTime = new Date('2026-10-25T13:00:00+07:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const diff = targetTime - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    const totalSeconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: Math.floor(totalSeconds % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  if (timeLeft.isPast) {
    return (
      <div className="w-full bg-[#5ce1b5] text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow rounded-2xl p-4 text-center">
        <span className="font-bagel text-3xl md:text-4xl">🎉 HARI H WISUDA TELAH TIBA! 🎉</span>
        <p className="font-bold text-sm mt-1">Sampai ketemu di Departemen Statistika Bisnis ITS!</p>
      </div>
    );
  }

  const items = [
    { label: 'hari', value: timeLeft.days },
    { label: 'jam', value: timeLeft.hours },
    { label: 'menit', value: timeLeft.minutes },
    { label: 'detik', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full" aria-label="Hitung Mundur Wisuda">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="bg-[#5ce1b5] text-[#1b1b4b] border-[3px] border-[var(--line)] brutal-shadow-sm rounded-xl py-2 px-1 text-center transition-transform hover:-translate-y-0.5"
            style={{
              transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`,
            }}
          >
            <b className="block text-2xl sm:text-3xl md:text-4xl font-bagel font-normal leading-none tracking-tight">
              {String(item.value).padStart(2, '0')}
            </b>
            <small className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-0.5">
              {item.label}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
