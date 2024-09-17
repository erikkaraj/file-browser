import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTreeActions } from "../state/treeAtom";

interface FolderCreationModalProps {
  isOpen: boolean;
  targetPath: string;
  onClose: () => void;
}

export const FolderCreationModal: React.FC<FolderCreationModalProps> = ({
  isOpen,
  targetPath,
  onClose,
}) => {
  const [folderName, setFolderName] = useState("");
  const { handleCreate } = useTreeActions();

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      handleCreate(targetPath, "folder", folderName);
      setFolderName("");
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-lg font-semibold mb-4">Create a New Folder</div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Folder Name:</label>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter folder name"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateFolder}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </Dialog>
  );
};
