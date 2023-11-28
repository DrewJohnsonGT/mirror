import { type News } from 'hooks/useNews';
import { type NextApiRequest, type NextApiResponse } from 'next';

const MOCK_NEWS: News[] = [
  {
    author: 'Mock Author',
    description: 'This is a mock news article',
    source: {
      name: 'Mock Source',
    },
    title: 'Mock News - this is a mock news article. The news is fake.',
    url: 'https://www.google.com',
    urlToImage: '/images/moon/fm.png',
  },
];

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (process.env.DEV) res.status(200).json({ articles: MOCK_NEWS });
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
