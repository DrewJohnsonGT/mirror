import styles from './Loading.module.css';

export const Loading = ({ message = 'Loading' }: { message?: string }) => (
    <div className={styles.root}>
        <span className={styles.message}>{message}...</span>
    </div>
);
