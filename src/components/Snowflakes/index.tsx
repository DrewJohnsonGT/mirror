import './Snowflakes.css';

const SNOWFLAKE_COUNT = 50;
const SNOWFLAKE_CHARACTER_LIST = ['❅', '❆', '❄'];

export const Snowflakes = () => (
  <div className="snowflakes" aria-hidden="true">
    {Array.from({ length: SNOWFLAKE_COUNT }).map((_, i) => (
      <div
        key={i}
        className="snowflakeFallAndShake"
        style={{
          animationDelay: `${Math.random() * 20}s, ${Math.random() * 5 + 5}s`,
          animationDuration: `${Math.random() * 60 + 20}s, ${
            Math.random() * 40 + 8
          }s`,
          opacity: `${Math.random() * 0.75 + 0.25}`,
          scale: `${Math.random() * 3.5 + 0.25}`,
          top: `${Math.random() * 100}%`,
        }}>
        <div
          className="snowflakeSpin"
          style={{
            animationDuration: `${Math.random() * 20 + 2}s`,
            animationName: `snowflakes-spin-${
              Math.random() > 0.5 ? 'clockwise' : 'counterclockwise'
            }`,
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
