import { MarketPriceTicker } from './MarketPriceTicker/MarketPriceTicker';

export const Crypto = () => (
  <div>
    <MarketPriceTicker
      symbol="BITSTAMP_SPOT_ETH_USD"
      iconImage="images/ethereum-icon.png"
    />
    <MarketPriceTicker
      symbol="BITSTAMP_SPOT_BTC_USD"
      iconImage="images/bitcoin-icon.png"
    />
  </div>
);
