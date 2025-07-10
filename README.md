# React-a11y-kit

## 🧩 Components

### 🪟 Modal

A fully accessible modal dialog with:

- **Focus trap** inside the modal while open
- **Focus return** to the trigger element on close
- Dismissible via Escape key or clicking the backdrop
- Uses role="dialog" and aria-modal="true"

#### Example

```tsx
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
```

#### Accessibility Features

- Uses aria-labelledby and aria-describedby

- Restores focus to last active element

- Supports keyboard and screen reader navigation

### 🗂 TabList

An accessible tab interface with proper ARIA roles and keyboard interaction.

- Keyboard navigation with ArrowLeft/ArrowRight

- Only one tab panel visible at a time

- role="tablist", role="tab", and role="tabpanel" support

- Supports both controlled and uncontrolled usage

#### Example

```tsx
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
```

#### Accessibility Features

- Arrow key navigation between tabs

- aria-selected, aria-controls, and tabindex managed correctly

- Focus lands on the selected tab when navigated via keyboard

### 📚 Accordion

An accessible accordion component that supports expand/collapse behavior with appropriate roles and keyboard support.

- Collapsible panels with toggle buttons

- Supports multiple or single open items

- Uses role="region" and aria-expanded

#### Example

```tsx
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
```

#### Accessibility Features

- Buttons control expanded state via aria-expanded

- Panel regions are labeled using aria-controls and aria-labelledby

- Fully keyboard-navigable (Tab and Enter/Space)

### 🔍 Combobox

A fully accessible combobox component with filtering, ARIA roles, and full keyboard support.

- Supports dynamic filtering of options

- Navigable with arrow keys

- Uses role="combobox" and aria-expanded, aria-controls, aria-activedescendant

#### Example

```tsx
<Combobox options={items} onChange={(val) => console.log("Selected:", val)}>
  <Combobox.Input className="border p-2 w-full" />
  <Combobox.Listbox className="border border-gray-300" />
</Combobox>
```

#### Accessibility Features

- aria-autocomplete="list" with dynamic filtering

- Keyboard nav: ArrowDown, ArrowUp, Enter, and Escape

- Maintains focus in input while navigating dropdown

### 🔘 Button

A stylized button that ensures accessibility even when used with custom styling or non-native elements (e.g. <div>).

- Defaults to a native

- Ensures keyboard accessibility if rendered as custom element

- Prevents accidental misuse of

  or without roles

#### Example

```tsx
<Button
  onClick={() => {
    alert("You clicked a button!");
  }}
>
  Click Me
</Button>
```

#### Accessibility Features

- Coming soon: Can render as native button, a, or other elements with appropriate roles

- Handles Enter/Space keypresses

- Automatically adds role="button" and tabindex if not a native button

### 🚨 Coming Soon

These components are planned or in progress:

- **Dropdown / Menu**

- **Alert / Toast**

- **Tooltip**

- **Date Picker**

- **Form Elements** (Input, Checkbox, Radio with validation and a11y)

- **Live Regions** for announcements
