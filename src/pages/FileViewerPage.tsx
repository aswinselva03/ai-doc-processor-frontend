import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewPDF from "../components/ViewPDF";
import FieldsExtracted from "../components/FieldsExtracted";

const FileViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [highlightText, setHighlightText] = useState<string>("");

  const handleFieldClick = (pageNumber: number, text: string) => {
    setCurrentPage(pageNumber);
    setHighlightText(text);
  };

  const handleReviewComplete = () => {
    console.log("Mark file as reviewed");
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
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

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="w-3/4 bg-white border rounded-lg shadow p-0 overflow-auto">
          <ViewPDF currentPage={currentPage} highlightText={highlightText} />
        </div>

        <div className="w-1/4 bg-white border rounded-lg shadow p-4 overflow-auto">
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
