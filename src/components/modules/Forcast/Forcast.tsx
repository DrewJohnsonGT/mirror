import { useWeather } from 'hooks/useWeather';
import styles from './Forcast.module.css';

export const Forcast = () => {
  const { forcast } = useWeather();
  return (
    <div className={styles.root}>
      {forcast?.map(({ high, iconLink, low, precip, weekday }) => (
        <div className={styles.forcast} key={weekday}>
          <span className={styles.weekday}>{weekday}</span>
          <img className={styles.icon} src={iconLink} alt="" />
          <div className={styles.temps}>
            <span className={styles.high}>{high}°</span>
            <span className={styles.low}>{low}°</span>
          </div>
          <div className={styles.precip}>{precip ? `${precip}in` : ''}</div>
        </div>
      ))}
    </div>
  );
};
