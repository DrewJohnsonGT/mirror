import { useNews } from 'hooks/useNews';
import styles from './News.module.css';

export const News = () => {
  const { news } = useNews();
  console.log(news);
  return (
    <div className={styles.root}>
      <img src={news?.urlToImage} alt={news?.title} className={styles.image} />
      <div className={styles.title}>{news?.title}</div>
    </div>
  );
};
