import { IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataMonitoringUktCard from "../components/FilterDataMonitoringUktCard";
import MonitoringUktTable from "../components/MonitoringUktTable";

const data = [
  {
    id: "1",
    programStudi: "S1 - Teknik Informatika",
    kelompokUkt: "Kelompok UKT 1",
    kuota: 50,
    penerima: 45,
  },
  {
    id: "2",
    programStudi: "S1 - Teknik Informatika",
    kelompokUkt: "Kelompok UKT 2",
    kuota: 40,
    penerima: 35,
  },
];

export default function MonitoringUktPage() {
  document.title = "Monitoring UKT Mahasiswa";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Monitoring UKT</h1>
      </div>
      <div className="mb-4">
        <FilterDataMonitoringUktCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <div className="flex flex-col sm:flex-row space-x-8 mb-4 ">
          <Dropdown options={["-- Semua --", "NIM", "Nama"]} className="mr-4 mb-2 sm:mb-0 text-xs" />
          <div className="flex space-x-0.5 items-center">
            <TextField placeholder="Cari Monitoring UKT" className="w-full sm:w-80" />
            <IconButton icon={<IoMdSearch />} variant="success" />
            <IconButton icon={<IoMdRefresh />} variant="info" />
          </div>
        </div>
        <div>
          <MonitoringUktTable data={data} />
        </div>
      </div>
    </>
  );
}
