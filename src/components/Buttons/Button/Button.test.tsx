import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders a text button with label", () => {
    render(
      <Button kind="text" onClick={() => {}}>
        Click me
      </Button>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(
      <Button kind="text" onClick={handleClick}>
        Submit
      </Button>
    );
    await userEvent.click(screen.getByText("Submit"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("disables the button when isLoading is true", () => {
    render(
      <Button kind="text" onClick={() => {}} isLoading loadingText="Loading...">
        Submit
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Loading...");
  });

  it("does not call onClick when loading", async () => {
    const handleClick = jest.fn();
    render(
      <Button
        kind="text"
        onClick={handleClick}
        isLoading
        loadingText="Loading..."
      >
        Submit
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders icon-only button with aria-label", () => {
    render(
      <Button
        kind="icon"
        icon={<span data-testid="icon" />}
        aria-label="Save"
        onClick={() => {}}
      />
    );
    const button = screen.getByLabelText("Save");
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
