import { useToDo } from 'hooks/useToDo';
import styles from './ToDo.module.css';

export const ToDo = () => {
  const { todos } = useToDo();
  return (
    <div className={styles.root}>
      <div className={styles.header}>To-Do</div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.todos}>
        {todos.map((todo) => (
          <div className={styles.todo} key={todo.id}>
            <span className={styles.bullet}>○</span> {todo.content}
          </div>
        ))}
      </div>
    </div>
  );
};
