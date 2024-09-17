export type FileNode = {
  name: string;
  type: string;
  content?: string;
  children?: FileNode[];
};

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
