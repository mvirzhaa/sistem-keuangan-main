import { useState } from "react";
import CariDataMahasiswaCard from "../components/CariDataMahasiswaCard";
import UktMahasiswaTable from "../components/UktMahasiswaTable";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import IconButton from "../../../components/button/IconButton";
import { IoMdCloudUpload, IoMdRefresh, IoMdSearch } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const dummyData = [
  {
    id: "1",
    nim: "14210717135",
    nama: "A ALI AKBAR K",
    programStudi: "S2 - Pendidikan Agama Islam (S2)",
    kelompokUkt: "",
    nominalUkt: 0,
    valid: false,
  },
  {
    id: "2",
    nim: "1022211091",
    nama: "A ARMIN MUTTAQIN MAHULETTE",
    programStudi: "S1 - Ilmu Hukum",
    kelompokUkt: "",
    nominalUkt: 0,
    valid: false,
  },

  // Tambahkan data lainnya
];

export default function UktMahasiswaPage() {
  document.title = "UKT Mahasiswa / Pendaftar";
  const [mahasiswaData, setMahasiswaData] = useState(dummyData);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleEdit = (mahasiswa: any) => {
    console.log("Edit mahasiswa:", mahasiswa);
    // Implementasi edit disini
  };
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">UKT Mahasiswa / Pendaftar</h1>
      </div>
      <div className="mb-4">
        <CariDataMahasiswaCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <div className="flex flex-col sm:flex-row space-y-2  justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8 ">
            <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs" />
            <div className="flex space-x-0.5 items-center">
              <TextField placeholder="Cari UKT Mahasiswa / Pendaftar" className="w-full sm:w-80" />
              <IconButton icon={<IoMdSearch />} variant="success" />
              <IconButton icon={<IoMdRefresh />} variant="info" />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton icon={<IoMdCloudUpload />} responsive={false} text="Upload Excel" variant="success" className="text-sm" onClick={() => console.log("Refresh")} />
            <IconButton icon={<MdEdit />} text="Edit Kelompok" responsive={false} variant="warning" className="text-sm" onClick={() => console.log("Refresh")} />
          </div>
        </div>
        <UktMahasiswaTable data={mahasiswaData} loading={loading} onEdit={handleEdit} onSelectionChange={setSelectedItems} />
      </div>
    </>
  );
}
