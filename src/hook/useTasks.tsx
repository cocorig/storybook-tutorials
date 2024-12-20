import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ActionDispatch,
  useState,
  ReactNode,
} from "react";
import { TaskType } from "../components/Task";

type Action =
  | { type: "UPDATE_TASKS"; tasks: TaskType[] }
  | { type: "ARCHIVE_TASK"; id: string }
  | { type: "PIN_TASK"; id: string }
  | { type: "INBOX_TASK"; id: string }
  | { type: "DELETE_TASK"; id: string };

function updateTask(
  tasks: TaskType[],
  id: string,
  updatedTask: Partial<TaskType>,
): TaskType[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task,
  );
}

function deleteTask(tasks: TaskType[], id: string): TaskType[] {
  return tasks.filter((task) => task.id !== id);
}

export const reducer = (tasks: TaskType[], action: Action): TaskType[] => {
  switch (action.type) {
    case "UPDATE_TASKS":
      return action.tasks;
    case "ARCHIVE_TASK":
      return updateTask(tasks, action.id, { state: "TASK_ARCHIVED" });
    case "PIN_TASK":
      return updateTask(tasks, action.id, { state: "TASK_PINNED" });
    case "INBOX_TASK":
      return updateTask(tasks, action.id, { state: "TASK_INBOX" });
    case "DELETE_TASK":
      return deleteTask(tasks, action.id);
    default:
      return tasks;
  }
};
const initialState: TaskType[] = [];

export type TasksContextType = {
  tasks: TaskType[];
  dispatch: ActionDispatch<[action: Action]>;
  loading: boolean;
  error: string | null;
};
// export function useTasks(): UseTasks {
//   const [tasks, dispatch] = useReducer(reducer, initialState);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/tasks");

//         if (!response.ok) throw new Error("Failed to fetch tasks.");
//         const tasks = await response.json();
//         console.log(tasks);
//         dispatch({ type: "UPDATE_TASKS", tasks });
//       } catch (error) {
//         if (error instanceof Error) {
//           setError(error.message);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return { tasks, dispatch, loading, error };
// }

export const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/tasks");
        if (!response.ok) throw new Error("Failed to fetch tasks.");
        const tasks = await response.json();

        dispatch({ type: "UPDATE_TASKS", tasks });
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
  return (
    <TasksContext.Provider value={{ tasks, dispatch, loading, error }}>
      {children}
    </TasksContext.Provider>
  );
};

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  /**
   * 완료/미완료 상태 변경 함수
   * @param archive 완료 여부
   * @param id 업데이트할 식별자
   */
  const archiveTask = (archive: boolean, id: string) => {
    context.dispatch!({ type: archive ? "ARCHIVE_TASK" : "INBOX_TASK", id });
  };

  /**
   *  핀 고정/해제를 전환하는 함수
   * @param state
   * @param id
   */
  const togglePinTask = (state: string, id: string) => {
    context.dispatch({
      type: state === "TASK_PINNED" ? "INBOX_TASK" : "PIN_TASK",
      id,
    });
  };

  const deleteTask = (id: string) => {
    context.dispatch({ type: "DELETE_TASK", id });
  };
  return {
    archiveTask,
    togglePinTask,
    deleteTask,
    ...context,
  };
}
