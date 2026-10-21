import React, { useState, useRef, useEffect } from "react";
import {
  IoFlash,
  IoChevronDown,
  IoChevronUp,
  IoInformationCircleOutline,
} from "react-icons/io5";
import Toggle from "../../../components/inputs/Toggle";

const EDUFIN_STORAGE_KEY = "pengaturan_sistem_pembayaran_edufin";
const SIMPONI_STORAGE_KEY = "pengaturan_sistem_pembayaran_simponi";

interface EduFinSettings {
  active: boolean;
  modeEnvironment: string;
  fullPayment: boolean;
  expiredDate: string;
  clientId: string;
  prefixBank: string;
  secretId: string;
  formatId: string;
  urlEdufin: string;
}

interface SimponiSettings {
  active: boolean;
  modeEnvironment: string;
  fullPayment: boolean;
  expiredDate: string;
  ipWhitelist: string;
  urlDevelopment: string;
  urlProduction: string;
  kodeEselon: string;
  kodeKabupatenKota: string;
  kodeKelurahan: string;
  kodeLokasi: string;
  kodePP: string;
  kodeSatker: string;
  username: string;
  password: string;
}

const defaultEdufin: EduFinSettings = {
  active: true,
  modeEnvironment: "Production",
  fullPayment: false,
  expiredDate: "+4 days",
  clientId: "519",
  prefixBank: "-",
  secretId: "dd1e8a678f819e12ec4b0684106ba042",
  formatId: "-",
  urlEdufin: "https://portal.edufin.id/api/",
};

const defaultSimponi: SimponiSettings = {
  active: false,
  modeEnvironment: "Development",
  fullPayment: false,
  expiredDate: "Tambahkan",
  ipWhitelist: "-",
  urlDevelopment: "-",
  urlProduction: "-",
  kodeEselon: "-",
  kodeKabupatenKota: "-",
  kodeKelurahan: "-",
  kodeLokasi: "-",
  kodePP: "-",
  kodeSatker: "-",
  username: "-",
  password: "-",
};

const expiredDateOptions = [
  "+4 days",
  "+1 day",
  "+2 days",
  "+3 days",
  "+7 days",
  "+14 days",
  "+30 days",
  "Tambahkan",
];

function CustomDropdown({
  value,
  options,
  onChange,
  className = "",
}: {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-10 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50/80 text-xs text-gray-700 font-normal flex items-center justify-between cursor-pointer transition-colors"
      >
        <span className="truncate mr-2">{value}</span>
        <IoChevronDown
          className={`text-gray-400 text-xs shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-full min-w-[130px] rounded-xl border border-gray-200 bg-white z-50 shadow-lg py-1 max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-3.5 py-2 text-left text-xs cursor-pointer transition-colors ${
                opt === value
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SistemPembayaranSection() {
  const [isEdufinOpen, setIsEdufinOpen] = useState(false);
  const [isSimponiOpen, setIsSimponiOpen] = useState(false);

  const [edufin, setEdufin] = useState<EduFinSettings>(() => {
    const saved = localStorage.getItem(EDUFIN_STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultEdufin, ...JSON.parse(saved) };
      } catch {
        // fallback
      }
    }
    return defaultEdufin;
  });

  const [simponi, setSimponi] = useState<SimponiSettings>(() => {
    const saved = localStorage.getItem(SIMPONI_STORAGE_KEY);
    if (saved) {
      try {
        return { ...defaultSimponi, ...JSON.parse(saved) };
      } catch {
        // fallback
      }
    }
    return defaultSimponi;
  });

  const [edufinSavedAlert, setEdufinSavedAlert] = useState(false);
  const [simponiSavedAlert, setSimponiSavedAlert] = useState(false);

  // Mutual exclusion: Hanya salah satu yang dapat aktif pada Perguruan Tinggi
  const toggleEdufinActive = () => {
    setEdufin((prev) => {
      const nextActive = !prev.active;
      const updated = { ...prev, active: nextActive };
      localStorage.setItem(EDUFIN_STORAGE_KEY, JSON.stringify(updated));
      if (nextActive) {
        setSimponi((simPrev) => {
          const simUpdated = { ...simPrev, active: false };
          localStorage.setItem(SIMPONI_STORAGE_KEY, JSON.stringify(simUpdated));
          return simUpdated;
        });
      }
      return updated;
    });
  };

  const toggleSimponiActive = () => {
    setSimponi((prev) => {
      const nextActive = !prev.active;
      const updated = { ...prev, active: nextActive };
      localStorage.setItem(SIMPONI_STORAGE_KEY, JSON.stringify(updated));
      if (nextActive) {
        setEdufin((eduPrev) => {
          const eduUpdated = { ...eduPrev, active: false };
          localStorage.setItem(EDUFIN_STORAGE_KEY, JSON.stringify(eduUpdated));
          return eduUpdated;
        });
      }
      return updated;
    });
  };

  const handleEdufinChange = (field: keyof EduFinSettings, val: any) => {
    setEdufin((prev) => {
      const updated = { ...prev, [field]: val };
      localStorage.setItem(EDUFIN_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSimponiChange = (field: keyof SimponiSettings, val: any) => {
    setSimponi((prev) => {
      const updated = { ...prev, [field]: val };
      localStorage.setItem(SIMPONI_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveEdufin = () => {
    localStorage.setItem(EDUFIN_STORAGE_KEY, JSON.stringify(edufin));
    setEdufinSavedAlert(true);
    setTimeout(() => setEdufinSavedAlert(false), 3000);
  };

  const handleSaveSimponi = () => {
    localStorage.setItem(SIMPONI_STORAGE_KEY, JSON.stringify(simponi));
    setSimponiSavedAlert(true);
    setTimeout(() => setSimponiSavedAlert(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="p-6 pb-4">
        <h2 className="text-lg font-bold mb-1 text-gray-800">
          Sistem Pembayaran
        </h2>
        <p className="text-xs text-gray-500">
          Pantau semua pengaturan sistem pembayaran yang Anda gunakan
        </p>
      </div>

      <div className="px-6">
        <hr className="border-t border-gray-200" />
      </div>

      {/* Info notice with cyan circular lightning bulb icon */}
      <div className="mx-6 my-5 p-3.5 bg-[#e0f7fa]/60 border border-[#b2ebf2] rounded-xl flex items-center gap-3">
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#00bcd4] text-white flex items-center justify-center shadow-xs">
            <IoFlash className="text-xs text-white" />
          </div>
          <div className="w-2.5 h-0.5 bg-[#00bcd4] rounded-full mt-0.5"></div>
        </div>
        <p className="text-xs text-gray-700 font-medium leading-relaxed">
          Anda hanya dapat mengaktifkan salah satu sistem pembayaran pada
          Perguruan Tinggi
        </p>
      </div>

      {/* 1. EduFin Card */}
      <div className="mx-6 mb-6 border border-gray-200 rounded-2xl bg-white shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <div
          className="flex justify-between items-start p-6 cursor-pointer select-none"
          onClick={() => setIsEdufinOpen(!isEdufinOpen)}
        >
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-bold text-gray-800">EduFin</h3>
              {edufin.active && (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-[#e7f8ef] text-[#059669] rounded-md">
                  Active - {edufin.modeEnvironment}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
              Layanan pembayaran online Mahasiswa melalui service bank (teller,
              ATM, Ibank Personal/Mobile Banking serta e-channel bank lainnya)
              secara lifetime.
            </p>
          </div>
          <button
            type="button"
            className="text-gray-700 hover:text-gray-900 pt-1 shrink-0 cursor-pointer"
          >
            {isEdufinOpen ? (
              <IoChevronUp size={18} />
            ) : (
              <IoChevronDown size={18} />
            )}
          </button>
        </div>

        {/* Accordion Body */}
        {isEdufinOpen && (
          <div className="px-6 pb-6">
            <div className="border-t border-dotted border-gray-300 pt-3">
              {edufinSavedAlert && (
                <div className="my-3 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-2.5 rounded-lg text-xs flex justify-between items-center transition-all">
                  <span>Pengaturan EduFin berhasil disimpan.</span>
                  <button
                    type="button"
                    onClick={() => setEdufinSavedAlert(false)}
                    className="text-[#3c763d] hover:text-green-900 font-bold text-base leading-none cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              )}

              {/* Rows */}
              <div className="space-y-1">
                {/* Row 1: Aktifkan EduFin */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Aktifkan EduFin
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Izinkan pembayaran dengan sistem pembayaran ini
                    </p>
                  </div>
                  <Toggle
                    checked={edufin.active}
                    onChange={toggleEdufinActive}
                  />
                </div>

                {/* Row 2: Mode Environment (Warna abu = tidak dapat diisi) */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Mode Environment
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Pilih salah satu mode sistem pembayaran Anda
                    </p>
                  </div>
                  <div className="w-44 h-10 border border-gray-200 rounded-xl px-4 flex items-center justify-center text-xs text-gray-500 bg-[#f8f9fa] cursor-not-allowed select-none">
                    {edufin.modeEnvironment}
                  </div>
                </div>

                {/* Row 3: Full Payment */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Full Payment
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Semua tagihan mahasiswa harus dibayar penuh
                    </p>
                  </div>
                  <Toggle
                    checked={edufin.fullPayment}
                    onChange={() =>
                      handleEdufinChange("fullPayment", !edufin.fullPayment)
                    }
                  />
                </div>

                {/* Row 4: Expired Date (Dropdown - interaktif) */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Expired Date
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Batas waktu maksimal pembayaran mahasiswa
                    </p>
                  </div>
                  <CustomDropdown
                    value={edufin.expiredDate}
                    options={expiredDateOptions}
                    onChange={(val) => handleEdufinChange("expiredDate", val)}
                    className="w-44"
                  />
                </div>

                {/* Row 5: Client ID (Warna abu = tidak dapat diisi) */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Client ID
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Kode unik yang digunakan untuk terhubung sistem
                    </p>
                  </div>
                  <input
                    type="text"
                    value={edufin.clientId}
                    readOnly
                    disabled
                    className="w-44 h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* Row 6: Prefix Bank (Warna abu = tidak dapat diisi) */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Prefix Bank
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Kode unik yang ditetapkan untuk channel pembayaran
                    </p>
                  </div>
                  <input
                    type="text"
                    value={edufin.prefixBank}
                    readOnly
                    disabled
                    className="w-44 h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>
              </div>

              {/* Full-width fields (Warna abu = tidak dapat diisi) */}
              <div className="pt-3 space-y-4">
                {/* Secret ID */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Secret ID
                    </label>
                    <IoInformationCircleOutline className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="text"
                    value={edufin.secretId}
                    readOnly
                    disabled
                    className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* Format ID */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Format ID
                    </label>
                    <IoInformationCircleOutline className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="text"
                    value={edufin.formatId}
                    readOnly
                    disabled
                    className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* URL EduFin */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-0.5">
                    URL EduFin
                  </label>
                  <p className="text-xs text-gray-400 font-normal mb-1.5">
                    Tambahkan URL atau link API pembayaran EduFin Anda
                  </p>
                  <input
                    type="text"
                    value={edufin.urlEdufin}
                    readOnly
                    disabled
                    className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveEdufin}
                    className="px-5 py-2.5 bg-[#f0f3f6] hover:bg-[#e4e9ee] text-[#8c9ba5] hover:text-[#5a6a75] rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Simponi Card */}
      <div className="mx-6 mb-6 border border-gray-200 rounded-2xl bg-white shadow-xs overflow-hidden">
        {/* Accordion Header */}
        <div
          className="flex justify-between items-start p-6 cursor-pointer select-none"
          onClick={() => setIsSimponiOpen(!isSimponiOpen)}
        >
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-bold text-gray-800">Simponi</h3>
              {simponi.active && (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-[#e7f8ef] text-[#059669] rounded-md">
                  Active - {simponi.modeEnvironment}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
              Sistem informasi yang dikelola oleh Direktorat Jenderal Anggaran,
              yang meliputi Sistem Perencanaan PNBP, Sistem Billing dan Sistem
              Pelaporan PNBP.
            </p>
          </div>
          <button
            type="button"
            className="text-gray-700 hover:text-gray-900 pt-1 shrink-0 cursor-pointer"
          >
            {isSimponiOpen ? (
              <IoChevronUp size={18} />
            ) : (
              <IoChevronDown size={18} />
            )}
          </button>
        </div>

        {/* Accordion Body */}
        {isSimponiOpen && (
          <div className="px-6 pb-6">
            <div className="border-t border-dotted border-gray-300 pt-3">
              {simponiSavedAlert && (
                <div className="my-3 bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-2.5 rounded-lg text-xs flex justify-between items-center transition-all">
                  <span>Pengaturan Simponi berhasil disimpan.</span>
                  <button
                    type="button"
                    onClick={() => setSimponiSavedAlert(false)}
                    className="text-[#3c763d] hover:text-green-900 font-bold text-base leading-none cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              )}

              {/* Rows */}
              <div className="space-y-1">
                {/* Row 1: Aktifkan Simponi */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Aktifkan Simponi
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Izinkan pembayaran dengan sistem pembayaran ini
                    </p>
                  </div>
                  <Toggle
                    checked={simponi.active}
                    onChange={toggleSimponiActive}
                  />
                </div>

                {/* Row 2: Mode Environment (Warna abu = tidak dapat diisi) */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Mode Environment
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Pilih salah satu mode sistem pembayaran Anda
                    </p>
                  </div>
                  <div className="w-44 h-10 border border-gray-200 rounded-xl px-4 flex items-center justify-center text-xs text-gray-500 bg-[#f8f9fa] cursor-not-allowed select-none">
                    {simponi.modeEnvironment}
                  </div>
                </div>

                {/* Row 3: Full Payment */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Full Payment
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Semua tagihan mahasiswa harus dibayar penuh
                    </p>
                  </div>
                  <Toggle
                    checked={simponi.fullPayment}
                    onChange={() =>
                      handleSimponiChange("fullPayment", !simponi.fullPayment)
                    }
                  />
                </div>

                {/* Row 4: Expired Date (Dropdown - interaktif) */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-0.5">
                      Expired Date
                    </h4>
                    <p className="text-xs text-gray-400 font-normal">
                      Batas waktu maksimal pembayaran mahasiswa
                    </p>
                  </div>
                  <CustomDropdown
                    value={simponi.expiredDate}
                    options={expiredDateOptions}
                    onChange={(val) => handleSimponiChange("expiredDate", val)}
                    className="w-44"
                  />
                </div>
              </div>

              {/* IP Whitelist & URLs (Warna abu = tidak dapat diisi) */}
              <div className="pt-3 space-y-4">
                {/* IP Whitelist */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      IP Whitelist
                    </label>
                    <IoInformationCircleOutline className="text-gray-400 text-sm" />
                  </div>
                  <input
                    type="text"
                    value={simponi.ipWhitelist}
                    readOnly
                    disabled
                    className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* URL Development */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-0.5">
                    URL Development
                  </label>
                  <p className="text-xs text-gray-400 font-normal mb-1.5">
                    Tambahkan URL atau link untuk mode development sistem
                  </p>
                  <input
                    type="text"
                    value={simponi.urlDevelopment}
                    readOnly
                    disabled
                    className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* URL Production */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-0.5">
                    URL Production
                  </label>
                  <p className="text-xs text-gray-400 font-normal mb-1.5">
                    Tambahkan URL atau link untuk mode production sistem (yang
                    akan diakses user)
                  </p>
                  <input
                    type="text"
                    value={simponi.urlProduction}
                    readOnly
                    disabled
                    className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                  />
                </div>

                {/* Dotted divider for 6 Kode Form fields */}
                <div className="pt-2 border-t border-dotted border-gray-300">
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">
                        Kode Eselon
                      </label>
                      <input
                        type="text"
                        value={simponi.kodeEselon}
                        readOnly
                        disabled
                        className="w-44 h-10 border border-gray-200 rounded-xl px-3 text-center text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">
                        Kode Kabupaten/Kota
                      </label>
                      <input
                        type="text"
                        value={simponi.kodeKabupatenKota}
                        readOnly
                        disabled
                        className="w-44 h-10 border border-gray-200 rounded-xl px-3 text-center text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">
                        Kode Kelurahan (Kel)
                      </label>
                      <input
                        type="text"
                        value={simponi.kodeKelurahan}
                        readOnly
                        disabled
                        className="w-44 h-10 border border-gray-200 rounded-xl px-3 text-center text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">
                        Kode Lokasi
                      </label>
                      <input
                        type="text"
                        value={simponi.kodeLokasi}
                        readOnly
                        disabled
                        className="w-44 h-10 border border-gray-200 rounded-xl px-3 text-center text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">
                        Kode PP
                      </label>
                      <input
                        type="text"
                        value={simponi.kodePP}
                        readOnly
                        disabled
                        className="w-44 h-10 border border-gray-200 rounded-xl px-3 text-center text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">
                        Kode Satuan Kerja (Satker)
                      </label>
                      <input
                        type="text"
                        value={simponi.kodeSatker}
                        readOnly
                        disabled
                        className="w-44 h-10 border border-gray-200 rounded-xl px-3 text-center text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dotted divider for Username & Password */}
                <div className="pt-2 border-t border-dotted border-gray-300">
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <label className="text-xs font-semibold text-gray-700">
                          Username
                        </label>
                        <IoInformationCircleOutline className="text-gray-400 text-sm" />
                      </div>
                      <input
                        type="text"
                        value={simponi.username}
                        readOnly
                        disabled
                        className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <label className="text-xs font-semibold text-gray-700">
                          Password
                        </label>
                        <IoInformationCircleOutline className="text-gray-400 text-sm" />
                      </div>
                      <input
                        type="text"
                        value={simponi.password}
                        readOnly
                        disabled
                        className="w-full h-10 border border-gray-200 rounded-xl px-3.5 text-xs text-gray-500 bg-[#f8f9fa] outline-none cursor-not-allowed select-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSaveSimponi}
                    className="px-5 py-2.5 bg-[#f0f3f6] hover:bg-[#e4e9ee] text-[#8c9ba5] hover:text-[#5a6a75] rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
