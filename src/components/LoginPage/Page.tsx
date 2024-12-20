import { useAuth } from "../../hook/useAuth";
import { InboxScreen } from "../InboxScreen";
import { LoginScreen } from "../Login";
import { TasksProvider } from "../../hook/useTasks";

export const Page = () => {
  const [user, logIn] = useAuth();
  return (
    <>
      {user?.token ? (
        <TasksProvider>
          <InboxScreen />
        </TasksProvider>
      ) : (
        <LoginScreen onLogIn={logIn} />
      )}
    </>
  );
};
