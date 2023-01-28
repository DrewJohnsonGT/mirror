import styles from "./ToDo.module.css";
import { useToDo } from "hooks/useToDo";

export const ToDo = () => {
  const { todos } = useToDo();
  return (
    <div>
      <div className={styles.header}>To-Do</div>
      <hr className={styles.hr} />
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
