import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Stack } from '.';
import React from 'react';
type StoryProps = ComponentProps<typeof Stack> & {
  numberOfChildren: number;
};

const meta: Meta<StoryProps> = {
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    numberOfChildren: {
      options: [1, 5, 10],
      control: {
        type: 'select',
      },
    },
    direction: {
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      control: {
        type: 'radio',
      },
    },
  },
  // 공통 args
  args: {
    numberOfChildren: 5,
  },
};

export default meta;

type Story = StoryObj<StoryProps>;
export const Horizontal: Story = {
  args: {
    direction: 'row',
    gap: '10px',
  },
  render: ({ numberOfChildren, ...args }) => {
    return <Stack {...args}>{createChildren(numberOfChildren)}</Stack>;
  },
};

export const Vertical: Story = {
  args: {
    direction: 'column',
    gap: '10px',
  },
  render: ({ numberOfChildren, ...args }) => {
    return <Stack {...args}>{createChildren(numberOfChildren)}</Stack>;
  },
};
function createChildren(numberOfChildren: number) {
  return Array(numberOfChildren)
    .fill(null)
    .map((_, index) => {
      return (
        <div
          key={index}
          style={{ width: 100, height: 100, backgroundColor: 'red' }}
        />
      );
    });
}
