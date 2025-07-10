import { useRef, useState } from "react";
import "./App.css";
import { Button } from "./components/Buttons/Button/Button";
import { Tabs } from "./components/Navigation/Tabs/Tabs";
import { Accordion } from "./components/Navigation/Accordian/Accordian";
import { Modal } from "./components/Overlays/Modal/Modal";
import { Combobox } from "./components/Pickers/Combobox/Combobox";

function App() {
  // const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const items = ["Apple", "Banana", "Grape", "Orange", "Pineapple"];

  return (
    <>
      <div>
        <h1> Accessible Component Library Showcase</h1>
        <h2>Button</h2>
        <Button
          onClick={() => {
            alert("You clicked a button!");
          }}
        >
          Click Me
        </Button>

        <h2>TabList</h2>
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

        <h2>Accordian</h2>
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

        <h2>Modal</h2>
        <Button ref={openRef} onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          // initialFocusRef={cancelRef}
          returnFocusRef={openRef}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Title>Modal</Modal.Title>
            <Modal.Description>This is a modal</Modal.Description>
            <Modal.Footer>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <h2>ComboBox</h2>
        <div className="max-w-sm">
          <label htmlFor="fruit" className="block mb-2">
            Choose a fruit:
          </label>
          <Combobox
            options={items}
            onChange={(val) => console.log("Selected:", val)}
          >
            <Combobox.Input className="border p-2 w-full" />
            <Combobox.Listbox className="border border-gray-300" />
          </Combobox>
        </div>
      </div>
    </>
  );
}

export default App;
