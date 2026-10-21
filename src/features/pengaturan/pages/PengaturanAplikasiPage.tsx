import { useState } from "react";
import MenuPengaturan from "../components/PengaturanAplikasiMenu";
import InformasiKeuanganSection from "../components/InformasiKeuanganSection";
import SistemPembayaranSection from "../components/SistemPembayaranSection";
import DanacitaSection from "../components/DanacitaSection";

export default function PengaturanAplikasiPage() {
  document.title = "Pengaturan Aplikasi";
  const [activeMenu, setActiveMenu] = useState("informasi-keuangan");

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-6">
        <h1 className="text-2xl font-medium text-gray-800">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Pengaturan Aplikasi</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 border-t-2 border-t-amber-400 shadow-xs flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
          <MenuPengaturan
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="flex-1 min-w-0">
          {activeMenu === "informasi-keuangan" && <InformasiKeuanganSection />}
          {activeMenu === "sistem-pembayaran" && <SistemPembayaranSection />}
          {activeMenu === "danacita" && <DanacitaSection />}
        </div>
      </div>
    </>
  );
}
