export type FileNode = {
  name: string;
  type: string;
  content?: BlobPart;
  children?: FileNode[];
};
