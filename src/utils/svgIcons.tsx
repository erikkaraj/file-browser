// src/utils/svgIcons.tsx

import React from "react";

// Arrow Icon
export const ArrowIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    className={`w-4 h-4 transform ${isOpen ? "rotate-90" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// Folder Icon
export const FolderIcon: React.FC = () => (
  <svg
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="yellow"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
  </svg>
);

// File Icon
export const FileIcon: React.FC = () => (
  <svg
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="gray"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-4-4z" />
  </svg>
);
