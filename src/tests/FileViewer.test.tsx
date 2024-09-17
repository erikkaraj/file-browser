import { render, screen, fireEvent } from "@testing-library/react";
import FileViewer from "../components/FileViewer";

const file = new File(["Hello world"], "example.txt", { type: "text/plain" });

test("renders FileViewer with a text file", () => {
  render(<FileViewer file={file} />);

  expect(screen.getByText("Hello world")).toBeInTheDocument();
});

test("renders FileViewer with an image file", () => {
  const imageFile = new File([], "example.png", { type: "image/png" });
  render(<FileViewer file={imageFile} />);

  expect(screen.getByAltText("PNG")).toBeInTheDocument();
});
