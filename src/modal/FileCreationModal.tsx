import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface FileCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (fileName: string, fileType: string, fileContent?: File) => void;
}

export const FileCreationModal: React.FC<FileCreationModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("txt");
  const [fileContent, setFileContent] = useState<File | null>(null);

  const handleCreate = () => {
    if (fileName.trim()) {
      onCreate(fileName, fileType, fileContent || undefined);
      setFileName("");
      setFileContent(null);
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileContent(e.target.files[0]);
      setFileName(e.target.files[0].name.split(".")[0]); // Use the uploaded file's name without extension
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-lg font-semibold mb-4">Create a New File</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">File Type:</label>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="txt">Text File (.txt)</option>
            <option value="json">JSON File (.json)</option>
            <option value="png">Image File (.png)</option>
          </select>
        </div>

        {fileType === "png" ? (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upload Image:
            </label>
            <input
              type="file"
              accept=".png"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">File Name:</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter file name"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </Dialog>
  );
};
