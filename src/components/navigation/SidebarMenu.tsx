import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { menuList } from "./MenuData";
import type { MenuItem } from "./MenuData";

function SidebarDropdown({ items, level = 0, openPath, setOpenPath, parentPath = [], onClose }: { items: MenuItem[]; level?: number; openPath: string[]; setOpenPath: (val: string[]) => void; parentPath?: string[]; onClose: () => void }) {
  // Filter items yang akan ditampilkan di sidebar
  const visibleItems = items.filter((item) => item.showInNavbar !== false);

  return (
    <ul className={level === 0 ? "flex flex-col gap-1 p-4" : "pl-4"}>
      {visibleItems.map((item) => {
        const currentPath = [...parentPath, item.menu];
        const isOpen = openPath.length > level && openPath[level] === item.menu;

        // Filter children yang visible
        const visibleChildren = item.children?.filter((child) => child.showInNavbar !== false);
        const hasVisibleChildren = visibleChildren && visibleChildren.length > 0;

        return hasVisibleChildren ? (
          <li key={item.menu}>
            <button
              className="w-full flex justify-between items-center px-3 py-2 rounded text-left text-gray-800 hover:bg-green-800 hover:text-white transition-colors"
              onClick={() => (isOpen ? setOpenPath(parentPath) : setOpenPath(currentPath))}
            >
              {item.menu}
              <svg className={`ml-2 w-3 h-3 ${isOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {isOpen && <SidebarDropdown items={visibleChildren} level={level + 1} openPath={openPath} setOpenPath={setOpenPath} parentPath={currentPath} onClose={onClose} />}
          </li>
        ) : item.route ? (
          <li key={item.route}>
            <Link to={item.route} className="block px-3 py-2 rounded text-gray-800 hover:bg-green-800 hover:text-white transition-colors" onClick={onClose}>
              {item.menu}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}

function SidebarMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openPath, setOpenPath] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  // Reset openPath when sidebar closed
  useEffect(() => {
    if (!open) setOpenPath([]);
  }, [open]);

  return (
    <div ref={sidebarRef} className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} sm:hidden flex flex-col`}>
      <div className="flex justify-between items-center p-4 border-b">
        <span className="font-bold text-lg">SIM Keuangan</span>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-2xl">
          &times;
        </button>
      </div>
      <div className="overflow-y-auto flex-grow">
        <SidebarDropdown items={menuList} openPath={openPath} setOpenPath={setOpenPath} onClose={onClose} />
      </div>
    </div>
  );
}

export default SidebarMenu;
