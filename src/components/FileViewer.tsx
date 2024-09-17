import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

interface FileViewerProps {
  file: File;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null); // For image files

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
        const result = e.target?.result as string;
        setContent(result);
      };

      if (file.type === "application/json" || file.type === "text/plain") {
        reader.readAsText(file);
      }
    }
  }, [file]);

  if (file.type === "image/png") {
    return (
      <img
        src={fileURL || ""}
        alt={file.name}
        className="max-w-full max-h-screen"
      />
    );
  }
  if (file.type === "text/plain" || file.type === "application/json") {
    console.log(file, "file");

    return (
      <div className="w-full h-full">
        <Editor
          height="80vh"
          language={file.type === "application/json" ? "json" : "text"}
          value={content as string}
          onChange={(value) => setContent(value || "")}
          options={{ readOnly: false }}
        />
      </div>
    );
  }

  return <div>Unsupported file type</div>;
};

export default FileViewer;
