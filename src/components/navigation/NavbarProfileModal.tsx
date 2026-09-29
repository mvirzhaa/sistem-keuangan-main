import { useState } from "react";
import { IoMdClose, IoMdPerson, IoMdLogOut } from "react-icons/io";
import { authController } from "../../features/auth/controllers/authController";
import { formatRoleName } from "../../common/helpers/helpers";
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
  const user = authController.getUser();
  const activeRole = authController.getActiveRole();
  const userRoles = authController.getUserRoles();

  const [selectedRole, setSelectedRole] = useState(activeRole || "");

  if (!isOpen || !user) return null;

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    setSelectedRole(role);
    authController.setActiveRole(role);
  };

  const handleLogout = async () => {
    try {
      await authController.handleLogout();
      onClose();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-80 overflow-hidden border border-gray-200">
      {/* Header dengan background hijau dan pattern */}
      <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 px-6 py-8">
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
          className="absolute top-4 right-4 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        >
          <IoMdClose className="h-6 w-6 text-white" />
        </button>

        {/* Profile Section */}
        <div className="relative text-center">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <IoMdPerson className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* User Info */}
          <h3 className="text-xl font-semibold text-white mb-1">{user.nama}</h3>
          <p className="text-sm text-white opacity-90 mb-1">
            {formatRoleName(activeRole)}
          </p>
          <p className="text-xs text-white opacity-75">
            Universitas Ibn Khaldun
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Role Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {userRoles.map((role) => (
                <option key={role} value={role}>
                  {formatRoleName(role)}
                </option>
              ))}
            </select>
            {/* <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">
              Pilih
            </button> */}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-r border-gray-200"
        >
          <IoMdPerson className="mr-2 h-4 w-4" />
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
