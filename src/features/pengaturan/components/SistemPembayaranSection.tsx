import React, { useState } from "react";
import {
  IoInformationCircle,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import TextField from "../../../components/inputs/TextField";
import Toggle from "../../../components/inputs/Toggle";
import Dropdown from "../../../components/inputs/Dropdown";

export default function SistemPembayaranSection() {
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);

  const toggleExpand = (system: string) => {
    if (expandedSystem === system) {
      setExpandedSystem(null);
    } else {
      setExpandedSystem(system);
    }
  };

  return (
    <div className="bg-white rounded-sm shadow-sm border-t-2 border-t-amber-400">
      <div className="p-6 pb-3">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Sistem Pembayaran
        </h2>
        <p className="text-sm text-gray-600">
          Pantau semua pengaturan sistem pembayaran yang Anda gunakan
        </p>
      </div>

      <div className="px-6">
        <hr className="border-t border-gray-200" />
      </div>

      {/* Info alert */}
      <div className="mx-6 my-4 p-4 bg-blue-50 border border-blue-100 rounded-md flex items-start gap-3">
        <div className="text-blue-500 mt-0.5">
          <IoInformationCircle size={22} />
        </div>
        <p className="text-sm text-gray-700">
          Anda hanya dapat mengaktifkan salah satu sistem pembayaran pada
          Perguruan Tinggi
        </p>
      </div>

      {/* EduFin Card */}
      <div className="mx-6 my-4 border border-gray-200 rounded-md">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleExpand("edufin")}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold">EduFin</h3>
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded">
                Active - Production
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Layanan pembayaran online Mahasiswa melalui service bank (teller,
              ATM, Ibank Personal/Mobile Banking serta e-channel bank lainnya)
              secara lifetime.
            </p>
          </div>
          <div>
            {expandedSystem === "edufin" ? (
              <IoChevronUp size={20} className="text-gray-500" />
            ) : (
              <IoChevronDown size={20} className="text-gray-500" />
            )}
          </div>
        </div>

        {expandedSystem === "edufin" && (
          <div className="p-4 border-t border-gray-200">
            {/* EduFin form content will go here */}
            <p className="text-sm text-gray-600">
              Form content for EduFin will be added later...
            </p>
          </div>
        )}
      </div>

      {/* Simponi Card */}
      <div className="mx-6 mb-6 border border-gray-200 rounded-md">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleExpand("simponi")}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold">Simponi</h3>
            </div>
            <p className="text-sm text-gray-600">
              Sistem informasi yang dikelola oleh Direktorat Jenderal Anggaran,
              yang meliputi Sistem Perencanaan PNBP, Sistem Billing dan Sistem
              Pelaporan PNBP.
            </p>
          </div>
          <div>
            {expandedSystem === "simponi" ? (
              <IoChevronUp size={20} className="text-gray-500" />
            ) : (
              <IoChevronDown size={20} className="text-gray-500" />
            )}
          </div>
        </div>

        {expandedSystem === "simponi" && (
          <div className="p-4 border-t border-gray-200">
            {/* Simponi form content will go here */}
            <p className="text-sm text-gray-600">
              Form content for Simponi will be added later...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
