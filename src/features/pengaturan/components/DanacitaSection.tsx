import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Toggle from "../../../components/inputs/Toggle";

const DANACITA_STORAGE_KEY = "pengaturan_danacita_settings";

interface DanacitaSettings {
  active: boolean;
  lokasi: string;
  urlBanner: string;
  apiKey: string;
  pathBannerDashboard: string;
  pathBannerPembayaran: string;
}

const defaultDanacita: DanacitaSettings = {
  active: false,
  lokasi: "Semuanya",
  urlBanner: "-",
  apiKey: "-",
  pathBannerDashboard: "-",
  pathBannerPembayaran: "-",
};

export default function DanacitaSection() {
  const [settings, setSettings] = useState<DanacitaSettings>(() => {
    const saved = localStorage.getItem(DANACITA_STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultDanacita, ...JSON.parse(saved) };
      } catch {
        // fallback
      }
    }
    return defaultDanacita;
  });

  const [savedAlert, setSavedAlert] = useState(false);

  const handleToggleActive = () => {
    setSettings((prev) => {
      const updated = { ...prev, active: !prev.active };
      localStorage.setItem(DANACITA_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem(DANACITA_STORAGE_KEY, JSON.stringify(settings));
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="p-6 pb-4">
        <h2 className="text-lg font-bold mb-1 text-gray-800">Danacita</h2>
        <p className="text-xs text-gray-500">
          Platform yang membantu pembayaran mahasiswa dengan metode cicilan
        </p>
      </div>

      <div className="px-6">
        <hr className="border-t border-gray-200" />
      </div>

      <div className="p-6">
        {savedAlert && (
          <div className="mb-4 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-2.5 rounded-lg text-xs flex justify-between items-center transition-all">
            <span>Pengaturan Danacita berhasil disimpan.</span>
            <button
              type="button"
              onClick={() => setSavedAlert(false)}
              className="text-[#3c763d] hover:text-green-900 font-bold text-base leading-none cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        {/* Row 1: Aktifkan Danacita (Toggle interaktif) */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
              Aktifkan Danacita
            </h4>
            <p className="text-xs text-gray-400 font-normal">
              Izinkan pembayaran melalui platform ini
            </p>
          </div>
          <Toggle checked={settings.active} onChange={handleToggleActive} />
        </div>

        {/* Row 2: Lokasi Danacita (Warna abu = tidak dapat diisi) */}
        <div className="flex items-center justify-between py-3">
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
              Lokasi Danacita
            </h4>
            <p className="text-xs text-gray-400 font-normal">
              Pilih lokasi yang Anda inginkan untuk menampilkan banner Danacita
            </p>
          </div>
          <div className="w-44 h-10 border border-gray-200 rounded-xl px-4 flex items-center justify-center text-xs text-gray-500 bg-[#f8f9fa] cursor-not-allowed select-none">
            {settings.lokasi}
          </div>
        </div>

        {/* Full-width fields (Warna abu = tidak dapat diisi) */}
        <div className="pt-2 space-y-4">
          {/* URL Banner Danacita */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-0.5">
              URL Banner Danacita
            </label>
            <p className="text-xs text-gray-400 font-normal mb-1.5">
              Tambahkan URL atau link yang mengarahkan mahasiswa ke halaman
              Danacita
            </p>
            <input
              type="text"
              value={settings.urlBanner}
              readOnly
              disabled
              className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
            />
          </div>

          {/* API Key Danacita */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              API Key Danacita
            </label>
            <input
              type="text"
              value={settings.apiKey}
              readOnly
              disabled
              className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
            />
          </div>

          {/* Dotted divider */}
          <div className="pt-2 border-t border-dotted border-gray-300"></div>

          {/* Path Banner Dashboard */}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <label className="text-xs font-semibold text-gray-700">
                Path Banner Dashboard
              </label>
              <IoInformationCircleOutline className="text-gray-400 text-sm" />
            </div>
            <p className="text-xs text-gray-400 font-normal mb-1.5">
              Tambahkan path atau lokasi banner untuk ditampilkan di halaman
              dashboard
            </p>
            <input
              type="text"
              value={settings.pathBannerDashboard}
              readOnly
              disabled
              className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
            />
          </div>

          {/* Path Banner Pembayaran */}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <label className="text-xs font-semibold text-gray-700">
                Path Banner Pembayaran
              </label>
              <IoInformationCircleOutline className="text-gray-400 text-sm" />
            </div>
            <p className="text-xs text-gray-400 font-normal mb-1.5">
              Tambahkan path atau lokasi banner untuk ditampilkan di halaman
              pembayaran
            </p>
            <input
              type="text"
              value={settings.pathBannerPembayaran}
              readOnly
              disabled
              className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 bg-[#f0f3f6] hover:bg-[#e4e9ee] text-[#8c9ba5] hover:text-[#5a6a75] rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
