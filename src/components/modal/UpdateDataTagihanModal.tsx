import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { IoClose, IoCloudDownload, IoCloudUpload } from "react-icons/io5";

export interface UpdateDataTagihanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (file: File) => void;
  templateUrl?: string;
  templateFileName?: string;
  loading?: boolean;
}

const UpdateDataTagihanModal: React.FC<UpdateDataTagihanModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  templateUrl = "/templates/template_update_tagihan.xls",
  templateFileName = "template_update_tagihan.xls",
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
    if (onUpdate) {
      onUpdate(selectedFile);
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
          Update Data Tagihan
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
        <div className="flex flex-col sm:flex-row sm:items-start mb-4">
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

        {/* Ketentuan Update Excel */}
        <div className="mt-4 mb-4 text-xs sm:text-[13px] text-gray-700">
          <p className="font-normal text-gray-700 mb-2">
            Ketentuan update excel:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-600 leading-relaxed">
            <li>
              Pastikan susunan data file excel yang akan diupload sesuai dengan template yang bisa didownload.
            </li>
            <li>
              Ketika melakukan download template pastikan filter sudah sesuai yang dibutuhkan, begitu juga ketika upload file untuk update datanya.
            </li>
            <li>
              <span className="font-bold text-gray-800">
                Excel Cell yang berwarna merah tidak boleh di edit.
              </span>
            </li>
            <li>
              Data yang memiliki status <span className="font-bold text-gray-800">Lunas</span> dan{" "}
              <span className="font-bold text-gray-800">Belum Lunas</span> (tapi sudah bayar sebagian) tidak bisa diedit.
            </li>
          </ul>
        </div>

        {/* Download Template Section */}
        <div className="mt-4 mb-6">
          <p className="text-xs sm:text-[13px] text-gray-700 mb-2">
            Format import bisa didownload lewat button dibawah ini.
          </p>
          <a
            href={templateUrl}
            download={templateFileName}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#00c0ef] hover:bg-[#00acd6] active:bg-[#0097bc] text-white rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-xs"
          >
            <IoCloudDownload size={18} />
            <span>Download</span>
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
            <span>Update</span>
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

export default UpdateDataTagihanModal;
