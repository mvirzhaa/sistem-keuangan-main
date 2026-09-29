import FilterDataPengaturanJenisTagihanCard from "../components/FilterDataPengaturanJenisTagihanCard";
import PengaturanJenisTagihanTable from "../components/PengaturanJenisTagihanTable";

export default function PengaturanJenisTagihanPage() {
  document.title = "Pengaturan - Jenis Tagihan";

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Jenis Tagihan</p>
      </div>
      <div>
        <FilterDataPengaturanJenisTagihanCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 mt-4">
        <PengaturanJenisTagihanTable />
      </div>
    </>
  );
}
