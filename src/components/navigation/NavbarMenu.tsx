import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { menuList } from "./MenuData";
import type { MenuItem } from "./MenuData";
import { filterMenuByRole } from "../../common/helpers/helpers";
import { useAuthStore } from "../../common/stores/authStore";

function DropdownMenu({
  items,
  level = 0,
  openPath,
  setOpenPath,
  parentPath = [],
}: {
  items: MenuItem[];
  level?: number;
  openPath: string[];
  setOpenPath: (val: string[]) => void;
  parentPath?: string[];
}) {
  // Filter berdasarkan showInNavbar dan role
  const visibleItems = items.filter((item) => item.showInNavbar !== false);

  return (
    <ul
      className={
        level === 0
          ? "flex space-x-4 align-middle items-center py-2 px-2 sm:px-[4rem] text-xs"
          : level === 1
          ? "absolute left-0 top-full mt-0 w-60 bg-white rounded shadow-xl  z-20"
          : "absolute left-full top-0 w-56 bg-white rounded shadow-xl z-30"
      }
    >
      {visibleItems.map((item) => {
        const currentPath = [...parentPath, item.menu];
        const isOpen = openPath.length > level && openPath[level] === item.menu;

        // Filter children berdasarkan role juga
        const visibleChildren = item.children?.filter(
          (child) => child.showInNavbar !== false,
        );
        const hasVisibleChildren =
          visibleChildren && visibleChildren.length > 0;

        return hasVisibleChildren ? (
          <li
            key={item.menu}
            className="relative group"
            onMouseEnter={() => setOpenPath(currentPath)}
            onMouseLeave={() => setOpenPath(parentPath)}
          >
            <button
              className={`${
                level === 0
                  ? "px-5 py-3"
                  : "flex justify-between w-full text-left px-4 py-2 m-2"
              } rounded transition-colors text-gray-800 hover:bg-green-800 hover:text-white flex items-center`}
              type="button"
              tabIndex={-1}
            >
              {item.menu}
              <svg
                className={`ml-2 w-3 h-3 ${
                  level === 0 ? "" : "rotate-[-90deg]"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isOpen && (
              <DropdownMenu
                items={item.children || []}
                level={level + 1}
                openPath={openPath}
                setOpenPath={setOpenPath}
                parentPath={currentPath}
              />
            )}
          </li>
        ) : item.route ? (
          <li key={item.route}>
            <Link
              to={item.route}
              className={`${
                level === 0 ? "px-5 py-3 m-2" : "block px-4 py-2 m-2"
              } rounded transition-colors text-gray-800 hover:bg-green-800 hover:text-white`}
              onClick={() => setOpenPath([])}
            >
              {item.menu}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}

function NavbarMenu() {
  const [openPath, setOpenPath] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Subscribe to auth store untuk re-render saat role berubah
  const activeRole = useAuthStore((state) => state.activeRole);

  // Filter menu berdasarkan role aktif
  const filteredMenuList = filterMenuByRole(menuList);

  // Close dropdown when click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenPath([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <DropdownMenu
        items={filteredMenuList}
        openPath={openPath}
        setOpenPath={setOpenPath}
      />
    </div>
  );
}

export default NavbarMenu;
