import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../index.css";
import { Button } from "./Button";

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  text?: string;
};

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      description: "Standard button variants",
      options: ["primary", "secondary", "destructive"],
    },
    kind: {
      control: "select",
      options: ["text", "icon"],
    },
  },
  args: {
    onClick: fn(),
  },
  parameters: {
    layout: "centered",
  },
  render: ({ text, ...args }) => <Button {...args}>{text}</Button>,
} satisfies Meta<ButtonPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    kind: "text",
    variant: "primary",
    text: "Submit",
    disabled: false,
    isLoading: false,
  },
};

export const Secondary: Story = {
  args: {
    kind: "text",
    variant: "secondary",
    text: "Close",
    disabled: false,
    isLoading: false,
  },
};

export const Destructive: Story = {
  args: {
    kind: "text",
    variant: "destructive",
    text: "Delete Profile",
    disabled: false,
    isLoading: false,
    loadingText: "loading",
  },
};

export const Disabled: Story = {
  args: {
    kind: "text",
    variant: "primary",
    text: "Submit",
    disabled: true,
    isLoading: false,
  },
};
