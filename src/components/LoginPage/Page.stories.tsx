import React from "react";
import { Page } from "./Page";
import { http, HttpResponse, delay } from "msw";

import {
  within,
  expect,
  waitForElementToBeRemoved,
  userEvent,
  findByRole,
} from "@storybook/test";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Page,
  title: "Components/Page",
} satisfies Meta<typeof Page>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
