import { useMarketSymbol } from 'hooks/useMarketSymbol';
import { AnimatingNumber } from 'components';

export const Bitcoin = () => {
    const { currentPrice: currentBTCPrice } = useMarketSymbol({
        symbol: 'btcusdt',
    });
    return (
        <div>
            <div>
                <AnimatingNumber value={currentBTCPrice} />
            </div>
        </div>
    );
};
