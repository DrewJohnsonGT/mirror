import { useEffect, useState } from 'react';
import { CRYPTO_REFRESH_RATE } from 'util/constants';

export const useMarketSymbol = ({ symbol }: { symbol: string }) => {
  const [currentPrice, setCurrentPrice] = useState(0);

  const updatePrice = () => {
    if (IS_DEVELOPMENT) return;
    fetch(
      `https://rest.coinapi.io/v1/ohlcv/${symbol}/latest?period_id=30MIN&limit=1`,
      {
        headers: {
          'X-CoinAPI-Key': CRYPTO_API_KEY,
        },
      },
    )
      .then(async (res) => await res.json())
      .then((price) => {
        const priceHigh = price[0]?.price_high;
        priceHigh && setCurrentPrice(parseInt(priceHigh));
      })
      .catch((e) => {
        console.log('ERROR FETCHING CRYPTO');
        console.error(e);
      });
  };

  useEffect(() => {
    updatePrice();
    const interval = setInterval(() => {
      updatePrice();
    }, CRYPTO_REFRESH_RATE);
    return () => {
      clearInterval(interval);
    };
  }, [symbol]);

  return { currentPrice };
};
