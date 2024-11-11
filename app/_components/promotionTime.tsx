"use client";

import React, { useEffect, useState } from "react";

export const getRemainingTime = (): string => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setHours(24, 0, 0, 0);

  const timeDiff = nextDay.getTime() - now.getTime();
  const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const PromotionTime: React.FC = () => {
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#331D1D] flex justify-center">
      <p className="text-white font-semibold">
        Promoção de 25% acaba em {remainingTime}
      </p>
    </div>
  );
};

export default PromotionTime;
