import { delay, http, HttpResponse } from "msw";
import { data } from "./data";
import { AuthenticateOptions } from "../hook/useAuth";
const tasksResolver = () => {
  return HttpResponse.json(data);
};

export const handlers = [
  // http.all("*", async () => {
  //   await delay(100);
  // }),
  http.get("/tasks", tasksResolver),

  http.post<AuthenticateOptions, AuthenticateOptions>(
    "/authenticate",
    async ({ request }) => {
      const options = await request.json();

      if (
        options.username === "alice.carr@test.com" &&
        options.password === "k12h1k0$5;lpa@Afn"
      ) {
        return HttpResponse.json(
          {
            user: {
              name: "Alice Carr",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            },
          },
          { status: 201 },
        );
      }

      return HttpResponse.json(
        { error: "Authentication failed" },
        { status: 401 },
      );
    },
  ),
];
