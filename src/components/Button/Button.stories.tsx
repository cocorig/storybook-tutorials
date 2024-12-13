import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { Button } from ".";
import React from "react";
import { StoryLinkWrapper } from "../StoryLinkWrapper";
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    appearance: {
      control: {
        type: "radio",
      },
    },
    size: {
      options: ["small", "medium"],
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    appearance: "primary",
    size: "medium",
  },
  render: ({ children, ...args }) => {
    return <Button {...args}>{children}</Button>;
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    appearance: "secondary",
    size: "medium",
  },
  render: ({ children, ...args }) => {
    return <Button {...args}>{children}</Button>;
  },
};

// New story using the play function
export const WithInteractions = () => (
  <StoryLinkWrapper href="http://storybook.js.org">
    Original Link Wrapper
  </StoryLinkWrapper>
);
WithInteractions.play = async ({ canvasElement }) => {
  // Assigns canvas to the component root element

  // 렌더링된 DOM 요소를 검색
  const canvas = within(canvasElement);
  // 현재 렌더링된 DOM에서 role="link"를 가진 요소를 찾아 클릭하는 동작
  await userEvent.click(canvas.getByRole("link"));
};

WithInteractions.storyName = "button with interactions";
