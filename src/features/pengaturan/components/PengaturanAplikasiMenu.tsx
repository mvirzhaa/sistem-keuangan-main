import { IoDocumentText } from "react-icons/io5";

export default function MenuPengaturan({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}) {
  return (
    <div className="bg-white rounded-sm shadow-sm">
      <div className="py-3 px-4  border-t-2 border-t-amber-400">
        <h3 className="font-semibold text-gray-800 text-sm">
          Pengaturan Keuangan
        </h3>
      </div>
      <div>
        <button
          onClick={() => setActiveMenu("informasi-keuangan")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm ${
            activeMenu === "informasi-keuangan"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 ${
              activeMenu === "informasi-keuangan"
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            <IoDocumentText className="text-lg" />
          </span>
          <span>Informasi Keuangan</span>
        </button>
        <button
          onClick={() => setActiveMenu("sistem-pembayaran")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm ${
            activeMenu === "sistem-pembayaran"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 ${
              activeMenu === "sistem-pembayaran"
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            <IoDocumentText className="text-lg" />
          </span>
          <span>Sistem Pembayaran</span>
        </button>
        <button
          onClick={() => setActiveMenu("danacita")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm ${
            activeMenu === "danacita"
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 ${
              activeMenu === "danacita" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IoDocumentText className="text-lg" />
          </span>
          <span>Danacita</span>
        </button>
      </div>
    </div>
  );
}
