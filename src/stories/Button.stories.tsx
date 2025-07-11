import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Button } from "../components/Buttons/Button/Button";

type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
  text?: string;
};

const meta = {
  component: Button,
  argTypes: {
    children: { control: "text" }, // Allows editing children content in Storybook controls
  },
  parameters: {
    layout: "centered",
  },
  render: ({ text, ...args }) => <Button {...args}>{text}</Button>,
} satisfies Meta<ButtonPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", text: "Click Me" },
};
