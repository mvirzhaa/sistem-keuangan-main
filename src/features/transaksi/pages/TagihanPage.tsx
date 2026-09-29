import { IoMdAdd, IoMdCloudUpload, IoMdRefresh, IoMdSearch, IoMdSettings, IoMdTrash } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import FilterDataTagihanCard from "../components/FIlterDataTagihanCard";
import TextField from "../../../components/inputs/TextField";
import TagihanTable from "../components/TagihanTable";

import { type TagihanData } from "../components/TagihanTable";
import InformasiJenisTagihanCard from "../components/InformasiJenisTagihanCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/routes/routes";

const data: TagihanData[] = [
  {
    id: "1",
    kodeTagihan: "INV/20232/0000126",
    nim: "231106051399",
    nama: "ZIYAD RAIS",
    jenis: "1090",
    cicilan: 1,
    bulan: "",
    nominal: 1000000,
    denda: 0,
    potongan: 0,
    bayar: 1000000,
    lunas: true,
    tglAkhirDispensasi: "",
    statusPembayaran: "lunas",
  },
  {
    id: "2",
    kodeTagihan: "INV/20241/0005401",
    nim: "231105060041",
    nama: "ANNISA AGUSTIN",
    jenis: "SKS",
    cicilan: 1,
    bulan: "Feb 2025",
    nominal: 1200000,
    denda: 0,
    potongan: 0,
    bayar: 1200000,
    lunas: true,
    tglAkhirDispensasi: "",
    statusPembayaran: "lunas",
  },
];

const jenisTagihan = [
  { kode: "1000", nama: "UKT KIP Kuliah", label: "A" },
  { kode: "1001", nama: "UKT KIP Kuliah", label: "B" },
  { kode: "1002", nama: "UKT KIP Kuliah", label: "C" },
  { kode: "1011", nama: "Uang Gedung Tahap 1" },
  { kode: "1012", nama: "Uang Gedung Tahap 2" },
  { kode: "1016", nama: "Wakaf Masjid Ibn Khaldun" },
  { kode: "1017", nama: "Wakaf Uang Tunai" },
  { kode: "1018", nama: "TOEFL", label: "Unit Pengembangan Bahasa" },
  { kode: "1020", nama: "SPP" },
];

export default function TagihanPage() {
  document.title = "Transaksi - Tagihan";
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Tagihan</p>
      </div>
      <div>
        <FilterDataTagihanCard />
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
                navigate(ROUTES.TRANSAKSI.DETAIL_TAGIHAN);
              }}
            />
            <IconButton icon={<IoMdTrash />} text="Hapus" responsive={false} variant="danger" className="text-sm" onClick={() => console.log("Refresh")} />
            <IconButton icon={<IoMdSettings />} text="Aksi" responsive={false} variant="warning" className="text-sm" onClick={() => console.log("Refresh")} />
          </div>
        </div>
        <TagihanTable data={data} />
        <InformasiJenisTagihanCard jenisTagihan={jenisTagihan} className="mt-4" />
      </div>
    </>
  );
}
