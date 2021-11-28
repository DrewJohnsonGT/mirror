import { useEffect, useState } from 'react';

const ONE_SECOND_IN_MS = 1000;

const formatSeconds = (seconds: number) =>
    seconds.toString().length === 1 ? `0${seconds}` : seconds;

export const useDateTime = () => {
    const [timestamp, setTimestamp] = useState(Date.now());
    useEffect(() => {
        setInterval(() => setTimestamp(Date.now()), ONE_SECOND_IN_MS);
    });
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const seconds = formatSeconds(date.getSeconds());

    return { dateString, timeString, seconds };
};
