import React from "react";
import { FileListProps } from "../types";

const FileList: React.FC<FileListProps> = ({ files, search, filter }) => {
  const filteredFiles = files
    .filter((file) => file.name.toLowerCase().includes(search.toLowerCase()))
    .filter((file) => filter === "all" || file.status === filter);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {filteredFiles.length > 0 ? (
        <ul className="space-y-2">
          {filteredFiles.map((file) => (
            <li
              key={file.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{file.name}</h3>
              <p className="text-sm text-gray-500">
                Status: <span className={file.status === "reviewed" ? "text-emerald-600" : "text-orange-500"}>{file.status}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files found</p>
      )}
    </div>
  );
};

export default FileList;
