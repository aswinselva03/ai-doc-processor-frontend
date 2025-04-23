import React, { useState } from "react";

type Field = {
  id: number;
  name: string;
  value: string;
  page: number;
};

type FieldsExtractedProps = {
  onFieldClick: (pageNumber: number, text: string) => void;
  onCompleteReview: () => void;
};

const dummyFields: Field[] = [
  {
    id: 1,
    name: "Invoice Number",
    value: "Curabitur vel scelerisque odio",
    page: 2,
  },
  { id: 2, name: "Date", value: "Proin eleifend id sapien a dictum", page: 3 },
  { id: 3, name: "Total Amount", value: "Luctus Orci", page: 4 },
];

const FieldsExtracted: React.FC<FieldsExtractedProps> = ({
  onFieldClick,
  onCompleteReview,
}) => {
  const [fields, setFields] = useState<Field[]>(dummyFields);
  const [edited, setEdited] = useState(false);

  const handleFieldChange = (id: number, newValue: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value: newValue } : f))
    );
    setEdited(true);
  };

  const handleSave = () => {
    console.log("Saved fields:", fields);
    setEdited(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className="bg-gray-50 border border-gray-200 rounded p-3 shadow-sm hover:shadow cursor-pointer transition"
            onClick={() => onFieldClick(field.page, field.value)}
          >
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {field.name}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded outline-blue-500 text-sm"
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">Page {field.page}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!edited}
        className={`px-4 py-2 rounded mt-2 text-sm transition font-medium ${
          edited
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Save Changes
      </button>

      <button
        onClick={onCompleteReview}
        className="bg-emerald-600 text-white px-4 py-2 rounded mt-4 hover:bg-emerald-700 transition text-sm"
      >
        Complete Review
      </button>
    </div>
  );
};

export default FieldsExtracted;
