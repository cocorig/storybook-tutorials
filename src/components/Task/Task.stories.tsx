import { Meta, StoryObj } from "@storybook/react";
import { Task } from ".";
import { action } from "@storybook/addon-actions";
import { actionsData } from "../../utils/actionData";
import { TasksProvider } from "../../hook/useTasks";
import React from "react";

const meta = {
  title: "Components/Task",
  component: Task,
  args: { ...actionsData },
  excludeStories: /.*taskActions$/,
  // decorators: [(story) => <TasksProvider>{story()}</TasksProvider>],
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: {
      id: "1",
      title: "Buy milk",
      state: "TASK_INBOX",
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      id: "2",
      title: "QA dropdown",
      state: "TASK_PINNED",
    },
  },
};
const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const Archived: Story = {
  args: {
    task: {
      id: "3",
      title: "Write schema for account menu",
      state: "TASK_ARCHIVED",
    },
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      ...Default.args.task,
      title: longTitleString,
    },
  },
};
