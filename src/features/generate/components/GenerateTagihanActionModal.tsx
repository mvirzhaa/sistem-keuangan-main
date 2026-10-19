import React, { useState, useEffect } from "react";
import BaseModal from "../../../components/modal/BaseModal";
import { FaCheck, FaTimes } from "react-icons/fa";

export interface GenerateTagihanActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "generate" | "cancel";
  frekuensi?: string;
  unitName?: string;
  onConfirm?: (selectedItems: string[], mode: "generate" | "cancel") => void;
}

export const DEFAULT_TAGIHAN_ITEMS = [
  "TOEFL (Unit Pengembangan Bahasa)",
  "KKN",
  "SKS Semester 1",
  "SKS RPL Konversi",
  "UKT MHB",
  "UKT Orang Tua Asuh",
  "TOEFL (FKIP)",
  "SEMINAR PROPOSAL (FKIP)",
  "PRAKTEK MEDIA AUGMENTED (FKIP)",
  "PRAKTEK BAHAN PEMBELAJARAN CETAK DAN DIGITAL(FKIP)",
  "ENGLISH SCORE BRITISH COUNSIL (FKIP)",
  "PRAKTEK E-LEARNING (FKIP)",
  "Buku Panduan Penulisan Skripsi (FH)",
  "Seminar Pra Skripsi (FH)",
  "SK Bimbingan Skripsi )FH)",
  "Program Kuliah Pare (B.Inggris)",
  "Praktikum Menggambar Rekayasa",
  "Praktikum Gizi",
  "Praktikum Biomedik",
  "Praktikum Kesling",
  "TOEFL (FIKES)",
  "Pelatihan TOEFL FIKES",
  "Biaya Awal Masuk - Pasca",
  "Biaya Awal Perkuliahan",
  "Biaya Pemeliharaan Ijazah",
];

const GenerateTagihanActionModal: React.FC<GenerateTagihanActionModalProps> = ({
  isOpen,
  onClose,
  mode,
  frekuensi = "Tiap Transaksi",
  unitName,
  onConfirm,
}) => {
  // Semua item dicentang secara default sesuai tampilan gambar 4 & 5
  const [selectedItems, setSelectedItems] = useState<string[]>(DEFAULT_TAGIHAN_ITEMS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset / inisialisasi ketika modal dibuka
  useEffect(() => {
    if (isOpen) {
      setSelectedItems(DEFAULT_TAGIHAN_ITEMS);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const isAllSelected = selectedItems.length === DEFAULT_TAGIHAN_ITEMS.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...DEFAULT_TAGIHAN_ITEMS]);
    }
  };

  const handleToggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert("Pilih minimal satu jenis transaksi terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (onConfirm) {
        onConfirm(selectedItems, mode);
      }
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const modalTitle = (
    <h2 className="text-base sm:text-lg font-medium text-gray-800">
      Generate Tagihan Mahasiswa Frekuensi {frekuensi}
    </h2>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="max-w-lg"
      className="p-5"
    >
      <div className="border-t border-gray-200 pt-3">
        {/* Master Checkbox: Semua */}
        <div className="pb-3 border-b border-gray-100 mb-3">
          <label className="flex items-center space-x-3 cursor-pointer text-sm font-medium text-gray-800 select-none hover:text-blue-600">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleToggleAll}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer accent-blue-600"
            />
            <span>Semua</span>
          </label>
        </div>

        {/* Daftar Checkbox Item */}
        <div className="max-h-[58vh] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
          {DEFAULT_TAGIHAN_ITEMS.map((item, idx) => {
            const isChecked = selectedItems.includes(item);
            return (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer text-sm text-gray-700 hover:text-gray-900 select-none transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleItem(item)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer accent-blue-600 flex-shrink-0"
                />
                <span className="leading-snug">{item}</span>
              </label>
            );
          })}
        </div>

        {/* Footer Tombol Aksi */}
        <div className="flex justify-end pt-4 mt-3 border-t border-gray-200">
          {mode === "generate" ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-md text-sm shadow flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <FaCheck className="text-xs" />
              <span>{isSubmitting ? "Memproses..." : "Generate Tagihan"}</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-md text-sm shadow flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <FaTimes className="text-xs" />
              <span>{isSubmitting ? "Membatalkan..." : "Batalkan Tagihan"}</span>
            </button>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default GenerateTagihanActionModal;
