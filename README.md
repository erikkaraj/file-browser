# Simple Web File Browser

## Project Overview

This project is a **simple web file browser** that allows users to **create, view, and delete** files and folders. The file browser is displayed as an expandable **treeview** on the left side, with a **viewer/editor** on the right side to display and optionally edit supported files.

Supported file types:

- PNG (image viewer)
- TXT (text editor)
- JSON (JSON editor)

Users can create new files and folders, delete existing ones, and filter files in the treeview. The application has been built using **React**, **TypeScript**, **Tailwind CSS**, and **HeadlessUI**, with unit tests written in **Jest**.

## Features

- **Treeview**: An expandable tree initialized with the `public/`, `server/`, and `src/` folders.
- **Viewer/Editor**: Displays content on the right side when a file is selected.
  - PNG: Displays the image.
  - TXT/JSON: Displays content with an optional edit button.
- **Create/Delete Functionality**:
  - Add file and folder buttons on folder hover.
  - Delete button on file and folder hover.
- **File/Folder Click**:
  - Clicking a folder shows subfolders and files.
  - Clicking a file opens it in the viewer/editor.
- **Filter**: Input field above the treeview for filtering files.
- **Icons**: Folder and file icons for better clarity.
- **Modals**:
  - File and folder creation modals.
  - Conditional file upload for PNG files.

## Tech Stack

- **React**: UI development.
- **TypeScript**: Type safety and project scalability.
- **Tailwind CSS**: For styling the UI.
- **HeadlessUI**: To implement modals and other interactive components.
- **Jest**: For unit testing the components and functionalities.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/simple-web-file-browser.git
   cd simple-web-file-browser
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Project

To run the project locally:

```bash
npm start
# or
yarn start
```

The project will start on `http://localhost:3000`.

### Running Tests

To run the unit tests:

```bash
npm test
# or
yarn test
```

### Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `build/` directory.

## Design Decisions

- **Treeview Implementation**: The file tree is dynamically rendered from an initial set of folders and files, with expand/collapse functionality. Only the hovered folder or file displays the action buttons.
- **File/Folder Creation**: Modal-based interface for creating files and folders, improving user experience.
- **Dynamic File Type Handling**: The modal dynamically adapts based on the file type (text input for TXT/JSON, file upload for PNG).
- **File Uploads**: PNG files are uploaded via an input field, while TXT and JSON files are created using text input.

## To-Do/Next Steps

- [ ] Expand JSON and TXT editing capabilities.
- [ ] Improve filtering by handling large datasets more efficiently.
- [ ] Add more unit tests for edge cases and complex behaviors.
- [ ] Potential improvements to UI and UX, like better error handling or drag-and-drop file creation.

## Deployment

You can deploy the project using any platform that supports static file hosting (e.g., Netlify, Vercel, or GitHub Pages).

**Steps for Deployment**:

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Deploy the contents of the `build/` folder to your preferred platform.
