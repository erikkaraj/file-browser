import { render, screen, fireEvent } from "@testing-library/react";
import TreeView from "../components/TreeView"; // Ensure the path is correct

// Mock function to be passed as the onSelectFile prop
const mockOnSelectFile = jest.fn();

test("renders TreeView with initial folders", () => {
  render(<TreeView onSelectFile={mockOnSelectFile} />);

  // Check if folders are rendered
  expect(screen.getByText("public")).toBeInTheDocument();
  expect(screen.getByText("server")).toBeInTheDocument();
  expect(screen.getByText("src")).toBeInTheDocument();
});

test("expands and collapses folders", () => {
  render(<TreeView onSelectFile={mockOnSelectFile} />);

  // Click to expand 'server' folder
  fireEvent.click(screen.getByText("server"));
  expect(screen.getByText("api.ts")).toBeInTheDocument();

  // Click to collapse 'server' folder
  fireEvent.click(screen.getByText("server"));
  expect(screen.queryByText("api.ts")).not.toBeInTheDocument();
});
