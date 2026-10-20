import React, { useState, useEffect } from "react";
import { IoSave } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import type { PromoEdufin } from "./PromoEdufinTable";

export interface PromoEdufinFormRowProps {
  initialData?: PromoEdufin;
  nextNo?: number;
  isEdit?: boolean;
  onSave: (data: PromoEdufin) => void;
  onCancel: () => void;
}

const CHANNEL_OPTIONS = [
  "Tokopedia",
  "OVO",
  "BPRS Amanah Ummah",
  "Bank Syariah Indonesia",
  "Kasir BASK UiKA",
];

const PromoEdufinFormRow: React.FC<PromoEdufinFormRowProps> = ({
  initialData,
  nextNo = 1,
  isEdit = false,
  onSave,
  onCancel,
}) => {
  const [channel, setChannel] = useState(initialData?.channel || "Tokopedia");
  const [namaPromo, setNamaPromo] = useState(initialData?.namaPromo || "");
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || "");
  const [tglMulai, setTglMulai] = useState(initialData?.tglMulai || "");
  const [tglSelesai, setTglSelesai] = useState(initialData?.tglSelesai || "");
  const [aktif, setAktif] = useState(initialData?.aktif ?? true);

  useEffect(() => {
    if (initialData) {
      setChannel(initialData.channel || "Tokopedia");
      setNamaPromo(initialData.namaPromo || "");
      setDeskripsi(initialData.deskripsi || "");
      setTglMulai(initialData.tglMulai || "");
      setTglSelesai(initialData.tglSelesai || "");
      setAktif(initialData.aktif ?? true);
    }
  }, [initialData]);

  const handleSave = () => {
    const item: PromoEdufin = {
      id: initialData?.id || Date.now().toString(),
      no: initialData?.no ?? nextNo,
      channel: channel || "Tokopedia",
      namaPromo:
        namaPromo.trim() || (isEdit ? initialData?.namaPromo || "" : "PROMO BARU"),
      deskripsi: deskripsi.trim(),
      tglMulai: tglMulai.trim() || "1 Sep 2024",
      tglSelesai: tglSelesai.trim() || "30 Sep 2024",
      aktif,
    };
    onSave(item);
  };

  return (
    <tr className="bg-gray-50 border-b border-slate-300">
      {/* No */}
      <td className="p-2 border border-slate-300 text-center text-xs">
        {initialData?.no ?? nextNo}
      </td>

      {/* Channel */}
      <td className="p-1.5 border border-slate-300">
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {CHANNEL_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Nama Promo */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={namaPromo}
          onChange={(e) => setNamaPromo(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder="Nama Promo"
        />
      </td>

      {/* Deskripsi */}
      <td className="p-1.5 border border-slate-300">
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="w-full h-24 bg-white border border-gray-300 rounded p-1.5 text-xs focus:outline-none focus:border-blue-500 resize-y"
          placeholder="Deskripsi promo"
        />
      </td>

      {/* Tgl. Mulai */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={tglMulai}
          onChange={(e) => setTglMulai(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder="1 Sep 2024"
        />
      </td>

      {/* Tgl. Selesai */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={tglSelesai}
          onChange={(e) => setTglSelesai(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder="30 Sep 2024"
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

export default PromoEdufinFormRow;
