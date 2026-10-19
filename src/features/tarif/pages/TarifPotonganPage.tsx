import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoMdSearch,
  IoMdRefresh,
  IoMdClose,
  IoMdAdd,
} from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import InformasiModal from "../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import { ROUTES } from "../../../common/routes/routes";
import FilterDataTarifPotonganCard, {
  type FilterValues,
} from "../components/FilterDataTarifPotonganCard";
import TarifPotonganTable from "../components/TarifPotonganTable";

const initialData = [
  {
    id: "1",
    nim: "221105062581",
    nama: "SITI SALMA NURHOUIS",
    potongan: "Baznas Jawa Barat",
    periodeMulai: "2024 Genap",
    nominal: 1000000,
    isActive: true,
    jenisPotongan: "Beasiswa",
    penerima: "Mahasiswa",
  },
  {
    id: "2",
    nim: "221105080770",
    nama: "SITI KOMARIAH",
    potongan: "Baznas Jawa Barat",
    periodeMulai: "2024 Genap",
    nominal: 1000000,
    isActive: true,
    jenisPotongan: "Beasiswa",
    penerima: "Mahasiswa",
  },
  {
    id: "3",
    nim: "221105091234",
    nama: "AHMAD FAUZI",
    potongan: "Potongan UKT",
    periodeMulai: "2024 Genap",
    nominal: 750000,
    isActive: true,
    jenisPotongan: "Potongan",
    penerima: "Mahasiswa",
  },
  {
    id: "4",
    nim: "231105012399",
    nama: "RINA ANGGRAENI",
    potongan: "Potongan Formulir",
    periodeMulai: "2024 Ganjil",
    nominal: 150000,
    isActive: true,
    jenisPotongan: "Diskon",
    penerima: "Calon Mahasiswa",
  },
  {
    id: "5",
    nim: "211105033881",
    nama: "BUDI SANTOSO",
    potongan: "Potongan Wisuda",
    periodeMulai: "2023 Genap",
    nominal: 500000,
    isActive: false,
    jenisPotongan: "Potongan",
    penerima: "Alumni",
  },
];

const defaultFilters: FilterValues = {
  jenisPotongan: "-- Semua Jenis --",
  potongan: "-- Semua Potongan --",
  penerima: "Mahasiswa",
  periodeMulai: "-- Semua Periode --",
};

export default function TarifPotonganPage() {
  document.title = "Tarif - Penerima Potongan";

  const navigate = useNavigate();
  const location = useLocation();

  const [dataList, setDataList] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Modals state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  // Sync saved item from DetailPenerimaPotonganPage
  useEffect(() => {
    if (location.state?.savedItem) {
      const saved = location.state.savedItem;
      setDataList((prev) => {
        const exists = prev.some((item) => item.id === saved.id);
        if (exists) {
          return prev.map((item) => (item.id === saved.id ? { ...item, ...saved } : item));
        }
        return [saved, ...prev];
      });
      // Clear location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const [filterForm, setFilterForm] = useState<FilterValues>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(defaultFilters);

  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  const handleFilterChange = (key: keyof FilterValues, val: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleApplyFilter = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const handleSearch = () => {
    setAppliedKeyword(searchKeyword.trim());
  };

  const handleReset = () => {
    setFilterForm(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchKeyword("");
    setAppliedKeyword("");
    setSearchCategory("-- Semua --");
  };

  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // Filter dari Card
      if (
        appliedFilters.jenisPotongan &&
        !appliedFilters.jenisPotongan.includes("Semua") &&
        item.jenisPotongan !== appliedFilters.jenisPotongan
      ) {
        return false;
      }
      if (
        appliedFilters.potongan &&
        !appliedFilters.potongan.includes("Semua") &&
        item.potongan !== appliedFilters.potongan
      ) {
        return false;
      }
      if (
        appliedFilters.penerima &&
        !appliedFilters.penerima.includes("Semua") &&
        item.penerima !== appliedFilters.penerima
      ) {
        return false;
      }
      if (
        appliedFilters.periodeMulai &&
        !appliedFilters.periodeMulai.includes("Semua") &&
        item.periodeMulai !== appliedFilters.periodeMulai
      ) {
        return false;
      }

      // Filter dari Search Bar
      if (appliedKeyword) {
        const kw = appliedKeyword.toLowerCase();
        if (searchCategory === "NIM") {
          return item.nim.toLowerCase().includes(kw);
        }
        if (searchCategory === "Nama") {
          return item.nama.toLowerCase().includes(kw);
        }
        if (searchCategory === "Potongan") {
          return item.potongan.toLowerCase().includes(kw);
        }
        return (
          item.nim.toLowerCase().includes(kw) ||
          item.nama.toLowerCase().includes(kw) ||
          item.potongan.toLowerCase().includes(kw)
        );
      }

      return true;
    });
  }, [dataList, appliedFilters, appliedKeyword, searchCategory]);

  const handleNonaktif = () => {
    if (selectedItems.length === 0) {
      setIsInfoModalOpen(true);
      return;
    }

    const selectedIds = new Set(selectedItems.map((item) => item.id));
    setDataList((prev) =>
      prev.map((item) =>
        selectedIds.has(item.id) ? { ...item, isActive: false } : item
      )
    );
    setSelectedItems([]);
  };

  const handleEdit = (item: any) => {
    navigate(ROUTES.TARIF.DETAIL_PENERIMA_POTONGAN, { state: { item } });
  };

  const handleDelete = (item: any) => {
    setItemToDelete(item);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setDataList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      setSelectedItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
    setIsConfirmDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Penerima Potongan</p>
      </div>

      <div className="mb-4">
        <FilterDataTarifPotonganCard
          value={filterForm}
          onChange={handleFilterChange}
          onFilter={handleApplyFilter}
        />
      </div>

      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-4 mt-4 bg-white">
        <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-2 items-center">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama", "Potongan"]}
              value={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="mr-2 mb-2 sm:mb-0 w-40 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Penerima Potongan"
                value={searchKeyword}
                onChange={(val) => {
                  setSearchKeyword(val);
                  if (!val) setAppliedKeyword("");
                }}
                onEnter={handleSearch}
                className="w-full sm:w-80 text-xs"
              />
              <IconButton
                icon={<IoMdSearch className="text-base" />}
                variant="success"
                onClick={handleSearch}
                title="Cari"
              />
              <IconButton
                icon={<IoMdRefresh className="text-base" />}
                variant="info"
                onClick={handleReset}
                title="Reset & Refresh Data"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdClose />}
              responsive={false}
              text="Nonaktif"
              variant="warning"
              className="text-sm cursor-pointer"
              onClick={handleNonaktif}
            />
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm cursor-pointer"
              onClick={() => navigate(ROUTES.TARIF.DETAIL_PENERIMA_POTONGAN)}
            />
          </div>
        </div>
        <div className="mb-4">
          <TarifPotonganTable
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelectionChange={setSelectedItems}
          />
        </div>
      </div>

      {/* Modal Informasi jika klik Nonaktif tapi belum centang data */}
      <InformasiModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Informasi"
        message="Silakan centang data yang ingin dinonaktifkan terlebih dahulu"
        buttonText="Oke"
      />

      {/* Modal Konfirmasi Hapus Data */}
      <KonfirmasiModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={
          itemToDelete
            ? `Apakah anda yakin ingin menghapus data penerima potongan untuk "${itemToDelete.nama}"?`
            : "Apakah anda yakin ingin menghapus data penerima potongan ini?"
        }
        confirmText="Ya, Yakin"
        cancelText="Batalkan"
      />
    </>
  );
}
