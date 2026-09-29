import { IoMdSearch, IoMdRefresh } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import PengaturanPeriodePembayaranTable from "../components/PengaturanPeriodePembayaranTable";

export default function PengaturanPeriodePembayaranPage() {
  document.title = "Pengaturan - Periode Pembayaran";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Periode Pembayaran</p>
      </div>
      <div>
        <InformationCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 mt-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4">
          <Dropdown
            options={["-- Semua --", "NIM", "Nama"]}
            className="mr-4 mb-2 sm:mb-0 w-40  text-xs"
          />
          <div className="flex space-x-0.5  items-center">
            <TextField
              placeholder="Cari Pengaturan Periode"
              className="w-full sm:w-80"
            />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div>
          <PengaturanPeriodePembayaranTable />
        </div>
      </div>
    </>
  );
}

function InformationCard() {
  return (
    <div className="border border-cyan-200 bg-cyan-50 rounded-lg p-4 mb-6 text-xs">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center mr-3">
          <span className="font-bold">i</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Informasi Penting!</h3>

          <p className="text-gray-800">
            Setelah mengisi tanggal pembayaran, pastikan aturan tagihan sudah
            terisi{" "}
            <a href="#" className="text-green-600 hover:underline">
              di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
