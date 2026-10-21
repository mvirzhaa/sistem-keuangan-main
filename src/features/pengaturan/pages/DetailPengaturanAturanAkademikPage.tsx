import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IoChevronBack, IoPencil } from "react-icons/io5";
import {
  IoMdAdd,
  IoMdTrash,
  IoMdSave,
  IoMdRefresh,
  IoMdSearch,
  IoMdArrowBack,
} from "react-icons/io";
import { ROUTES } from "../../../common/routes/routes";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import IconButton from "../../../components/button/IconButton";
import TextField from "../../../components/inputs/TextField";
import DetailPengaturanAturanAkademikForm, {
  type AturanAkademikFormData,
} from "../components/DetailPengaturanAturanAkademikForm";

const defaultDetailData: AturanAkademikFormData = {
  jenisAturan: "Pengambilan KRS reguler (Gasal/Genap)",
  unitKerja: "Universitas Ibn Khaldun",
  jenisTagihan: "SPP",
  cicilanAwal: "Semua Cicilan",
  pemeriksaanTagihan: "Periode Saat Ini dan Sebelumnya",
  aturanPembayaran: "Persentase",
  pembayaranMinimal: "100,00",
  validasiTagihan: false,
  status: true,
};

const defaultCreateData: AturanAkademikFormData = {
  jenisAturan: "-- Pilih Jenis Aturan --",
  unitKerja: "-- Pilih Unit Kerja --",
  jenisTagihan: "-- Pilih Jenis Tagihan --",
  cicilanAwal: "Semua Cicilan",
  pemeriksaanTagihan: "Hanya Periode Saat Ini",
  aturanPembayaran: "Nominal",
  pembayaranMinimal: "",
  validasiTagihan: false,
  status: false,
};

export default function DetailPengaturanAturanAkademikPage() {
  document.title = "Detail Pengaturan Aturan Akademik";

  const { id } = useParams<{ id?: string }>();
  const isDetailMode = Boolean(id);

  const navigate = useNavigate();
  const location = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getInitialFormData = (): AturanAkademikFormData => {
    if (!isDetailMode) {
      return defaultCreateData;
    }
    const item = location.state?.item;
    if (item) {
      return {
        jenisAturan:
          location.state?.activeTab === "krs_pendek"
            ? "Pengambilan KRS Semester Pendek"
            : location.state?.activeTab === "uas"
              ? "Mengikuti UAS"
              : location.state?.activeTab === "uts"
                ? "Mengikuti UTS"
                : location.state?.activeTab === "daftar_ulang"
                  ? "Daftar Ulang"
                  : "Pengambilan KRS reguler (Gasal/Genap)",
        unitKerja: "Universitas Ibn Khaldun",
        jenisTagihan: item.jenisTagihan || "SPP",
        cicilanAwal: item.syaratCicilan || "Semua Cicilan",
        pemeriksaanTagihan:
          item.keteranganTagihan || "Periode Saat Ini dan Sebelumnya",
        aturanPembayaran: item.pembayaranMinimal?.includes("%")
          ? "Persentase"
          : "Nominal",
        pembayaranMinimal: item.pembayaranMinimal
          ? item.pembayaranMinimal.replace("%", "").trim()
          : "100,00",
        validasiTagihan: Boolean(item.syaratCicilanTambahan),
        status: item.status === "Aktif",
      };
    }
    return defaultDetailData;
  };

  const [formData, setFormData] = useState<AturanAkademikFormData>(getInitialFormData);
  const [savedData, setSavedData] = useState<AturanAkademikFormData>(getInitialFormData);

  useEffect(() => {
    const data = getInitialFormData();
    setFormData(data);
    setSavedData(data);
    setIsEdit(false);
  }, [id, location.state]);

  const handleChange = (field: keyof AturanAkademikFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSavedData(formData);
    if (isDetailMode) {
      setIsEdit(false);
    }
    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 3000);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEdit(false);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Detail Aturan Akademik</p>
      </div>

      {showSavedAlert && (
        <div className="bg-[#dff0d8] border border-[#d6e9c6] text-[#3c763d] px-4 py-3 rounded mb-4 text-xs sm:text-sm flex justify-between items-center transition-all">
          <span>Data pengaturan berhasil disimpan.</span>
          <button
            type="button"
            onClick={() => setShowSavedAlert(false)}
            className="text-[#3c763d] font-bold text-lg leading-none cursor-pointer hover:opacity-75"
          >
            &times;
          </button>
        </div>
      )}

      <div className="container bg-white shadow-lg rounded border-t-green-800 border-t-4 p-5 mt-4">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          {/* Search Input on Left with green search icon */}
          <div className="flex space-x-1 items-center w-full sm:w-auto">
            <TextField
              placeholder="Cari Pengaturan"
              className="w-full sm:w-80 text-sm"
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
            />
            <IconButton
              icon={<IoMdSearch className="text-base" />}
              variant="success"
              title="Cari"
            />
          </div>

          {/* Action Buttons on Right */}
          {!isDetailMode ? (
            /* Tambah Baru Mode: Kembali & Simpan */
            <div className="flex space-x-2 shrink-0">
              <IconButton
                icon={<IoMdArrowBack />}
                responsive={false}
                text="Kembali"
                variant="info"
                className="text-sm cursor-pointer"
                onClick={() => navigate(ROUTES.PENGATURAN.ATURAN_AKADEMIK)}
              />
              <IconButton
                icon={<IoMdSave />}
                responsive={false}
                text="Simpan"
                variant="success"
                className="text-sm cursor-pointer"
                onClick={handleSave}
              />
            </div>
          ) : (
            /* Detail Mode (Gambar 3 & 4) */
            <div className="flex flex-wrap items-center gap-2">
              {/* Kembali ke Daftar */}
              <button
                type="button"
                onClick={() => navigate(ROUTES.PENGATURAN.ATURAN_AKADEMIK)}
                className="bg-[#00c0ef] hover:bg-[#00acd6] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <IoChevronBack size={15} />
                <span>Kembali ke Daftar</span>
              </button>

              {!isEdit ? (
                /* Gambar 3: View Mode */
                <>
                  {/* Tambah Baru */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(ROUTES.PENGATURAN.DETAIL_ATURAN_AKADEMIK)
                    }
                    className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <IoMdAdd size={16} />
                    <span>Tambah Baru</span>
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => setIsEdit(true)}
                    className="bg-[#f39c12] hover:bg-[#e08e0b] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <IoPencil size={15} />
                    <span>Edit</span>
                  </button>

                  {/* Hapus */}
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-[#dd4b39] hover:bg-[#c9302c] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <IoMdTrash size={16} />
                    <span>Hapus</span>
                  </button>
                </>
              ) : (
                /* Gambar 4: Edit Mode */
                <>
                  {/* Simpan */}
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <IoMdSave size={16} />
                    <span>Simpan</span>
                  </button>

                  {/* Batal */}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-[#f39c12] hover:bg-[#e08e0b] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <IoMdRefresh size={16} />
                    <span>Batal</span>
                  </button>

                  {/* Hapus */}
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-[#dd4b39] hover:bg-[#c9302c] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <IoMdTrash size={16} />
                    <span>Hapus</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Content (Form or View Mode) */}
        <div>
          <DetailPengaturanAturanAkademikForm
            form={formData}
            onChange={handleChange}
            isEdit={!isDetailMode || isEdit}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      <KonfirmasiModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          navigate(ROUTES.PENGATURAN.ATURAN_AKADEMIK);
        }}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
}
