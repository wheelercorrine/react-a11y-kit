import type { Meta, StoryObj } from "@storybook/react-vite";
import "../index.css";

import { Accordion } from "../components/Navigation/Accordian/Accordian";

//I need to adjust this so that headers and panels can be easily adjusted/ played with?

const meta = {
  component: Accordion,
  // parameters: {
  //   layout: "centered",
  // },
  tags: ["autodocs"],
  render: ({ ...args }) => (
    <Accordion allowMultiple>
      <Accordion.Item index={0}>
        <Accordion.Header index={0}>
          Why is accessibility a first-class concern in this component library?
        </Accordion.Header>
        <Accordion.Panel index={0}>
          <p>
            Accessibility isn't just about compliance — it's about inclusivity
            and usability. Every component in this library is designed to meet
            at least WCAG AA standards (often AAA), with proper ARIA roles,
            keyboard interactions, and focus management built in by default.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={1}>
        <Accordion.Header index={1}>
          How do you test for accessibility?
        </Accordion.Header>
        <Accordion.Panel index={1}>
          <p>
            Components are tested using screen readers, keyboard-only
            navigation, and tools like axe-core, Storybook’s a11y addon, and
            manual inspection of ARIA behavior.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={2}>
        <Accordion.Header index={2}>
          Can I use this component library in my own project?
        </Accordion.Header>
        <Accordion.Panel index={2}>
          <p>
            Absolutely — it’s built with React + Vite, uses accessible markup,
            and is organized for composability and custom theming.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={3}>
        <Accordion.Header index={3}>
          Why did you choose to build your own component library instead of
          using one like Radix or MUI?
        </Accordion.Header>
        <Accordion.Panel index={3}>
          <p>
            While existing libraries are great, I wanted to build something from
            scratch to deeply understand the mechanics of accessibility, state
            handling, and design systems. This project is as much a learning
            tool as it is a reusable resource.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={4}>
        <Accordion.Header index={4}>
          What inspired this project?
        </Accordion.Header>
        <Accordion.Panel index={4}>
          <p>
            I’ve worked on multiple design systems at companies where
            accessibility was critical but often misunderstood. This project is
            a way to bake those best practices into reusable tools — and to show
            how a real developer experience can be both elegant and inclusive.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={5}>
        <Accordion.Header index={5}>
          What’s been the hardest component to build so far?
        </Accordion.Header>
        <Accordion.Panel index={5}>
          <p>
            The combobox! It’s deceptively simple but has a lot of accessibility
            nuance — keyboard handling, ARIA attributes, live region
            announcements, focus trapping, and list virtualization can all come
            into play.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={6}>
        <Accordion.Header index={6}>
          What’s next for this library?
        </Accordion.Header>
        <Accordion.Panel index={6}>
          <p>
            More components (like toasts and tables), theming tokens, visual
            regression testing, and potentially turning it into a NPM package
            for others to use.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={7}>
        <Accordion.Header index={7}>
          Do I need a screen reader to use this library?
        </Accordion.Header>
        <Accordion.Panel index={7}>
          <p>
            Nope — but if you do use one, this library is designed to play
            nicely with it.
          </p>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FAQ: Story = {
  args: { variant: "primary", text: "Click Me" },
};
