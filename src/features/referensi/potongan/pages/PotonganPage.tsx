import { useState, useMemo } from "react";
import {
  IoMdAdd,
  IoMdCloudUpload,
  IoMdRefresh,
  IoMdSearch,
  IoMdTrash,
} from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import FilterDataPotonganCard, {
  type FilterValues,
} from "../components/FilterDataPotonganCard";
import TextField from "../../../../components/inputs/TextField";
import Dropdown from "../../../../components/inputs/Dropdown";
import PotonganTable, {
  type Potongan,
  defaultPotonganList,
} from "../components/PotonganTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/routes/routes";
import InformasiModal from "../../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";
import ImportPotonganModal from "../components/ImportPotonganModal";

export default function PotonganPage() {
  document.title = "Potongan";

  const navigate = useNavigate();

  // State data
  const [potonganList, setPotonganList] =
    useState<Potongan[]>(defaultPotonganList);
  const [selectedItems, setSelectedItems] = useState<Potongan[]>([]);

  // Search & Filter state
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [appliedFilter, setAppliedFilter] = useState<FilterValues | null>(null);

  // Modal states
  const [isInformasiModalOpen, setIsInformasiModalOpen] =
    useState<boolean>(false);
  const [isConfirmDeleteBatchModalOpen, setIsConfirmDeleteBatchModalOpen] =
    useState<boolean>(false);
  const [isConfirmDeleteSingleModalOpen, setIsConfirmDeleteSingleModalOpen] =
    useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<Potongan | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  // Filter & Search calculation
  const filteredData = useMemo(() => {
    let result = [...potonganList];

    // Filter dari Card Simpan Filter
    if (appliedFilter) {
      if (
        appliedFilter.tipePotongan &&
        appliedFilter.tipePotongan !== "-- Semua Tipe Potongan --"
      ) {
        result = result.filter((item) =>
          item.tipePotongan
            .toLowerCase()
            .includes(appliedFilter.tipePotongan.toLowerCase()),
        );
      }
      if (
        appliedFilter.jenisPotongan &&
        appliedFilter.jenisPotongan !== "-- Semua --"
      ) {
        result = result.filter((item) =>
          (item.jenisPotongan || "Potongan")
            .toLowerCase()
            .includes(appliedFilter.jenisPotongan.toLowerCase()),
        );
      }
      if (
        appliedFilter.rekanan &&
        appliedFilter.rekanan !== "-- Pilih Rekanan --" &&
        appliedFilter.rekanan !== "-- Semua Rekanan --"
      ) {
        result = result.filter((item) =>
          (item.rekanan || "")
            .toLowerCase()
            .includes(appliedFilter.rekanan.toLowerCase()),
        );
      }
    }

    // Search query filter
    const query = appliedSearchQuery.trim().toLowerCase();
    if (query) {
      if (searchCategory === "Nama Beasiswa" || searchCategory === "Nama") {
        result = result.filter((item) =>
          item.namaBeasiswa.toLowerCase().includes(query),
        );
      } else if (searchCategory === "Tipe Potongan") {
        result = result.filter((item) =>
          item.tipePotongan.toLowerCase().includes(query),
        );
      } else {
        // -- Semua --
        result = result.filter(
          (item) =>
            item.namaBeasiswa.toLowerCase().includes(query) ||
            item.tipePotongan.toLowerCase().includes(query) ||
            item.periodeAwal.toLowerCase().includes(query) ||
            item.periodeAkhir.toLowerCase().includes(query),
        );
      }
    }

    return result;
  }, [potonganList, appliedFilter, appliedSearchQuery, searchCategory]);

  // Handle Search
  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
  };

  // Handle Reset / Refresh
  const handleReset = () => {
    setSearchQuery("");
    setAppliedSearchQuery("");
    setSearchCategory("-- Semua --");
    setAppliedFilter(null);
    setSelectedItems([]);
  };

  // Handle Top Hapus click
  const handleTopDeleteClick = () => {
    if (selectedItems.length === 0) {
      setIsInformasiModalOpen(true);
    } else {
      setIsConfirmDeleteBatchModalOpen(true);
    }
  };

  // Confirm batch delete
  const handleConfirmBatchDelete = () => {
    const idsToDelete = new Set(selectedItems.map((item) => item.id));
    setPotonganList((prev) =>
      prev.filter((item) => !idsToDelete.has(item.id)),
    );
    setSelectedItems([]);
    setIsConfirmDeleteBatchModalOpen(false);
  };

  // Handle Single item delete
  const handleSingleDelete = (item: Potongan) => {
    setItemToDelete(item);
    setIsConfirmDeleteSingleModalOpen(true);
  };

  // Confirm single delete
  const handleConfirmSingleDelete = () => {
    if (itemToDelete) {
      setPotonganList((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id),
      );
      setSelectedItems((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id),
      );
    }
    setItemToDelete(null);
    setIsConfirmDeleteSingleModalOpen(false);
  };

  // Handle View Detail
  const handleViewDetail = (item: Potongan) => {
    navigate(ROUTES.REFERENSI.POTONGAN.DETAIL_POTONGAN, {
      state: { item, mode: "view" },
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Potongan</h1>
      </div>

      <div>
        <FilterDataPotonganCard onFilter={(filters) => setAppliedFilter(filters)} />
      </div>

      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2 justify-between items-stretch sm:items-center">
          {/* Search toolbar */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0 items-stretch sm:items-center">
            <Dropdown
              options={["-- Semua --", "Nama Beasiswa", "Tipe Potongan"]}
              value={searchCategory}
              onChange={(value) => setSearchCategory(value)}
              className="mr-2 text-xs min-w-[130px]"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari Potongan"
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full sm:w-80"
              />
              <IconButton
                icon={<IoMdSearch size={18} />}
                variant="success"
                onClick={handleSearch}
                className="cursor-pointer"
                title="Cari"
              />
              <IconButton
                icon={<IoMdRefresh size={18} />}
                variant="info"
                onClick={handleReset}
                className="cursor-pointer"
                title="Reset / Refresh"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2 mb-4 sm:mb-0 shrink-0">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm cursor-pointer"
              onClick={() => {
                navigate(ROUTES.REFERENSI.POTONGAN.DETAIL_POTONGAN, {
                  state: { mode: "create" },
                });
              }}
            />
            <IconButton
              icon={<IoMdTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm cursor-pointer"
              onClick={handleTopDeleteClick}
            />
            <IconButton
              icon={<IoMdCloudUpload />}
              responsive={false}
              text="Import"
              variant="info"
              className="text-sm cursor-pointer"
              onClick={() => setIsImportModalOpen(true)}
            />
          </div>
        </div>

        {/* Potongan Table */}
        <div className="mt-4">
          <PotonganTable
            data={filteredData}
            selectable={true}
            onSelectionChange={(items) => setSelectedItems(items)}
            onViewDetail={handleViewDetail}
            onDeleteItem={handleSingleDelete}
          />
        </div>
      </div>

      {/* Modal Informasi (Gambar 2): Ketika klik Hapus tanpa centang */}
      <InformasiModal
        isOpen={isInformasiModalOpen}
        onClose={() => setIsInformasiModalOpen(false)}
        title="Informasi"
        message="Silakan centang data yang ingin dihapus terlebih dahulu"
        buttonText="Oke"
      />

      {/* Modal Konfirmasi: Hapus banyak data tercentang */}
      <KonfirmasiModal
        isOpen={isConfirmDeleteBatchModalOpen}
        onClose={() => setIsConfirmDeleteBatchModalOpen(false)}
        onConfirm={handleConfirmBatchDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* Modal Konfirmasi: Hapus satu baris (Aksi Hapus) */}
      <KonfirmasiModal
        isOpen={isConfirmDeleteSingleModalOpen}
        onClose={() => {
          setItemToDelete(null);
          setIsConfirmDeleteSingleModalOpen(false);
        }}
        onConfirm={handleConfirmSingleDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* Modal Import Potongan (Gambar 3) */}
      <ImportPotonganModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Potongan"
        templateUrl="/templates/template_import_potongan.xlsx"
        templateFileName="template_import_potongan.xlsx"
        onImport={(file) => {
          alert(`File "${file.name}" berhasil diunggah!`);
          setIsImportModalOpen(false);
        }}
      />
    </>
  );
}
