// src/App.tsx

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FileBrowserPage from "./pages/FileBrowserPage";
import FileViewerPage from "./pages/FileViewerPage";

import "./App.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<FileBrowserPage />} />
          <Route path="/file/:id" element={<FileViewerPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
