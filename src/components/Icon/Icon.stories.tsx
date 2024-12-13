import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Icon } from ".";
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: "select",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "arrowup",
  },
  render: ({ ...args }) => {
    return <Icon {...args} />;
  },
};
