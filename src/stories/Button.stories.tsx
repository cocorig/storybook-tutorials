import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { Button } from "../components/Button";
import React from "react";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  // args: {
  //   onClick: action("on-click"),
  // },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    action: { argTypesRegex: "^on.*" },
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: {
      control: "color",
    },
    variant: {
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Hello",
    variant: "primary",
    size: "md",
  },
  render: ({ children, ...args }) => {
    return <Button {...args}>{children}</Button>;
  },
};

export const Secondary: Story = {
  args: {
    children: "Hello",
    variant: "secondary",
    size: "md",
  },
  render: ({ children, ...args }) => {
    return <Button {...args}>{children}</Button>;
  },
};
