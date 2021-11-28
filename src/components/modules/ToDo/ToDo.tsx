import { useToDo } from 'hooks/useToDo';

export const ToDo = () => {
    const { todos } = useToDo();
    return <div>To-do Module</div>;
};
