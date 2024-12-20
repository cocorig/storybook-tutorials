import { Meta, StoryObj } from "@storybook/react";
import Task, { Default as TaskDefault } from "../Task/Task.stories";

import React, { ReactNode } from "react";
import { TasksContext, TasksContextType } from "../../hook/useTasks";
import { TaskList } from "./TaskList";
import { TaskType } from "../Task/Task";

export const mockedState: TasksContextType = {
  tasks: [
    { id: "1", state: "TASK_INBOX", title: "Build a date picker" },
    { id: "2", state: "TASK_INBOX", title: "QA dropdown" },
    {
      id: "3",
      state: "TASK_INBOX",
      title: "Write a schema for account avatar component",
    },
    { id: "4", state: "TASK_INBOX", title: "Export logo" },
    { id: "5", state: "TASK_INBOX", title: "Fix bug in input error state" },
    {
      id: "6",
      state: "TASK_INBOX",
      title: "Draft monthly blog to customers",
    },
  ],
  error: null,
  loading: false,
  dispatch: () => {},
};
type MockStoreProps = {
  mockedState: TasksContextType;
  children: ReactNode;
};
const Mockstore = ({ mockedState, children }: MockStoreProps) => (
  <TasksContext.Provider value={{ ...mockedState }}>
    {children}
  </TasksContext.Provider>
);

const meta = {
  title: "Components/TaskList",
  component: TaskList,
  args: {
    ...Task.args,
  },
  decorators: [
    (story) => <Mockstore mockedState={mockedState}>{story()}</Mockstore>,
  ],

  excludeStories: /.*mockedState$/,
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/**
 * WithPinnedTasks
 */
export const WithPinnedTasks: Story = {
  decorators: [
    (story) => {
      const pinnedTasks: TaskType[] = [
        ...mockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];

      return (
        <Mockstore
          mockedState={{
            ...mockedState,
            tasks: pinnedTasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

/**
 * Loading
 */
export const Loading: Story = {
  decorators: [
    (story) => (
      <Mockstore
        mockedState={{
          ...mockedState,
          loading: true,
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
/**
 * Empty
 */
export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        mockedState={{
          ...mockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
