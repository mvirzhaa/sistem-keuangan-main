import React, { useState, useEffect } from "react";
import { IoSave } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import type { AkunTransaksi } from "./AkunTransaksiTable";

export interface AkunTransaksiFormRowProps {
  initialData?: AkunTransaksi;
  isEdit?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onSave: (data: AkunTransaksi) => void;
  onCancel: () => void;
}

const KELOMPOK_OPTIONS = [
  "Biaya Kuliah",
  "KIP Kuliah",
  "Pembayaran",
  "Biaya Lainnya",
];

const JENIS_BIAYA_OPTIONS = [
  "Biaya Masuk",
  "Biaya Semester",
  "Biaya Masuk dan Semester",
  "Tidak Dilaporkan",
  "Biaya Pokok",
  "Biaya SKS",
  "Biaya Pendaftaran",
  "Deposit",
  "Asrama",
  "Pengembangan",
];

const FREKUENSI_OPTIONS = [
  "Semester",
  "Bulanan",
  "Tahunan",
  "Tiap Transaksi",
  "Mingguan",
  "Harian",
];

const EVENT_OPTIONS = ["PMB", "Wisuda", "KKN"];

const AkunTransaksiFormRow: React.FC<AkunTransaksiFormRowProps> = ({
  initialData,
  isEdit = false,
  isSelected = false,
  onToggleSelect,
  onSave,
  onCancel,
}) => {
  const [kode, setKode] = useState(initialData?.kode ?? "");
  const [nama, setNama] = useState(initialData?.nama ?? "");
  const [kelompok, setKelompok] = useState(initialData?.kelompok ?? "");
  const [jenisBiaya, setJenisBiaya] = useState(initialData?.jenisBiaya ?? "");
  const [frekuensi, setFrekuensi] = useState(initialData?.frekuensi ?? "");
  const [event, setEvent] = useState(initialData?.event ?? "");
  const [mahasiswa, setMahasiswa] = useState(initialData?.mahasiswa ?? false);
  const [pendaftar, setPendaftar] = useState(initialData?.pendaftar ?? false);
  const [generateKuliah, setGenerateKuliah] = useState(
    initialData?.generateKuliah ?? true,
  );
  const [sevimaPay, setSevimaPay] = useState(initialData?.sevimaPay ?? true);

  // Sync if initialData changes
  useEffect(() => {
    if (initialData) {
      setKode(initialData.kode);
      setNama(initialData.nama);
      setKelompok(initialData.kelompok);
      setJenisBiaya(initialData.jenisBiaya);
      setFrekuensi(initialData.frekuensi);
      setEvent(initialData.event);
      setMahasiswa(initialData.mahasiswa);
      setPendaftar(initialData.pendaftar);
      setGenerateKuliah(initialData.generateKuliah);
      setSevimaPay(initialData.sevimaPay);
    }
  }, [initialData]);

  const handleSave = () => {
    const updatedItem: AkunTransaksi = {
      id: initialData?.id || Date.now().toString(),
      kode: kode.trim() || `100${Math.floor(Math.random() * 90 + 10)}`,
      nama: nama.trim() || (isEdit ? initialData?.nama || "" : "Akun Transaksi Baru"),
      kelompok: kelompok || "Biaya Kuliah",
      jenisBiaya: jenisBiaya || "Biaya Semester",
      frekuensi: frekuensi || "Semester",
      event: event || "",
      mahasiswa,
      pendaftar,
      generateKuliah,
      sevimaPay,
    };
    onSave(updatedItem);
  };

  return (
    <tr className="bg-gray-50 border-b border-slate-300">
      {/* Checkbox Column */}
      <td className="p-2 border border-slate-300 text-center">
        {isEdit ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
          />
        ) : (
          <div className="w-4 h-4 mx-auto border border-gray-300 rounded bg-white"></div>
        )}
      </td>

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

      {/* Nama Jenis Tagihan */}
      <td className="p-1.5 border border-slate-300">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
          placeholder=""
        />
      </td>

      {/* Kelompok */}
      <td className="p-1.5 border border-slate-300">
        <select
          value={kelompok}
          onChange={(e) => setKelompok(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="">-- Pilih --</option>
          {KELOMPOK_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Jenis Biaya Neofeeder */}
      <td className="p-1.5 border border-slate-300">
        <select
          value={jenisBiaya}
          onChange={(e) => setJenisBiaya(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="">-- Pilih --</option>
          {JENIS_BIAYA_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Frekuensi */}
      <td className="p-1.5 border border-slate-300">
        <select
          value={frekuensi}
          onChange={(e) => setFrekuensi(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="">-- Pilih --</option>
          {FREKUENSI_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Event */}
      <td className="p-1.5 border border-slate-300">
        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded px-1.5 py-1 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="">-- Pilih Event --</option>
          {EVENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Mahasiswa */}
      <td className="p-1.5 border border-slate-300 text-center">
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={mahasiswa}
            onChange={(e) => setMahasiswa(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-0 cursor-pointer"
          />
        </div>
      </td>

      {/* Pendaftar */}
      <td className="p-1.5 border border-slate-300 text-center">
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={pendaftar}
            onChange={(e) => setPendaftar(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-0 cursor-pointer"
          />
        </div>
      </td>

      {/* Generate Kuliah? */}
      <td className="p-1.5 border border-slate-300 text-center">
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={generateKuliah}
            onChange={(e) => setGenerateKuliah(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-0 cursor-pointer"
          />
        </div>
      </td>

      {/* EduFin? */}
      <td className="p-1.5 border border-slate-300 text-center">
        <div className="flex justify-center items-center">
          <input
            type="checkbox"
            checked={sevimaPay}
            onChange={(e) => setSevimaPay(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-0 cursor-pointer"
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

export default AkunTransaksiFormRow;
