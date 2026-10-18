import React from "react";
import BaseModal from "./BaseModal";

export interface InformasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const InformasiModal: React.FC<InformasiModalProps> = ({
  isOpen,
  onClose,
  title = "Informasi",
  message = "Silakan centang data yang ingin dihapus terlebih dahulu",
  buttonText = "Oke",
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-[420px]"
      className="p-8 rounded-2xl"
    >
      {/* Yellow / Amber Circular Info Icon */}
      <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center mb-4">
        <div className="w-6 h-6 rounded-full bg-[#f59e0b] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          <svg
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <circle cx="10" cy="4.2" r="1.8" />
            <rect x="8.5" y="8" width="3" height="8" rx="1.5" />
          </svg>
        </div>
      </div>

      {/* Modal Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2.5">{title}</h3>

      {/* Modal Message */}
      <p className="text-sm text-gray-600 mb-7 leading-relaxed">
        {message}
      </p>

      {/* Action Button */}
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

export default InformasiModal;
