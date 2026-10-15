import { useState, useRef, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";

export default function NavbarNotificationMenu() {
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
        aria-label="Notifikasi"
      >
        <IoMdNotifications className="text-white text-base" />
      </button>

      {/* Popover Notifikasi */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-2 z-50 animate-fade-in">
          {/* Arrow / Triangle Pointer */}
          <div className="absolute top-0.5 right-3 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white drop-shadow-xs" />

          {/* Card Content */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-4 px-6 whitespace-nowrap">
            <p className="text-sm text-gray-700 font-normal">
              Anda tidak memiliki notifikasi
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
