import React from "react";
import BaseModal from "../../../components/modal/BaseModal";

export type CekalType = "cekal" | "batal_cekal";

interface KonfirmasiCekalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: CekalType;
  selectedCount?: number;
}

const KonfirmasiCekalModal: React.FC<KonfirmasiCekalModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
}) => {
  const isBatal = type === "batal_cekal";
  const message = isBatal
    ? "Apakah anda yakin akan membatalkan cekal keuangan pada mahasiswa yang dipilih ?"
    : "Apakah anda yakin akan melakukan cekal keuangan pada mahasiswa yang dipilih ?";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-md"
      className="p-6 sm:p-7 rounded-2xl"
    >
      {/* Ikon Kuning Halo Info */}
      <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center mb-4">
        <div className="w-7 h-7 rounded-full bg-[#f59e0b] flex items-center justify-center text-white shadow-xs">
          <span className="text-white font-serif font-bold text-sm leading-none italic">
            i
          </span>
        </div>
      </div>

      {/* Judul Modal */}
      <h3 className="text-lg font-bold text-gray-800 mb-3 text-left">
        Konfirmasi
      </h3>

      {/* Pesan Modal */}
      <p className="text-sm text-gray-600 mb-8 leading-relaxed text-left">
        {message}
      </p>

      {/* Tombol Aksi */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 px-5 bg-white border border-gray-400 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg text-sm transition-colors cursor-pointer text-center"
        >
          Batalkan
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 py-2.5 px-5 bg-[#255799] hover:bg-[#1c457c] active:bg-[#163663] text-white font-medium rounded-lg text-sm transition-colors cursor-pointer text-center shadow-sm"
        >
          Ya, Yakin
        </button>
      </div>
    </BaseModal>
  );
};

export default KonfirmasiCekalModal;
