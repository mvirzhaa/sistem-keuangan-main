import React, { useState, useEffect } from "react";
import { IoSave } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import type { MetodePembayaran } from "./MetodePembayaranSiakadTable";

export interface MetodePembayaranSiakadFormRowProps {
  initialData: MetodePembayaran;
  onSave: (data: MetodePembayaran) => void;
  onCancel: () => void;
}

const JENIS_OPTIONS = ["OFFLINE", "ONLINE", "H2H", "DEPOSIT"];

const MetodePembayaranSiakadFormRow: React.FC<
  MetodePembayaranSiakadFormRowProps
> = ({ initialData, onSave, onCancel }) => {
  const [kode, setKode] = useState(initialData.kode || "");
  const [nama, setNama] = useState(initialData.nama || "");
  const [jenis, setJenis] = useState(initialData.jenis || "OFFLINE");
  const [isDefault, setIsDefault] = useState(initialData.isDefault || false);

  useEffect(() => {
    setKode(initialData.kode || "");
    setNama(initialData.nama || "");
    setJenis(initialData.jenis || "OFFLINE");
    setIsDefault(initialData.isDefault || false);
  }, [initialData]);

  const handleSave = () => {
    onSave({
      ...initialData,
      kode: kode.trim(),
      nama: nama.trim() || initialData.nama,
      jenis,
      isDefault,
    });
  };

  return (
    <tr className="bg-gray-50 border-b border-slate-300">
      {/* Metode Pembayaran: Kode - Nama (Gambar 1) */}
      <td className="p-2 border border-slate-300">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className="w-14 bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500 text-center"
            placeholder="01"
          />
          <span className="text-gray-500 font-medium">-</span>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="flex-1 bg-white border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500"
            placeholder="Nama Metode Pembayaran"
          />
        </div>
      </td>

      {/* Jenis Dropdown (Gambar 1) */}
      <td className="p-2 border border-slate-300">
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {JENIS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Default Checkbox (Gambar 1) */}
      <td className="p-2 border border-slate-300 text-center">
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
          />
        </div>
      </td>

      {/* Aksi: Simpan & Batal (Gambar 1) */}
      <td className="p-2 border border-slate-300 text-center">
        <div className="flex justify-center items-center space-x-1.5">
          <button
            type="button"
            onClick={handleSave}
            className="p-1.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white rounded transition-colors cursor-pointer shadow-xs"
            title="Simpan"
          >
            <IoSave size={15} />
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 bg-[#f39c12] hover:bg-[#e08e0b] active:bg-[#d68000] text-white rounded transition-colors cursor-pointer shadow-xs"
            title="Batal"
          >
            <IoMdRefresh size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MetodePembayaranSiakadFormRow;
