import styles from "./Moon.module.css";
import { useMoonPhase } from "hooks/useMoonPhase";

export const Moon = () => {
  const { moonImage, nextFullMoon } = useMoonPhase();
  return (
    <div className={styles.root}>
      <div className={styles.moonContainer}>
        <img className={styles.moon} src={moonImage} alt={moonImage} />
        <div className={styles.nextFullMoon}>
          Full Moon {nextFullMoon?.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
