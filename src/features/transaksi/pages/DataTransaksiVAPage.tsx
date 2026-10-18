import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import DataTransaksiVAForm from "../components/DataTransaksiVAForm";
import { ROUTES } from "../../../common/routes/routes";

export default function DataTransaksiVAPage() {
  document.title = "Virtual Account - Data Transaksi VA";
  const navigate = useNavigate();

  return (
    <>
      {/* Title Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Virtual Account</h1>
        <p className="text-sm text-gray-500 mb-1">Data Transaksi VA</p>
      </div>

      {/* Main Container Card dengan background putih (Gambar 1) */}
      <div className="w-full bg-white shadow-lg rounded-md border-t-4 border-t-green-800 p-6">
        {/* Top Right: Kembali ke Daftar */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.TRANSAKSI.VIRTUAL_ACCOUNT)}
            className="bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <IoChevronBack size={16} />
            Kembali ke Daftar
          </button>
        </div>

        {/* Form Data Transaksi VA */}
        <DataTransaksiVAForm />
      </div>
    </>
  );
}
