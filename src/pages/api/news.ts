import { type NextApiRequest, type NextApiResponse } from 'next';

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (process.env.DEV) res.status(200).json({ articles: [] });
    fetch(
      `https://newsapi.org/v2/top-headlines?language=en&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`,
    )
      .then(async (res) => await res.json())
      .then((news) => {
        res.status(200).json(news);
      })
      .catch((e) => {
        console.log('ERROR FETCHING NEWS');
        console.error(e);
        res.status(500).json({ error: e });
      });
  }
}
