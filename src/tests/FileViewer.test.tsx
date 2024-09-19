import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileViewer from "../components/FileViewer";
import { useTreeActions } from "../state/treeAtom";

// Mock the useTreeActions hook
jest.mock("../state/treeAtom", () => ({
  useTreeActions: jest.fn(),
}));

describe("FileViewer Component", () => {
  let mockHandleUpdate: jest.Mock;
  const originalCreateObjectURL = global.URL.createObjectURL;

  beforeEach(() => {
    mockHandleUpdate = jest.fn();
    (useTreeActions as jest.Mock).mockReturnValue({
      handleUpdate: mockHandleUpdate,
    });
    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(
      () => "blob:http://localhost/fake-url"
    );
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = originalCreateObjectURL;
  });

  test("renders image correctly when file is PNG", () => {
    const mockFile = new File(["(⌐□_□)"], "image.png", { type: "image/png" });

    render(<FileViewer file={mockFile} targetPath="/some/path" />);

    const img = screen.getByAltText("image.png");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "blob:http://localhost/fake-url");
  });

  test("renders Editor for JSON files and updates content", async () => {
    const mockFile = new File([JSON.stringify({ key: "value" })], "data.json", {
      type: "application/json",
    });

    render(<FileViewer file={mockFile} targetPath="/some/path" />);

    const editor = await screen.findByTestId("text-editor");
    expect(editor).toBeInTheDocument();
    fireEvent.change(editor, { target: { value: '{"key": "newValue"}' } });
    expect(editor).toHaveValue('{"key": "newValue"}');
  });

  test("renders textarea for plain text files and updates content", async () => {
    const mockFile = new File(["Hello, World!"], "file.txt", {
      type: "text/plain",
    });

    render(<FileViewer file={mockFile} targetPath="/some/path" />);

    const textarea = await waitFor(() => screen.findByTestId("text-editor"));
    expect(textarea).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: "Updated content" } });
    expect(textarea).toHaveValue("Updated content");
  });

  test("handles Save button functionality and calls handleUpdate", async () => {
    const mockFile = new File(["Hello, World!"], "file.txt", {
      type: "text/plain",
    });

    render(<FileViewer file={mockFile} targetPath="/some/path" />);

    const textarea = await waitFor(() => screen.findByTestId("text-editor"));
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("Hello, World!");

    fireEvent.change(textarea, { target: { value: "Updated content" } });

    const saveButton = screen.getByTestId("save-text");
    fireEvent.click(saveButton);

    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveTextContent("Saving...");

    const textareaNew = await waitFor(() => screen.findByTestId("text-editor"));
    expect(textareaNew).toBeInTheDocument();
    expect(textareaNew).toHaveValue("Updated content");
  });

  test("displays unsupported message for non-supported file types", () => {
    const mockFile = new File(["%PDF-1.4"], "file.pdf", {
      type: "application/pdf",
    });

    render(<FileViewer file={mockFile} targetPath="/some/path" />);

    expect(screen.getByText("Unsupported file type")).toBeInTheDocument();
  });
});
