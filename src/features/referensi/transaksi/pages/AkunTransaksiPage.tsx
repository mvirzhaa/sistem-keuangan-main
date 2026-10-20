import { useState, useMemo } from "react";
import { IoMdAdd, IoMdRefresh, IoMdSearch } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import TextField from "../../../../components/inputs/TextField";
import FilterDataAkunTransaksiCard, {
  type FilterValues,
  defaultFilterValues,
} from "../components/FilterDataAkunTransaksiCard";
import { IoPencil, IoTrash } from "react-icons/io5";
import Dropdown from "../../../../components/inputs/Dropdown";
import AkunTransaksiTable, {
  type AkunTransaksi,
} from "../components/AkunTransaksiTable";
import InformasiModal from "../../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";
import EditJenisBiayaModal from "../components/EditJenisBiayaModal";

const initialData: AkunTransaksi[] = [
  {
    id: "1",
    kode: "1000",
    nama: "UKT KIP Kuliah (A)",
    kelompok: "KIP Kuliah",
    jenisBiaya: "Biaya Semester",
    frekuensi: "Semester",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: true,
    sevimaPay: true,
  },
  {
    id: "2",
    kode: "1001",
    nama: "UKT KIP Kuliah (B)",
    kelompok: "KIP Kuliah",
    jenisBiaya: "Biaya Semester",
    frekuensi: "Semester",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: true,
    sevimaPay: true,
  },
  {
    id: "3",
    kode: "1002",
    nama: "Biaya Kuliah Pokok (BKP)",
    kelompok: "Biaya Kuliah",
    jenisBiaya: "Biaya Pokok",
    frekuensi: "Semester",
    event: "",
    mahasiswa: true,
    pendaftar: true,
    generateKuliah: true,
    sevimaPay: true,
  },
  {
    id: "4",
    kode: "1003",
    nama: "Biaya Kuliah SKS (BKS)",
    kelompok: "Biaya Kuliah",
    jenisBiaya: "Biaya SKS",
    frekuensi: "Semester",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: true,
    sevimaPay: true,
  },
  {
    id: "5",
    kode: "1004",
    nama: "Biaya Pendaftaran Mahasiswa Baru",
    kelompok: "Pembayaran",
    jenisBiaya: "Biaya Pendaftaran",
    frekuensi: "Tiap Transaksi",
    event: "PMB",
    mahasiswa: false,
    pendaftar: true,
    generateKuliah: false,
    sevimaPay: true,
  },
  {
    id: "6",
    kode: "1005",
    nama: "Deposit Mahasiswa",
    kelompok: "Biaya Lainnya",
    jenisBiaya: "Deposit",
    frekuensi: "Tiap Transaksi",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: false,
    sevimaPay: true,
  },
  {
    id: "7",
    kode: "1006",
    nama: "Biaya Asrama Mahasiswa",
    kelompok: "Biaya Lainnya",
    jenisBiaya: "Asrama",
    frekuensi: "Bulanan",
    event: "",
    mahasiswa: true,
    pendaftar: false,
    generateKuliah: false,
    sevimaPay: true,
  },
  {
    id: "8",
    kode: "1007",
    nama: "Biaya Pengembangan Institusi (BPI)",
    kelompok: "Biaya Kuliah",
    jenisBiaya: "Pengembangan",
    frekuensi: "Tahunan",
    event: "PMB",
    mahasiswa: true,
    pendaftar: true,
    generateKuliah: true,
    sevimaPay: true,
  },
];

export default function AkunTransaksiPage() {
  document.title = "Referensi - Akun Transaksi";

  // Data State
  const [tableData, setTableData] = useState<AkunTransaksi[]>(initialData);
  const [selectedItems, setSelectedItems] = useState<AkunTransaksi[]>([]);

  // Modals & Forms State
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [isEditJenisBiayaModalOpen, setIsEditJenisBiayaModalOpen] =
    useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<AkunTransaksi | null>(null);
  const [isAddingRow, setIsAddingRow] = useState(false);

  // Filter Card State
  const [activeFilters, setActiveFilters] =
    useState<FilterValues>(defaultFilterValues);
  const [filterKey, setFilterKey] = useState(0);

  // Search State
  const searchCategoryOptions = ["-- Semua --", "Kode", "Nama", "Kelompok"];
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchQuery("");
    setSearchCategory("-- Semua --");
    setActiveFilters(defaultFilterValues);
    setFilterKey((prev) => prev + 1);
  };

  const handleFilter = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  // Action: Pilih Jenis Biaya (Gambar 1 & Gambar 2)
  const handlePilihJenisBiayaClick = () => {
    if (selectedItems.length === 0) {
      setInfoModalMessage(
        "Silakan centang terlebih dahulu data yang ingin diubah",
      );
      setIsInfoModalOpen(true);
    } else {
      setIsEditJenisBiayaModalOpen(true);
    }
  };

  const handleSaveJenisBiaya = (newJenisBiaya: string) => {
    if (newJenisBiaya) {
      const selectedIds = new Set(selectedItems.map((item) => item.id));
      setTableData((prev) =>
        prev.map((item) =>
          selectedIds.has(item.id)
            ? { ...item, jenisBiaya: newJenisBiaya }
            : item,
        ),
      );
      setSelectedItems((prev) =>
        prev.map((item) =>
          selectedIds.has(item.id)
            ? { ...item, jenisBiaya: newJenisBiaya }
            : item,
        ),
      );
    }
    setIsEditJenisBiayaModalOpen(false);
  };

  // Action: Tambah (Gambar 3)
  const handleTambahClick = () => {
    setIsAddingRow((prev) => !prev);
  };

  const handleSaveAdd = (newItem: AkunTransaksi) => {
    setTableData((prev) => [newItem, ...prev]);
    setIsAddingRow(false);
  };

  const handleCancelAdd = () => {
    setIsAddingRow(false);
  };

  const handleUpdateItem = (updatedItem: AkunTransaksi) => {
    setTableData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  // Action: Hapus (Gambar 4 & Gambar 5)
  const handleHapusClick = () => {
    if (selectedItems.length === 0) {
      setInfoModalMessage(
        "Silakan centang data yang ingin dihapus terlebih dahulu",
      );
      setIsInfoModalOpen(true);
    } else {
      setItemToDelete(null);
      setIsDeleteConfirmModalOpen(true);
    }
  };

  const handleDeleteSingleItem = (item: AkunTransaksi) => {
    setItemToDelete(item);
    setIsDeleteConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setTableData((prev) => prev.filter((i) => i.id !== itemToDelete.id));
      setItemToDelete(null);
    } else {
      const selectedIds = new Set(selectedItems.map((item) => item.id));
      setTableData((prev) => prev.filter((item) => !selectedIds.has(item.id)));
      setSelectedItems([]);
    }
    setIsDeleteConfirmModalOpen(false);
  };

  const handleCloseDeleteConfirm = () => {
    setItemToDelete(null);
    setIsDeleteConfirmModalOpen(false);
  };

  // Filtered & Searched Data
  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      // Filter Kelompok
      if (
        activeFilters.kelompok &&
        activeFilters.kelompok !== "-- Semua Kelompok --" &&
        activeFilters.kelompok !== "-- Semua --"
      ) {
        if (item.kelompok !== activeFilters.kelompok) return false;
      }

      // Filter Frekuensi
      if (
        activeFilters.frekuensi &&
        activeFilters.frekuensi !== "-- Semua Frekuensi --" &&
        activeFilters.frekuensi !== "-- Semua --"
      ) {
        if (item.frekuensi !== activeFilters.frekuensi) return false;
      }

      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (searchCategory === "Kode") {
          return item.kode.toLowerCase().includes(query);
        } else if (searchCategory === "Nama") {
          return item.nama.toLowerCase().includes(query);
        } else if (searchCategory === "Kelompok") {
          return item.kelompok.toLowerCase().includes(query);
        } else {
          return (
            item.kode.toLowerCase().includes(query) ||
            item.nama.toLowerCase().includes(query) ||
            item.kelompok.toLowerCase().includes(query) ||
            item.jenisBiaya.toLowerCase().includes(query)
          );
        }
      }

      return true;
    });
  }, [tableData, activeFilters, searchQuery, searchCategory]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Akun Transaksi</h1>
      </div>

      <div>
        <FilterDataAkunTransaksiCard
          key={filterKey}
          initialFilters={activeFilters}
          onFilter={handleFilter}
        />
      </div>

      <div className="bg-white container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 items-start sm:items-center">
            <Dropdown
              options={searchCategoryOptions}
              value={searchCategory}
              defaultValue="-- Semua --"
              onChange={(value) => setSearchCategory(value)}
              className="w-40 text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Akun Transaksi"
                value={searchInput}
                onChange={(value) => setSearchInput(value)}
                onEnter={handleSearch}
                className="w-full sm:w-80 text-xs"
              />
              <IconButton
                icon={<IoMdSearch />}
                variant="success"
                onClick={handleSearch}
                title="Cari"
              />
              <IconButton
                icon={<IoMdRefresh />}
                variant="info"
                onClick={handleReset}
                title="Reset Pencarian & Filter"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <IconButton
              icon={<IoPencil />}
              responsive={false}
              text="Pilih Jenis Biaya"
              variant="info"
              className="text-sm"
              onClick={handlePilihJenisBiayaClick}
            />
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={handleTambahClick}
            />
            <IconButton
              icon={<IoTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm"
              onClick={handleHapusClick}
            />
          </div>
        </div>

        <div>
          <AkunTransaksiTable
            data={filteredData}
            onSelectionChange={setSelectedItems}
            isAdding={isAddingRow}
            onSaveAdd={handleSaveAdd}
            onCancelAdd={handleCancelAdd}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteSingleItem}
          />
        </div>
      </div>

      {/* Modal Informasi (Gambar 1 & Gambar 4) */}
      <InformasiModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Informasi"
        message={infoModalMessage}
      />

      {/* Modal Edit Jenis Biaya (Gambar 2) */}
      <EditJenisBiayaModal
        isOpen={isEditJenisBiayaModalOpen}
        onClose={() => setIsEditJenisBiayaModalOpen(false)}
        onSave={handleSaveJenisBiaya}
        initialValue={
          selectedItems.length === 1
            ? selectedItems[0].jenisBiaya
            : "-- Pilih Jenis Biaya --"
        }
      />

      {/* Modal Konfirmasi Hapus (Gambar 5) */}
      <KonfirmasiModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
}
