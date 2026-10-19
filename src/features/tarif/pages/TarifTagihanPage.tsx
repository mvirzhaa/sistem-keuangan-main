import { useState, useMemo, useEffect } from "react";
import {
  IoMdSearch,
  IoMdRefresh,
  IoMdAdd,
} from "react-icons/io";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTarifTagihanCard, {
  type FilterValues,
} from "../components/FilterDataTarifTagihanCard";
import { IoCloudUpload, IoCopy, IoTrash } from "react-icons/io5";
import TarifTagihanTable from "../components/TarifTagihanTable";
import { ROUTES } from "../../../common/routes/routes";
import { useNavigate } from "react-router-dom";
import {
  tarifTagihanService,
  type TarifTagihanItem,
} from "../services/tarifTagihanService";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import InformasiModal from "../../../components/modal/InformasiModal";
import SalinDataTarifTagihanModal, {
  type SalinDataPayload,
} from "../components/SalinDataTarifTagihanModal";
import ImportTarifModal from "../components/ImportTarifModal";

const defaultFilters: FilterValues = {
  periodeMasuk: "-- Semua Periode Masuk --",
  gelombang: "-- Semua Gelombang --",
  jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
  programStudi: "Universitas Ibn Khaldun",
  jenisAkun: "-- Semua Jenis Akun --",
};

export default function TarifTagihanPage() {
  document.title = "Tarif - Tarif Tagihan";
  const navigate = useNavigate();

  // Local data state synced with service
  const [dataList, setDataList] = useState<TarifTagihanItem[]>(() =>
    tarifTagihanService.getAll()
  );

  // Reload data when page is focused/mounted
  useEffect(() => {
    setDataList(tarifTagihanService.getAll());
  }, []);

  // Filter form state (changes on dropdown select, does not filter table yet)
  const [filterForm, setFilterForm] = useState<FilterValues>(defaultFilters);

  // Applied filter state (filters table only when "Simpan Filter" is clicked)
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(defaultFilters);

  // Search state
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");

  // Selected table items for bulk actions
  const [selectedItems, setSelectedItems] = useState<TarifTagihanItem[]>([]);

  // Modals state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSalinModalOpen, setIsSalinModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TarifTagihanItem | null>(null);

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

  // Row delete
  const handleDeleteItem = (item: TarifTagihanItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  // Toolbar delete (disamping salin data)
  const handleToolbarDelete = () => {
    if (selectedItems.length === 0) {
      setIsInfoModalOpen(true);
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (itemToDelete?.id) {
      tarifTagihanService.delete(itemToDelete.id);
    } else if (selectedItems.length > 0) {
      selectedItems.forEach((item) => {
        tarifTagihanService.delete(item.id);
      });
      setSelectedItems([]);
    }
    setDataList(tarifTagihanService.getAll());
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSalinData = (payload: SalinDataPayload) => {
    console.log("Salin Data payload:", payload);
    setDataList(tarifTagihanService.getAll());
  };

  const handleImportTarif = (file: File) => {
    console.log("Importing file:", file.name);
    setDataList(tarifTagihanService.getAll());
  };

  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      // Filter dari Card
      if (
        appliedFilters.periodeMasuk &&
        !appliedFilters.periodeMasuk.includes("Semua") &&
        item.periodeMasuk !== appliedFilters.periodeMasuk
      ) {
        return false;
      }
      if (
        appliedFilters.gelombang &&
        !appliedFilters.gelombang.includes("Semua") &&
        item.gelombang !== appliedFilters.gelombang
      ) {
        return false;
      }
      if (
        appliedFilters.jalurPendaftaran &&
        !appliedFilters.jalurPendaftaran.includes("Semua") &&
        item.jalurPendaftaran !== appliedFilters.jalurPendaftaran
      ) {
        return false;
      }
      if (
        appliedFilters.sistemKuliah &&
        !appliedFilters.sistemKuliah.includes("Semua") &&
        item.sistemKuliah !== appliedFilters.sistemKuliah
      ) {
        return false;
      }
      if (
        appliedFilters.programStudi &&
        appliedFilters.programStudi !== "Universitas Ibn Khaldun" &&
        !appliedFilters.programStudi.includes("Semua") &&
        item.programStudi !== appliedFilters.programStudi
      ) {
        return false;
      }
      if (
        appliedFilters.jenisAkun &&
        !appliedFilters.jenisAkun.includes("Semua") &&
        item.jenisAkun !== appliedFilters.jenisAkun
      ) {
        return false;
      }

      // Filter dari Search Bar
      if (appliedKeyword) {
        const kw = appliedKeyword.toLowerCase();
        if (searchCategory === "Program Studi") {
          return item.programStudi.toLowerCase().includes(kw);
        }
        if (searchCategory === "Jenis Akun") {
          return item.jenisAkun.toLowerCase().includes(kw);
        }
        if (searchCategory === "Jalur") {
          return item.jalurPendaftaran.toLowerCase().includes(kw);
        }
        return (
          item.periodeMasuk.toLowerCase().includes(kw) ||
          item.gelombang.toLowerCase().includes(kw) ||
          item.jalurPendaftaran.toLowerCase().includes(kw) ||
          item.sistemKuliah.toLowerCase().includes(kw) ||
          item.programStudi.toLowerCase().includes(kw) ||
          item.jenisAkun.toLowerCase().includes(kw)
        );
      }

      return true;
    });
  }, [dataList, appliedFilters, appliedKeyword, searchCategory]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Tarif Tagihan</p>
      </div>

      <div>
        <FilterDataTarifTagihanCard
          value={filterForm}
          onChange={handleFilterChange}
          onFilter={handleApplyFilter}
        />
      </div>

      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-4 mt-4 bg-white">
        <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-2 items-center">
            <Dropdown
              options={[
                "-- Semua --",
                "Program Studi",
                "Jenis Akun",
                "Jalur",
              ]}
              value={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="mr-2 mb-2 sm:mb-0 w-40 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Tarif"
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
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm cursor-pointer"
              onClick={() => {
                navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN, {
                  state: { mode: "create" },
                });
              }}
            />
            <IconButton
              icon={<IoTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm cursor-pointer"
              onClick={handleToolbarDelete}
            />
            <IconButton
              icon={<IoCopy />}
              responsive={false}
              text="Salin Data"
              variant="warning"
              className="text-sm cursor-pointer"
              onClick={() => setIsSalinModalOpen(true)}
            />
            <IconButton
              icon={<IoCloudUpload />}
              responsive={false}
              text="Import"
              variant="info"
              className="text-sm cursor-pointer"
              onClick={() => setIsImportModalOpen(true)}
            />
          </div>
        </div>

        <div>
          <TarifTagihanTable
            data={filteredData}
            onDetail={(item) => {
              navigate(ROUTES.TARIF.DETAIL_TARIF_TAGIHAN, {
                state: { mode: "view", item },
              });
            }}
            onDelete={handleDeleteItem}
            onSelectionChange={(selected) => setSelectedItems(selected)}
          />
        </div>
      </div>

      {/* Modal Informasi saat klik Hapus toolbar tanpa centang data (Gambar 3) */}
      <InformasiModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Informasi"
        message="Silakan centang data yang ingin dihapus terlebih dahulu"
        buttonText="Oke"
      />

      {/* Modal Konfirmasi Hapus data */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* Modal Salin Data Tarif Tagihan (Gambar 4) */}
      <SalinDataTarifTagihanModal
        isOpen={isSalinModalOpen}
        onClose={() => setIsSalinModalOpen(false)}
        onSalin={handleSalinData}
      />

      {/* Modal Import Tarif (Gambar 5) */}
      <ImportTarifModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportTarif}
        templateUrl="/templates/template_import_tarif_tagihan.xlsx"
        templateFileName="template_import_tarif_tagihan.xlsx"
      />
    </>
  );
}
