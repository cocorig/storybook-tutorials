import { useReducer } from "react";

type User = {
  name: string;
  token: string;
};
export type LoginHandler = (options: AuthenticateOptions) => void;

export type AuthenticateOptions = {
  username: string;
  password: string;
};

export type AuthResponse = {
  user: User;
};

async function authenticate(
  options: AuthenticateOptions,
): Promise<AuthResponse> {
  const response = await fetch("/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return response.json();
}

type AuthAction = { type: "LOG_IN"; user: User } | { type: "LOG_OUT" };

const reducer = (user: User | null, action: AuthAction): User | null => {
  switch (action.type) {
    case "LOG_IN":
      return action.user;
    case "LOG_OUT":
      return null;
    default:
      return user;
  }
};

export function useAuth(): [User | null, LoginHandler] {
  const [user, dispatch] = useReducer(reducer, null);
  console.log(user);
  const logIn = ({ username, password }: AuthenticateOptions) => {
    authenticate({ username, password })
      .then(({ user }) => {
        dispatch({ type: "LOG_IN", user });
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return [user, logIn];
}
