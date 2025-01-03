import { useEffect, useState } from 'react';
import { MOON_PHASE_REFRESH_INTERVAL } from 'util/constants';
import { getMoonImage, MoonPhase } from 'util/getMoonImage';

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const LUNAR_CYCLE_DAYS = 29.53058770576;
const FULL_MOON_YEAR_2000_TS = 947182440000;
const FULL_MOON = 14.8;

const getMoonPhaseString = (cycleDays: number): MoonPhase => {
  if (cycleDays < 1) return MoonPhase.NEW_MOON;
  if (cycleDays < 7.4) return MoonPhase.WAXING_CRESCENT;
  if (cycleDays < 14.8) return MoonPhase.WAXING_GIBBOUS;
  if (cycleDays < 22.1) return MoonPhase.FULL_MOON;
  if (cycleDays < 29.5) return MoonPhase.WANING_GIBBOUS;
  return MoonPhase.WANING_CRESCENT;
};

const getMoonPhase = (): {
  currentCycleDays: number;
  illuminationPercent: number;
} => {
  const lunarSeconds = LUNAR_CYCLE_DAYS * 60 * 60 * 24 * 1000;
  const currentTimestamp = Date.now();
  const totalSeconds = currentTimestamp - FULL_MOON_YEAR_2000_TS;
  const secondsInCurrentCycle = totalSeconds % lunarSeconds;
  const phaseFraction = secondsInCurrentCycle / lunarSeconds;
  const currentCycleDays = phaseFraction * LUNAR_CYCLE_DAYS;
  // Adjusting illumination calculation
  const illuminationPercent = (1 - Math.cos(2 * Math.PI * phaseFraction)) / 2;
  return {
    currentCycleDays,
    illuminationPercent,
  };
};

const getNextFullMoon = (currentCycleDays: number) => {
  if (currentCycleDays <= FULL_MOON) {
    return new Date(Date.now() + (FULL_MOON - currentCycleDays) * MS_IN_DAY);
  }
  return new Date(
    Date.now() +
      (LUNAR_CYCLE_DAYS - currentCycleDays) * MS_IN_DAY +
      FULL_MOON * MS_IN_DAY,
  );
};
export const useMoonPhase = () => {
  const [moonImage, setMoonImage] = useState('');
  const [nextFullMoon, setNextFullMoon] = useState<Date>();
  const [moonPhase, setMoonPhase] = useState<MoonPhase>(MoonPhase.NEW_MOON);
  const [roundedIlluminationPercent, setRoundedIlluminationPercent] =
    useState<number>(0);

  const updateMoonImage = () => {
    const { currentCycleDays, illuminationPercent } = getMoonPhase();
    const moonPhaseString = getMoonPhaseString(currentCycleDays);
    const roundedIlluminationPercent = Math.round(illuminationPercent * 100);
    setRoundedIlluminationPercent(roundedIlluminationPercent);
    setMoonImage(getMoonImage(moonPhaseString, roundedIlluminationPercent));
    setNextFullMoon(getNextFullMoon(currentCycleDays));
    setMoonPhase(moonPhaseString);
  };

  useEffect(() => {
    updateMoonImage();
    const moonPhaseInterval = setInterval(() => {
      updateMoonImage();
    }, MOON_PHASE_REFRESH_INTERVAL);
    return () => {
      clearInterval(moonPhaseInterval);
    };
  }, []);
  return { moonImage, moonPhase, nextFullMoon, roundedIlluminationPercent };
};
