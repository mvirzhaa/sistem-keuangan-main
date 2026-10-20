import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoChevronBack, IoPencil, IoTrash } from "react-icons/io5";
import { IoMdSearch, IoMdAdd, IoMdSave, IoMdRefresh } from "react-icons/io";
import TextField from "../../../../components/inputs/TextField";
import KonfirmasiModal from "../../../../components/modal/KonfirmasiModal";
import DetailVoucherForm, {
  type DetailVoucherFormData,
} from "../components/DetailVoucherForm";
import DetailVoucherView, {
  type VoucherDetailData,
} from "../components/DetailVoucherView";
import { ROUTES } from "../../../../common/routes/routes";

export default function DetailVoucherPage() {
  document.title = "Detail Voucher";

  const navigate = useNavigate();
  const location = useLocation();

  // Initial state passed from route or fallback to view mode with sample data
  const stateMode = (location.state as { mode?: "view" | "create" | "edit" })
    ?.mode;
  const stateVoucher = (location.state as { voucher?: any })?.voucher;

  const defaultVoucher: VoucherDetailData = {
    id: "1",
    kodeVoucher: "KIPSGRUIKA25",
    namaVoucher: "KIP Abah Sogir 30",
    periodeAwal: "2025 Ganjil",
    periodeAkhir: "2025 Ganjil",
    tglExpired: "19 Juni 2025",
    nominal: 300000,
    anggaran: 9000000,
    realisasi: 0,
    isUsed: true,
  };

  const initialVoucher: VoucherDetailData = stateVoucher
    ? {
        id: stateVoucher.id || "1",
        kodeVoucher: stateVoucher.kodeVoucher || "",
        namaVoucher: stateVoucher.voucher || stateVoucher.namaVoucher || "",
        periodeAwal: stateVoucher.periodeAwal || "2025 Ganjil",
        periodeAkhir: stateVoucher.periodeAkhir || "2025 Ganjil",
        tglExpired: stateVoucher.tglExpired || "19 Juni 2025",
        nominal: stateVoucher.nominal ?? 300000,
        anggaran: stateVoucher.anggaran ?? 9000000,
        realisasi: stateVoucher.realisasi ?? 0,
        isUsed: true,
      }
    : defaultVoucher;

  const [mode, setMode] = useState<"view" | "create" | "edit">(
    stateMode || "view",
  );
  const [currentVoucher, setCurrentVoucher] =
    useState<VoucherDetailData>(initialVoucher);
  const [formData, setFormData] = useState<DetailVoucherFormData>({
    id: initialVoucher.id,
    kodeVoucher: initialVoucher.kodeVoucher,
    namaVoucher: initialVoucher.namaVoucher,
    periodeAwal: initialVoucher.periodeAwal,
    periodeAkhir: initialVoucher.periodeAkhir,
    tglExpired: initialVoucher.tglExpired,
    nominal: initialVoucher.nominal,
    anggaran: initialVoucher.anggaran,
    realisasi: initialVoucher.realisasi,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Switch to create mode
  const handleTambahBaru = () => {
    setFormData({
      kodeVoucher: "",
      namaVoucher: "",
      periodeAwal: "2025 Genap",
      periodeAkhir: "2025 Genap",
      tglExpired: "",
      nominal: 0,
      anggaran: 0,
      realisasi: 0,
    });
    setMode("create");
  };

  // Switch to edit mode
  const handleEdit = () => {
    setFormData({
      id: currentVoucher.id,
      kodeVoucher: currentVoucher.kodeVoucher,
      namaVoucher: currentVoucher.namaVoucher,
      periodeAwal: currentVoucher.periodeAwal,
      periodeAkhir: currentVoucher.periodeAkhir,
      tglExpired: currentVoucher.tglExpired,
      nominal: currentVoucher.nominal,
      anggaran: currentVoucher.anggaran,
      realisasi: currentVoucher.realisasi,
    });
    setMode("edit");
  };

  // Save changes
  const handleSave = () => {
    setCurrentVoucher({
      ...formData,
      isUsed: currentVoucher.isUsed,
    });
    setMode("view");
  };

  // Cancel edit or create
  const handleBatal = () => {
    setFormData({
      id: currentVoucher.id,
      kodeVoucher: currentVoucher.kodeVoucher,
      namaVoucher: currentVoucher.namaVoucher,
      periodeAwal: currentVoucher.periodeAwal,
      periodeAkhir: currentVoucher.periodeAkhir,
      tglExpired: currentVoucher.tglExpired,
      nominal: currentVoucher.nominal,
      anggaran: currentVoucher.anggaran,
      realisasi: currentVoucher.realisasi,
    });
    setMode("view");
  };

  // Back action
  const handleBack = () => {
    navigate(ROUTES.REFERENSI.VOUCHER.VOUCHER);
  };

  // Confirm delete on detail page
  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    navigate(ROUTES.REFERENSI.VOUCHER.VOUCHER);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Voucher</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Voucher</p>
      </div>

      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        {mode === "view" ? (
          /* View Mode Topbar (Image 1) */
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3">
            {/* Search Input with Green Search Button */}
            <div className="flex items-stretch w-full sm:w-80">
              <input
                type="text"
                placeholder="Cari Voucher"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-l px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-r transition-colors flex items-center justify-center cursor-pointer"
                title="Cari"
              >
                <IoMdSearch size={18} />
              </button>
            </div>

            {/* Action Buttons: Kembali ke Daftar, Tambah Baru, Edit, Hapus */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoChevronBack size={16} />
                Kembali ke Daftar
              </button>

              <button
                type="button"
                onClick={handleTambahBaru}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoMdAdd size={16} />
                Tambah Baru
              </button>

              <button
                type="button"
                onClick={handleEdit}
                className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoPencil size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoTrash size={15} />
                Hapus
              </button>
            </div>
          </div>
        ) : (
          /* Edit / Form Mode Topbar (Image 2) */
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3">
            {/* Search Input with Green Search Button */}
            <div className="flex items-stretch w-full sm:w-80">
              <input
                type="text"
                placeholder="Cari Voucher"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-l px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-r transition-colors flex items-center justify-center cursor-pointer"
                title="Cari"
              >
                <IoMdSearch size={18} />
              </button>
            </div>

            {/* Action Buttons in Edit Mode (Image 2): Kembali ke Daftar, Simpan, Batal, Hapus */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoChevronBack size={16} />
                Kembali ke Daftar
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoMdSave size={16} />
                Simpan
              </button>

              <button
                type="button"
                onClick={handleBatal}
                className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoMdRefresh size={16} />
                Batal
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <IoTrash size={15} />
                Hapus
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        {mode === "view" ? (
          <DetailVoucherView data={currentVoucher} />
        ) : (
          <DetailVoucherForm
            initialData={formData}
            onChange={(updated) => setFormData(updated)}
          />
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
}
