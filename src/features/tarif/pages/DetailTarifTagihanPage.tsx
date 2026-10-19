import { useState, useEffect } from "react";
import {
  IoMdArrowBack,
  IoMdSave,
  IoMdSearch,
  IoMdAdd,
} from "react-icons/io";
import { IoPencil, IoTrash } from "react-icons/io5";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import DetailTarifTagihanForm, {
  type DetailTarifTagihanFormData,
} from "../components/DetailTarifTagihanForm";
import TabNavigation from "../../../components/navigation/TabNavigation";
import DistribusiTagihanPerSemesterTable from "../components/DistribusiTagihanPerSemesterTable";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import {
  tarifTagihanService,
  type TarifTagihanItem,
  DEFAULT_TARIF_TAGIHAN,
} from "../services/tarifTagihanService";
import { ROUTES } from "../../../common/routes/routes";

const initialFormData: DetailTarifTagihanFormData = {
  periodeMasuk: "2025 Genap",
  gelombang: "Gelombang 1",
  sistemKuliah: "Reguler",
  jalurPendaftaran: "SBMPTN",
  programStudi: "Universitas Ibn Khaldun",
  jenisAkun: "PRAKTIKUM PVDF",
  cicilan: "Sekali Bayar",
  sksSemester: "0",
  nominalTarif: "",
  frekuensiDenda: "-- Pilih Frekuensi Denda --",
  nominalDenda: "0,00",
  maxDenda: "0,00",
};

export default function DetailTarifTagihanPage() {
  document.title = "Tarif - Detail Tarif Tagihan";
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'view' | 'create' | 'edit'
  const [mode, setMode] = useState<"view" | "create" | "edit">("view");

  // Current item being viewed or edited
  const [currentItem, setCurrentItem] = useState<TarifTagihanItem>(() => {
    return (
      location.state?.item ||
      tarifTagihanService.getAll()[0] ||
      DEFAULT_TARIF_TAGIHAN[0]
    );
  });

  // Form input state
  const [formData, setFormData] = useState<DetailTarifTagihanFormData>(initialFormData);

  // Search keyword inside detail page
  const [searchKeyword, setSearchKeyword] = useState("");

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState("aturan-cicilan");

  const tabItems = [
    { label: "Aturan Cicilan", value: "aturan-cicilan" },
    { label: "Distribusi Tagihan per Semester", value: "distribusi-tagihan" },
  ];

  // Initialize from location state
  useEffect(() => {
    if (location.state?.mode) {
      setMode(location.state.mode);
    }
    if (location.state?.item) {
      setCurrentItem(location.state.item);
      populateForm(location.state.item);
    } else {
      populateForm(currentItem);
    }
  }, [location.state]);

  const populateForm = (item: TarifTagihanItem) => {
    setFormData({
      periodeMasuk: item.periodeMasuk || "2025 Genap",
      gelombang: item.gelombang || "Gelombang 1",
      sistemKuliah: item.sistemKuliah || "Reguler",
      jalurPendaftaran: item.jalurPendaftaran || "SBMPTN",
      programStudi: item.programStudi || "Universitas Ibn Khaldun",
      jenisAkun: item.jenisAkun || "PRAKTIKUM PVDF",
      cicilan: item.cicilan || "Sekali Bayar",
      sksSemester: item.sksSemester ? item.sksSemester.toString() : "0",
      nominalTarif: item.nominalTarif ? item.nominalTarif.toLocaleString("id-ID") : "",
      frekuensiDenda: item.frekuensiDenda || "-- Pilih Frekuensi Denda --",
      nominalDenda: item.nominalDenda ? item.nominalDenda.toString() : "0,00",
      maxDenda: item.maxDenda ? item.maxDenda.toString() : "0,00",
    });
  };

  const handleFormChange = (field: keyof DetailTarifTagihanFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Switch to Create Mode
  const handleStartCreate = () => {
    setFormData(initialFormData);
    setMode("create");
  };

  // Switch to Edit Mode
  const handleStartEdit = () => {
    populateForm(currentItem);
    setMode("edit");
  };

  // Save changes
  const handleSave = () => {
    // Parse numeric nominal
    const cleanNominal = formData.nominalTarif
      .toString()
      .replace(/\./g, "")
      .replace(/,/g, ".");
    const parsedNominal = parseFloat(cleanNominal) || 0;

    const toSave: Partial<TarifTagihanItem> & { id?: string } = {
      ...(mode === "edit" ? { id: currentItem.id } : {}),
      periodeMasuk: formData.periodeMasuk,
      gelombang: formData.gelombang,
      sistemKuliah: formData.sistemKuliah,
      jalurPendaftaran: formData.jalurPendaftaran,
      programStudi: formData.programStudi,
      jenisAkun: formData.jenisAkun,
      cicilan: formData.cicilan,
      sksSemester: formData.sksSemester,
      nominalTarif: parsedNominal,
      frekuensiDenda: formData.frekuensiDenda,
      nominalDenda: formData.nominalDenda,
      maxDenda: formData.maxDenda,
    };

    const saved = tarifTagihanService.save(toSave);
    setCurrentItem(saved);
    setMode("view");
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (currentItem?.id) {
      tarifTagihanService.delete(currentItem.id);
    }
    setIsDeleteModalOpen(false);
    navigate(ROUTES.TARIF.TAGIHAN);
  };

  // Search in detail page
  const handleSearch = () => {
    if (!searchKeyword.trim()) return;
    const kw = searchKeyword.toLowerCase();
    const list = tarifTagihanService.getAll();
    const found = list.find(
      (item) =>
        item.programStudi.toLowerCase().includes(kw) ||
        item.jenisAkun.toLowerCase().includes(kw) ||
        item.periodeMasuk.toLowerCase().includes(kw) ||
        item.jalurPendaftaran.toLowerCase().includes(kw)
    );
    if (found) {
      setCurrentItem(found);
      populateForm(found);
    }
  };

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString("id-ID")},00`;
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">Tarif</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Tarif Tagihan</p>
      </div>

      {/* Main Container */}
      <div
        className={`bg-white rounded-md shadow-md p-6 border-t-4 ${
          mode === "view" ? "border-t-emerald-600" : "border-t-amber-500"
        }`}
      >
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          {/* Search Bar */}
          <div className="flex space-x-1 items-center w-full sm:w-auto">
            <TextField
              placeholder="Cari Tarif"
              value={searchKeyword}
              onChange={(val) => setSearchKeyword(val)}
              onEnter={handleSearch}
              className="w-full sm:w-80 text-sm"
            />
            {/* User requested: in form mode, icon search nya ijo. In view mode, matches image 2/3 (blue) */}
            {mode === "view" ? (
              <IconButton
                icon={<IoMdSearch className="text-base" />}
                className="bg-[#255799] hover:bg-[#1c457c] text-white p-2.5 rounded-md cursor-pointer transition-colors"
                onClick={handleSearch}
                title="Cari"
              />
            ) : (
              <IconButton
                icon={<IoMdSearch className="text-base" />}
                variant="success"
                onClick={handleSearch}
                title="Cari"
              />
            )}
          </div>

          {/* Action Buttons Top Right */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Kembali ke Daftar */}
            <IconButton
              icon={<IoMdArrowBack className="text-base" />}
              text="Kembali ke Daftar"
              variant="info"
              className="text-sm cursor-pointer shadow-sm"
              onClick={() => navigate(ROUTES.TARIF.TAGIHAN)}
            />

            {mode === "view" ? (
              <>
                {/* + Tambah Baru */}
                <IconButton
                  icon={<IoMdAdd className="text-base" />}
                  text="Tambah Baru"
                  variant="success"
                  className="text-sm cursor-pointer shadow-sm"
                  onClick={handleStartCreate}
                />

                {/* Edit */}
                <IconButton
                  icon={<IoPencil className="text-base" />}
                  text="Edit"
                  variant="warning"
                  className="text-sm cursor-pointer shadow-sm"
                  onClick={handleStartEdit}
                />

                {/* Hapus */}
                <IconButton
                  icon={<IoTrash className="text-base" />}
                  text="Hapus"
                  variant="danger"
                  className="text-sm cursor-pointer shadow-sm"
                  onClick={() => setIsDeleteModalOpen(true)}
                />
              </>
            ) : (
              /* User requested: button simpan juga ijo */
              <IconButton
                icon={<IoMdSave className="text-base" />}
                text="Simpan"
                variant="success"
                className="text-sm cursor-pointer shadow-sm"
                onClick={handleSave}
              />
            )}
          </div>
        </div>

        {/* Content Body */}
        {mode === "view" ? (
          /* View Mode (matches Image 2 & 3) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
            {/* Left Column */}
            <div>
              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Periode Masuk
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.periodeMasuk || "-"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Gelombang
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.gelombang || "-"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Sistem Kuliah
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.sistemKuliah || "-"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Jalur Pendaftaran
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.jalurPendaftaran || "-"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Program Studi
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.programStudi || "-"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Jenis Akun
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.jenisAkun || "-"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Jml. Cicilan
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.cicilan || "-"}
                </span>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  SKS Semester (Rp.)
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.sksSemester && currentItem.sksSemester !== "0" && currentItem.sksSemester !== 0
                    ? currentItem.sksSemester.toString()
                    : ""}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Nominal Tarif (Rp.)
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {formatCurrency(currentItem.nominalTarif || 0)}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Frekuensi Denda
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.frekuensiDenda &&
                  !currentItem.frekuensiDenda.includes("Pilih")
                    ? currentItem.frekuensiDenda
                    : ""}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Nominal Denda (Rp.)
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.nominalDenda ? currentItem.nominalDenda.toString() : "0,00"}
                </span>
              </div>

              <div className="flex items-center py-2.5">
                <span className="w-48 text-sm font-semibold text-blue-600 flex-shrink-0">
                  Max. Denda (Rp.)
                </span>
                <span className="text-sm text-gray-800 font-normal">
                  {currentItem.maxDenda ? currentItem.maxDenda.toString() : "0,00"}
                </span>
              </div>
            </div>
        </div>
        ) : (
          /* Create / Edit Mode (matches Image 1) */
          <div>
            <DetailTarifTagihanForm
              formData={formData}
              onChange={handleFormChange}
            />
          </div>
        )}

        {/* Tab navigation (always present in view, create, and edit modes) */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <TabNavigation
            vertical={false}
            tabs={tabItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="border-b border-gray-200"
          />

          {/* Tab content */}
          <div className="mt-4">
            {activeTab === "aturan-cicilan" && (
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r">
                <p className="text-xs text-blue-800">
                  Tidak perlu mengatur aturan cicilan
                </p>
              </div>
            )}

            {activeTab === "distribusi-tagihan" && (
              <div>
                <div className="border-l-4 border-blue-400 bg-blue-50 p-4 mb-4 rounded-r">
                  <p className="text-xs text-blue-800">
                    Jika Nominal tarif per semester diisi maka nominal tarif dan
                    aturan cicilan di abaikan
                  </p>
                </div>
                <div>
                  <DistribusiTagihanPerSemesterTable
                    onDataChange={(data) => {
                      console.log("Distribusi tagihan updated:", data);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus (matches Image 4) */}
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
