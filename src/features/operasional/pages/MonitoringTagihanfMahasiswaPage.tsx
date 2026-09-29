import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import MonitoringTarifTable from "../components/MonitoringTarifTable";
import FilterDataMonitoringTagihanCard from "../components/FilterDataMonitoringTagihanCard";
import MonitoringTagihanMahasiswaTable from "../components/MonitoringTagihanMahasiswaTable";

const data = [
  {
    id: "1",
    unit: "S1 - Akuntansi",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2017 Ganjil",
    jumlahMahasiswa: 29,
  },
  {
    id: "2",
    unit: "S1 - Ilmu Hukum",
    jalurPendaftaran: "Seleksi Mandiri PTS",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    periodeMasuk: "2017 Ganjil",
    jumlahMahasiswa: 22,
  },
];

export default function MonitoringTagihanMahasiswaPage() {
  document.title = "Monitoring Tagihan Mahasiswa";
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Monitoring Tagihan Mahasiswa</h1>
      </div>
      <div className="mb-4">
        <FilterDataMonitoringTagihanCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
          <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 text-xs" />
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Monitoring Tagihan Mahasiswa" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div className="mb-4">
          <MonitoringTagihanMahasiswaTable
            data={data}
            // loading={loading}
            // onView={handleView}
          />
        </div>
      </div>
    </>
  );
}
