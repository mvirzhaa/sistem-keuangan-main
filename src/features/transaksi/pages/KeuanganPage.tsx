import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import KeuanganTable from "../components/KeuanganTable";

const data = [
  {
    id: "2",
    no: 2,
    kodeTransaksi: "INV/20242/0026899",
    jenisTransaksi: "INV",
    periode: "20242",
    tanggal: "5 Jul 2025, 10:58:59",
    idPengguna: "211105010366",
    nama: "AHMAD NABIL MUASSYAF KAMIL",
    uraian: "",
    debet: null,
    kredit: 300000,
  },
];

export default function KeuanganPage() {
  document.title = "Transaksi - Keuangan";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Keuangan</p>
      </div>
      <div className="container shadow-lg rounded border-t-amber-500 border-t-4 p-4 mb-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 text-xs">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-amber-500 font-medium w-50">Periode</p>
          <Dropdown options={["2024 Genap", "2024 Ganjil"]} className="w-full" />
        </div>
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-amber-500 font-medium w-50">Jenis Transaksi</p>
          <Dropdown options={["--Semua Jenis Transaksi--"]} className="w-full" />
        </div>
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
          <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 text-xs" />
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Transaksi" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div className="mb-4">
          <KeuanganTable
            data={data}
            // loading={loading}
            // onView={handleView}
          />
        </div>
      </div>
    </>
  );
}
