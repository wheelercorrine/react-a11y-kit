import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../../index.css";
import { Modal } from "./Modal";
import { Button } from "../../Buttons/Button/Button";

// type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button> & {
//   text?: string;
// };

const meta = {
  component: Modal,
  argTypes: {
    children: { control: "text" }, // Allows editing children content in Storybook controls
  },
  parameters: {
    layout: "centered",
  },
  render: ({ ...args }) => (
    <Modal isOpen={true} onClose={() => {}}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Title>Modal</Modal.Title>
        <Modal.Description>This is a modal</Modal.Description>
        <Modal.Footer>
          <Button onClick={() => {}}>Close</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", text: "Click Me" },
};
