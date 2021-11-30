import { useMarketSymbol } from 'hooks/useMarketSymbol';
import { AnimatingNumber } from 'components';

export const Ethereum = () => {
    const { currentPrice: currentETHPrice } = useMarketSymbol({
        symbol: 'ethusdt',
    });
    return (
        <div>
            <div>
                <AnimatingNumber value={currentETHPrice} />
            </div>
        </div>
    );
};
