import { useState } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";
import KelompokTable from "../components/KelompokTable";
import { IoFilter } from "react-icons/io5";

export default function KelompokPage() {
  document.title = "Referensi - Kelompok";

  const jenisTransaksiOptions = [
    "-- Semua Jenis Transaksi --",
    "DEP - Deposit",
    "PAY - Pembayaran",
    "INV - Tagihan",
  ];

  const [selectedJenisTransaksi, setSelectedJenisTransaksi] = useState(
    jenisTransaksiOptions[0],
  );
  const [activeFilter, setActiveFilter] = useState(jenisTransaksiOptions[0]);

  const handleSaveFilter = () => {
    setActiveFilter(selectedJenisTransaksi);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Kelompok</h1>
      </div>

      <div className="shadow-md bg-white border-t-4 border-t-amber-500 rounded-md p-5 text-xs mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center flex-1 max-w-lg">
            <label className="w-36 font-medium text-sm text-amber-600 shrink-0">
              Jenis Transaksi
            </label>
            <Dropdown
              options={jenisTransaksiOptions}
              value={selectedJenisTransaksi}
              defaultValue={selectedJenisTransaksi}
              onChange={(value) => setSelectedJenisTransaksi(value)}
              className="w-full text-xs"
            />
          </div>

          <div className="flex justify-end items-center shrink-0">
            <button
              type="button"
              onClick={handleSaveFilter}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center text-xs font-medium cursor-pointer shadow-xs transition-colors"
            >
              <IoFilter className="mr-2 text-sm" />
              Simpan Filter
            </button>
          </div>
        </div>
      </div>

      <KelompokTable filterJenisTransaksi={activeFilter} />
    </>
  );
}

