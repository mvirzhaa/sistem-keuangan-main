import { useState, useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import IconButton from "../../../components/button/IconButton";
import FilterDataTarifFormulirCard, {
  type FilterValues,
} from "../components/FilterDataTarifFormulirCard";
import TarifFormulirTable, {
  type TarifFormulir,
} from "../components/TarifFormulirTable";
import SalinDataTarifFormulirModal, {
  type SalinDataTarifFormulirPayload,
} from "../components/SalinDataTarifFormulirModal";

const initialData: TarifFormulir[] = [];

const defaultFilters: FilterValues = {
  periode: "-- Semua Periode --",
  jalur: "-- Semua Jalur --",
  gelombang: "-- Semua Gelombang --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
};

export default function TarifFormulirPage() {
  document.title = "Tarif - Formulir Pendaftaran";

  const [filterForm, setFilterForm] = useState<FilterValues>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(defaultFilters);
  const [dataList, setDataList] = useState<TarifFormulir[]>([]);

  // Modal and inline state
  const [isSalinModalOpen, setIsSalinModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleFilterChange = (key: keyof FilterValues, val: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleApplyFilter = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const handleSaveNewRow = (newItem: TarifFormulir) => {
    setDataList((prev) => [newItem, ...prev]);
    setIsAdding(false);
  };

  const handleCancelNewRow = () => {
    setIsAdding(false);
  };

  const handleSalinData = (payload: SalinDataTarifFormulirPayload) => {
    console.log("Salin data:", payload);
    setIsSalinModalOpen(false);
  };

  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // Filter dari Card
      if (
        appliedFilters.periode &&
        !appliedFilters.periode.includes("Semua") &&
        item.periode &&
        item.periode !== appliedFilters.periode
      ) {
        return false;
      }
      if (
        appliedFilters.jalur &&
        !appliedFilters.jalur.includes("Semua") &&
        item.jalur &&
        item.jalur !== appliedFilters.jalur
      ) {
        return false;
      }
      if (
        appliedFilters.gelombang &&
        !appliedFilters.gelombang.includes("Semua") &&
        item.gelombang &&
        item.gelombang !== appliedFilters.gelombang
      ) {
        return false;
      }
      if (
        appliedFilters.sistemKuliah &&
        !appliedFilters.sistemKuliah.includes("Semua") &&
        item.sistemKuliah &&
        item.sistemKuliah !== appliedFilters.sistemKuliah
      ) {
        return false;
      }

      return true;
    });
  }, [dataList, appliedFilters]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Formulir Pendaftaran</p>
      </div>

      <div>
        <FilterDataTarifFormulirCard
          value={filterForm}
          onChange={handleFilterChange}
          onFilter={handleApplyFilter}
        />
      </div>

      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-4 mt-4 bg-white">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <IconButton
              icon={<IoCopy />}
              variant="warning"
              text="Salin Data"
              className="text-sm cursor-pointer"
              onClick={() => setIsSalinModalOpen(true)}
            />
            <IconButton
              icon={<IoMdAdd />}
              variant="success"
              text="Tambah"
              className="text-sm cursor-pointer"
              onClick={() => setIsAdding(true)}
            />
          </div>
        </div>

        <div className="mt-4">
          <TarifFormulirTable
            data={filteredData}
            isAdding={isAdding}
            onSaveNewRow={handleSaveNewRow}
            onCancelNewRow={handleCancelNewRow}
          />
        </div>
      </div>

      {/* Modal Salin Data Tarif Formulir */}
      <SalinDataTarifFormulirModal
        isOpen={isSalinModalOpen}
        onClose={() => setIsSalinModalOpen(false)}
        onSalin={handleSalinData}
      />
    </>
  );
}
