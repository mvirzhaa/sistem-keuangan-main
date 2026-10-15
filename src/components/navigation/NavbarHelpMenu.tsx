import { useState, useRef, useEffect } from "react";
import { IoMdHelpCircle } from "react-icons/io";
import { IoCalendarOutline, IoHelpCircleOutline } from "react-icons/io5";

export default function NavbarHelpMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = isHovered || isClicked;

  // Click outside listener untuk menutup popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false);
        setIsHovered(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`p-2 w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer ${
          isOpen
            ? "bg-black/25 text-white"
            : "hover:bg-black/15 text-white/90 hover:text-white"
        }`}
        aria-label="Dokumen Pendukung / Bantuan"
      >
        <IoMdHelpCircle className="text-white text-base" />
      </button>

      {/* Popover Bantuan / Dokumen Pendukung */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-2 z-50 animate-fade-in">
          {/* Arrow / Triangle Pointer */}
          <div className="absolute top-0.5 right-3 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white drop-shadow-xs" />

          {/* Card Content */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-64 sm:w-72 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-gray-100">
              <h4 className="text-sm font-normal text-gray-800">
                Dokumen Pendukung / UG
              </h4>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1">
              {/* Release Notes */}
              <a
                href="#release-notes"
                onClick={(e) => {
                  e.preventDefault();
                  setIsClicked(false);
                  setIsHovered(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f39c12] flex items-center justify-center shrink-0 shadow-xs">
                  <IoCalendarOutline className="text-white text-lg" />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Release Notes
                </span>
              </a>


              {/* FAQ */}
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  setIsClicked(false);
                  setIsHovered(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[#00b4d8] flex items-center justify-center shrink-0 shadow-xs">
                  <IoHelpCircleOutline className="text-white text-xl" />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  FAQ
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
