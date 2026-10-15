import { Link } from "react-router-dom";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { menuList } from "./MenuData";
import type { MenuItem } from "./MenuData";
import { filterMenuByRole } from "../../common/helpers/helpers";
import { useAuthStore } from "../../common/stores/authStore";

interface DropdownMenuProps {
  items: MenuItem[];
  level?: number;
  openPath: string[];
  setOpenPath: (val: string[]) => void;
  parentPath?: string[];
  openToLeft?: boolean;
  alignRight?: boolean;
}

function DropdownItem({
  item,
  level,
  openPath,
  setOpenPath,
  parentPath,
  parentOpensLeft = false,
}: {
  item: MenuItem;
  level: number;
  openPath: string[];
  setOpenPath: (val: string[]) => void;
  parentPath: string[];
  parentOpensLeft?: boolean;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [opensLeft, setOpensLeft] = useState(parentOpensLeft);
  const [alignsRight, setAlignsRight] = useState(false);

  const currentPath = [...parentPath, item.menu];
  const isOpen = openPath.length > level && openPath[level] === item.menu;

  const visibleChildren = item.children?.filter(
    (child) => child.showInNavbar !== false,
  );
  const hasVisibleChildren = Boolean(
    visibleChildren && visibleChildren.length > 0,
  );

  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const submenuWidth = 240;
      const padding = 16;

      if (level === 0) {
        // Dropdown level 1 (langsung di bawah navbar):
        // Jika membuka ke kanan akan melebihi batas kanan layar, maka align ke kanan
        const wouldOverflowRight =
          rect.left + submenuWidth > window.innerWidth - padding;
        setAlignsRight(wouldOverflowRight);
      } else {
        // Submenu level 2+:
        // Jika parent sudah terbuka ke arah kiri atau jika membuka ke kanan akan melebihi layar,
        // buka ke arah kiri (right-full)
        const wouldOverflowRight =
          rect.right + submenuWidth > window.innerWidth - padding;
        setOpensLeft(parentOpensLeft || wouldOverflowRight);
      }
    }
    setOpenPath(currentPath);
  };

  if (!hasVisibleChildren && !item.route) {
    return null;
  }

  if (hasVisibleChildren) {
    return (
      <li
        ref={itemRef}
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setOpenPath(parentPath)}
      >
        <button
          className={`${
            level === 0
              ? "px-4 lg:px-4.5 py-3"
              : "flex justify-between w-full text-left px-3.5 py-2 my-0.5"
          } rounded transition-colors ${
            isOpen
              ? "bg-green-800 text-white"
              : "text-gray-800 hover:bg-green-800 hover:text-white"
          } flex items-center select-none cursor-pointer`}
          type="button"
          tabIndex={-1}
        >
          <span>{item.menu}</span>
          <svg
            className={`ml-2 w-3 h-3 transition-transform duration-150 ${
              level === 0
                ? isOpen
                  ? "rotate-180"
                  : ""
                : opensLeft
                  ? "rotate-[90deg]" // Panah ke kiri (<) jika submenu terbuka ke kiri
                  : "rotate-[-90deg]" // Panah ke kanan (>) jika submenu terbuka ke kanan
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
            openToLeft={opensLeft}
            alignRight={alignsRight}
          />
        )}
      </li>
    );
  }

  return (
    <li className="relative">
      <Link
        to={item.route!}
        className={`${
          level === 0 ? "px-4 lg:px-4.5 py-3 block" : "block px-3.5 py-2 my-0.5 w-full"
        } rounded transition-colors text-gray-800 hover:bg-green-800 hover:text-white`}
        onClick={() => setOpenPath([])}
      >
        {item.menu}
      </Link>
    </li>
  );
}

function DropdownMenu({
  items,
  level = 0,
  openPath,
  setOpenPath,
  parentPath = [],
  openToLeft = false,
  alignRight = false,
}: DropdownMenuProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const [runtimeFlipLeft, setRuntimeFlipLeft] = useState(false);

  // Filter berdasarkan showInNavbar
  const visibleItems = items.filter((item) => item.showInNavbar !== false);

  // Runtime boundary check: jika setelah dirender elemen masih tembus batas kanan viewport,
  // paksa posisi ke arah kiri agar tidak memecahkan layout halaman
  useLayoutEffect(() => {
    if (level > 0 && ulRef.current) {
      const rect = ulRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth - 8) {
        setRuntimeFlipLeft(true);
      }
    }
  }, [level]);

  const effectiveOpenLeft = openToLeft || runtimeFlipLeft;

  let menuPositionClass = "";
  if (level === 0) {
    menuPositionClass =
      "flex flex-wrap space-x-2 lg:space-x-3 align-middle items-center py-2 text-xs";
  } else if (level === 1) {
    // Dropdown pertama di bawah item navbar
    menuPositionClass = `absolute top-full mt-0 w-60 bg-white rounded shadow-xl z-50 py-1.5 px-1.5 ${
      alignRight || runtimeFlipLeft ? "right-0 left-auto" : "left-0 right-auto"
    }`;
  } else {
    // Submenu bertingkat level 2+
    // -mr-1 atau -ml-1 memberikan sedikit overlap 4px agar transisi kursor mouse tidak terputus
    menuPositionClass = `absolute top-0 w-56 bg-white rounded shadow-xl z-50 py-1.5 px-1.5 ${
      effectiveOpenLeft
        ? "right-full left-auto -mr-1"
        : "left-full right-auto -ml-1"
    }`;
  }

  return (
    <ul ref={ulRef} className={menuPositionClass}>
      {visibleItems.map((item) => (
        <DropdownItem
          key={item.menu}
          item={item}
          level={level}
          openPath={openPath}
          setOpenPath={setOpenPath}
          parentPath={parentPath}
          parentOpensLeft={effectiveOpenLeft || alignRight}
        />
      ))}
    </ul>
  );
}

function NavbarMenu() {
  const [openPath, setOpenPath] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Subscribe to auth store untuk re-render saat role berubah
  useAuthStore((state) => state.activeRole);

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
