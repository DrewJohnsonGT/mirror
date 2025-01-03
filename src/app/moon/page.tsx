'use client';

import { useMoonPhase } from 'hooks/useMoonPhase';
import { getMoonImage, MoonPhase } from 'util/getMoonImage';

const illuminationExamples: Record<MoonPhase, number[]> = {
  [MoonPhase.WANING_GIBBOUS]: [99, 95, 90, 83, 75, 66],
  [MoonPhase.FULL_MOON]: [100],
  [MoonPhase.WANING_CRESCENT]: [50, 33, 16, 13, 10, 8, 5, 1],
  [MoonPhase.NEW_MOON]: [0],
  [MoonPhase.WAXING_CRESCENT]: [16, 33, 50, 54, 66],
  [MoonPhase.WAXING_GIBBOUS]: [66, 75, 83, 90, 95, 99],
};
const MoonPhasesDisplay = () => {
  const { moonImage, moonPhase, nextFullMoon, roundedIlluminationPercent } =
    useMoonPhase();
  return (
    <div>
      <div>
        <h2>{moonPhase}</h2>
        <img src={moonImage} alt={moonImage} />
        <p>Next full moon: {nextFullMoon?.toLocaleDateString()}</p>
        <p>Illumination: {roundedIlluminationPercent}%</p>
      </div>
      {Object.entries(MoonPhase).map(([_, phaseValue]) => {
        const phase = phaseValue as MoonPhase;
        const illumination = illuminationExamples[phase];
        return (
          <div key={phase}>
            <h3>{phase}</h3>
            <div>
              {illumination.map((illuminationValue) => {
                const moonImage = getMoonImage(phase, illuminationValue);
                return (
                  <div key={illuminationValue}>
                    <img src={moonImage} alt={moonImage} />
                    <span>{illuminationValue}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default MoonPhasesDisplay;
