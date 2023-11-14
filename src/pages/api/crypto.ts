import { type NextApiRequest, type NextApiResponse } from 'next';

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (process.env.DEV) return;
    const symbol = req.query.symbol;
    console.log('FETCHED CRYPTO');
    console.log(symbol);
    fetch(
      `https://rest.coinapi.io/v1/ohlcv/${String(
        symbol,
      )}/latest?period_id=30MIN&limit=1`,
      {
        headers: {
          'X-CoinAPI-Key': process.env.CRYPTO_API_KEY,
        },
      },
    )
      .then(async (res) => await res.json())
      .then((price) => {
        const priceHigh = price[0]?.price_high;
        priceHigh && res.status(200).json(parseInt(priceHigh));
      })
      .catch((e) => {
        console.log('ERROR FETCHING CRYPTO');
        console.error(e);
        res.status(500).json({ error: e });
      });
  }
}
