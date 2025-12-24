import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders Add FORM title and ADD FORM button", () => {
    render(<App />);
    expect(screen.getByText("Add FORM")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ADD FORM" })).toBeInTheDocument();
});

test("shows validation errors when submitting empty rows", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "ADD FORM" }));

    expect(screen.getByText("TODO LIST has empty values.")).toBeInTheDocument();
    expect(
        screen.getByText("TODO LIST with Description has empty values.")
    ).toBeInTheDocument();
});

it("adds a new TODO LIST row when clicking the green Add TODO LIST button", async () => {
    const user = userEvent.setup();
    render(<App />);

    const todoHeading = screen.getByRole("heading", { name: /^TODO LIST$/ });
    const todoSection = todoHeading.closest("section");
    if (!todoSection) throw new Error("TODO LIST section not found");

    const firstInput = within(todoSection).getByPlaceholderText("Task Name");
    await user.type(firstInput, "Walk");

    const before = within(todoSection).getAllByPlaceholderText("Task Name").length;


    const addBtn = within(todoSection).getByRole("button", { name: /add todo list/i });
    await user.click(addBtn);

    const after = within(todoSection).getAllByPlaceholderText("Task Name").length;
    expect(after).toBe(before + 1);
});
