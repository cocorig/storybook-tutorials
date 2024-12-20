import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Button } from ".";
import React from "react";
import { StoryLinkWrapper } from "../StoryLinkWrapper";
import { Icon } from "../Icon";
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
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
export const AllButtons = {
  name: "all buttons",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <Button appearance="primary">Primary</Button>
      <Button appearance="secondary">Secondary</Button>
      <Button appearance="tertiary">Tertiary</Button>
      <Button appearance="outline">Outline</Button>
      <Button appearance="primaryOutline">Outline primary</Button>
      <Button appearance="secondaryOutline">Outline secondary</Button>
      <Button appearance="primary" isDisabled>
        Disabled
      </Button>
      <br />
      <Button appearance="primary" isLoading>
        Primary
      </Button>
      <Button appearance="secondary" isLoading>
        Secondary
      </Button>
      <Button appearance="tertiary" isLoading>
        Tertiary
      </Button>
      <Button appearance="outline" isLoading>
        Outline
      </Button>
      <Button appearance="outline" isLoading loadingText="Custom...">
        Outline
      </Button>
      <br />
      <Button appearance="primary" size="small">
        Primary
      </Button>
      <Button appearance="secondary" size="small">
        Secondary
      </Button>
      <Button appearance="tertiary" size="small">
        Tertiary
      </Button>
      <Button appearance="outline" size="small">
        Outline
      </Button>
      <Button appearance="primary" isDisabled size="small">
        Disabled
      </Button>
      <Button appearance="outline" size="small" containsIcon>
        <Icon icon="link" aria-label="Link" />
      </Button>
      <Button appearance="outline" size="small">
        <Icon icon="link" />
        Link
      </Button>
    </div>
  ),
};
