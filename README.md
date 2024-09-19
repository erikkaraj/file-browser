# File Browser Application

This project is a file browser built using React, TypeScript, Tailwind CSS, HeadlessUI, and Recoil.
It features a treeview for managing files and folders, with functionality to view and edit file contents such as `.txt` and `.json` files, and upload `.png`, `.txt`, and `.json` files.

## Features

- Expandable Treeview for browsing folders and files.
- File upload functionality for `.png`, `.txt`, and `.json` files.
- Image viewer for `.png` files.
- Editable file viewer for `.txt` and `.json` files using a text editor (Monaco Editor).
- Create and delete files and folders dynamically.
- Save updates to `.txt` and `.json` files.

---

## Design and Data Modeling Decisions

### 1. **TreeView Structure**

The file structure in the app is modeled as a tree, where each node can either be a file or a folder. The folder nodes can have children, while file nodes contain content (such as text or images).

#### FileNode Type

```ts
export type FileNode = {
  name: string;
  type: string; // "file" or "folder"
  content?: BlobPart; // Content of the file (text or binary data)
  children?: FileNode[]; // Sub-files or folders for folders
};
```

### 2. **State Management**

State is managed globally using Recoil for easy access and manipulation of the file tree across different components.

#### `treeAtom`:

The initial file structure and all functions for creating, deleting, and modifying files are centralized in the `treeAtom`. This allows consistent updates to the file tree across the application.

### 3. **File Handling**

- **Image files (`.png`)**: Displayed using the native browser image handling with `URL.createObjectURL`.
- **Text files (`.txt` and `.json`)**: Edited using the Monaco Editor. The editor provides syntax highlighting for JSON and a plain text mode for `.txt` files.

### 4. **File Upload & Save**

- Files are uploaded using an HTML input element and processed to extract their content for either viewing (in the case of images) or editing (in the case of text files).
- A save button allows the user to download updated `.txt` and `.json` files after editing.

---

## Instructions

### Prerequisites

- **Node.js**: Ensure that Node.js and npm are installed. This project runs with node v16.16.0.
- **Package Manager**: This project uses npm as the package manager.

### 1. **Installation**

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd file-browser-app
npm install
```

### 2. **Running the Application**

To start the development server, run:

```bash
npm start
```

This will start the app in development mode on `http://localhost:3000`.

### 3. **Building the Application**

To build the application for production, run:

```bash
npm run build
```

This will create an optimized production build in the `build` folder. The application will be ready for deployment.

### 4. **Testing the Application**

This project uses Jest for unit testing. To run the tests:

```bash
npm run test
```

Ensure that any new components or state management logic added is accompanied by relevant tests to maintain the integrity of the project.

---

## Deployment

You can deploy the production build of this application to any static hosting provider such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

### Steps for deployment:

1. Run the build command:

   ```bash
   npm run build
   ```

2. Upload the contents of the `build` directory to your hosting platform.

---

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: TypeScript provides static typing for improved code quality.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **HeadlessUI**: A set of completely unstyled, accessible UI components designed to integrate seamlessly with Tailwind.
- **Recoil**: State management for React applications.
- **Monaco Editor**: The editor behind Visual Studio Code, used to edit `.txt` and `.json` files.

---

## Future Improvements

- Add support for more file types such as `.md`, `.csv`, etc.
- Implement drag-and-drop functionality for file uploads and folder restructuring.
- Add additional features like renaming files and folders.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature additions or bug fixes.

---

This `README.md` file gives a comprehensive overview of the project's structure, design decisions, and how to run, test, and deploy the app.
