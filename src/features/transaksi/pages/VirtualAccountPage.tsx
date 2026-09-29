import { IoMdAdd, IoMdClose, IoMdRefresh, IoMdSearch } from "react-icons/io";
import FilterDataVirtualAccountCard from "../components/FilterDataVirtualAccountCard";
import TextField from "../../../components/inputs/TextField";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import VirtualAccountTable, { type VirtualAccountData } from "../components/VirtualAccountTable";
import { ROUTES } from "../../../common/routes/routes";
import { useNavigate } from "react-router-dom";

const dummyData: VirtualAccountData[] = [
  {
    id: "1",
    kodeVA: "7099060000009636",
    nim: "1911040108118",
    nama: "MUHAMMAD FAUZAN ADZKI",
    channel: "Bank Muamalat",
    tglJatuhTempo: "13 Jul 2025, 23:59:59",
    nominal: 700000,
    bayar: 700000,
    tglBayar: "10 Jul 2025, 14:00:54",
    status: "LUNAS",
  },
  {
    id: "2",
    kodeVA: "7099060000009635",
    nim: "241203012022",
    nama: "YUDHA DENIYANTO",
    channel: "Bank Muamalat",
    tglJatuhTempo: "13 Jul 2025, 23:59:59",
    nominal: 1110000,
    bayar: null,
    tglBayar: null,
    status: "AKTIF",
  },
];

export default function VirtualAccountPage() {
  document.title = "Virtual Account - Daftar Transaksi VA";

  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Virtual Account</h1>
        <p className="text-sm text-gray-500 mb-1">Daftar Transaksi VA</p>
      </div>
      <div>
        <FilterDataVirtualAccountCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs" />
            <div className="flex space-x-0.5 items-center">
              <TextField placeholder="Cari Virtual Account" className="w-full sm:w-80" />
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
                navigate(ROUTES.TRANSAKSI.DATA_TRANSAKSI_VA);
              }}
            />
            <IconButton icon={<IoMdClose />} responsive={false} text="Batalkan VA" variant="danger" className="text-sm" onClick={() => {}} />
          </div>
        </div>
        <VirtualAccountTable data={dummyData} />
      </div>
    </>
  );
}
