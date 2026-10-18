import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { IoClose, IoCloudUpload } from "react-icons/io5";

export interface ImportTransaksiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport?: (file: File) => void;
  templateUrl?: string;
  templateFileName?: string;
  loading?: boolean;
}

const ImportTransaksiModal: React.FC<ImportTransaksiModalProps> = ({
  isOpen,
  onClose,
  onImport,
  templateUrl = "/templates/template_import_tagihan.xlsx",
  templateFileName = "template_import_tagihan.xlsx",
  loading = false,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedFile) {
      alert("Silakan pilih file Excel terlebih dahulu.");
      return;
    }
    if (onImport) {
      onImport(selectedFile);
    }
    setSelectedFile(null);
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButton={false}
      maxWidth="max-w-[620px]"
      className="p-6 sm:p-7 rounded-2xl"
    >
      {/* Header Modal */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Import Transaksi
        </h2>
        <button
          type="button"
          onClick={handleClose}
          className="text-[#2b3a67] hover:text-[#182346] p-1 transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <IoClose size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* File Upload Row */}
        <div className="flex flex-col sm:flex-row sm:items-start mb-6">
          <label className="w-32 text-sm font-semibold text-[#4e73df] mb-1 sm:mb-0 shrink-0 pt-1.5">
            File Upload
          </label>
          <div className="flex-1">
            <div className="border border-gray-300 rounded px-2.5 py-1.5 flex items-center bg-white">
              <label className="bg-[#efefef] hover:bg-gray-200 text-gray-800 border border-gray-300 text-xs px-2.5 py-1 rounded cursor-pointer shrink-0 transition-colors">
                Choose File
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-gray-600 ml-3 truncate">
                {selectedFile ? selectedFile.name : "No file chosen"}
              </span>
            </div>
            <p className="text-xs text-[#00c0ef] font-medium mt-1">
              xlsx, xls (maxsize: 5 MB)
            </p>
          </div>
        </div>

        {/* Petunjuk & Download Template Inline */}
        <div className="mb-8 text-xs sm:text-[13px] text-gray-700 leading-relaxed">
          <span>
            Pastikan susunan data file excel yang akan diunggah sesuai dengan
            template yang bisa diunduh Download template{" "}
          </span>
          <a
            href={templateUrl}
            download={templateFileName}
            className="inline-flex items-center px-3.5 py-1 bg-[#00c0ef] hover:bg-[#00acd6] active:bg-[#0097bc] text-white rounded text-xs sm:text-[13px] font-medium transition-colors cursor-pointer shadow-xs ml-1"
          >
            download
          </a>
        </div>

        {/* Tombol Aksi Kanan Bawah */}
        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white font-medium rounded-lg text-sm flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <IoCloudUpload size={18} />
            <span>Import</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-5 py-2.5 bg-[#f4543c] hover:bg-[#dc4232] active:bg-[#c9302c] text-white font-medium rounded-lg text-sm flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <IoClose size={18} />
            <span>Batal</span>
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default ImportTransaksiModal;
