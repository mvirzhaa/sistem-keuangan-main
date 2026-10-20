import { useState } from "react";
import { IoMdSearch, IoMdRefresh, IoMdAdd, IoMdTrash } from "react-icons/io";
import IconButton from "../../../../components/button/IconButton";
import Dropdown from "../../../../components/inputs/Dropdown";
import TextField from "../../../../components/inputs/TextField";
import VoucherTable, {
  type Voucher,
  initialVouchers,
} from "../components/VoucherTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../common/routes/routes";
import InformasiModal from "../../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";

export default function VoucherPage() {
  document.title = "Voucher - Daftar Voucher";

  const navigate = useNavigate();
  const [data, setData] = useState<Voucher[]>(initialVouchers);
  const [filteredData, setFilteredData] = useState<Voucher[]>(initialVouchers);
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedVouchers, setSelectedVouchers] = useState<Voucher[]>([]);

  // Modals
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);
  const [showBatchDeleteModal, setShowBatchDeleteModal] = useState(false);

  // Search logic
  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const matchVoucher = item.voucher.toLowerCase().includes(term);
      const matchKode = item.kodeVoucher.toLowerCase().includes(term);

      if (searchCategory === "Voucher") {
        return matchVoucher;
      }
      if (searchCategory === "Kode Voucher") {
        return matchKode;
      }
      // -- Semua --
      return matchVoucher || matchKode;
    });

    setFilteredData(filtered);
  };

  // Reset / Refresh logic
  const handleReset = () => {
    setSearchCategory("-- Semua --");
    setSearchTerm("");
    setFilteredData(data);
  };

  // Top Hapus button click
  const handleDeleteTopClick = () => {
    if (selectedVouchers.length === 0) {
      setShowNoSelectionModal(true);
    } else {
      setShowBatchDeleteModal(true);
    }
  };

  // Confirm Batch Delete
  const handleConfirmBatchDelete = () => {
    const selectedIds = new Set(selectedVouchers.map((v) => v.id));
    const remaining = data.filter((item) => !selectedIds.has(item.id));
    setData(remaining);

    // Apply current search filter on remaining data
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredData(remaining);
    } else {
      setFilteredData(
        remaining.filter((item) => {
          const matchVoucher = item.voucher.toLowerCase().includes(term);
          const matchKode = item.kodeVoucher.toLowerCase().includes(term);
          if (searchCategory === "Voucher") return matchVoucher;
          if (searchCategory === "Kode Voucher") return matchKode;
          return matchVoucher || matchKode;
        }),
      );
    }

    setSelectedVouchers([]);
    setShowBatchDeleteModal(false);
  };

  // Single Row Delete Handler
  const handleRowDelete = (item: Voucher) => {
    const remaining = data.filter((v) => v.id !== item.id);
    setData(remaining);
    setFilteredData((prev) => prev.filter((v) => v.id !== item.id));
    setSelectedVouchers((prev) => prev.filter((v) => v.id !== item.id));
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Voucher</h1>
        <p className="text-sm text-gray-500 mb-1">Daftar Voucher</p>
      </div>
      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <div className="flex flex-col sm:flex-row space-y-2 justify-between mb-4">
          <div className="flex flex-col sm:flex-row space-x-8">
            <Dropdown
              options={["-- Semua --", "Voucher", "Kode Voucher"]}
              defaultValue={searchCategory}
              onChange={(value) => setSearchCategory(value)}
              className="mr-4 mb-2 sm:mb-0 w-40 sm:w-full text-xs"
            />
            <div className="flex space-x-0.5 items-center">
              <TextField
                placeholder="Cari Voucher"
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                onEnter={handleSearch}
                className="w-full sm:w-80"
              />
              <IconButton
                icon={<IoMdSearch />}
                variant="success"
                onClick={handleSearch}
              />
              <IconButton
                icon={<IoMdRefresh />}
                variant="info"
                onClick={handleReset}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <IconButton
              icon={<IoMdAdd />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-sm"
              onClick={() =>
                navigate(ROUTES.REFERENSI.VOUCHER.DETAIL_VOUCHER, {
                  state: { mode: "create" },
                })
              }
            />
            <IconButton
              icon={<IoMdTrash />}
              responsive={false}
              text="Hapus"
              variant="danger"
              className="text-sm"
              onClick={handleDeleteTopClick}
            />
          </div>
        </div>
        <div className="mt-4">
          <VoucherTable
            data={filteredData}
            onSelectionChange={setSelectedVouchers}
            onDelete={handleRowDelete}
          />
        </div>
      </div>

      {/* Informasi Modal jika belum ada yang dicentang */}
      <InformasiModal
        isOpen={showNoSelectionModal}
        onClose={() => setShowNoSelectionModal(false)}
        title="Informasi"
        message="Silakan centang data yang ingin dihapus terlebih dahulu"
        buttonText="Oke"
      />

      {/* Konfirmasi Modal jika sudah ada yang dicentang */}
      <KonfirmasiModal
        isOpen={showBatchDeleteModal}
        onClose={() => setShowBatchDeleteModal(false)}
        onConfirm={handleConfirmBatchDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
}

