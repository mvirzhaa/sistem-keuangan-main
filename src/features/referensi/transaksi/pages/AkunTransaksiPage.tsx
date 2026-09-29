import { IoMdAdd, IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import TextField from "../../../../components/inputs/TextField";
import FilterDataAkunTransaksiCard from "../components/FilterDataAkunTransaksiCard";
import { IoAdd, IoPencil, IoTrash } from "react-icons/io5";
import Dropdown from "../../../../components/inputs/Dropdown";
import AkunTransaksiTable from "../components/AkunTransaksiTable";

const data = [
  {
    id: "1",
    kode: "1000",
    nama: "UKT KIP Kuliah (A)",
    kelompok: "KIP Kuliah",
    jenisBiaya: "Biaya Semester",
    frekuensi: "Semester",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: true,
    sevimaPay: true,
  },
  {
    id: "2",
    kode: "1001",
    nama: "UKT KIP Kuliah (B)",
    kelompok: "KIP Kuliah",
    jenisBiaya: "Biaya Semester",
    frekuensi: "Semester",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: true,
    sevimaPay: true,
  },
];

export default function AkunTransaksiPage() {
  document.title = "Referensi - Akun Transaksi";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Akun Transaksi</h1>
      </div>
      <div>
        <FilterDataAkunTransaksiCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Akun Transaksi"
                className="w-full sm:w-80"
              />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoPencil />}
              responsive={false}
              text="Pilih Jenis Biaya"
              variant="info"
              className="text-sm"
              onClick={() => {
                // navigate(ROUTES.TARIF.DETAIL_TARIF_UKT);
              }}
            />
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => {}}
            />
            <IconButton
              icon={<IoTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm"
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <AkunTransaksiTable data={data} />
        </div>
      </div>
    </>
  );
}
