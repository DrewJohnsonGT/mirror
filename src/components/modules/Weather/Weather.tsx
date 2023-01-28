import styles from "./Weather.module.css";
import { useWeather } from "hooks/useWeather";

export const Weather = () => {
  const {
    currentTemperature,
    feelsLikeTemperature,
    description,
    iconLink,
    humidy,
    sunrise,
    sunset,
    todaysHigh,
    todaysLow,
    wind,
  } = useWeather();

  return (
    <div className={styles.root}>
      <div className={styles.overview}>
        <div className={styles.description}>{description}</div>
        <div className={styles.imageDiv}>
          <img className={styles.image} src={iconLink} alt="" />
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.current}>
          {currentTemperature}
          <span className={styles.degree}>°</span>
        </div>
        <div className={styles.today}>
          <div className={styles.high}>{todaysHigh}</div>
          <div className={styles.low}>{todaysLow}</div>
        </div>
      </div>
      <div className={styles.sub}>
        <div className={styles.otherInfo}>
          <div className={styles.row}>
            <div>Feels Like</div>
            <div>{feelsLikeTemperature}°</div>
          </div>
          <div className={styles.row}>
            <div>Humidity</div>
            <div>{humidy}%</div>
          </div>
          <div className={styles.row}>
            <div>Sunrise</div>
            <div>{sunrise}</div>
          </div>
          <div className={styles.row}>
            <div>Sunset</div>
            <div>{sunset}</div>
          </div>
          <div className={styles.row}>
            <div>Wind</div>
            <div>{wind}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
