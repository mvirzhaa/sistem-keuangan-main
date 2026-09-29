import { Link, useLocation } from "react-router-dom";
import { IoMdArrowDropright, IoMdHome } from "react-icons/io";
import { useMemo } from "react";
import { menuList, type MenuItem } from "../navigation/MenuData";

function Breadcrumb() {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbItems = useMemo(() => {
    // Fungsi untuk mencari breadcrumb berdasarkan path
    const findBreadcrumbPath = (items: MenuItem[], targetPath: string, currentPath: MenuItem[] = []): MenuItem[] | null => {
      for (const item of items) {
        // Buat salinan path saat ini dan tambahkan item
        const newPath = [...currentPath, item];

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
    const breadcrumbPath = findBreadcrumbPath(menuList, currentPath);

    // Jika tidak ditemukan, kembalikan hanya home
    if (!breadcrumbPath) {
      return [{ label: "Dashboard", path: "/", active: true }];
    }

    // Ubah hasil menjadi format breadcrumb
    return breadcrumbPath.map((item, index) => ({
      label: item.menu,
      path: item.route || "#",
      active: !item.children && index === breadcrumbPath.length - 1,
    }));
  }, [currentPath]);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        <li>
          <Link to="/dashboard" className="flex items-center hover:text-green-800">
            <IoMdHome className="mr-1 text-lg" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={`${item.path}-${index}`} className="flex items-center">
            <span className="mx-2 text-gray-400">
              <IoMdArrowDropright />
            </span>
            <Link to={item.path} className="hover:text-green-800">
              {item.active ? <span className="font-medium text-green-800">{item.label}</span> : <p>{item.label}</p>}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
