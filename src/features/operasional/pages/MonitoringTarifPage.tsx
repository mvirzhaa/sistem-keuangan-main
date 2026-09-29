import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataMonitoringTarifCard from "../components/FilterDataMonitoringTarifCard";
import MonitoringTarifTable from "../components/MonitoringTarifTable";

const data = [
  {
    id: "1",
    unit: "S1 - Teknik Sipil",
    periode: "1994 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 182,
    sudahDiatur: 0,
    belumDiatur: 182,
  },
  {
    id: "2",
    unit: "86205",
    periode: "1994 Ganjil",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    gelombang: "Gelombang 1",
    totalAkun: 182,
    sudahDiatur: 0,
    belumDiatur: 182,
  },
];

export default function MonitoringTarifPage() {
  document.title = "Monitoring Tarif";
  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Monitoring Tarif</h1>
      </div>
      <div className="mb-4">
        <FilterDataMonitoringTarifCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
          <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 text-xs" />
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Monitoring Tarif" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div className="mb-4">
          <MonitoringTarifTable
            data={data}
            // loading={loading}
            // onView={handleView}
          />
        </div>
      </div>
    </>
  );
}
