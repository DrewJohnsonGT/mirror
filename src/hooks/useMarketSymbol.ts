import { useEffect, useState } from 'react';

// 30 minutes - API limit 100 daily requests
const DEFAULT_TICK_RATE = 1000 * 60 * 30;

export const useMarketSymbol = ({
  symbol,
  tickRate = DEFAULT_TICK_RATE,
}: {
  symbol: string;
  tickRate?: number;
}) => {
  const [currentPrice, setCurrentPrice] = useState(0);

  const updatePrice = () => {
    if (process.env.REACT_APP_IS_DEVELOPMENT) return;
    fetch(
      `https://rest.coinapi.io/v1/ohlcv/${symbol}/latest?period_id=30MIN&limit=1`,
      {
        headers: {
          'X-CoinAPI-Key': process.env.REACT_APP_CRYPTO_API_KEY,
        },
      },
    )
      .then(async (res) => await res.json())
      .then((price) => {
        const priceHigh = price[0].price_high;
        setCurrentPrice(parseFloat(priceHigh));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    updatePrice();
    const interval = setInterval(() => {
      updatePrice();
    }, tickRate);
    return () => {
      clearInterval(interval);
    };
  }, [symbol, tickRate]);

  return { currentPrice };
};
