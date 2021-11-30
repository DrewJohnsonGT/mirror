import { useDateTime } from 'hooks/useDateTime';
import styles from './DateTime.module.css';

export const DateTime = () => {
    const { dateString, timeString, seconds, abbreviation } = useDateTime();
    return (
        <div>
            <div className={styles.date}>{dateString}</div>
            <div className={styles.time}>
                <div className={styles.timeString}>{timeString}</div>
                <div>
                    <div className={styles.seconds}>{seconds}</div>
                    <div className={styles.abbreviation}>{abbreviation}</div>
                </div>
            </div>
        </div>
    );
};
