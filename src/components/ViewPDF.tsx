// import { useCallback, useState } from 'react';
// import { useResizeObserver } from '@wojtekmaj/react-hooks';
// import { pdfjs, Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import pdfdoc from './sample.pdf'

// import './ViewPDF.css';

// import type { PDFDocumentProxy } from 'pdfjs-dist';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

// const options = {
//   cMapUrl: '/cmaps/',
//   standardFontDataUrl: '/standard_fonts/',
// };

// const resizeObserverOptions = {};

// const maxWidth = 800;

// type PDFFile = string | File | null;

// export default function Sample() {
//   const [file, setFile] = useState<PDFFile>(pdfdoc);
//   const [numPages, setNumPages] = useState<number>();
//   const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
//   const [containerWidth, setContainerWidth] = useState<number>();

//   const onResize = useCallback<ResizeObserverCallback>((entries) => {
//     const [entry] = entries;

//     if (entry) {
//       setContainerWidth(entry.contentRect.width);
//     }
//   }, []);

//   useResizeObserver(containerRef, resizeObserverOptions, onResize);

// //   function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
// //     const { files } = event.target;

// //     const nextFile = files?.[0];

// //     if (nextFile) {
// //       setFile(nextFile);
// //     }
// //   }

//   function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
//     setNumPages(nextNumPages);
//   }

//   return (
//     <div className="Example">
//       <div className="Example__container">
//         <div className="Example__container__document" ref={setContainerRef}>
//           <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
//             {Array.from(new Array(numPages), (_el, index) => (
//               <Page
//                 key={`page_${index + 1}`}
//                 pageNumber={index + 1}
//                 width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
//               />
//             ))}
//           </Document>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useCallback, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import samplePDF from "./sample.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import "./ViewPDF.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};
const maxWidth = 800;
type PDFFile = string | File | null;

const ViewPDF: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [file, setFile] = useState<PDFFile>(samplePDF);
  const [searchText, setSearchText] = useState<string>("aslkfdjalsdjf");

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number): void {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage(): void {
    changePage(-1);
  }

  function nextPage(): void {
    changePage(1);
  }

  const highlightPattern = (text: string, pattern: string) => {
    if (!pattern) return text;
    const regex = new RegExp(`(${pattern})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const textRenderer = useCallback(
    (textItem: any) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <div className="Example">
        <div className="Example__container">
          <div className="Example__container__document" ref={setContainerRef}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              <Page
                pageNumber={pageNumber}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
                customTextRenderer={textRenderer}
              />
            </Document>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-4">
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="text-gray-700 font-medium">
            Search:
          </label>
          <input
            type="search"
            id="search"
            value={searchText}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <p className="text-gray-700 text-sm">
          Page <span className="font-semibold">{pageNumber}</span> of{" "}
          <span className="font-semibold">{numPages || "--"}</span>
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className={`px-4 py-2 rounded-md text-white font-medium transition ${
              pageNumber <= 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <button
            type="button"
            disabled={!!numPages && pageNumber >= numPages}
            onClick={nextPage}
            className={`px-4 py-2 rounded-md text-white font-medium transition ${
              !!numPages && pageNumber >= numPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPDF;
