import "../Task/index.css";
import { useTasks } from "../../hook/useTasks";
import { ActionType, Task, TaskType } from "../Task/Task";

export type TaskListProps = {
  loading?: boolean;
  tasks: TaskType[];
} & ActionType;

export const TaskList = ({ ...props }) => {
  const { tasks, error, loading, archiveTask, togglePinTask, deleteTask } =
    useTasks();

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong.</div>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <ul
      className="list-items"
      data-testid="success"
      key={"success"}
      aria-label="tasks"
    >
      {tasksInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onArchiveTask={archiveTask}
          onDeleteTask={deleteTask}
          onTogglePinTask={togglePinTask}
        />
      ))}
    </ul>
  );
};
