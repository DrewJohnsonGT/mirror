import { BTC, ETH } from 'assets';
import { useMarketSymbol } from 'hooks/useMarketSymbol';
import styles from './MarketPriceTicker.module.css';

const ICONS = {
  BTC,
  ETH,
};

export const MarketPriceTicker = ({
  label,
  symbol,
}: {
  symbol: string;
  label: keyof typeof ICONS;
}) => {
  const { currentPrice } = useMarketSymbol({
    symbol,
  });
  const formattedCurrentPrice = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  }).format(currentPrice);
  return (
    <div className={styles.root}>
      <div className={styles.data}>
        <div className={styles.iconContainer}>
          <img src={ICONS[label]} className={styles.icon} alt={label} />
        </div>
        <div className={styles.price}>{formattedCurrentPrice}</div>
      </div>
    </div>
  );
};
