import { useState, useMemo } from "react";
import { IoMdSearch, IoMdRefresh, IoMdAdd, IoMdSync } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import FilterDataPromoEdufinCard, {
  type FilterValues,
  defaultFilterValues,
} from "../components/FilterDataPromoEdufinCard";
import PromoEdufinTable, {
  type PromoEdufin,
} from "../components/PromoEdufinTable";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";

const initialPromoData: PromoEdufin[] = [
  {
    id: "1",
    no: 1,
    channel: "Tokopedia",
    namaPromo: "TOPEDSEVIMA",
    deskripsi: `Hai Mahasiswa Pengguna Siakad 👋
Sekarang channel pembayaran Tokopedia sedang ada promo loh!
Yukk segera melakukan pembayaran melalui Tokopedia.
Untuk syarat & ketentuan bisa di klik pada link berikut ya:
http://sevi.ma/TOPED9SK

Selamat mencoba!!`,
    tglMulai: "1 Sep 2024",
    tglSelesai: "30 Sep 2024",
    aktif: true,
  },
];

export default function PromoEdufinPage() {
  document.title = "Promo Edufin";

  // Data State
  const [tableData, setTableData] = useState<PromoEdufin[]>(initialPromoData);

  // Filter Card State
  const [activeFilters, setActiveFilters] =
    useState<FilterValues>(defaultFilterValues);
  const [filterKey, setFilterKey] = useState(0);

  // Search State
  const searchCategoryOptions = [
    "-- Semua --",
    "Channel",
    "Nama Promo",
    "Deskripsi",
  ];
  const [searchCategory, setSearchCategory] = useState("-- Semua --");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Forms State
  const [isAdding, setIsAdding] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PromoEdufin | null>(null);

  // Search & Filter Handlers
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

  // Add Handlers
  const handleSaveAdd = (newItem: PromoEdufin) => {
    setTableData((prev) => [newItem, ...prev]);
    setIsAdding(false);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  // Edit Handler
  const handleUpdateItem = (updatedItem: PromoEdufin) => {
    setTableData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  // Delete Handlers
  const handleDeleteItem = (item: PromoEdufin) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setTableData((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id),
      );
      setItemToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  // Filtered & Searched Data
  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      // Filter Channel
      if (
        activeFilters.channel &&
        activeFilters.channel !== "-- Semua Channel --" &&
        activeFilters.channel !== "-- Semua --"
      ) {
        if (item.channel !== activeFilters.channel) return false;
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (searchCategory === "Channel") {
          return item.channel.toLowerCase().includes(q);
        } else if (searchCategory === "Nama Promo") {
          return item.namaPromo.toLowerCase().includes(q);
        } else if (searchCategory === "Deskripsi") {
          return item.deskripsi.toLowerCase().includes(q);
        } else {
          return (
            item.channel.toLowerCase().includes(q) ||
            item.namaPromo.toLowerCase().includes(q) ||
            item.deskripsi.toLowerCase().includes(q)
          );
        }
      }

      return true;
    });
  }, [tableData, activeFilters, searchQuery, searchCategory]);

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Promo Edufin</h1>
      </div>

      <div>
        <FilterDataPromoEdufinCard
          key={filterKey}
          initialFilters={activeFilters}
          onFilter={handleFilter}
        />
      </div>

      <div className="container shadow-lg bg-white rounded border-t-green-800 border-t-4 p-4 mt-4">
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
                placeholder="Cari Promo Edufin"
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
              icon={<IoMdSync />}
              responsive={false}
              text="Sync Promo Edufin"
              variant="info"
              className="text-sm"
              onClick={() => setIsSyncModalOpen(true)}
            />
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() => setIsAdding((prev) => !prev)}
            />
          </div>
        </div>

        <div>
          <PromoEdufinTable
            data={filteredData}
            isAdding={isAdding}
            onSaveAdd={handleSaveAdd}
            onCancelAdd={handleCancelAdd}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </div>

      {/* Sync Promo Edufin Modal (Gambar 2) */}
      <KonfirmasiModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onConfirm={() => setIsSyncModalOpen(false)}
        title="Konfirmasi"
        message="Anda yakin akan melakukan sync promo Edufin?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* Delete Confirmation Modal */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setItemToDelete(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
}
