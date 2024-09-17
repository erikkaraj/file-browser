import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { FileNode } from "../utils/fileUtils";

// Define the initial tree state
export const initialTree: FileNode[] = [
  {
    name: "public",
    type: "folder",
    children: [],
  },
  {
    name: "server",
    type: "folder",
    children: [],
  },
  {
    name: "src",
    type: "folder",
    children: [],
  },
];

// Define the atom
export const treeState = atom<FileNode[]>({
  key: "treeState",
  default: initialTree,
});

// Define a selector for creating and deleting nodes
export const treeActions = selector({
  key: "treeActions",
  get: ({ get }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tree = get(treeState);

    const addNodeToPath = (
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
              children: addNodeToPath(
                node.children || [],
                pathSegments.slice(1),
                newNode
              ),
            }
          : node
      );
    };

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

    return {
      addNodeToPath,
      removeNode,
    };
  },
});

export const useTreeActions = () => {
  const [tree, setTree] = useRecoilState(treeState);
  const { addNodeToPath, removeNode } = useRecoilValue(treeActions);

  const handleCreate = (
    path: string,
    type: string,
    name: string,
    file?: BlobPart
  ) => {
    const newNode: FileNode = {
      name,
      type,
      ...(type !== "folder" ? { content: file } : { children: [] }),
    };
    console.log(newNode, "newNode");

    setTree((prevTree) =>
      addNodeToPath(prevTree, path.split("/").filter(Boolean), newNode)
    );
  };

  const handleDelete = (path: string) => {
    setTree((prevTree) =>
      removeNode(prevTree, path.split("/").filter(Boolean))
    );
  };

  return {
    tree,
    handleCreate,
    handleDelete,
  };
};
