import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Task 데이터 타입 정의
export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  state: "TASK_INBOX" | "TASK_PINNED" | "TASK_ARCHIVED";
};

// Redux 상태 타입 정의
type TaskBoxState = {
  tasks: TaskType[];
  status: "idle" | "loading" | "error" | "succeeded" | "failed";
  error: string | null;
};

// 스토어에서 상태 및 디스패치 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 초기 상태 설정
const TaskBoxData: TaskBoxState = {
  tasks: [],
  status: "idle",
  error: null,
};

/*
 * 비동기 작업 정의
 * API에서 할 일(Task) 목록을 가져옵니다.
 */
export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();
  const result = data.map((task: TaskType) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  return result;
});

/*
 * Redux Slice 생성
 * 상태 및 리듀서 정의
 */
const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    // 상태 업데이트 리듀서
    updateTaskState: (
      state,
      action: { payload: { id: string; newTaskState: TaskType["state"] } }
    ) => {
      const { id, newTaskState } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex].state = newTaskState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.tasks = [];
      });
  },
});

// 액션 생성자 내보내기
export const { updateTaskState } = TasksSlice.actions;

/*
 * Redux 스토어 생성
 */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export default store;
