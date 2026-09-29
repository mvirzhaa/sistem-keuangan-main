import { IoMdAdd, IoMdRefresh, IoMdSearch, IoMdSettings, IoMdTrash } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import FilterDataPembayaranCard from "../components/FilterDataPembayaranCard";
import { ROUTES } from "../../../common/routes/routes";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import PembayaranTable from "../components/PembayaranTable";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: "1",
    kodePembayaran: "PAY/20242/0010885",
    nim: "221106013200",
    nama: "ALFITO DHEANOVA",
    periode: "20242",
    metodePembayaran: "SevimaPay",
    channel: "Shopee",
    online: true,
    tanggal: "8 Jul 2025, 17:22:08",
    nominal: 350000,
    batal: false,
  },
  {
    id: "2",
    kodePembayaran: "PAY/20242/0010884",
    nim: "211105020110",
    nama: "AZKIA RAHMANIA FITRI",
    periode: "20242",
    metodePembayaran: "SevimaPay",
    channel: "Bank Muamalat",
    online: true,
    tanggal: "8 Jul 2025, 17:10:51",
    nominal: 1350000,
    batal: false,
  },
  {
    id: "3",
    kodePembayaran: "PAY/20242/0010883",
    nim: "181106041185",
    nama: "SULTAN RIZALDI",
    periode: "20242",
    metodePembayaran: "SevimaPay",
    channel: "Shopee",
    online: true,
    tanggal: "8 Jul 2025, 16:53:55",
    nominal: 1500000,
    batal: false,
  },
];

export default function PembayaranPage() {
  document.title = "Transaksi - Pembayaran";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Pembayaran</p>
      </div>
      <div className="mt-4">
        <FilterDataPembayaranCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs" />
            <div className="flex space-x-0.5 items-center">
              <TextField placeholder="Cari Transaksi" className="w-full sm:w-80" />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => {
                navigate(ROUTES.OPERASIONAL.PEMBAYARAN);
              }}
            />
          </div>
        </div>
        <PembayaranTable data={data} />
      </div>
    </>
  );
}
