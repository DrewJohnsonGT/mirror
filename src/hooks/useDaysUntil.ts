import { useEffect, useState } from 'react';

export const useDaysUntil = (date: Date) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const daysUntilInterval = setInterval(() => {
      const now = new Date();
      const diff = Math.ceil(
        (date.getTime() - now.getTime()) / 1000 / 60 / 60 / 24,
      );
      setDays(diff);
    }, 1000);

    return () => {
      clearInterval(daysUntilInterval);
    };
  }, [date]);

  return days;
};
