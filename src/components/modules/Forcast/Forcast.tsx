import { useForcast } from 'hooks/useForcast';
import styles from './Forcast.module.css';

export const Forcast = () => {
    const { forcast } = useForcast();
    return (
        <div className={styles.root}>
            {forcast.map(({ iconLink, high, low, weekday }) => (
                <div className={styles.forcast} key={weekday}>
                    <span className={styles.weekday}>{weekday}</span>
                    <img className={styles.icon} src={iconLink} alt='' />
                    <div className={styles.temps}>
                        <span className={styles.high}>{high}°</span>
                        <span className={styles.low}>{low}°</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
