import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Badge } from ".";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    status: "neutral",
  },
  render: ({ children, ...args }) => {
    return <Badge {...args}>{children}</Badge>;
  },
};
