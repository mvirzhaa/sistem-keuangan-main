import { useState, useMemo, useEffect, useCallback } from "react";
import CariDataMahasiswaCard, {
  type FilterData,
} from "../components/CariDataMahasiswaCard";
import UktMahasiswaTable, {
  type UktMahasiswaData,
} from "../components/UktMahasiswaTable";
import UnggahExcelUktModal from "../components/UnggahExcelUktModal";
import InformasiFilterModal from "../components/InformasiFilterModal";
import EditKelompokUktModal from "../components/EditKelompokUktModal";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import IconButton from "../../../components/button/IconButton";
import { IoMdCloudUpload, IoMdRefresh, IoMdSearch } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { operasionalApi } from "../services/operasional.api";

const defaultFilters: FilterData = {
  penerima: "Mahasiswa",
  periodeMasuk: "-- Semua --",
  gelombang: "-- Semua --",
  jalurPendaftaran: "-- Semua --",
  sistemKuliah: "-- Semua --",
  programStudi: "-- Semua --",
};

export default function UktMahasiswaPage() {
  document.title = "UKT Mahasiswa / Pendaftar";

  // Data state
  const [mahasiswaList, setMahasiswaList] = useState<UktMahasiswaData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<UktMahasiswaData[]>([]);

  // Filter state dari card atas (hanya berubah saat tombol Simpan Filter diklik)
  const [filters, setFilters] = useState<FilterData>(defaultFilters);

  // Ambil data UKT Mahasiswa / Pendaftar dari server / database json
  const fetchUktMahasiswa = useCallback(async () => {
    setLoading(true);
    try {
      const res = await operasionalApi.getUktMahasiswa();
      if (res && res.data && Array.isArray(res.data)) {
        setMahasiswaList(res.data);
      }
    } catch (err) {
      console.error("Gagal memuat data UKT Mahasiswa:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUktMahasiswa();
  }, [fetchUktMahasiswa]);

  // Search state dari bar tengah
  const [searchField, setSearchField] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [appliedSearchField, setAppliedSearchField] = useState<string>("-- Semua --");

  // Modal visibility states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<UktMahasiswaData | null>(
    null,
  );


  // Filter data berdasarkan filters atas dan pencarian
  const filteredData = useMemo(() => {
    return mahasiswaList.filter((item) => {
      // Filter Penerima (Mahasiswa / Pendaftar)
      if (filters.penerima && item.penerima !== filters.penerima) {
        return false;
      }

      // Filter Periode Masuk
      if (
        filters.periodeMasuk &&
        filters.periodeMasuk !== "-- Semua --" &&
        item.periode !== filters.periodeMasuk
      ) {
        return false;
      }

      // Filter Gelombang
      if (
        filters.gelombang &&
        filters.gelombang !== "-- Semua --" &&
        item.gelombang !== filters.gelombang
      ) {
        return false;
      }

      // Filter Jalur Pendaftaran
      if (
        filters.jalurPendaftaran &&
        filters.jalurPendaftaran !== "-- Semua --" &&
        item.jalurPendaftaran !== filters.jalurPendaftaran
      ) {
        return false;
      }

      // Filter Sistem Kuliah
      if (
        filters.sistemKuliah &&
        filters.sistemKuliah !== "-- Semua --" &&
        item.sistemKuliah !== filters.sistemKuliah
      ) {
        return false;
      }

      // Filter Program Studi
      if (
        filters.programStudi &&
        filters.programStudi !== "-- Semua --" &&
        item.programStudi !== filters.programStudi
      ) {
        return false;
      }

      // Filter Pencarian (NIM / Nama)
      if (appliedSearchQuery.trim()) {
        const query = appliedSearchQuery.toLowerCase().trim();
        if (appliedSearchField === "NIM") {
          return item.nim.toLowerCase().includes(query);
        }
        if (appliedSearchField === "Nama") {
          return item.nama.toLowerCase().includes(query);
        }
        // -- Semua --
        return (
          item.nim.toLowerCase().includes(query) ||
          item.nama.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [mahasiswaList, filters, appliedSearchQuery, appliedSearchField]);

  // Handle Search click / Enter
  const handleSearch = () => {
    setLoading(true);
    setAppliedSearchQuery(searchInput);
    setAppliedSearchField(searchField);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  };

  // Handle Refresh click
  const handleRefresh = () => {
    setSearchInput("");
    setSearchField("-- Semua --");
    setAppliedSearchQuery("");
    setAppliedSearchField("-- Semua --");
    setFilters(defaultFilters);
    fetchUktMahasiswa();
  };

  // Handle Tombol "Edit Kelompok" di atas tabel (sesuai Gambar 3)
  const handleEditKelompokClick = () => {
    const isJalurSelected = filters.jalurPendaftaran !== "-- Semua --";
    const isGelombangSelected = filters.gelombang !== "-- Semua --";
    const isSistemSelected = filters.sistemKuliah !== "-- Semua --";
    const isProdiSelected = filters.programStudi !== "-- Semua --";

    // Jika salah satu dari 4 filter belum dipilih, tampilkan modal Informasi persis Gambar 3
    if (
      !isJalurSelected ||
      !isGelombangSelected ||
      !isSistemSelected ||
      !isProdiSelected
    ) {
      setIsInfoModalOpen(true);
      return;
    }

    // Jika semua 4 filter sudah dipilih, buka modal edit kelompok
    setEditingStudent(null);
    setIsEditModalOpen(true);
  };

  // Handle simpan perubahan dari inline edit langsung di tabel
  const handleSaveRow = async (updatedStudent: UktMahasiswaData) => {
    // Optimistic UI update
    setMahasiswaList((prev) =>
      prev.map((item) => (item.id === updatedStudent.id ? updatedStudent : item)),
    );

    try {
      await operasionalApi.updateUktMahasiswa(updatedStudent.id, updatedStudent);
    } catch (err) {
      console.error("Gagal menyimpan perubahan ke database:", err);
      fetchUktMahasiswa();
    }
  };

  // Handle Simpan perubahan kelompok UKT dari modal
  const handleSaveKelompok = async (data: {
    kelompokUkt: string;
    nominalUkt: number;
    valid: boolean;
  }) => {
    setIsEditModalOpen(false);
    setLoading(true);

    try {
      if (editingStudent) {
        // Edit baris tunggal
        await operasionalApi.updateUktMahasiswa(editingStudent.id, {
          kelompokUkt: data.kelompokUkt,
          nominalUkt: data.nominalUkt,
          valid: data.valid,
        });
      } else {
        // Edit kelompok batch untuk data yang terfilter / terpilih
        const targetIds =
          selectedItems.length > 0
            ? selectedItems.map((s) => s.id)
            : filteredData.map((s) => s.id);

        await operasionalApi.batchUpdateUktMahasiswa(targetIds, {
          kelompokUkt: data.kelompokUkt,
          nominalUkt: data.nominalUkt,
          valid: data.valid,
        });
      }

      // Re-fetch data terbaru dari database json
      await fetchUktMahasiswa();
    } catch (err) {
      console.error("Gagal menyimpan data kelompok UKT:", err);
      fetchUktMahasiswa();
    } finally {
      setLoading(false);
    }
  };

  // Handle proses Unggah Excel
  const handleUploadExcel = (_fileName: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsUploadModalOpen(false);
    }, 500);
  };

  return (
    <>
      {/* Page Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">
          UKT Mahasiswa / Pendaftar
        </h1>
      </div>

      {/* Card Filter Atas */}
      <div className="mb-4">
        <CariDataMahasiswaCard
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />
      </div>

      {/* Card Tabel UKT Mahasiswa */}
      <div className="container shadow-lg rounded border-t-emerald-600 border-t-4 p-4 bg-white">
        {/* Bar Filter Pencarian & Tombol Aksi */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between items-stretch sm:items-center mb-4">
          {/* Sisi Kiri: Filter Dropdown + Input Search + Tombol Cari & Refresh */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Dropdown
              options={["-- Semua --", "NIM", "Nama"]}
              value={searchField}
              onChange={setSearchField}
              className="w-full sm:w-44 text-xs shrink-0"
            />
            <div className="flex space-x-1 items-center">
              <TextField
                placeholder="Cari UKT Mahasiswa / Pendaftar"
                value={searchInput}
                onChange={(val) => setSearchInput(val)}
                onEnter={handleSearch}
                className="w-full sm:w-80"
              />
              <IconButton
                icon={<IoMdSearch size={18} />}
                variant="success"
                onClick={handleSearch}
                title="Cari Data"
              />
              <IconButton
                icon={<IoMdRefresh size={18} />}
                variant="info"
                onClick={handleRefresh}
                title="Refresh Data & Filter"
              />
            </div>
          </div>

          {/* Sisi Kanan: Upload Excel & Edit Kelompok */}
          <div className="flex space-x-2 items-center">
            <IconButton
              icon={<IoMdCloudUpload size={18} />}
              responsive={false}
              text="Upload Excel"
              variant="success"
              className="text-sm font-medium"
              onClick={() => setIsUploadModalOpen(true)}
            />
            <IconButton
              icon={<MdEdit size={16} />}
              text="Edit Kelompok"
              responsive={false}
              variant="warning"
              className="text-sm font-medium"
              onClick={handleEditKelompokClick}
            />
          </div>
        </div>

        {/* Tabel Data Mahasiswa */}
        <UktMahasiswaTable
          data={filteredData}
          loading={loading}
          onSaveRow={handleSaveRow}
          onSelectionChange={setSelectedItems}
        />
      </div>

      {/* Reusable Modal 1: Unggah Excel UKT */}
      <UnggahExcelUktModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadExcel}
      />

      {/* Reusable Modal 2: Informasi Peringatan Edit Kelompok */}
      <InformasiFilterModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />

      {/* Reusable Modal 3: Edit Kelompok UKT Form */}
      <EditKelompokUktModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveKelompok}
        student={editingStudent}
        targetCount={selectedItems.length || filteredData.length}
      />
    </>
  );
}
