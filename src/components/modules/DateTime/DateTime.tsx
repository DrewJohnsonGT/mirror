import { useDateTime } from 'hooks/useDateTime';
import styles from './DateTime.module.css';

export const DateTime = () => {
    const { dateString, timeString, seconds } = useDateTime();
    return (
        <div className={styles.root}>
            <div className={styles.date}>{dateString}</div>
            <div className={styles.time}>
                {timeString}
                <span className={styles.seconds}>{seconds}</span>
            </div>
        </div>
    );
};
