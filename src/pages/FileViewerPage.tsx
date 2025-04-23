// src/pages/FileViewerPage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ViewPDF from "../components/ViewPDF";
import FieldsExtracted from "../components/FieldsExtracted";

const FileViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const handleFieldClick = (pageNumber: number) => {
    // You can pass this to ViewPDF via props or a shared state
    console.log('Navigate to page:', pageNumber);
  };

  const handleReviewComplete = () => {
    console.log('Mark file as reviewed');
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Top bar: Back button and title */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Files
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          Extracted Information
        </h2>
      </div>

      {/* Main content split into two columns */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Left: File Viewer Section (3/4) */}
        <div className="w-3/4 bg-white border rounded-lg shadow p-0 overflow-auto">
          {/* Placeholder for file viewer */}
          {/* <p className="text-gray-400 italic">File viewer content goes here</p> */}
          <ViewPDF />
        </div>

        {/* Right: Extracted Fields Section (1/4) */}
        <div className="w-1/4 bg-white border rounded-lg shadow p-4 overflow-auto">
          {/* Placeholder for extracted fields */}
          <FieldsExtracted
            onFieldClick={handleFieldClick}
            onCompleteReview={handleReviewComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default FileViewerPage;
