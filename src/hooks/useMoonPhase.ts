import { useEffect, useState } from 'react';
import { MOON_PHASE_REFRESH_INTERVAL } from 'util/constants';
import { getMoonImage } from 'images/moon/getMoonImage';

interface MoonPhase {
    currentCycleDays: number;
    illuminationPercent: number;
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const LUNAR_CYCLE_DAYS = 29.53058770576;
const FULL_MOON_YEAR_2000_TS = 947182440000;
const FULL_MOON = 14.8;

const getMoonPhaseString = (cycleDays: number) => {
    if (cycleDays < 1) return 'nm';
    if (cycleDays < 8.38264692644) return 'waxcres';
    if (cycleDays < 13.76529385288) return 'waxgib';
    if (cycleDays < 15.76529385288) return 'fm';
    if (cycleDays < 21.14794077932) return 'wanegib';
    if (cycleDays < 28.53058770576) return 'wanecres';
    return 'nm';
};

const getMoonPhase = (): MoonPhase => {
    // seconds in lunar cycle
    const lunarSeconds = LUNAR_CYCLE_DAYS * 60 * 60 * 24 * 1000;
    const currentTimestamp = Date.now();
    // time between current time and 2000 full moon
    const totalSeconds = currentTimestamp - FULL_MOON_YEAR_2000_TS;
    const secondsInCurrentCycle = totalSeconds % lunarSeconds;
    const illuminationPercent = secondsInCurrentCycle / lunarSeconds;
    const currentCycleDays = illuminationPercent * LUNAR_CYCLE_DAYS;
    return { currentCycleDays, illuminationPercent };
};

const getNextFullMoon = (currentCycleDays: number) => {
    if (currentCycleDays <= FULL_MOON) {
        return new Date(
            Date.now() + (FULL_MOON - currentCycleDays) * MS_IN_DAY
        );
    }
    return new Date(
        Date.now() +
            (LUNAR_CYCLE_DAYS - currentCycleDays) * MS_IN_DAY +
            FULL_MOON * MS_IN_DAY
    );
};
export const useMoonPhase = () => {
    const [moonImage, setMoonImage] = useState('');
    const [nextFullMoon, setNextFullMoon] = useState<Date>();

    const updateMoonImage = () => {
        const { currentCycleDays, illuminationPercent } = getMoonPhase();
        const moonPhaseString = getMoonPhaseString(currentCycleDays);
        const roundedIlluminationPercent = Math.round(
            illuminationPercent * 100
        );
        setMoonImage(getMoonImage(moonPhaseString, roundedIlluminationPercent));
        setNextFullMoon(getNextFullMoon(currentCycleDays));
    };

    useEffect(() => {
        updateMoonImage();
        setInterval(() => {
            updateMoonImage();
        }, MOON_PHASE_REFRESH_INTERVAL);
    }, []);
    return { moonImage, nextFullMoon };
};
