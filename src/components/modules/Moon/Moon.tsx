import { useMoonPhase } from 'hooks/useMoonPhase';
import styles from './Moon.module.css';

export const Moon = () => {
  const { moonImage, moonPhase, nextFullMoon, roundedIlluminationPercent } =
    useMoonPhase();
  return (
    <div className={styles.root}>
      <div className={styles.moonContainer}>
        <img className={styles.moon} src={moonImage} alt={moonImage} />
        <div className={styles.moonPhase}>
          {moonPhase} - {roundedIlluminationPercent}%
        </div>
        <div className={styles.nextFullMoon}>
          Full Moon {nextFullMoon?.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
