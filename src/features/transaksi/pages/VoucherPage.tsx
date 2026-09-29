import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import FilterDataVoucherCard from "../components/FilterDataVoucherCard";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import VoucherTable from "../components/VoucherTable";

const data = [
  {
    id: "1",
    no: 1,
    idPendaftar: "4102540600",
    nama: "ALEA MUTIARA MEIDITA",
    voucher: "KIP Sekolah Undangan",
    periode: "2025 Ganjil",
    nominal: 300000,
    digunakan: 300000,
  },
  {
    id: "2",
    no: 2,
    idPendaftar: "4102540601",
    nama: "RIZAL AZIZ AL HAKIM",
    voucher: "KIP Sekolah Undangan",
    periode: "2025 Ganjil",
    nominal: 300000,
    digunakan: 300000,
  },
];

export default function VoucherPage() {
  document.title = "Penerima Voucher";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Penerima Voucher</h1>
      </div>
      <div>
        <FilterDataVoucherCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs" />
            <div className="flex space-x-0.5  items-center">
              <TextField placeholder="Cari Virtual Account" className="w-full sm:w-80" />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
        </div>
        <VoucherTable data={data} />
      </div>
    </>
  );
}
