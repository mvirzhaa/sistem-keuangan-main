import React, { useState } from "react";
import {
  IoInformationCircle,
  IoDocumentText,
  IoCashOutline,
  IoCard,
} from "react-icons/io5";
import TextField from "../../../components/inputs/TextField";
import Toggle from "../../../components/inputs/Toggle";
import MenuPengaturan from "../components/PengaturanAplikasiMenu";
import InformasiKeuanganSection from "../components/InformasiKeuanganSection";
import SistemPembayaranSection from "../components/SistemPembayaranSection";

export default function PengaturanAplikasiPage() {
  document.title = "Pengaturan Aplikasi";
  const [activeMenu, setActiveMenu] = useState("informasi-keuangan");

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-6">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Pengaturan Aplikasi</p>
      </div>

      <div className="flex">
        <div className="w-1/4">
          <MenuPengaturan
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>
        <div className="w-3/4">
          {activeMenu === "informasi-keuangan" && <InformasiKeuanganSection />}
          {activeMenu === "sistem-pembayaran" && <SistemPembayaranSection />}
          {activeMenu === "danacita" && <DanacitaSection />}
        </div>
      </div>
    </>
  );
}

function DanacitaSection() {
  return (
    <div className="bg-white rounded-sm shadow-sm border-t-2 border-t-amber-400 p-6">
      <h2 className="text-lg font-semibold mb-4">Danacita</h2>
      <p className="text-sm text-gray-600">
        Content untuk danacita akan ditambahkan nanti...
      </p>
    </div>
  );
}
