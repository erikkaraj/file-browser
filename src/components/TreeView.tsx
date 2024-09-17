import React, { useState } from "react";
import { FileNode, initialTree } from "../utils/fileUtils";
import { ArrowIcon, FileIcon, FolderIcon } from "../utils/svgIcons";
import { FileCreationModal } from "../modal/FileCreationModal";
import { FolderCreationModal } from "../modal/FolderCreationModal";

type TreeViewProps = {
  onSelectFile: (file: File) => void;
};
const TreeView: React.FC<TreeViewProps> = ({ onSelectFile }) => {
  const [tree, setTree] = useState<FileNode[]>(initialTree);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("");

  const toggleNode = (path: string) => {
    setExpandedNodes((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      return newExpanded;
    });
  };

  const handleCreate = (
    path: string,
    type: "file" | "folder",
    name: string
  ) => {
    if (type === "file") {
      // Create a new file at the given path
      const newFile = {
        name,
        type: "file",
        content: type === "file" && name.endsWith(".txt") ? "" : "{}", // Default content for text or JSON
      };
      addNodeToPath(path, newFile, type);
    } else if (type === "folder") {
      // Create a new folder at the given path
      const newFolder = {
        name,
        type: "folder",
        children: [],
      };
      addNodeToPath(path, newFolder, type);
    }
  };

  const addNodeToPath = (
    path: string,
    newNode: {
      name: string;
      type: string;
      content?: string;
      children?: never[];
    },
    type: "file" | "folder"
  ) => {
    const addNode = (
      nodes: FileNode[],
      pathSegments: string[],
      newNode: FileNode
    ): FileNode[] => {
      if (pathSegments.length === 0) {
        return [...nodes, newNode];
      }
      return nodes.map((node) =>
        node.name === pathSegments[0]
          ? {
              ...node,
              children: addNode(
                node.children || [],
                pathSegments.slice(1),
                newNode
              ),
            }
          : node
      );
    };

    setTree(addNode(tree, path.split("/").filter(Boolean), newNode));
  };

  const handleDelete = (path: string) => {
    const removeNode = (
      nodes: FileNode[],
      pathSegments: string[]
    ): FileNode[] => {
      if (pathSegments.length === 0) {
        return [];
      }
      return nodes
        .map((node) =>
          node.name === pathSegments[0]
            ? {
                ...node,
                children: removeNode(
                  node.children || [],
                  pathSegments.slice(1)
                ),
              }
            : node
        )
        .filter(
          (node) => node.name !== pathSegments[0] || pathSegments.length > 1
        );
    };

    setTree(removeNode(tree, path.split("/").filter(Boolean)));
  };

  const handleFileClick = (node: FileNode) => {
    if (node.type === "file") {
      const file = new File([node.name], node.name, { type: "text/plain" });
      onSelectFile(file);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredTree = (nodes: FileNode[], filter: string): FileNode[] => {
    if (!filter) return nodes;

    const matchesFilter = (node: FileNode, path: string): boolean => {
      if (node.name.toLowerCase().includes(filter.toLowerCase())) return true;
      if (node.children) {
        return node.children.some((child) =>
          matchesFilter(child, `${path}/${child.name}`)
        );
      }
      return false;
    };

    const filterNodes = (nodes: FileNode[], path = ""): FileNode[] => {
      return nodes
        .map((node) => {
          const currentPath = path ? `${path}/${node.name}` : node.name;
          if (matchesFilter(node, currentPath)) {
            return {
              ...node,
              children: node.children
                ? filterNodes(node.children, currentPath)
                : [],
            };
          }
          return null;
        })
        .filter((node) => node !== null) as FileNode[];
    };

    return filterNodes(nodes);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const handleCreateFileModal = (path: string) => {
    setTargetPath(path);
    setModalOpen(true);
  };

  const handleCreateFile = (fileName: string, fileType: string) => {
    if (targetPath) {
      const fullFileName = `${fileName}.${fileType}`;
      handleCreate(targetPath, "file", fullFileName); // Use your existing create file logic here
    }
  };

  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [targetFolderPath, setTargetFolderPath] = useState<string | null>(null);

  const handleCreateFolderModal = (path: string) => {
    setTargetFolderPath(path);
    setFolderModalOpen(true);
  };

  const handleCreateFolder = (folderName: string) => {
    if (targetFolderPath) {
      handleCreate(targetFolderPath, "folder", folderName);
    }
  };

  const renderTree = (nodes: FileNode[], path = "") => (
    <>
      <FileCreationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateFile}
      />
      <FolderCreationModal
        isOpen={isFolderModalOpen}
        onClose={() => setFolderModalOpen(false)}
        onCreate={handleCreateFolder}
      />
      <ul className="list-none pl-4">
        {nodes.map((node) => {
          const currentPath = path ? `${path}/${node.name}` : node.name;
          return (
            <li key={currentPath} className="relative">
              <div className="flex items-center group hover:bg-gray-200 rounded-md p-1">
                {node.type === "folder" ? (
                  <div className="w-full flex items-center space-x-2 relative">
                    <div
                      onClick={() => toggleNode(currentPath)}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <ArrowIcon isOpen={expandedNodes.has(currentPath)} />
                      <FolderIcon />
                      <span>{node.name}</span>
                    </div>
                    <div className="ml-auto hidden group-hover:flex space-x-1 absolute right-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateFileModal(currentPath);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      >
                        Add File
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateFolderModal(currentPath);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      >
                        Add Folder
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(currentPath);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex items-center space-x-2 relative">
                    <div
                      onClick={() => handleFileClick(node)}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <FileIcon />
                      <span>{node.name}</span>
                    </div>
                    <div className="ml-auto hidden group-hover:flex space-x-1 absolute right-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(currentPath);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Render subfolders/files if the folder is expanded */}
              {expandedNodes.has(currentPath) && node.children && (
                <div className="pl-4">
                  {renderTree(node.children, currentPath)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <div className="treeview">
      <div className="mb-4 p-2">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter files and folders"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      {renderTree(filteredTree(tree, filter))}
    </div>
  );
};

export default TreeView;
