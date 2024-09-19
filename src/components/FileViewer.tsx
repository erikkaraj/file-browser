import React, { useEffect, useState } from "react";
import { useTreeActions } from "../state/treeAtom";

interface FileViewerProps {
  file: File;
  targetPath: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, targetPath }) => {
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [fileURL, setFileURL] = useState<string | null>(null); // For image files
  const { handleUpdate } = useTreeActions();

  useEffect(() => {
    if (!file || file.size === 0) {
      setContent(null);
      setFileURL(null);
      return;
    }

    if (file.type === "image/png") {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      return () => URL.revokeObjectURL(url);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = (e.target?.result as string) || "";
        setContent(result);
      };

      if (file.type === "application/json" || file.type === "text/plain") {
        reader.readAsText(file);
      }
    }
  }, [file]);

  const handleSave = () => {
    setDisableButton(true);

    if (!content) return;
    //This timeout should give a good user experience and clear feedback that something is happening in the background while saving the file!
    setTimeout(() => {
      handleUpdate(targetPath, { content });
      setDisableButton(false);
    }, 500);
  };

  if (file.type === "image/png") {
    return (
      <div className="border-3 rounded-md">
        <img
          src={fileURL || ""}
          alt={file.name}
          className="max-w-full max-h-screen"
        />
      </div>
    );
  }
  if (file.type === "text/plain" || file.type === "application/json") {
    return (
      <div className="w-full h-full ">
        <div>
          <div>
            <textarea
              className="w-full h-4/5 border-3 rounded-md"
              style={{ height: "500px" }}
              data-testid="text-editor"
              value={(content as string) || ""}
              onChange={(e) => setContent(e.target.value || "")}
              readOnly={false} // Ensure editor is editable
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 mt-4 text-white rounded-md ${
            disableButton ? " bg-gray-500" : " bg-blue-500"
          }`}
          disabled={disableButton}
          data-testid="save-text"
        >
          {disableButton ? "Saving..." : "Save"}
        </button>
      </div>
    );
  }

  return <div>Unsupported file type</div>;
};

export default FileViewer;
