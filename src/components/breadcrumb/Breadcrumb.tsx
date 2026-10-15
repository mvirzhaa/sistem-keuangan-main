import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropright, IoMdHome } from "react-icons/io";
import { useMemo } from "react";
import { menuList, type MenuItem } from "../navigation/MenuData";

function Breadcrumb() {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbItems = useMemo(() => {
    const normalizedPath =
      currentPath.length > 1 && currentPath.endsWith("/")
        ? currentPath.slice(0, -1)
        : currentPath;

    // Fungsi untuk mencari breadcrumb berdasarkan path persis
    const findBreadcrumbPath = (
      items: MenuItem[],
      targetPath: string,
      current: MenuItem[] = [],
    ): MenuItem[] | null => {
      for (const item of items) {
        const newPath = [...current, item];

        // Jika item ini adalah target, kembalikan path
        if (item.route === targetPath) {
          return newPath;
        }

        // Jika item memiliki children, cari di dalamnya
        if (item.children) {
          const result = findBreadcrumbPath(item.children, targetPath, newPath);
          if (result) return result;
        }
      }

      return null;
    };

    // Temukan breadcrumb untuk path saat ini
    let breadcrumbPath = findBreadcrumbPath(menuList, normalizedPath);

    // Fallback prefix match jika exact match tidak ditemukan
    if (!breadcrumbPath) {
      const findPrefixPath = (
        items: MenuItem[],
        targetPath: string,
        current: MenuItem[] = [],
      ): MenuItem[] | null => {
        for (const item of items) {
          const newPath = [...current, item];
          if (item.children) {
            const res = findPrefixPath(item.children, targetPath, newPath);
            if (res) return res;
          }
          if (
            item.route &&
            targetPath.startsWith(item.route) &&
            item.route !== "/" &&
            item.route !== "/dashboard"
          ) {
            return newPath;
          }
        }
        return null;
      };
      breadcrumbPath = findPrefixPath(menuList, normalizedPath);
    }

    // Jika tetap tidak ditemukan, tampilkan Dashboard
    if (!breadcrumbPath || breadcrumbPath.length === 0) {
      return [{ label: "Dashboard", path: "/dashboard", active: true }];
    }

    // Ubah hasil menjadi format breadcrumb
    return breadcrumbPath.map((item, index) => ({
      label: item.menu,
      path: item.route || "#",
      active: index === breadcrumbPath.length - 1,
    }));
  }, [currentPath]);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center hover:text-green-800 text-gray-600 transition-colors"
          >
            <IoMdHome className="mr-1 text-lg" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={`${item.path}-${index}`} className="flex items-center">
            <span className="mx-2 text-gray-400">
              <IoMdArrowDropright />
            </span>
            {item.active ? (
              <span className="font-medium text-green-800">{item.label}</span>
            ) : item.path && item.path !== "#" ? (
              <Link
                to={item.path}
                className="hover:text-green-800 text-gray-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600 cursor-default">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
