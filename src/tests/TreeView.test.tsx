/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-node-access */
import { RecoilRoot } from "recoil";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TreeView from "../components/TreeView";
import { treeState } from "../state/treeAtom";

// Mock tree data for the test
const mockTreeData = [
  {
    name: "index",
    type: "file",
    children: [{ name: "index.html", type: "file", content: "<html></html>" }],
  },
  {
    name: "public",
    type: "folder",
    content: "// JavaScript file",
  },
  {
    name: "src",
    type: "folder",
    children: [
      { name: "index.js", type: "file", content: "// JavaScript file" },
    ],
  },
];

const mockOnSelectFile = jest.fn();

beforeEach(() => {
  jest.clearAllMocks(); // Clear mocks before each test
});

describe("TreeView Component", () => {
  test("renders the initial tree structure", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(treeState, mockTreeData);
        }}
      >
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
  });

  test("expands and collapses folder nodes", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(treeState, mockTreeData);
        }}
      >
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    const folderNode = screen.getByText("src").closest("div");
    if (folderNode) {
      fireEvent.click(folderNode);
      expect(screen.getByText("index.js")).toBeInTheDocument();
      fireEvent.click(folderNode);

      expect(screen.queryByText("index.js")).not.toBeInTheDocument();
    } else {
      throw new Error("Folder node not found");
    }
  });

  test("calls onSelectFile when a file is clicked", () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(treeState, mockTreeData);
        }}
      >
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    const folderNode = screen.getByText("src").closest("div");

    if (folderNode) {
      fireEvent.click(folderNode);
      const fileNode = screen.getByText("index.js").closest("div");

      if (fileNode) {
        fireEvent.click(fileNode);
        expect(mockOnSelectFile).toHaveBeenCalledWith(
          expect.any(File),
          "src/index.js"
        );
      } else {
        throw new Error("File node not found");
      }
    } else {
      throw new Error("Folder node not found");
    }
  });

  test("filters nodes based on input", async () => {
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(treeState, mockTreeData);
        }}
      >
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    const filterInput = screen.getByPlaceholderText("Filter files and folders");
    fireEvent.change(filterInput, { target: { value: "index" } });
    expect(screen.getByText("index")).toBeInTheDocument();
    expect(screen.queryByText("public")).not.toBeInTheDocument();
  });

  test("handles File creation modal opening", async () => {
    render(
      <RecoilRoot>
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText("public"));
    fireEvent.click(screen.getAllByText("Add File")[0]);

    await waitFor(() => {
      const modal = screen.queryByTestId("file-modal-public");
      if (modal) {
        expect(modal).toBeInTheDocument();
        expect(modal).toBeVisible();
      } else {
        throw new Error("File creation modal was not found.");
      }
    });
  });

  test("handles Folder creation modal opening", async () => {
    render(
      <RecoilRoot>
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText("public"));
    fireEvent.click(screen.getAllByText("Add Folder")[0]);

    await waitFor(() => {
      const modal = screen.queryByTestId("folder-modal-public");
      if (modal) {
        expect(modal).toBeInTheDocument();
        expect(modal).toBeVisible();
      } else {
        throw new Error("Folder creation modal was not found.");
      }
    });
  });

  test("handles node deletion", async () => {
    render(
      <RecoilRoot>
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText("src"));
    const deleteButton = screen.getByTestId("delete-src");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("src")).not.toBeInTheDocument();
    });
  });

  test("closes folder creation modal", async () => {
    render(
      <RecoilRoot>
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText("public"));
    fireEvent.click(screen.getAllByText("Add Folder")[0]);

    await screen.findByTestId("folder-modal-public");
    expect(screen.getByTestId("folder-modal-public")).toBeVisible();

    const closeButton = screen.getByTestId("close-folder-modal");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId("folder-modal-public")
      ).not.toBeInTheDocument();
    });
  });

  test("closes file creation modal", async () => {
    render(
      <RecoilRoot>
        <TreeView onSelectFile={mockOnSelectFile} />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText("public"));
    fireEvent.click(screen.getAllByText("Add File")[0]);

    await screen.findByTestId("file-modal-public");
    expect(screen.getByTestId("file-modal-public")).toBeVisible();

    const closeButton = screen.getByTestId("close-file-modal");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId("file-modal-public")).not.toBeInTheDocument();
    });
  });
});
