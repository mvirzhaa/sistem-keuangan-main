import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import AturanAkademikMenu, {
  type MenuItem,
} from "../components/AturanAkademikMahasiswaMenu";
import PengaturanAturanAkademikTable, {
  type AkademikTableRow,
} from "../components/PengaturanAturanAkademikTable";
import InformasiModal from "../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import { ROUTES } from "../../../common/routes/routes";

export default function PengaturanAturanAkademikPage() {
  document.title = "Pengaturan - Aturan Akademik";

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("cuti");

  // Modals state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const openInfoModal = (msg: string) => {
    setInfoModalMessage(msg);
    setIsInfoModalOpen(true);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) {
      openInfoModal("Silakan centang data yang ingin dihapus terlebih dahulu");
    } else {
      setShowDeleteModal(true);
    }
  };

  const handleViewDetail = (item: AkademikTableRow) => {
    navigate(`${ROUTES.PENGATURAN.DETAIL_ATURAN_AKADEMIK}/${item.id}`, {
      state: { item, activeTab },
    });
  };

  const mahasiswaMenu: MenuItem[] = [
    { label: "Mengambil Cuti", value: "cuti" },
    { label: "Melihat KHS", value: "khs" },
    { label: "Kegiatan Pendukung", value: "kegiatan_pendukung" },
    {
      label: "Pengambilan KRS reguler (Gasal/Genap)",
      value: "krs_reguler",
      isDiaktifkan: true,
    },
    {
      label: "Pengambilan KRS Semester Pendek",
      value: "krs_pendek",
      isDiaktifkan: true,
    },
    { label: "Presensi mahasiswa", value: "presensi" },
    { label: "Mengambil Proposal", value: "proposal" },
    { label: "Mengambil Skripsi", value: "skripsi" },
    { label: "Mengikuti UAS", value: "uas", isDiaktifkan: true },
    { label: "Mengikuti UTS", value: "uts", isDiaktifkan: true },
    { label: "Mengikuti Yudisium", value: "yudisium" },
  ];

  const pendaftarMenu: MenuItem[] = [
    { label: "Daftar Ulang", value: "daftar_ulang", isDiaktifkan: true },
    { label: "Generate Mahasiswa", value: "generate_mahasiswa" },
  ];

  // Data for Daftar Ulang (Image 2)
  const daftarUlangData: AkademikTableRow[] = [
    {
      id: "du-1",
      jenisTagihan: "Wakaf Masjid Ibn Khaldun",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "500.000,00",
      status: "Aktif",
    },
    {
      id: "du-2",
      jenisTagihan: "Ta'aruf",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "1.000.000,00",
      status: "Aktif",
    },
    {
      id: "du-3",
      jenisTagihan: "UPM (Uang Pembinaan Mahasiswa)",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "200.000,00",
      status: "Aktif",
    },
  ];

  // Data for KRS Reguler (Image 4 prev)
  const krsRegulerData: AkademikTableRow[] = [
    {
      id: "1",
      jenisTagihan: "Uang Gedung Tahap 1",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Tidak Aktif",
    },
    {
      id: "2",
      jenisTagihan: "Uang Gedung Tahap 2",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Tidak Aktif",
    },
    {
      id: "3",
      jenisTagihan: "SPP",
      keteranganTagihan: "Periode Saat Ini dan Sebelumnya",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "4",
      jenisTagihan: "Heregistrasi",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "5",
      jenisTagihan: "UPM (Uang Pembinaan Mahasiswa)",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
  ];

  // Data for KRS Pendek (Image 5 prev)
  const krsPendekData: AkademikTableRow[] = [
    {
      id: "1",
      jenisTagihan: "Uang Gedung Tahap 1",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "2",
      jenisTagihan: "Uang Gedung Tahap 2",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "3",
      jenisTagihan: "SPP",
      keteranganTagihan: "Periode Saat Ini dan Sebelumnya",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "4",
      jenisTagihan: "Heregistrasi",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Tidak Aktif",
    },
    {
      id: "5",
      jenisTagihan: "UPM (Uang Pembinaan Mahasiswa)",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Tidak Aktif",
    },
  ];

  // Data for UAS (Image 4 new)
  const uasUnivData: AkademikTableRow[] = [
    {
      id: "uas-1",
      jenisTagihan: "Ujian Akhir Semester",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "uas-2",
      jenisTagihan: "SKS",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
  ];

  const uasProdiData: AkademikTableRow[] = [
    {
      id: "uas-3",
      jenisTagihan: "Ujian Akhir Semester",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "uas-4",
      jenisTagihan: "SKS",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
  ];

  // Data for UTS (Image 5 new)
  const utsTeknikData: AkademikTableRow[] = [
    {
      id: "uts-1",
      jenisTagihan: "SKS",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "200.000,00",
      status: "Tidak Aktif",
    },
  ];

  const utsKesehatanData: AkademikTableRow[] = [
    {
      id: "uts-2",
      jenisTagihan: "SKS Semester 1",
      keteranganTagihan: "Hanya Periode Saat Ini",
      syaratCicilan: "Semua Cicilan",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "uts-3",
      jenisTagihan: "UKT Afirmasi UIKA",
      keteranganTagihan: "Periode Saat Ini dan Sebelumnya",
      syaratCicilan: "Cicilan ke-1 s.d. 2",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "uts-4",
      jenisTagihan: "Praktikum Gizi",
      keteranganTagihan: "Periode Saat Ini dan Sebelumnya",
      syaratCicilan: "Cicilan ke-1",
      syaratCicilanTambahan: "Memeriksa bulan sesuai urutan cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
    {
      id: "uts-5",
      jenisTagihan: "Praktikum Biomedik",
      keteranganTagihan: "Periode Saat Ini dan Sebelumnya",
      syaratCicilan: "Semua Cicilan",
      pembayaranMinimal: "100.00%",
      status: "Aktif",
    },
  ];

  // Render Top Banner based on Active Tab
  const renderTopBanner = () => {
    switch (activeTab) {
      case "cuti":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Cuti Berhasil Disetting
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Anda telah menambahkan cuti sebagai syarat pembayaran mahasiswa
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate(ROUTES.REFERENSI.TRANSAKSI.AKUN_TRANSAKSI)
              }
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Atur Jenis Tagihan
            </button>
          </div>
        );

      case "khs":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Semua Prodi Sudah Disetting Tanggal KHS
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Silakan tambah atau ubah tanggal jatuh tempo aturan KHS agar sesuai dengan ketentuan Perguruan Tinggi Anda!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  'Silakan hubungi bagian akademik untuk mengubah data "Aturan Akademik - KHS" sebagai syarat pembayaran mahasiswa.',
                )
              }
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Ubah Tanggal
            </button>
          </div>
        );

      case "krs_reguler":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Semua Prodi Sudah Disetting Tanggal KRS
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Silakan tambah atau ubah tanggal jatuh tempo aturan KRS agar sesuai dengan ketentuan Perguruan Tinggi Anda!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  'Silakan hubungi bagian akademik untuk mengubah data "Aturan Akademik - KRS" sebagai syarat pembayaran mahasiswa.',
                )
              }
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Ubah Tanggal
            </button>
          </div>
        );

      case "presensi":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Tanggal Jatuh Tempo Presensi (21 September 2026)
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Silakan tambah atau ubah tanggal jatuh tempo aturan Presensi agar sesuai dengan ketentuan Perguruan Tinggi Anda!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  'Silakan hubungi bagian akademik untuk mengubah data "Aturan Akademik - Presensi" sebagai syarat pembayaran mahasiswa.',
                )
              }
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Ubah Tanggal
            </button>
          </div>
        );

      case "proposal":
        return (
          <div className="bg-[#fdf2f2] border border-[#f8b4b4] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="text-red-600 shrink-0 mt-0.5">
                <IoWarning size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Ketentuan Proposal Belum Disetting
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Silakan tambah event &quot;Mengambil Proposal&quot; sebagai syarat pembayaran mahasiswa
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate(ROUTES.REFERENSI.TRANSAKSI.AKUN_TRANSAKSI)
              }
              className="bg-[#d9534f] hover:bg-[#c9302c] text-white px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Atur Jenis Tagihan
            </button>
          </div>
        );

      case "skripsi":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Skripsi Berhasil Disetting
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Anda telah menambahkan skripsi sebagai syarat pembayaran mahasiswa
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate(ROUTES.REFERENSI.TRANSAKSI.AKUN_TRANSAKSI)
              }
              className="bg-[#d97706] hover:bg-[#b45309] text-white px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Atur Jenis Tagihan
            </button>
          </div>
        );

      case "uas":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Tanggal Jatuh Tempo UAS Belum Anda Setting
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Silakan tambah atau ubah tanggal jatuh tempo aturan UAS agar sesuai dengan ketentuan Perguruan Tinggi Anda!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  'Silakan hubungi bagian akademik untuk melengkapi data "Aturan Akademik - UAS" sebagai syarat pembayaran mahasiswa.',
                )
              }
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Tambah Tanggal
            </button>
          </div>
        );

      case "uts":
        return (
          <div className="bg-[#fef9e7] border border-[#f9e7a2] rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  Tanggal Jatuh Tempo UTS Belum Anda Setting
                </h4>
                <p className="text-gray-600 text-xs mt-0.5">
                  Silakan tambah atau ubah tanggal jatuh tempo aturan UTS agar sesuai dengan ketentuan Perguruan Tinggi Anda!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openInfoModal(
                  'Silakan hubungi bagian akademik untuk melengkapi data "Aturan Akademik - UTS" sebagai syarat pembayaran mahasiswa.',
                )
              }
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-4 py-2 rounded text-xs font-medium cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              Tambah Tanggal
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Render Table Content Area
  const renderTableContent = () => {
    if (activeTab === "uas") {
      return (
        <div className="flex flex-col space-y-6">
          {/* Info Card */}
          <div className="border border-cyan-400 bg-cyan-50 rounded-lg p-3.5 text-xs flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              !
            </div>
            <span className="text-gray-800 font-medium">
              Aturan akademik yang berlaku adalah Unit Kerja yang paling kecil
            </span>
          </div>

          {/* Section 1: Universitas Ibn Khaldun */}
          <div>
            <h2 className="text-base font-bold text-[#004e82] mb-3 pb-1 border-b-2 border-b-[#004e82]">
              Universitas Ibn Khaldun
            </h2>
            <PengaturanAturanAkademikTable
              data={uasUnivData}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onView={handleViewDetail}
              onDelete={() => setShowDeleteModal(true)}
            />
          </div>

          {/* Section 2: S1 - Pendidikan Masyarakat */}
          <div>
            <h2 className="text-base font-bold text-[#004e82] mb-3 pb-1 border-b-2 border-b-[#004e82]">
              S1 - Pendidikan Masyarakat
            </h2>
            <PengaturanAturanAkademikTable
              data={uasProdiData}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onView={handleViewDetail}
              onDelete={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
      );
    }

    if (activeTab === "uts") {
      return (
        <div className="flex flex-col space-y-6">
          {/* Info Card */}
          <div className="border border-cyan-400 bg-cyan-50 rounded-lg p-3.5 text-xs flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              !
            </div>
            <span className="text-gray-800 font-medium">
              Aturan akademik yang berlaku adalah Unit Kerja yang paling kecil
            </span>
          </div>

          {/* Section 1: Fakultas Teknik dan Sains */}
          <div>
            <h2 className="text-base font-bold text-[#004e82] mb-3 pb-1 border-b-2 border-b-[#004e82]">
              Fakultas Teknik dan Sains
            </h2>
            <PengaturanAturanAkademikTable
              data={utsTeknikData}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onView={handleViewDetail}
              onDelete={() => setShowDeleteModal(true)}
            />
          </div>

          {/* Section 2: Fakultas Ilmu Kesehatan */}
          <div>
            <h2 className="text-base font-bold text-[#004e82] mb-3 pb-1 border-b-2 border-b-[#004e82]">
              Fakultas Ilmu Kesehatan
            </h2>
            <PengaturanAturanAkademikTable
              data={utsKesehatanData}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onView={handleViewDetail}
              onDelete={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
      );
    }

    // Default for cuti, khs, kegiatan_pendukung, krs_reguler, krs_pendek, presensi, proposal, skripsi, daftar_ulang, generate_mahasiswa, etc.
    let tableData: AkademikTableRow[] = [];
    if (activeTab === "krs_reguler") tableData = krsRegulerData;
    else if (activeTab === "krs_pendek") tableData = krsPendekData;
    else if (activeTab === "daftar_ulang") tableData = daftarUlangData;
    else if (activeTab === "generate_mahasiswa") tableData = [];

    return (
      <div>
        <h2 className="text-base font-bold text-[#004e82] mb-3 pb-1 border-b-2 border-b-[#004e82]">
          Universitas Ibn Khaldun
        </h2>

        <PengaturanAturanAkademikTable
          data={tableData}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onView={handleViewDetail}
          onDelete={() => setShowDeleteModal(true)}
        />
      </div>
    );
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Pengaturan</h1>
        <p className="text-sm text-gray-500 mb-1">Aturan Akademik</p>
      </div>

      {/* Top Banner based on Active Tab */}
      {renderTopBanner()}

      {/* Main Container */}
      <div className="container bg-white shadow-lg rounded border-t-green-600 border-t-4 px-4 py-4 mt-2">
        {/* Top Right Action Buttons */}
        <div className="flex justify-end space-x-2 mb-4">
          <button
            type="button"
            onClick={() => navigate(ROUTES.PENGATURAN.DETAIL_ATURAN_AKADEMIK)}
            className="bg-[#00a65a] hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <IoMdAdd size={16} />
            Tambah
          </button>
          <button
            type="button"
            onClick={handleBatchDelete}
            className="bg-[#dd4b39] hover:bg-red-600 text-white px-3.5 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <IoMdTrash size={16} />
            Hapus
          </button>
        </div>

        {/* Content Section: Sidebar on Left, Table on Right */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col space-y-4 w-full sm:w-64 md:w-72 shrink-0">
            <AturanAkademikMenu
              title="MAHASISWA"
              items={mahasiswaMenu}
              activeValue={activeTab}
              onItemClick={(item) => {
                setActiveTab(item.value);
                setSelectedIds([]);
              }}
            />
            <AturanAkademikMenu
              title="PENDAFTAR"
              items={pendaftarMenu}
              activeValue={activeTab}
              onItemClick={(item) => {
                setActiveTab(item.value);
                setSelectedIds([]);
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            {renderTableContent()}
          </div>
        </div>
      </div>

      {/* Reusable Modal Informasi */}
      <InformasiModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Informasi"
        message={infoModalMessage}
        buttonText="Oke"
      />

      {/* Modal Konfirmasi Hapus */}
      <KonfirmasiModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          setSelectedIds([]);
        }}
        title="Konfirmasi"
        message="Apakah anda yakin akan menghapus data ini?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />
    </>
  );
}
