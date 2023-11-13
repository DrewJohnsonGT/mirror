import { useEffect, useState } from 'react';

const ONE_SECOND_IN_MS = 1000;

const formatSeconds = (seconds: number) =>
  seconds.toString().length === 1 ? `0${seconds}` : seconds;

export const useDateTime = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimestamp(Date.now());
    }, ONE_SECOND_IN_MS);
    return () => {
      clearInterval(timeInterval);
    };
  });
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString([], {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  });

  const timeString = date
    .toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    .slice(0, -3);
  const abbreviation = date.getHours() >= 12 ? 'PM' : 'AM';
  const seconds = formatSeconds(date.getSeconds());

  return { abbreviation, dateString, seconds, timeString };
};
