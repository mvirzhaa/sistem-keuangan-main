import { useState } from "react";
import FilterDataPengaturanJenisTagihanCard from "../components/FilterDataPengaturanJenisTagihanCard";
import PengaturanJenisTagihanTable from "../components/PengaturanJenisTagihanTable";

const STORAGE_KEY = "pengaturan_jenis_tagihan_filter_periode";

export default function PengaturanJenisTagihanPage() {
  document.title = "Pengaturan - Jenis Tagihan";

  const [periode, setPeriode] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || "2024 Genap";
  });

  const handleSaveFilter = (selectedPeriode: string) => {
    setPeriode(selectedPeriode);
    localStorage.setItem(STORAGE_KEY, selectedPeriode);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Jenis Tagihan</p>
      </div>

      <div>
        <FilterDataPengaturanJenisTagihanCard
          currentPeriode={periode}
          onSaveFilter={handleSaveFilter}
        />
      </div>
      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 px-4 py-4 mt-4">
        <PengaturanJenisTagihanTable periode={periode} />
      </div>
    </>
  );
}

