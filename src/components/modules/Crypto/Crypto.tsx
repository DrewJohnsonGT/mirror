import { MarketPriceTicker } from 'components';

export const Crypto = () => (
  <div>
    <MarketPriceTicker symbol="BITSTAMP_SPOT_ETH_USD" label="ETH" />
    <MarketPriceTicker symbol="BITSTAMP_SPOT_BTC_USD" label="BTC" />
  </div>
);
