import React from "react";
import BaseModal from "../../../components/modal/BaseModal";

interface InformasiFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const InformasiFilterModal: React.FC<InformasiFilterModalProps> = ({
  isOpen,
  onClose,
  title = "Informasi",
  message = "Pilih Jalur Pendaftaran, Gelombang, Sistem Kuliah, dan Program Studi terlebih dahulu",
  buttonText = "Oke",
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-[390px]"
      className="p-7 sm:p-8 rounded-2xl"
    >
      {/* Ikon Lingkaran Kuning dengan Halo Cream */}
      <div className="w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center mb-4">
        <div className="w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center text-white shadow-xs">
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="4.2" r="1.8" />
            <rect x="8.5" y="8" width="3" height="8" rx="1.5" />
          </svg>
        </div>
      </div>

      {/* Judul Modal */}
      <h3 className="text-base font-bold text-gray-800 mb-3">{title}</h3>

      {/* Pesan Modal */}
      <p className="text-sm text-gray-600 mb-6 leading-relaxed px-1">
        {message}
      </p>

      {/* Tombol Oke */}
      <button
        type="button"
        onClick={onClose}
        className="w-full py-2.5 px-4 bg-[#205295] hover:bg-[#183f73] text-white font-medium rounded-lg text-sm transition-colors cursor-pointer shadow-sm focus:outline-none"
      >
        {buttonText}
      </button>
    </BaseModal>
  );
};

export default InformasiFilterModal;
