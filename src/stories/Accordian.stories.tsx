import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Accordion } from "../components/Navigation/Accordian/Accordian";

// type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
//   text?: string;
// };

const meta = {
  component: Accordion,
  // parameters: {
  //   layout: "centered",
  // },
  render: ({ ...args }) => (
    <Accordion allowMultiple>
      <Accordion.Item index={0}>
        <Accordion.Header index={0}>Section 1</Accordion.Header>
        <Accordion.Panel index={0}>
          <p>This is the content of Section 1.</p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={1}>
        <Accordion.Header index={1}>Section 2</Accordion.Header>
        <Accordion.Panel index={1}>
          <p>This is the content of Section 2.</p>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", text: "Click Me" },
};
