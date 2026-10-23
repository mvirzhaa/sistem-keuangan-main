import { useState } from "react";
import { IoMdClose, IoMdPerson, IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { formatRoleName, getInitials } from "../../common/helpers/helpers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/routes/routes";

interface NavbarProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavbarProfileModal({
  isOpen,
  onClose,
}: NavbarProfileModalProps) {
  const navigate = useNavigate();
  const { user, activeRole, userRoles, setActiveRole, logout } = useAuth();

  const [selectedRole, setSelectedRole] = useState(activeRole || "");

  if (!isOpen) return null;

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    setSelectedRole(role);
    setActiveRole(role);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userName = user?.nama || "Siddik Super Admin";
  const userInitials = getInitials(userName);

  return (
    <div className="bg-white rounded-lg shadow-xl w-80 overflow-hidden border border-gray-200">
      {/* Header dengan background elegan gelap dan pattern */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 px-6 py-8">
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        >
          <IoMdClose className="h-6 w-6 text-white hover:text-red-400" />
        </button>

        {/* Profile Section */}
        <div className="relative text-center">
          {/* Avatar dengan inisial */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-[#2e3330] rounded-full flex items-center justify-center border-4 border-white/90 shadow-xl">
              <span className="text-2xl font-black text-white tracking-widest select-none">
                {userInitials}
              </span>
            </div>
          </div>

          {/* User Info */}
          <h3 className="text-xl font-semibold text-white mb-1">{userName}</h3>
          <p className="text-sm text-white/90 mb-1">
            {formatRoleName(activeRole) || "Super Admin"}
          </p>
          <p className="text-xs text-white/75">
            Universitas Ibn Khaldun
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Role Selection */}
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer bg-gray-50"
            >
              {userRoles.length > 0 ? (
                userRoles.map((role) => (
                  <option key={role} value={role}>
                    {formatRoleName(role)}
                  </option>
                ))
              ) : (
                <option value="SUPER_ADMIN">Super Admin</option>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex border-t border-gray-200">
        <button
          onClick={() => {
            onClose();
            navigate(ROUTES.PROFILE);
          }}
          className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border-r border-gray-200 cursor-pointer"
        >
          <IoMdPerson className="mr-2 h-4 w-4 text-blue-600" />
          Profil
        </button>

        <button
          onClick={() => {
            /* Menu action */
          }}
          className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-r border-gray-200"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Menu
        </button>

        <button
          onClick={handleLogout}
          className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <IoMdLogOut className="mr-2 h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
}
