import { useMarketSymbol } from 'hooks/useMarketSymbol';
import styles from './MarketPriceTicker.module.css';

export const MarketPriceTicker = ({
  iconImage,
  symbol,
}: {
  symbol: string;
  iconImage: string;
}) => {
  const { currentPrice } = useMarketSymbol({
    symbol,
  });
  const formattedCurrentPrice = Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
  }).format(currentPrice);
  return (
    <div className={styles.root}>
      <div className={styles.data}>
        <div className={styles.iconContainer}>
          <img src={iconImage} className={styles.icon} alt={iconImage} />
        </div>
        <div className={styles.price}>{formattedCurrentPrice}</div>
      </div>
    </div>
  );
};
