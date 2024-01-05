import { useDaysUntil } from 'hooks/useDaysUntil';
import styles from './DaysUntil.module.css';

const CURRENT_YEAR = new Date().getFullYear();

export const DaysUntil = () => {
  const daysUntilChristmas = useDaysUntil(new Date(`12/25/${CURRENT_YEAR}`));
  return (
    <div className={styles.root}>
      <div className={styles.daysUntil}>{daysUntilChristmas}</div>
      <div className={styles.daysUntilText}>days until</div>
      <div className={styles.daysUntilText}>Christmas</div>
    </div>
  );
};
