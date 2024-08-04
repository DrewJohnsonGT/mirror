export enum MoonPhase {
  NEW_MOON = 'New Moon',
  WAXING_CRESCENT = 'Waxing Crescent',
  WAXING_GIBBOUS = 'Waxing Gibbous',
  FULL_MOON = 'Full Moon',
  WANING_GIBBOUS = 'Waning Gibbous',
  WANING_CRESCENT = 'Waning Crescent',
}

export const getMoonImage = (phase: MoonPhase, ill: number) => {
  const moonImageName = getMoonImageName(phase, ill);
  return `/images/moon/${moonImageName}.png`;
};

const getMoonImageName = (phase: MoonPhase, ill: number) => {
  if (phase === MoonPhase.WANING_CRESCENT) {
    if ([0, 1].includes(ill)) return 'wanecres1';
    if ([2].includes(ill)) return 'wanecres2';
    if ([3, 4].includes(ill)) return 'wanecres3';
    if ([5].includes(ill)) return 'wanecres5';
    if ([6, 7].includes(ill)) return 'wanecres6';
    if ([8, 9].includes(ill)) return 'wanecres8';
    if ([10, 11].includes(ill)) return 'wanecres10';
    if ([12, 13, 14].includes(ill)) return 'wanecres12';
    if ([15, 16].includes(ill)) return 'wanecres15';
    if ([17, 18].includes(ill)) return 'wanecres17';
    if ([19, 20, 21, 22, 23].includes(ill)) return 'wanecres19';
    if ([24].includes(ill)) return 'wanecres24';
    if ([25, 26, 27].includes(ill)) return 'wanecres25';
    if ([28, 29, 30, 31, 32, 33].includes(ill)) return 'wanecres28';
    if ([34, 35, 36, 37].includes(ill)) return 'wanecres34';
    if ([38, 39, 40, 41, 42, 43].includes(ill)) return 'wanecres38';
    if ([44].includes(ill)) return 'wanecres44';
    if ([45, 46, 47, 48].includes(ill)) return 'wanecres45';
    if ([49, 50, 51, 52, 53].includes(ill)) return 'wanecres49';
  }
  if (phase === MoonPhase.WANING_GIBBOUS) {
    if ([54, 55].includes(ill)) return 'wanegib54';
    if ([56, 57, 58, 59].includes(ill)) return 'wanegib56';
    if ([60, 61, 62, 63, 64, 65, 66].includes(ill)) return 'wanegib60';
    if ([67, 68, 69, 70].includes(ill)) return 'wanegib67';
    if ([71, 72, 73, 74].includes(ill)) return 'wanegib71';
    if ([75, 76].includes(ill)) return 'wanegib75';
    if ([77, 78, 79, 80].includes(ill)) return 'wanegib77';
    if ([81, 82, 83, 84].includes(ill)) return 'wanegib81';
    if ([85].includes(ill)) return 'wanegib85';
    if ([86, 87, 88].includes(ill)) return 'wanegib86';
    if ([89, 90, 91].includes(ill)) return 'wanegib89';
    if ([92].includes(ill)) return 'wanegib92';
    if ([93, 94, 95].includes(ill)) return 'wanegib93';
    if ([96, 97].includes(ill)) return 'wanegib96';
    if ([98, 99, 100].includes(ill)) return 'wanegib98';
  }
  if (phase === MoonPhase.WAXING_CRESCENT) {
    if ([0, 1].includes(ill)) return 'waxcres1';
    if ([2, 3, 4].includes(ill)) return 'waxcres2';
    if ([5].includes(ill)) return 'waxcres5';
    if ([6, 7, 8, 9].includes(ill)) return 'waxcres6';
    if ([10].includes(ill)) return 'waxcres10';
    if ([11, 12, 13, 14, 15].includes(ill)) return 'waxcres11';
    if ([16].includes(ill)) return 'waxcres16';
    if ([17].includes(ill)) return 'waxcres17';
    if ([18, 19, 20, 21, 22].includes(ill)) return 'waxcres18';
    if ([23].includes(ill)) return 'waxcres23';
    if ([24].includes(ill)) return 'waxcres24';
    if ([26, 27, 28, 29, 30, 31].includes(ill)) return 'waxcres26';
    if ([32].includes(ill)) return 'waxcres32';
    if ([33, 34].includes(ill)) return 'waxcres33';
    if ([35, 36, 37, 38, 39, 40].includes(ill)) return 'waxcres35';
    if ([41].includes(ill)) return 'waxcres41';
    if ([42, 43, 44, 45].includes(ill)) return 'waxcres42';
    if ([46, 47, 48, 49].includes(ill)) return 'waxcres46';
    if ([50, 51].includes(ill)) return 'waxcres50';
  }
  if (phase === MoonPhase.WAXING_GIBBOUS) {
    if ([52, 53, 54, 55].includes(ill)) return 'waxgib52';
    if ([56, 57, 58, 59].includes(ill)) return 'waxgib56';
    if ([60, 61].includes(ill)) return 'waxgib60';
    if ([62, 63, 64, 65, 66].includes(ill)) return 'waxgib62';
    if ([67, 68].includes(ill)) return 'waxgib67';
    if ([69, 70, 71].includes(ill)) return 'waxgib69';
    if ([72, 73, 74, 75, 76].includes(ill)) return 'waxgib72';
    if ([77].includes(ill)) return 'waxgib77';
    if ([78, 79, 80, 81].includes(ill)) return 'waxgib78';
    if ([82, 83, 84, 85].includes(ill)) return 'waxgib82';
    if ([86].includes(ill)) return 'waxgib86';
    if ([87, 88, 89].includes(ill)) return 'waxgib87';
    if ([90, 91, 92].includes(ill)) return 'waxgib90';
    if ([93, 94, 95].includes(ill)) return 'waxgib93';
    if ([96, 97].includes(ill)) return 'waxgib96';
    if ([98].includes(ill)) return 'waxgib98';
    if ([99, 100].includes(ill)) return 'waxgib99';
  }
  if (phase === MoonPhase.FULL_MOON) {
    return 'fm';
  }
  return 'nm';
};
