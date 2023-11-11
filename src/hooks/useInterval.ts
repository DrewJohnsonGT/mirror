import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (typeof savedCallback?.current === 'function') {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

export const usePrevious = <Type>(value: Type) => {
  const ref = useRef<Type>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
