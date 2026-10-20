import logo from "../../assets/logo-uika.png";
import {
  IoMdPerson,
  IoMdArrowDropdown,
  IoMdMenu,
} from "react-icons/io";
import NavbarMenu from "./NavbarMenu";
import SidebarMenu from "./SidebarMenu";
import NavbarNotificationMenu from "./NavbarNotificationMenu";
import NavbarHelpMenu from "./NavbarHelpMenu";
import NavbarProfileModal from "./NavbarProfileModal";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { formatRoleName } from "../../common/helpers/helpers";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full relative z-40 print:hidden">
      <nav className="bg-gray-800 py-5 px-4 sm:px-6 lg:px-16 relative z-50">
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
          <div className="flex space-x-3 sm:space-x-4 align-middle items-center">
            <NavbarNotificationMenu />
            <NavbarHelpMenu />
            <MenuAccount />
          </div>
        </div>
      </nav>
      {/* NavbarMenu hanya di desktop */}
      <div className="bg-white shadow hidden sm:block relative z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <NavbarMenu />
        </div>
      </div>
      {/* SidebarMenu hanya di mobile */}
      <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}

function MenuAccount() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = isHovered || isClicked;

  const { user, activeRole } = useAuth();


  // Click outside listener untuk menutup modal profil
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

  const handleClose = () => {
    setIsClicked(false);
    setIsHovered(false);
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
        className={`p-2 flex align-middle items-center space-x-4 rounded-lg transition-colors duration-200 cursor-pointer ${
          isOpen ? "bg-black/25 text-white" : "hover:bg-gray-700 text-white"
        }`}
        onClick={handleClick}
        aria-label="User menu"
      >
        <IoMdPerson className="text-white text-base" />
        <div className="hidden sm:block">
          <p className="text-white text-start text-sm font-normal max-w-[200px] truncate">
            {user?.nama}
          </p>
          <p className="text-white text-xs font-normal text-start">
            {formatRoleName(activeRole)}
          </p>
        </div>
        <IoMdArrowDropdown
          className={`text-white text-base hidden sm:block transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Profile Modal positioned below the button */}
      {isOpen && (
        <div className="absolute right-0 top-full pt-2 z-50 animate-fade-in">
          <NavbarProfileModal isOpen={isOpen} onClose={handleClose} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
