import { delay, http, HttpResponse } from "msw";
import { data } from "./data";
const tasksResolver = () => {
  return HttpResponse.json(data);
};

export const handlers = [
  http.all("*", async () => {
    await delay(100);
  }),
  http.get("/tasks", tasksResolver),
];
