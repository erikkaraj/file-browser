import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTreeActions } from "../state/treeAtom";

interface FileCreationModalProps {
  isOpen: boolean;
  targetPath: string;
  onClose: () => void;
}

export const FileCreationModal: React.FC<FileCreationModalProps> = ({
  isOpen,
  targetPath,
  onClose,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { handleCreate } = useTreeActions();

  const handleCreateFile = () => {
    if (uploadedFile) {
      handleCreate(
        targetPath,
        uploadedFile.type,
        uploadedFile.name,
        uploadedFile
      );
      setUploadedFile(null);
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-lg font-semibold mb-4">Upload a New File</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload File:</label>
          <input
            type="file"
            accept=".png, .txt, .json"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateFile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={!uploadedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </Dialog>
  );
};
