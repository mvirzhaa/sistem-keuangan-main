import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";

interface UnggahExcelUktModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (fileName: string) => void;
  templateUrl?: string;
  templateFileName?: string;
}

const UnggahExcelUktModal: React.FC<UnggahExcelUktModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  templateUrl = "/templates/UKT_M_20262_.xlsx",
  templateFileName = "UKT_M_20262_.xlsx",
}) => {
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUploadClick = () => {
    if (!uploadedFileName) {
      alert("Silahkan pilih file Excel terlebih dahulu.");
      return;
    }
    if (onUpload) {
      onUpload(uploadedFileName);
    }
    setUploadedFileName("");
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-[620px] w-full p-6 sm:p-7 relative transition-all transform scale-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[22px] font-bold text-gray-800 tracking-tight">
            Unggah Excel UKT
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#20407c] hover:text-blue-900 text-2xl p-0.5 cursor-pointer transition-colors"
            aria-label="Tutup modal"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Kotak Rekomendasi (Kuning) */}
        <div className="border-l-4 border-[#edd588] bg-[#fffdf5] p-4 px-5 mb-4 text-[13px] leading-relaxed text-gray-600 space-y-2 rounded-r-xs">
          <p>
            <span className="font-bold text-gray-800 mr-1.5 inline-flex items-center">
              <FaInfoCircle className="mr-1.5 text-gray-700 shrink-0 text-sm" />
              Rekomendasi:
            </span>
            Tambah filter lain untuk mengambil bagian data yang diperlukan atau
            lakukan unggah bertahap untuk performa yang lebih baik.
          </p>
          <p>
            <span className="font-bold text-gray-800 mr-1.5 inline-flex items-center">
              <FaInfoCircle className="mr-1.5 text-gray-700 shrink-0 text-sm" />
              Info:
            </span>
            Data yang akan diproses maksimal 1,000 baris.
          </p>
        </div>

        {/* Kotak Template Download (Biru Muda) */}
        <div className="border-l-4 border-[#9ec5f3] bg-[#f1f7fe] p-4 px-5 mb-6 text-[13px] leading-relaxed text-gray-600 rounded-r-xs">
          Pastikan susunan data file excel yang akan diunggah sesuai dengan
          template yang terbaru atau yang telah disediakan. Silahkan{" "}
          <a
            href={templateUrl}
            download={templateFileName}
            className="text-[#1a56db] font-bold underline hover:text-blue-900 cursor-pointer"
          >
            download template disini!
          </a>
        </div>

        {/* Form Input File */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6">
          <label className="w-28 text-sm font-bold text-[#6284be] mb-1 sm:mb-0 shrink-0">
            File Excel
          </label>
          <div className="flex-1">
            <div className="border border-gray-300 rounded px-2.5 py-1.5 flex items-center bg-white">
              <label className="bg-[#efefef] hover:bg-gray-200 text-gray-800 border border-gray-300 text-xs px-2.5 py-1 rounded cursor-pointer shrink-0 transition-colors">
                Choose File
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-600 ml-3 truncate">
                {uploadedFileName || "No file chosen"}
              </span>
            </div>
            <p className="text-[11px] text-[#2b76b9] font-medium mt-1">
              xls, xlsx (maxsize: 2.097152 MB)
            </p>
          </div>
        </div>

        {/* Tombol Aksi Modal */}
        <div className="flex justify-end space-x-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#f05545] hover:bg-[#dc4232] text-white text-sm font-medium rounded flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <IoMdClose size={16} />
            <span>Batal</span>
          </button>
          <button
            type="button"
            onClick={handleUploadClick}
            className="px-4 py-2 bg-[#82888d] hover:bg-[#6f757a] text-white text-sm font-medium rounded flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <IoMdCloudUpload size={18} />
            <span>Unggah Excel</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default UnggahExcelUktModal;
