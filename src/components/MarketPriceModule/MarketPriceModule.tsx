import { useMarketSymbol } from 'hooks/useMarketSymbol';
import { AnimatingNumber } from 'components';
import { BTC, ETH } from 'images';
import styles from './MarketPriceModule.module.css';

const ICONS = {
    BTC,
    ETH,
};
export const MarketPriceModule = ({
    symbol,
    label,
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
                    <img
                        src={ICONS[label]}
                        className={styles.icon}
                        alt={label}
                    />
                </div>
                <div className={styles.price}>
                    <AnimatingNumber value={currentPrice} />
                </div>
            </div>
        </div>
    );
};
