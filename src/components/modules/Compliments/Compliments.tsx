import { useCompliments } from 'hooks/useCompliments';
import styles from './Compliments.module.css';

export const Compliments = () => {
  const { compliment } = useCompliments();
  return <div className={styles.root}>{compliment}</div>;
};
