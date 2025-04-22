import React, { useState } from "react";
import SearchFilterBar from "../components/SearchFilterBar";
import FileList from "../components/FileList";
import { File } from "../types";

const fileData: File[] = [
  { id: 1, name: "File 1 - AI Data", status: "reviewed" },
  { id: 2, name: "File 2 - Pending Review", status: "yet to review" },
  { id: 3, name: "File 3 - AI Data", status: "yet to review" },
  { id: 4, name: "File 4 - Final Report", status: "reviewed" },
  { id: 5, name: "File 5 - Pending Review", status: "yet to review" },
  { id: 6, name: "File 6 - AI Data", status: "reviewed" },
  { id: 7, name: "File 7 - Pending Review", status: "yet to review" },
  { id: 8, name: "File 8 - Final Report", status: "reviewed" },
  { id: 9, name: "File 9 - AI Data", status: "reviewed" },
  { id: 10, name: "File 10 - Pending Review", status: "yet to review" },
];

const FileBrowserPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "reviewed" | "yet to review">("all");

  return (
    <div className="bg-gray-100 min-h-screen">
      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />
      <FileList files={fileData} search={search} filter={filter} />
    </div>
  );
};

export default FileBrowserPage;
