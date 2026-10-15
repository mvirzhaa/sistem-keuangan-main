import React, { useState, useRef, useEffect } from "react";
import { IoMenu } from "react-icons/io5";

interface ChartCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  chartRef?: React.RefObject<any>;
}

export default function ChartCard({
  title,
  children,
  className = "",
  chartRef,
}: ChartCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleAction = (type: "print" | "png" | "jpeg" | "pdf" | "svg") => {
    setMenuOpen(false);

    if (type === "print") {
      const el = cardContainerRef.current;
      if (!el) {
        window.print();
        return;
      }
      const printIframe = document.createElement("iframe");
      printIframe.style.position = "fixed";
      printIframe.style.right = "0";
      printIframe.style.bottom = "0";
      printIframe.style.width = "0";
      printIframe.style.height = "0";
      printIframe.style.border = "0";
      document.body.appendChild(printIframe);

      const frameDoc =
        printIframe.contentDocument || printIframe.contentWindow?.document;
      if (frameDoc) {
        const styles = Array.from(
          document.querySelectorAll('link[rel="stylesheet"], style'),
        )
          .map((s) => s.outerHTML)
          .join("\n");

        const clone = el.cloneNode(true) as HTMLElement;
        const menuBtn = clone.querySelector("[data-menu-container]");
        if (menuBtn) {
          menuBtn.remove();
        }

        frameDoc.open();
        frameDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title || "Chart"}</title>
              ${styles}
              <style>
                body {
                  margin: 0;
                  padding: 24px;
                  background: #ffffff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                @page { size: auto; margin: 15mm; }
              </style>
            </head>
            <body>
              <div style="width: 100%; max-width: 800px; margin: 0 auto;">
                ${clone.innerHTML}
              </div>
            </body>
          </html>
        `);
        frameDoc.close();

        setTimeout(() => {
          printIframe.contentWindow?.focus();
          printIframe.contentWindow?.print();
          setTimeout(() => {
            if (document.body.contains(printIframe)) {
              document.body.removeChild(printIframe);
            }
          }, 1000);
        }, 300);
      }
      return;
    }

    // Download canvas as image if available
    if (chartRef?.current) {
      const canvas =
        chartRef.current instanceof HTMLCanvasElement
          ? chartRef.current
          : chartRef.current.canvas ||
            chartRef.current.chart?.canvas;

      if (canvas && typeof canvas.toDataURL === "function") {
        const imageType = type === "jpeg" ? "image/jpeg" : "image/png";
        const url = canvas.toDataURL(imageType);
        const link = document.createElement("a");
        link.download = `${title || "chart"}.${type === "jpeg" ? "jpg" : "png"}`;
        link.href = url;
        link.click();
        return;
      }
    }

    console.log(`Action ${type} triggered for ${title}`);
  };

  return (
    <div
      ref={cardContainerRef}
      className={`relative p-2 sm:p-4 ${className}`}
    >
      {/* Top Header */}
      <div className="relative flex items-center justify-between mb-4">
        {/* Title (centered when possible) */}
        {title ? (
          <h3 className="w-full text-center text-base sm:text-lg font-semibold text-gray-800">
            {title}
          </h3>
        ) : (
          <div />
        )}

        {/* ☰ Export Menu button */}
        <div
          ref={menuContainerRef}
          data-menu-container="true"
          className="absolute right-0 top-0 z-20"
        >
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            aria-label="Chart context menu"
          >
            <IoMenu size={20} />
          </button>

          {/* Context menu dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-md shadow-lg border border-gray-200 py-1.5 z-30 text-xs sm:text-sm text-gray-700 animate-fade-in">
              <button
                type="button"
                onClick={() => handleAction("print")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Print chart
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                onClick={() => handleAction("png")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Download PNG image
              </button>
              <button
                type="button"
                onClick={() => handleAction("jpeg")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Download JPEG image
              </button>
              <button
                type="button"
                onClick={() => handleAction("pdf")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Download PDF document
              </button>
              <button
                type="button"
                onClick={() => handleAction("svg")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Download SVG vector image
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chart Canvas / Body */}
      <div className="w-full">{children}</div>
    </div>
  );
}
