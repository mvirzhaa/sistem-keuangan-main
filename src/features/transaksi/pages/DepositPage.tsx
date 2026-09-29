import { IoMdAdd, IoMdCloudUpload, IoMdDownload, IoMdList, IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import FilterDataDepositCard from "../components/FilterDataDepositCard";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import DepositTable from "../components/DepositTable";
import { ROUTES } from "../../../common/routes/routes";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: "1",
    kodeDeposit: "DEP/20242/0000039",
    nim: "221104021745",
    nama: "ENRICO SULTAN FAATHIR",
    periode: "20242",
    tanggal: "2 Jul 2025, 10:20:49",
    metodePembayaran: "Deposit",
    channel: "",
    masuk: null,
    keluar: 350000,
  },
  {
    id: "2",
    kodeDeposit: "DEP/20242/0000038",
    nim: "221104011915",
    nama: "ANGGA IRAWAN",
    periode: "20242",
    tanggal: "19 Jun 2025, 17:00:28",
    metodePembayaran: "Deposit",
    channel: "",
    masuk: null,
    keluar: 820000,
  },
];

export default function DepositPage() {
  document.title = "Transaksi - Deposit";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Deposit</p>
      </div>
      <div className="mt-4">
        <FilterDataDepositCard />
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
                navigate(ROUTES.TRANSAKSI.DETAIL_DEPOSIT);
              }}
            />
            <IconButton icon={<IoMdList />} responsive={false} text="Saldo Deposit" variant="info" className="text-sm" onClick={() => {}} />
            <IconButton icon={<IoMdCloudUpload />} responsive={false} text="Import" variant="info" className="text-sm" onClick={() => {}} />
          </div>
        </div>
        <DepositTable data={data} />
      </div>
    </>
  );
}
