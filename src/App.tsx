import React, { useState } from "react";
import TreeView from "./components/TreeView"; // Ensure this path is correct
import FileViewer from "./components/FileViewer";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <RecoilRoot>
      <div className="app-container flex  h-screen">
        <div className="treeview-container w-1/3 bg-gray-300 p-4">
          <TreeView onSelectFile={handleFileSelect} />
        </div>
        <div className="fileviewer-container w-2/3 bg-white p-4">
          {selectedFile && <FileViewer file={selectedFile} />}
        </div>
      </div>
    </RecoilRoot>
  );
};

export default App;
