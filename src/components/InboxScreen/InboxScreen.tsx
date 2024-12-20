import { TasksProvider, useTasks } from "../../hook/useTasks";
import { TaskList } from "../TaskList";

type InboxScreen = {
  error?: string;
};
export const InboxScreen = ({ error }: InboxScreen) => {
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

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">Taskbox</h1>
      </nav>
      <TaskList />
    </div>
  );
};
