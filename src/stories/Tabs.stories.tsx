import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Tabs } from "../components/Navigation/Tabs/Tabs";

// type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
//   text?: string;
// };

const meta = {
  component: Tabs,
  argTypes: {
    children: { control: "text" }, // Allows editing children content in Storybook controls
  },
  parameters: {
    layout: "centered",
  },
  render: ({ ...args }) => (
    <Tabs defaultIndex={0} manual={false}>
      <Tabs.List className="flex gap-2 border-b">
        <Tabs.Tab index={0}>Home</Tabs.Tab>
        <Tabs.Tab index={1}>Profile</Tabs.Tab>
        <Tabs.Tab index={2}>Settings</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel index={0}>
        <p>Welcome to the home tab.</p>
      </Tabs.Panel>
      <Tabs.Panel index={1}>
        <p>This is the profile tab.</p>
      </Tabs.Panel>
      <Tabs.Panel index={2}>
        <p>Adjust your settings here.</p>
      </Tabs.Panel>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", text: "Click Me" },
};
