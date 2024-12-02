import { useEffect, useState } from 'react';
import { CRYPTO_REFRESH_RATE } from 'util/constants';

export const useMarketSymbol = ({ symbol }: { symbol: string }) => {
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    const updatePrice = () => {
      fetch('/api/crypto?symbol=' + symbol)
        .then(async (res) => await res.json())
        .then((price) => {
          setCurrentPrice(parseInt(price));
        })
        .catch((e) => {
          console.log('ERROR FETCHING CRYPTO');
          console.error(e);
        });
    };
    updatePrice();
    const marketSymbolInterval = setInterval(() => {
      updatePrice();
    }, CRYPTO_REFRESH_RATE);
    return () => {
      clearInterval(marketSymbolInterval);
    };
  }, []);

  return { currentPrice };
};
