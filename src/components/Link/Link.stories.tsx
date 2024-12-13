import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Link } from ".";

const meta = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Link",
  },
  render: ({ children, ...args }) => {
    return <Link {...args}>{children}</Link>;
  },
};
