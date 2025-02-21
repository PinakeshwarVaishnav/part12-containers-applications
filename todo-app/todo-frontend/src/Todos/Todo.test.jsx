import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo Component", () => {
  const todo = { _id: "1", text: "Buy milk", done: false };
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();

  it("renders todo text", () => {
    render(
      <Todo
        todo={todo}
        onDelete={mockDeleteTodo}
        onComplete={mockCompleteTodo}
      />,
    );
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <Todo
        todo={todo}
        onDelete={mockDeleteTodo}
        onComplete={mockCompleteTodo}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(todo);
  });

  it('calls onComplete when "Set as done" button is clicked', () => {
    render(
      <Todo
        todo={todo}
        onComplete={mockCompleteTodo}
        onDelete={mockDeleteTodo}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Set as done" }));
    expect(mockCompleteTodo).toHaveBeenCalledTimes(1);
    expect(mockCompleteTodo).toHaveBeenCalledWith(todo);
  });

  it('does not render "Set as done" button when todo is done', () => {
    const doneTodo = { ...todo, done: true };
    render(
      <Todo
        todo={doneTodo}
        onComplete={mockCompleteTodo}
        onDelete={mockDeleteTodo}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "Set as done" }),
    ).not.toBeInTheDocument();
  });
});
