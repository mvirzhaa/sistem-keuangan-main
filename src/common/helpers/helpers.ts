import { authController } from "../../features/auth/controllers/authController";
import type { MenuItem } from "../../components/navigation/MenuData";

export const formatRoleName = (role: string | null): string => {
  if (!role) return "";

  const roleMapping: Record<string, string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN_KEUANGAN: "Admin Keuangan",
    OPERATOR_KEUANGAN: "Operator Keuangan",
    KASUBAG_KEUANGAN: "Kasubag Keuangan",
    KEPALA_TU_FAKULTAS: "Kepala TU Fakultas",
    WAKIL_DEKAN_2: "Wakil Dekan 2",
    WAKIL_REKTOR_2: "Wakil Rektor 2",
    REKTOR: "Rektor",
  };

  return roleMapping[role] || role;
};

export const filterMenuByRole = (menuItems: MenuItem[]): MenuItem[] => {
  const activeRole = authController.getActiveRole();

  if (!activeRole) return [];

  const filterRecursive = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) => {
        // Jika item tidak memiliki allowedRoles, maka semua role bisa akses
        if (!item.allowedRoles || item.allowedRoles.length === 0) {
          return true;
        }

        // Check apakah active role termasuk dalam allowedRoles
        return item.allowedRoles.includes(activeRole);
      })
      .map((item) => {
        // Jika item memiliki children, filter children juga
        if (item.children && item.children.length > 0) {
          const filteredChildren = filterRecursive(item.children);

          // Jika tidak ada children yang tersisa setelah filter,
          // dan item ini tidak memiliki route, maka hide item ini
          if (filteredChildren.length === 0 && !item.route) {
            return null;
          }

          return {
            ...item,
            children: filteredChildren,
          };
        }

        return item;
      })
      .filter((item): item is MenuItem => item !== null);
  };

  return filterRecursive(menuItems);
};

export const hasMenuAccess = (allowedRoles?: string[]): boolean => {
  const activeRole = authController.getActiveRole();

  if (!activeRole) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;

  return allowedRoles.includes(activeRole);
};
