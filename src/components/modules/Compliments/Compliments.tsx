import styles from "./Compliments.module.css";
import { useCompliments } from "hooks/useCompliments";

export const Compliments = () => {
  const { compliment } = useCompliments();
  return <div className={styles.root}>{compliment}</div>;
};
