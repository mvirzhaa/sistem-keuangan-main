import logo from "../../assets/logo-uika.png";
import {
  IoMdPerson,
  IoMdNotifications,
  IoMdHelpCircle,
  IoMdArrowDropdown,
  IoMdMenu,
  IoMdLogOut,
} from "react-icons/io";
import NavbarMenu from "./NavbarMenu";
import SidebarMenu from "./SidebarMenu";
import NavbarProfileModal from "./NavbarProfileModal";
import { useState } from "react";
import { authController } from "../../features/auth/controllers/authController";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/routes/routes";
import { formatRoleName } from "../../common/helpers/helpers";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full">
      <nav className="bg-gray-800 py-4 px-4 sm:px-[7.5rem]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex align-middle items-center">
            {/* Hamburger menu hanya di mobile */}
            <button
              className="sm:hidden mr-2 p-2 rounded hover:bg-gray-700 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <IoMdMenu className="text-white text-2xl" />
            </button>
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 inline-block mr-2"
            />
            <div className="hidden sm:block">
              <p className="text-white text-xs font-light">SIM Keuangan</p>
              <p className="text-white text-sm font-semibold">
                Universitas Ibn Khaldun
              </p>
            </div>
          </div>
          <div className="flex space-x-5 align-middle items-center">
            <MenuIcon
              icon={<IoMdNotifications className="text-white text-sm" />}
            />
            <MenuIcon
              icon={<IoMdHelpCircle className="text-white text-sm" />}
            />
            <MenuAccount />
          </div>
        </div>
      </nav>
      {/* NavbarMenu hanya di desktop */}
      <div className="bg-white px-4 sm:px-[2rem] shadow hidden sm:block">
        <NavbarMenu />
      </div>
      {/* SidebarMenu hanya di mobile */}
      <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}

function MenuIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      className="p-2 w-10 h-10 flex items-center justify-center rounded hover:bg-gray-700 transition-colors duration-200"
      aria-label="Menu"
    >
      {icon}
    </button>
  );
}

function MenuAccount() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const user = authController.getUser();
  const activeRole = authController.getActiveRole();

  return (
    <>
      <div className="relative">
        <button
          className="p-2 flex align-middle items-center space-x-4 rounded hover:bg-gray-700 transition-colors duration-200"
          onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
          aria-label="User menu"
        >
          <IoMdPerson className="text-white text-sm" />
          <div className="hidden sm:block">
            <p className="text-white text-start text-sm font-normal max-w-[200px] truncate">
              {user?.nama}
            </p>
            <p className="text-white text-xs font-normal text-start">
              {formatRoleName(activeRole)}
            </p>
          </div>
          <IoMdArrowDropdown
            className={`text-white text-sm hidden sm:block transition-transform duration-200 ${
              isProfileModalOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Profile Modal positioned below the button */}
        {isProfileModalOpen && (
          <>
            {/* Overlay untuk menutup modal */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsProfileModalOpen(false)}
            />

            {/* Modal positioned absolute */}
            <div className="absolute right-0 top-full mt-2 z-50">
              <NavbarProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
