import styles from './Snowflakes.module.css';

const SNOWFLAKE_COUNT = 100;
const SNOWFLAKE_CHARACTER_LIST = ['❅', '❆', '❄'];

export const Snowflakes = () => (
  <div className={styles.snowflakes} aria-hidden="true">
    {Array.from({ length: SNOWFLAKE_COUNT }).map((_, i) => (
      <div
        key={i}
        className={styles.snowflakeFallAndShake}
        style={{
          animationDelay: `${Math.random() * 10}s, ${Math.random()}s`,
          animationDuration: `${Math.random() * 20 + 10}s, ${
            Math.random() * 20 + 4
          }s`,
          opacity: `${Math.random() * 0.75 + 0.25}`,
          scale: `${Math.random() * 2.5 + 0.5}`,
          top: `${Math.random() * 100}%`,
        }}>
        <div
          className={styles.snowflakeSpin}
          style={{
            animationDelay: '0',
            animationDuration: `${Math.random() * 3 + 5}s`,
          }}>
          {
            SNOWFLAKE_CHARACTER_LIST[
              Math.floor(Math.random() * SNOWFLAKE_CHARACTER_LIST.length)
            ]
          }
        </div>
      </div>
    ))}
  </div>
);
