interface MenuPengaturanProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function MenuPengaturan({
  activeMenu,
  setActiveMenu,
}: MenuPengaturanProps) {
  const menus = [
    {
      id: "informasi-keuangan",
      label: "Informasi Keuangan",
    },
    {
      id: "sistem-pembayaran",
      label: "Sistem Pembayaran",
    },
    {
      id: "danacita",
      label: "Danacita",
    },
  ];

  return (
    <div className="py-5 px-4 bg-white">
      <div className="px-3 mb-4">
        <h3 className="font-bold text-gray-800 text-sm tracking-tight">
          Pengaturan Keuangan
        </h3>
      </div>
      <div className="space-y-1.5">
        {menus.map((menu) => {
          const isActive = activeMenu === menu.id;
          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => setActiveMenu(menu.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-colors ${
                isActive
                  ? "bg-[#edf4ff] text-[#1e40af] font-semibold"
                  : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900"
              }`}
            >
              <span className="shrink-0 flex items-center justify-center">
                {isActive ? (
                  /* Solid blue folded document with white arrow */
                  <svg
                    className="w-5 h-5 text-[#244b82]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8.41421C20 7.88378 19.7893 7.37511 19.4142 7L14.4142 2.58579C14.0391 2.21071 13.5304 2 13 2H6Z" />
                    <path
                      d="M8.5 13.5H13.5M13.5 13.5L11 11M13.5 13.5L11 16"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  /* Outline folded document with arrow */
                  <svg
                    className="w-5 h-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 13.5H13.5M13.5 13.5L11 11M13.5 13.5L11 16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span>{menu.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
