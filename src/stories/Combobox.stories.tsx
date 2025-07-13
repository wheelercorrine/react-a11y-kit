import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Combobox } from "../components/Pickers/Combobox/Combobox";

// type ComboboxPropsAndCustomArgs = React.ComponentProps<typeof Combobox> & {
//   items: string[];
// };

const meta = {
  component: Combobox,
  // parameters: {
  //   layout: "centered",
  // },
  render: ({ ...args }) => (
    <Combobox
      label={args.label}
      options={args.options}
      onChange={(val) => console.log("Selected:", val)}
    >
      <Combobox.Label />
      <Combobox.Input />
      <Combobox.Listbox />
    </Combobox>
  ),
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "State:",
    options: [
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Federated States of Micronesia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Marshall Islands",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Palau",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  },
};
