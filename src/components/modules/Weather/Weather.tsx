import { useWeather } from 'hooks/useWeather';
import styles from './Weather.module.css';

export const Weather = () => {
    const {
        currentTemperature,
        feelsLikeTemperature,
        description,
        iconLink,
        humidy,
        sunrise,
        sunset,
    } = useWeather();

    return (
        <div className={styles.root}>
            <div className={styles.main}>
                <img className={styles.image} src={iconLink} alt='' />
                <div>
                    <div className={styles.description}>{description}</div>
                    <div className={styles.current}>
                        {currentTemperature}
                        <span className={styles.degree}>°</span>
                    </div>
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
                </div>
            </div>
        </div>
    );
};
