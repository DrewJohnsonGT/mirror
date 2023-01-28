import { useState, useEffect } from "react";
import { TODO_REFRESH_RATE, TODOIST_PROJECT_ID } from "util/constants";

interface RawToDoItem {
  content: string;
  date_completed: string;
  id: string;
  user_id: string;
}

interface ToDo {
  id: string;
  content: string;
}

const ACCESS_TOKEN = process.env.REACT_APP_TODOIST_ACCESS_TOKEN;

const PROJECT_ENDPOINT = "https://api.todoist.com/sync/v8/projects/get_data";

const getProject = (projectId: string) =>
  fetch(
    `${PROJECT_ENDPOINT}?${new URLSearchParams({
      project_id: projectId,
    })}`,
    {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }
  )
    .then((res) => res.json())
    .then((data) => data);

export const useToDo = () => {
  const [todos, setTodos] = useState<ToDo[]>();
  const updateProject = () => {
    getProject(TODOIST_PROJECT_ID).then((res: { items: RawToDoItem[] }) =>
      setTodos(
        res.items.map(({ content, id }) => ({
          content,
          id,
        }))
      )
    );
  };
  useEffect(() => {
    updateProject();
    setInterval(() => {
      updateProject();
    }, TODO_REFRESH_RATE);
  }, []);

  return { todos: todos || [] };
};
