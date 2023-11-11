import { BTC, ETH } from 'assets';
import { AnimatingNumber } from 'components';
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
  return (
    <div className={styles.root}>
      <div className={styles.data}>
        <div className={styles.iconContainer}>
          <img src={ICONS[label]} className={styles.icon} alt={label} />
        </div>
        <div className={styles.price}>
          <AnimatingNumber value={currentPrice} />
        </div>
      </div>
    </div>
  );
};
