import React from "react";
import { IoInformationCircle } from "react-icons/io5";

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  title = "Informasi",
  message = "Mohon mengisi isian yang bergaris merah",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full p-6 sm:p-7 relative transition-all transform scale-100 animate-scale-up">
        {/* Round Yellow Info Icon */}
        <div className="w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center mb-3">
          <IoInformationCircle className="text-[#f59e0b] text-3xl" />
        </div>

        {/* Modal Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Modal Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{message}</p>

        {/* Button Oke */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 px-4 bg-[#274fb8] hover:bg-[#1e3e96] text-white font-medium rounded-lg text-sm transition-colors cursor-pointer shadow-sm focus:outline-none"
        >
          Oke
        </button>
      </div>
    </div>
  );
};
