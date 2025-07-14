import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Button } from "../components/Buttons/Button/Button";

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  text?: string;
};

const meta = {
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      description: "Standard button variants",
      options: ["primary", "secondary", "destructive", "disabled"],
    },
  },
  parameters: {
    layout: "centered",
  },
  render: ({ text, ...args }) => <Button {...args}>{text}</Button>,
} satisfies Meta<ButtonPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", text: "Submit" },
};

export const Secondary: Story = {
  args: { variant: "secondary", text: "Close" },
};

export const Destructive: Story = {
  args: { variant: "destructive", text: "Delete Profile" },
};

export const disabled: Story = {
  args: { variant: "disabled", text: "Submit" },
};
