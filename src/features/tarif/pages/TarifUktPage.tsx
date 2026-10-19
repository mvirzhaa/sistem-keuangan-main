import { useState, useMemo } from "react";
import { IoMdSearch, IoMdRefresh, IoMdAdd } from "react-icons/io";
import { IoTrash, IoCopy, IoCloudUpload } from "react-icons/io5";
import { ROUTES } from "../../../common/routes/routes";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTarifUktCard, {
  type FilterValues,
} from "../components/FilterDataTarifUktCard";
import TarifUktTable from "../components/TarifUktTable";
import { useNavigate } from "react-router-dom";
import InformasiModal from "../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import SalinDataTarifUktModal, {
  type SalinDataTarifUktPayload,
} from "../components/SalinDataTarifUktModal";
import ImportTarifModal from "../components/ImportTarifModal";

const initialData = [
  {
    id: "1",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    programStudi: "Teknik Informatika",
    kelompokUKT: "UKT 1",
    nominalTarif: 500000,
    cicilan: 1,
    kuota: 30,
  },
  {
    id: "2",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "SBMPTN",
    sistemKuliah: "Reguler",
    programStudi: "Teknik Informatika",
    kelompokUKT: "UKT 2",
    nominalTarif: 1500000,
    cicilan: 2,
    kuota: 45,
  },
  {
    id: "3",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 2",
    jalurPendaftaran: "Mandiri",
    sistemKuliah: "Reguler",
    programStudi: "Manajemen",
    kelompokUKT: "UKT 3",
    nominalTarif: 3000000,
    cicilan: 3,
    kuota: 50,
  },
  {
    id: "4",
    periodeMasuk: "2024 Ganjil",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "SNMPTN",
    sistemKuliah: "Reguler",
    programStudi: "Akuntansi",
    kelompokUKT: "UKT 4",
    nominalTarif: 4500000,
    cicilan: 3,
    kuota: 25,
  },
  {
    id: "5",
    periodeMasuk: "2024 Genap",
    gelombang: "Gelombang 3",
    jalurPendaftaran: "Beasiswa",
    sistemKuliah: "Kelas Karyawan",
    programStudi: "Pendidikan Agama Islam",
    kelompokUKT: "UKT 1",
    nominalTarif: 500000,
    cicilan: 1,
    kuota: 20,
  },
];

const defaultFilters: FilterValues = {
  periodeMasuk: "-- Semua Periode Masuk --",
  jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
  programStudi: "Universitas Ibn Khaldun",
  gelombang: "-- Semua Gelombang --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
  kelompokUKT: "-- Semua Kelompok UKT --",
};

export default function TarifUktPage() {
  document.title = "Tarif UKT - Uang Kuliah Tunggal";

  const navigate = useNavigate();

  const [dataList, setDataList] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // Modals state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isSalinModalOpen, setIsSalinModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

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

  const handleToolbarDelete = () => {
    if (selectedItems.length === 0) {
      setIsInfoModalOpen(true);
    } else {
      setIsConfirmDeleteOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    const idsToDelete = new Set(selectedItems.map((item) => item.id));
    setDataList((prev) => prev.filter((item) => !idsToDelete.has(item.id)));
    setSelectedItems([]);
    setIsConfirmDeleteOpen(false);
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
        appliedFilters.kelompokUKT &&
        !appliedFilters.kelompokUKT.includes("Semua") &&
        item.kelompokUKT !== appliedFilters.kelompokUKT
      ) {
        return false;
      }

      // Filter dari Search Bar
      if (appliedKeyword) {
        const kw = appliedKeyword.toLowerCase();
        if (searchCategory === "Program Studi") {
          return item.programStudi.toLowerCase().includes(kw);
        }
        if (searchCategory === "Kelompok UKT") {
          return item.kelompokUKT.toLowerCase().includes(kw);
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
          item.kelompokUKT.toLowerCase().includes(kw)
        );
      }

      return true;
    });
  }, [appliedFilters, appliedKeyword, searchCategory]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif UKT</h1>
        <p className="text-sm text-gray-500 mb-1">Uang Kuliah Tunggal</p>
      </div>

      <div>
        <FilterDataTarifUktCard
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
                "Kelompok UKT",
                "Jalur",
              ]}
              value={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="mr-2 mb-2 sm:mb-0 w-40 text-xs"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Tarif UKT"
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
                navigate(ROUTES.TARIF.DETAIL_TARIF_UKT);
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
          <TarifUktTable
            data={filteredData}
            onSelectionChange={setSelectedItems}
          />
        </div>
      </div>

      {/* Modal Informasi Hapus jika belum ada data yang dicentang (Gambar 2) */}
      <InformasiModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Informasi"
        message="Silakan centang data yang ingin dihapus terlebih dahulu"
        buttonText="Oke"
      />

      {/* Modal Konfirmasi Hapus jika sudah ada data yang dicentang */}
      <KonfirmasiModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data tarif UKT yang dipilih?"
        confirmText="Ya, Yakin"
        cancelText="Batalkan"
      />

      {/* Modal Salin Data Tarif UKT (Gambar 3) */}
      <SalinDataTarifUktModal
        isOpen={isSalinModalOpen}
        onClose={() => setIsSalinModalOpen(false)}
        onSalin={(payload) => {
          console.log("Salin data UKT:", payload);
          setIsSalinModalOpen(false);
        }}
      />

      {/* Modal Import Tarif UKT (Gambar 4) */}
      <ImportTarifModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Tarif UKT"
        templateUrl="/templates/template_import_tarif_ukt.xlsx"
        templateFileName="template_import_tarif_ukt.xlsx"
        onImport={(file) => {
          console.log("Import file UKT:", file.name);
          setIsImportModalOpen(false);
        }}
      />
    </>
  );
}
