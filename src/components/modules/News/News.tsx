import { useNews } from 'hooks/useNews';
import styles from './News.module.css';

export const News = () => {
  const { news } = useNews();
  return (
    <div className={styles.root}>
      {news?.urlToImage && (
        <img
          src={news?.urlToImage}
          alt={news?.title}
          className={styles.image}
        />
      )}
      {news?.title && (
        <div className={styles.title}>
          <div className={styles.source}>{news?.source.name}:</div>
          {news.title}
        </div>
      )}
    </div>
  );
};
