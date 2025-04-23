import React, { useCallback, useState, useEffect, useMemo } from "react";
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

const resizeObserverOptions = {};
const maxWidth = 800;

type ViewPDFProps = {
  currentPage: number;
  highlightText: string;
};

const ViewPDF: React.FC<ViewPDFProps> = ({ currentPage, highlightText }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(currentPage);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [file] = useState<string | File | null>(samplePDF);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);
  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy): void => {
    setNumPages(numPages);
  };

  const changePage = (offset: number): void => {
    setPageNumber((prev) => prev + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const escapeRegExp = (string: string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlightPattern = (text: string, pattern: string) => {
    if (!pattern) return text;

    const escapedPattern = escapeRegExp(pattern);
    const regex = new RegExp(`(${escapedPattern})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const textRenderer = useCallback(
    (textItem: any) => highlightPattern(textItem.str, highlightText),
    [highlightText]
  );

  const memoizedOptions = useMemo(
    () => ({
      cMapUrl: "/cmaps/",
      standardFontDataUrl: "/standard_fonts/",
    }),
    []
  );

  return (
    <div>
      <div className="Example">
        <div className="Example__container">
          <div className="Example__container__document" ref={setContainerRef}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={memoizedOptions}
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
        <p className="text-gray-700 text-sm">
          Page <span className="font-semibold">{pageNumber}</span> of{" "}
          <span className="font-semibold">{numPages || "--"}</span>
        </p>

        <div className="flex gap-4 mb-2">
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
