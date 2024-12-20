import { AuthenticateOptions, LoginHandler } from "../../hook/useAuth";
import "./Loginscreen.css";

type LoginFormProps = {
  onSubmit: LoginHandler;
};

export const LoginForm = ({ onSubmit, ...props }: LoginFormProps) => (
  <form
    className="login-form-container"
    onSubmit={(event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const elementsArray = Array.from(form.elements) as HTMLInputElement[];
      const formData = elementsArray.reduce((acc, elem) => {
        if (elem.id) {
          if (elem.id === "email") acc.username = elem.value;
          if (elem.id === "password") acc.password = elem.value;
        }

        return acc;
      }, {} as AuthenticateOptions);

      onSubmit(formData);
    }}
    {...props}
  >
    <div className="login-form-wrapper">
      <div role="group" className="login-form-group">
        <label htmlFor="email" id="email-label" className="login-form-label">
          Email address
        </label>
        <input
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          required
          aria-required="true"
          className="login-form-input"
        />
      </div>
    </div>
    <div role="group" className="login-form-group">
      <label
        id="password-label"
        htmlFor="password"
        className="login-form-label"
      >
        Password
      </label>
      <input
        name="password"
        type="password"
        id="password"
        required
        aria-required="true"
        className="login-form-input"
      />
    </div>
    <button type="submit" className="submit-button">
      Sign in
    </button>
  </form>
);
