import React, { useState, useEffect } from "react";
import { IoSave } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";

export interface ChannelPembayaranSiakad {
  id: string;
  kode: string;
  nama: string;
  logo: string;
  aktif: boolean;
}

export interface ChannelPembayaranSiakadFormRowProps {
  initialData?: ChannelPembayaranSiakad;
  isEdit?: boolean;
  onSave: (data: ChannelPembayaranSiakad) => void;
  onCancel: () => void;
}

const ChannelPembayaranSiakadFormRow: React.FC<
  ChannelPembayaranSiakadFormRowProps
> = ({ initialData, isEdit = false, onSave, onCancel }) => {
  const [kode, setKode] = useState(initialData?.kode ?? "");
  const [nama, setNama] = useState(initialData?.nama ?? "");
  const [logo, setLogo] = useState(initialData?.logo ?? "");
  const [aktif, setAktif] = useState(initialData?.aktif ?? true);

  // Sync if initialData changes
  useEffect(() => {
    if (initialData) {
      setKode(initialData.kode);
      setNama(initialData.nama);
      setLogo(initialData.logo);
      setAktif(initialData.aktif);
    }
  }, [initialData]);

  const handleSave = () => {
    const item: ChannelPembayaranSiakad = {
      id: initialData?.id || Date.now().toString(),
      kode: kode.trim() || `0${Math.floor(Math.random() * 9 + 1)}`,
      nama:
        nama.trim() ||
        (isEdit ? initialData?.nama || "" : "Channel Pembayaran Baru"),
      logo: logo.trim() || "bank_default.png",
      aktif,
    };
    onSave(item);
  };

  return (
    <tr className="bg-gray-50 border-b border-slate-300">
      {/* Kode */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder=""
        />
      </td>

      {/* Nama Channel Pembayaran Siakad */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder=""
        />
      </td>

      {/* Logo */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder=""
        />
      </td>

      {/* Aktif */}
      <td className="p-1.5 border border-slate-300 text-center">
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={aktif}
            onChange={(e) => setAktif(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
          />
        </div>
      </td>

      {/* Aksi: Simpan & Batal */}
      <td className="p-1.5 border border-slate-300 text-center">
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

export default ChannelPembayaranSiakadFormRow;
