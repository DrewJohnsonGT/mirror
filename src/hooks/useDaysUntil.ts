import { useEffect, useState } from 'react';
import { DAYS_UNTIL_REFRESH_RATE } from 'util/constants';

export const useDaysUntil = (date: Date) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const daysUntilInterval = setInterval(() => {
      const now = new Date();
      const diff = Math.ceil(
        (date.getTime() - now.getTime()) / 1000 / 60 / 60 / 24,
      );
      setDays(diff);
    }, DAYS_UNTIL_REFRESH_RATE);

    return () => {
      clearInterval(daysUntilInterval);
    };
  }, [date]);

  return days;
};
