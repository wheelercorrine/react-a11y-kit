import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Combobox } from "../components/Pickers/Combobox/Combobox";

// type ComboboxPropsAndCustomArgs = React.ComponentProps<typeof Combobox> & {
//   items: string[];
// };

const meta = {
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  render: ({ ...args }) => (
    <Combobox
      options={args.options}
      onChange={(val) => console.log("Selected:", val)}
    >
      <Combobox.Input />
      <Combobox.Listbox />
    </Combobox>
  ),
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { options: ["Apple", "Banana", "Grape", "Orange", "Pineapple"] },
};
