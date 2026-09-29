import FilterDataMonitoringAturanAkademikCard from "../components/FilterDataMonitoringAturanAkademikCard";
import MonitoringAturanAkademikTable from "../components/MonitoringAturanAkademikTable";

export default function MonitoringAturanAkademikPage() {
  document.title = "Monitoring Aturan Akademik";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Monitoring Mahasiswa Tercekal Aturan Akademik</h1>
      </div>
      <div className="mb-4">
        <FilterDataMonitoringAturanAkademikCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4">
        <MonitoringAturanAkademikTable data={[]} />
      </div>
    </>
  );
}
