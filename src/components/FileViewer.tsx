import React, { useState, useEffect } from "react";

type FileViewerProps = {
  file: File | null;
};

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target?.result as string);
      };

      if (file.type === "image/png") {
        // Handle image display directly with URL.createObjectURL
        setContent("");
      } else {
        reader.readAsText(file);
      }
    }
  }, [file]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (file) {
      // Create a new Blob and simulate a file save
      const newFile = new File([content], file.name, { type: file.type });
      console.log("File saved:", newFile);
      // Here you might want to handle saving the file to a server or other storage
    }
    setIsEditing(false);
  };

  if (!file) {
    return <div className="file-viewer">No file selected</div>;
  }

  return (
    <div className="file-viewer">
      {file.type === "image/png" ? (
        <img
          src={URL.createObjectURL(file)}
          alt="PNG"
          className="w-full h-auto"
        />
      ) : (
        <div>
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 border p-2"
            />
          ) : (
            <pre className="whitespace-pre-wrap">{content}</pre>
          )}
          {["text/plain", "application/json"].includes(file.type) && (
            <div>
              <button
                onClick={handleEdit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileViewer;
