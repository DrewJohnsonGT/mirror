import { useEffect, useState } from 'react';
import { NEWS_ITEM_REFRESH_RATE, NEWS_REFRESH_RATE } from 'util/constants';

interface News {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
  source: {
    name: string;
  };
}

export const useNews = () => {
  const [news, setNews] = useState<News[]>();
  const [currentNewsItemIndex, setCurrentNewsItemIndex] = useState(0);

  const updateNews = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?language=en&sortBy=popularity&apiKey=${NEWS_API_KEY}`,
    )
      .then(async (res) => await res.json())
      .then((newsResponse) => {
        const articles = newsResponse.articles;
        const nonRemovedArticles = articles.filter(
          (article: News) => article.title !== '[Removed]',
        );
        setNews(nonRemovedArticles);
      })
      .catch((e) => {
        console.log('ERROR FETCHING NEWS');
        console.error(e);
      });
  };

  useEffect(() => {
    updateNews();
    const newsInterval = setInterval(() => {
      updateNews();
    }, NEWS_REFRESH_RATE);
    const updateNewsItemInterval = setInterval(() => {
      setCurrentNewsItemIndex(
        (currentNewsItemIndex) => currentNewsItemIndex + 1,
      );
    }, NEWS_ITEM_REFRESH_RATE);
    return () => {
      clearInterval(newsInterval);
      clearInterval(updateNewsItemInterval);
    };
  }, []);

  const currentNewsItem = news?.[currentNewsItemIndex % news.length];
  return { news: currentNewsItem };
};
