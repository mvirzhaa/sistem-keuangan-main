import React from "react";
import BaseModal from "./BaseModal";

export interface KonfirmasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: "primary" | "danger";
  loading?: boolean;
}

const KonfirmasiModal: React.FC<KonfirmasiModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  message = "Apakah anda yakin akan menghapus data tagihan yang dipilih ?",
  cancelText = "Batalkan",
  confirmText = "Ya, Yakin",
  confirmVariant = "primary",
  loading = false,
}) => {
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
        {title}
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
          disabled={loading}
          className="flex-1 py-2.5 px-5 bg-white border border-gray-400 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg text-sm transition-colors cursor-pointer text-center disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`flex-1 py-2.5 px-5 ${
            confirmVariant === "danger"
              ? "bg-[#F4543C] hover:bg-[#d9432d] active:bg-[#be3521]"
              : "bg-[#255799] hover:bg-[#1c457c] active:bg-[#163663]"
          } text-white font-medium rounded-lg text-sm transition-colors cursor-pointer text-center shadow-sm disabled:opacity-50`}
        >
          {loading ? "Memproses..." : confirmText}
        </button>
      </div>
    </BaseModal>
  );
};

export default KonfirmasiModal;
