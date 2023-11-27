import { useDaysUntil } from 'hooks/useDaysUntil';
import styles from './DaysUntil.module.css';

export const DaysUntil = () => {
  const daysUntil = useDaysUntil(new Date('12/25/2023'));
  return (
    <div className={styles.root}>
      <div className={styles.daysUntil}>{daysUntil}</div>
      <div className={styles.daysUntilText}>days until</div>
      <div className={styles.daysUntilText}>Christmas</div>
    </div>
  );
};
