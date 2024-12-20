import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Link } from ".";
import { Icon } from "../Icon";

const meta = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const onLinkClick = action("onLinkClick");

export const Default: Story = {
  args: {
    children: "Link",
  },
};
export const ALL: Story = {
  render: ({ ...args }) => {
    return (
      <div>
        <Link href="https://storybook.js.org/tutorials/">Default</Link>
        <br />
        <Link secondary href="https://storybook.js.org/tutorials/">
          Secondary
        </Link>
        <br />
        <Link tertiary href="https://storybook.js.org/tutorials/">
          tertiary
        </Link>
        <br />
        <Link nochrome href="https://storybook.js.org/tutorials/">
          nochrome
        </Link>
        <br />
        <Link href="https://storybook.js.org/tutorials/">
          <Icon icon="discord" aria-hidden />
          With icon in front
        </Link>
        <br />
        <Link
          containsIcon
          href="https://storybook.js.org/tutorials/"
          aria-label="Toggle side bar"
        >
          <Icon icon="sidebar" aria-hidden />
        </Link>
        <br />
        <Link containsIcon withArrow href="https://storybook.js.org/tutorials/">
          With arrow behind
        </Link>
        <br />
        <span style={{ background: "#333" }}>
          <Link inverse href="https://storybook.js.org/tutorials/">
            Inverted colors
          </Link>
        </span>
      </div>
    );
  },
};
