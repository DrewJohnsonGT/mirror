const getDirectionString = (degrees: number) => {
  if (degrees < 11.25) return 'N';
  if (degrees < 33.75) return 'NNE';
  if (degrees < 56.25) return 'NE';
  if (degrees < 78.75) return 'ENE';
  if (degrees < 101.25) return 'E';
  if (degrees < 123.75) return 'ESE';
  if (degrees < 146.25) return 'SE';
  if (degrees < 168.75) return 'SSE';
  if (degrees < 191.25) return 'S';
  if (degrees < 213.75) return 'SSW';
  if (degrees < 236.25) return 'SW';
  if (degrees < 258.75) return 'WSW';
  if (degrees < 281.25) return 'W';
  if (degrees < 303.75) return 'WNW';
  if (degrees < 326.25) return 'NW';
  if (degrees < 348.75) return 'NNW';
  return 'N';
};
export const getWindString = (
  windSpeed: number,
  windDirectionDegrees: number,
) => {
  const directionString = getDirectionString(windDirectionDegrees);
  return `${Math.round(windSpeed)} MPH ${directionString}`;
};
