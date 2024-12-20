import { AuthenticateOptions, LoginHandler } from "../../hook/useAuth";
import { LoginForm } from "./LoginForm";
import "./Loginscreen.css";

type LoginScreenProps = {
  onLogIn: LoginHandler;
};
export const LoginScreen = ({ onLogIn }: LoginScreenProps) => {
  return (
    <div className="page lists-show">
      <div className="loginscreen">
        <div className="login-screen-container">
          <header className="loginscreen-header">
            <h1 className="loginscreen-heading">Taskbox</h1>
            <p className="loginscreen-text">Sign in to your account</p>
          </header>
          <LoginForm onSubmit={onLogIn} />
        </div>
      </div>
    </div>
  );
};
