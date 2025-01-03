import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    componentSubtitle:
      "Displays an image that represents a user or organization",
  },
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["tiny", "small", "medium", "large"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args) => <Avatar {...args} />;

export const Controls: Story = Template.bind({});

Controls.args = {
  loading: false,
  size: "large",
  username: "Dominic Nguyen",
  src: "https://avatars2.githubusercontent.com/u/263385",
};

export const Standard = {
  args: {
    size: "large",
    username: "Tom Coleman",
    src: "https://avatars2.githubusercontent.com/u/132554",
  },
};
/**
 * 4 sizes are supported.
 */
export const Sizes = {
  args: {
    username: "Tom Coleman",
    src: "https://avatars2.githubusercontent.com/u/132554",
  },
  render: (args) => (
    <>
      <Avatar {...args} size="large" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="small" />
      <Avatar {...args} size="tiny" />
    </>
  ),
};

/**
 * Shows the user's initials as a fallback when no image is provided.
 */
export const Initials = {
  render: (args) => (
    <>
      <Avatar username="Tom Coleman" />
      <Avatar username="Dominic Nguyen" />
      <Avatar username="Varun Vachhar" />
      <Avatar username="Michael Shilman" />
    </>
  ),
};

/**
 * Shows a loading indicator.
 */
export const Loading = {
  args: {
    loading: true,
  },
  render: (args) => (
    <>
      <Avatar {...args} size="large" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="small" />
      <Avatar {...args} size="tiny" />
    </>
  ),
};

/**
 * Shows the user's avatar when provided with a `src` prop or in various states and sizes.
 */
export const Large = {
  render: () => (
    <>
      <Avatar loading size="large" username="Tom Coleman" />
      <Avatar size="large" username="Tom Coleman" />
      <Avatar
        size="large"
        username="Tom Coleman"
        src="https://avatars2.githubusercontent.com/u/132554"
      />
    </>
  ),
};
