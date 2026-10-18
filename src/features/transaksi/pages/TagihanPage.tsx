import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  IoMdAdd,
  IoMdRefresh,
  IoMdSearch,
  IoMdSettings,
  IoMdTrash,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../components/button/IconButton";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";
import FilterDataTagihanCard, {
  type FilterValues,
  defaultFilterTagihanValues,
} from "../components/FIlterDataTagihanCard";
import TagihanTable, { type TagihanData } from "../components/TagihanTable";
import InformasiJenisTagihanCard from "../components/InformasiJenisTagihanCard";
import InformasiModal from "../../../components/modal/InformasiModal";
import KonfirmasiModal from "../../../components/modal/KonfirmasiModal";
import SetTanggalModal from "../../../components/modal/SetTanggalModal";
import UpdateDataTagihanModal from "../../../components/modal/UpdateDataTagihanModal";
import ImportTransaksiModal from "../../../components/modal/ImportTransaksiModal";
import { ROUTES } from "../../../common/routes/routes";
import transaksiApi from "../services/transaksi.api";
import { useReferensiStore } from "../../../common/stores/referensiStore";

const searchCategoryOptions = ["-- Semua --", "Kode Tagihan", "NIM", "Nama"];

export default function TagihanPage() {
  document.title = "Transaksi - Tagihan";
  const navigate = useNavigate();

  // Referensi Store
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  // Filter Card State
  const [activeFilters, setActiveFilters] = useState<FilterValues>(() => {
    try {
      const saved = localStorage.getItem("active_filter_periode_tagihan");
      if (saved) {
        return { ...defaultFilterTagihanValues, periodeTagihan: saved };
      }
    } catch {}
    return defaultFilterTagihanValues;
  });
  const [filterKey, setFilterKey] = useState<number>(0);

  // Search Bar State
  const [searchCategory, setSearchCategory] = useState<string>("-- Semua --");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Data state dari API / mock JSON
  const [tagihanList, setTagihanList] = useState<TagihanData[]>(() => {
    try {
      const cached = localStorage.getItem("cached_transaksi_tagihan");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Row selection state
  const [selectedTagihan, setSelectedTagihan] = useState<TagihanData[]>([]);

  // Modal Informasi State (Gambar 1 - ketika belum ada centang)
  const [isDeleteInfoModalOpen, setIsDeleteInfoModalOpen] = useState<boolean>(false);
  const [infoModalMessage, setInfoModalMessage] = useState<string>(
    "Silakan centang data yang ingin dihapus terlebih dahulu"
  );

  // Modal Konfirmasi Hapus State (ketika sudah memilih atau klik hapus di baris tabel)
  const [isKonfirmasiModalOpen, setIsKonfirmasiModalOpen] = useState<boolean>(false);
  const [konfirmasiMessage, setKonfirmasiMessage] = useState<string>("");
  const [itemToDelete, setItemToDelete] = useState<TagihanData | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // Modal Aksi Tanggal State (Gambar 1: Set Tgl. Jatuh Tempo & Gambar 2: Set Tgl. Akhir Dispensasi)
  const [isJatuhTempoModalOpen, setIsJatuhTempoModalOpen] = useState<boolean>(false);
  const [isDispensasiModalOpen, setIsDispensasiModalOpen] = useState<boolean>(false);

  // Modal Aksi Konfirmasi State (Gambar 3: Batal Dispensasi, Gambar 4: Kirim Notifikasi, Gambar 5: Kirim Email)
  const [isBatalDispensasiModalOpen, setIsBatalDispensasiModalOpen] = useState<boolean>(false);
  const [isKirimNotifikasiModalOpen, setIsKirimNotifikasiModalOpen] = useState<boolean>(false);
  const [isKirimEmailModalOpen, setIsKirimEmailModalOpen] = useState<boolean>(false);

  // Modal Aksi Excel Upload State (Update Data Tagihan & Import Transaksi)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  // Dropdown Aksi State (Gambar 2)
  const [isAksiOpen, setIsAksiOpen] = useState<boolean>(false);
  const aksiRef = useRef<HTMLDivElement>(null);

  // Event listener untuk menutup dropdown Aksi saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aksiRef.current && !aksiRef.current.contains(event.target as Node)) {
        setIsAksiOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data dari mock API
  const fetchTagihan = useCallback(async (retryCount = 0) => {
    setLoading(true);
    try {
      const res = await transaksiApi.getTagihan();
      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray((res as any)?.data?.data)
        ? (res as any).data.data
        : [];

      if (list.length > 0) {
        setTagihanList(list);
        try {
          localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(list));
        } catch {}
      } else if (retryCount < 2) {
        setTimeout(() => fetchTagihan(retryCount + 1), 600);
      }
    } catch (err) {
      console.error("Gagal memuat data tagihan:", err);
      if (retryCount < 2) {
        setTimeout(() => fetchTagihan(retryCount + 1), 800);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTagihan();
  }, [fetchTagihan]);

  // Handle klik tombol Simpan Filter di Card Filter
  const handleFilterSubmit = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  // Handle tombol Refresh: reset seluruh filter & pencarian ke default, lalu muat ulang data
  const handleRefresh = async () => {
    setActiveFilters(defaultFilterTagihanValues);
    setFilterKey((prev) => prev + 1);
    setSearchCategory("-- Semua --");
    setSearchInput("");
    setSearchQuery("");

    try {
      localStorage.removeItem("cached_transaksi_tagihan");
    } catch {}
    await fetchTagihan(0);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Handle klik tombol Hapus di atas tabel (Batch Delete)
  const handleDeleteClick = () => {
    if (selectedTagihan.length === 0) {
      setInfoModalMessage("Silakan centang data yang ingin dihapus terlebih dahulu");
      setIsDeleteInfoModalOpen(true);
      return;
    }

    setItemToDelete(null);
    setKonfirmasiMessage(
      `Apakah anda yakin akan menghapus ${
        selectedTagihan.length > 1
          ? `${selectedTagihan.length} data tagihan yang dipilih ?`
          : "data tagihan yang dipilih ?"
      }`
    );
    setIsKonfirmasiModalOpen(true);
  };

  // Handle klik tombol Hapus pada baris tabel (Single Delete)
  const handleRowDeleteClick = (item: TagihanData) => {
    setItemToDelete(item);
    setKonfirmasiMessage(
      `Apakah anda yakin akan menghapus data tagihan ${item.kodeTagihan} ?`
    );
    setIsKonfirmasiModalOpen(true);
  };

  // Eksekusi Hapus data setelah konfirmasi
  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      if (itemToDelete) {
        // Hapus single item
        await transaksiApi.deleteTagihan(itemToDelete.id).catch(() => {});
        setTagihanList((prev) => {
          const updated = prev.filter((item) => item.id !== itemToDelete.id);
          try {
            localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(updated));
          } catch {}
          return updated;
        });
        setSelectedTagihan((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      } else if (selectedTagihan.length > 0) {
        // Hapus batch yang dipilih
        const idsToDelete = new Set(selectedTagihan.map((item) => item.id));
        for (const item of selectedTagihan) {
          await transaksiApi.deleteTagihan(item.id).catch(() => {});
        }
        setTagihanList((prev) => {
          const updated = prev.filter((item) => !idsToDelete.has(item.id));
          try {
            localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(updated));
          } catch {}
          return updated;
        });
        setSelectedTagihan([]);
      }
    } catch (err) {
      console.error("Gagal menghapus tagihan:", err);
    } finally {
      setDeleteLoading(false);
      setIsKonfirmasiModalOpen(false);
      setItemToDelete(null);
    }
  };

  // Handle klik item di menu Aksi
  const handleAksiItemClick = (aksiName: string) => {
    setIsAksiOpen(false);

    switch (aksiName) {
      case "Set Tgl. Jatuh Tempo":
        setIsJatuhTempoModalOpen(true);
        break;
      case "Set Dispensasi":
        setIsDispensasiModalOpen(true);
        break;
      case "Batal Dispensasi":
        setIsBatalDispensasiModalOpen(true);
        break;
      case "Kirim Notifikasi":
        setIsKirimNotifikasiModalOpen(true);
        break;
      case "Kirim Email":
        setIsKirimEmailModalOpen(true);
        break;
      case "Update Data Tagihan":
        setIsUpdateModalOpen(true);
        break;
      case "Import":
        setIsImportModalOpen(true);
        break;
      default:
        console.log(`Menjalankan aksi: ${aksiName}`, selectedTagihan);
        break;
    }
  };

  // 1. Eksekusi Set Tgl. Jatuh Tempo (Gambar 1)
  // Jika ada data yang dicentang -> ke data spesifik; jika tidak ada -> ke semua orang
  const handleSetJatuhTempo = (tanggalFormatted: string) => {
    const hasSelection = selectedTagihan.length > 0;
    const selectedIds = hasSelection
      ? new Set(selectedTagihan.map((item) => item.id))
      : null;

    setTagihanList((prev) => {
      const updated = prev.map((item) =>
        selectedIds === null || selectedIds.has(item.id)
          ? { ...item, tglJatuhTempo: tanggalFormatted }
          : item
      );
      try {
        localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (hasSelection) {
      setSelectedTagihan((prev) =>
        prev.map((item) => ({ ...item, tglJatuhTempo: tanggalFormatted }))
      );
    }
    setIsJatuhTempoModalOpen(false);
  };

  // 2. Eksekusi Set Tgl. Akhir Dispensasi (Gambar 2)
  // Jika ada data yang dicentang -> ke data spesifik; jika tidak ada -> ke semua orang
  const handleSetDispensasi = (tanggalFormatted: string) => {
    const hasSelection = selectedTagihan.length > 0;
    const selectedIds = hasSelection
      ? new Set(selectedTagihan.map((item) => item.id))
      : null;

    setTagihanList((prev) => {
      const updated = prev.map((item) =>
        selectedIds === null || selectedIds.has(item.id)
          ? { ...item, tglAkhirDispensasi: tanggalFormatted }
          : item
      );
      try {
        localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (hasSelection) {
      setSelectedTagihan((prev) =>
        prev.map((item) => ({ ...item, tglAkhirDispensasi: tanggalFormatted }))
      );
    }
    setIsDispensasiModalOpen(false);
  };

  // 3. Eksekusi Batal Dispensasi / Unset Dispensasi (Gambar 3)
  // Jika ada data yang dicentang -> ke data spesifik; jika tidak ada -> ke semua orang
  const handleUnsetDispensasi = () => {
    const hasSelection = selectedTagihan.length > 0;
    const selectedIds = hasSelection
      ? new Set(selectedTagihan.map((item) => item.id))
      : null;

    setTagihanList((prev) => {
      const updated = prev.map((item) =>
        selectedIds === null || selectedIds.has(item.id)
          ? { ...item, tglAkhirDispensasi: "-" }
          : item
      );
      try {
        localStorage.setItem("cached_transaksi_tagihan", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (hasSelection) {
      setSelectedTagihan((prev) =>
        prev.map((item) => ({ ...item, tglAkhirDispensasi: "-" }))
      );
    }
    setIsBatalDispensasiModalOpen(false);
  };

  // 4. Eksekusi Kirim Notifikasi (Gambar 4)
  const handleConfirmKirimNotifikasi = () => {
    const targetCount =
      selectedTagihan.length > 0 ? selectedTagihan.length : tagihanList.length;
    console.log(
      `Notifikasi tagihan berhasil dikirim untuk ${targetCount} tagihan (${
        selectedTagihan.length > 0 ? "berdasarkan data pilihan" : "ke semua orang"
      })`
    );
    setIsKirimNotifikasiModalOpen(false);
  };

  // 5. Eksekusi Kirim Email (Gambar 5)
  const handleConfirmKirimEmail = () => {
    const targetCount =
      selectedTagihan.length > 0 ? selectedTagihan.length : tagihanList.length;
    console.log(
      `Email detail tagihan berhasil dikirim untuk ${targetCount} tagihan (${
        selectedTagihan.length > 0 ? "berdasarkan data pilihan" : "ke semua orang"
      })`
    );
    setIsKirimEmailModalOpen(false);
  };

  // 6. Eksekusi Update Data Tagihan via Excel
  const handleUpdateDataTagihan = (file: File) => {
    console.log("File Excel update diterima:", file.name);
    alert(`File ${file.name} berhasil diunggah untuk update data tagihan.`);
    setIsUpdateModalOpen(false);
  };

  // 7. Eksekusi Import Transaksi via Excel
  const handleImportTransaksi = (file: File) => {
    console.log("File Excel import diterima:", file.name);
    alert(`File ${file.name} berhasil diimpor.`);
    setIsImportModalOpen(false);
  };

  // Filter Data gabungan (Filter Card + Search)
  const filteredData = useMemo(() => {
    return tagihanList.filter((item) => {
      // 1. Filter dari Card Atas
      if (
        activeFilters.penerima &&
        activeFilters.penerima !== "-- Semua --" &&
        item.penerima &&
        item.penerima !== activeFilters.penerima
      ) {
        return false;
      }

      if (
        activeFilters.periodeTagihan &&
        activeFilters.periodeTagihan !== "-- Semua --" &&
        activeFilters.periodeTagihan !== "-- Semua Periode --"
      ) {
        const matchesPeriode =
          item.periodeTagihan?.toLowerCase() ===
            activeFilters.periodeTagihan.toLowerCase() ||
          item.periodeMasuk?.toLowerCase() ===
            activeFilters.periodeTagihan.toLowerCase();

        const isEquivalent =
          (activeFilters.periodeTagihan.includes("2024") &&
            activeFilters.periodeTagihan.includes("Genap") &&
            (item.kodeTagihan?.includes("20242") ||
              item.periodeTagihan === "2024 Genap")) ||
          (activeFilters.periodeTagihan.includes("2024") &&
            activeFilters.periodeTagihan.includes("Ganjil") &&
            (item.kodeTagihan?.includes("20241") ||
              item.periodeTagihan === "2024 Ganjil")) ||
          (activeFilters.periodeTagihan.includes("2026") &&
            activeFilters.periodeTagihan.includes("Ganjil") &&
            (item.kodeTagihan?.includes("20261") ||
              item.periodeTagihan === "2026 Ganjil" ||
              item.periodeMasuk === "20261"));

        if (!matchesPeriode && !isEquivalent) {
          return false;
        }
      }

      if (
        activeFilters.kelompok &&
        activeFilters.kelompok !== "-- Semua Kelompok --" &&
        activeFilters.kelompok !== "-- Semua --" &&
        item.kelompok &&
        item.kelompok !== activeFilters.kelompok
      ) {
        return false;
      }

      if (
        activeFilters.jenisTagihan &&
        activeFilters.jenisTagihan !== "-- Semua Jenis Tagihan --" &&
        activeFilters.jenisTagihan !== "-- Semua --"
      ) {
        const jenisPrefix = activeFilters.jenisTagihan.split(" ")[0];
        if (
          item.jenis !== jenisPrefix &&
          item.jenisTagihan &&
          !item.jenisTagihan.toLowerCase().includes(jenisPrefix.toLowerCase())
        ) {
          return false;
        }
      }

      if (
        activeFilters.cicilan &&
        activeFilters.cicilan !== "-- Semua Cicilan --" &&
        activeFilters.cicilan !== "-- Semua --"
      ) {
        const cicilanNum = parseInt(activeFilters.cicilan.replace(/\D/g, ""));
        if (!isNaN(cicilanNum) && item.cicilan !== cicilanNum) {
          return false;
        }
      }

      if (
        activeFilters.statusTagihan &&
        activeFilters.statusTagihan !== "-- Semua Status --" &&
        activeFilters.statusTagihan !== "-- Semua --"
      ) {
        if (
          activeFilters.statusTagihan === "Lunas" &&
          item.statusPembayaran !== "lunas" &&
          !item.lunas
        ) {
          return false;
        }
        if (
          activeFilters.statusTagihan === "Belum Lunas" &&
          (item.statusPembayaran === "lunas" || item.lunas)
        ) {
          return false;
        }
      }

      if (
        activeFilters.angkatan &&
        activeFilters.angkatan !== "-- Semua Angkatan --" &&
        activeFilters.angkatan !== "-- Semua --" &&
        item.angkatan &&
        !item.angkatan.includes(activeFilters.angkatan.replace(/\D/g, ""))
      ) {
        return false;
      }

      if (
        activeFilters.programStudi &&
        activeFilters.programStudi !== "Universitas Ibn Khaldun" &&
        activeFilters.programStudi !== "-- Semua --" &&
        item.prodi &&
        !item.prodi
          .toLowerCase()
          .includes(activeFilters.programStudi.toLowerCase())
      ) {
        return false;
      }

      if (
        activeFilters.gelombang &&
        activeFilters.gelombang !== "-- Semua Gelombang --" &&
        activeFilters.gelombang !== "-- Semua --" &&
        item.gelombang &&
        item.gelombang !== activeFilters.gelombang
      ) {
        return false;
      }

      if (
        activeFilters.jalurPendaftaran &&
        activeFilters.jalurPendaftaran !== "-- Semua Jalur Pendaftaran --" &&
        activeFilters.jalurPendaftaran !== "-- Semua --" &&
        item.jalurPendaftaran &&
        !item.jalurPendaftaran
          .toLowerCase()
          .includes(activeFilters.jalurPendaftaran.toLowerCase())
      ) {
        return false;
      }

      if (
        activeFilters.sistemKuliah &&
        activeFilters.sistemKuliah !== "-- Semua Sistem Kuliah --" &&
        activeFilters.sistemKuliah !== "-- Semua --" &&
        item.sistemKuliah &&
        !item.sistemKuliah
          .toLowerCase()
          .includes(activeFilters.sistemKuliah.toLowerCase())
      ) {
        return false;
      }

      // 2. Filter dari Pencarian
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        if (searchCategory === "Kode Tagihan") {
          return item.kodeTagihan?.toLowerCase().includes(q);
        } else if (searchCategory === "NIM") {
          return item.nim?.toLowerCase().includes(q);
        } else if (searchCategory === "Nama") {
          return item.nama?.toLowerCase().includes(q);
        } else {
          return (
            item.kodeTagihan?.toLowerCase().includes(q) ||
            item.nim?.toLowerCase().includes(q) ||
            item.nama?.toLowerCase().includes(q) ||
            item.jenis?.toLowerCase().includes(q) ||
            item.jenisTagihan?.toLowerCase().includes(q)
          );
        }
      }

      return true;
    });
  }, [tagihanList, activeFilters, searchQuery, searchCategory]);

  return (
    <>
      {/* Title */}
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Transaksi</h1>
        <p className="text-sm text-gray-500 mb-1">Tagihan</p>
      </div>

      {/* Top Filter Card (bg-white, font text-sm, tombol Simpan Filter) */}
      <div className="mb-4">
        <FilterDataTagihanCard
          key={filterKey}
          initialFilters={activeFilters}
          onFilter={handleFilterSubmit}
        />
      </div>

      {/* Table Card (bg-white, green border, search bar & action buttons) */}
      <div className="w-full bg-white shadow-md rounded-md border-t-[#10ac84] border-t-4 p-4 mt-4">
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between items-start lg:items-center mb-4">
          {/* Search Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <Dropdown
              options={searchCategoryOptions}
              value={searchCategory}
              defaultValue={searchCategory}
              onChange={(val) => setSearchCategory(val)}
              className="w-full sm:w-44 text-xs sm:text-sm"
            />
            <div className="flex items-center space-x-1">
              <TextField
                placeholder="Cari Transaksi"
                value={searchInput}
                onChange={(val) => {
                  setSearchInput(val);
                  if (!val) setSearchQuery("");
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
                icon={
                  <IoMdRefresh
                    className={`text-base ${loading ? "animate-spin" : ""}`}
                  />
                }
                variant="info"
                onClick={handleRefresh}
                title="Reset & Refresh Data"
              />
            </div>
          </div>

          {/* Action Buttons Right Side */}
          <div className="flex items-center space-x-2">
            <IconButton
              icon={<IoMdAdd className="text-base" />}
              responsive={false}
              text="Tambah"
              variant="success"
              className="text-xs font-medium cursor-pointer"
              onClick={() => {
                navigate(ROUTES.TRANSAKSI.DATA_TAGIHAN);
              }}
            />
            <IconButton
              icon={<IoMdTrash className="text-base" />}
              text="Hapus"
              responsive={false}
              variant="danger"
              className="text-xs font-medium cursor-pointer"
              onClick={handleDeleteClick}
            />

            {/* Dropdown Menu Aksi (Gambar 2) */}
            <div className="relative" ref={aksiRef}>
              <button
                type="button"
                onClick={() => setIsAksiOpen((prev) => !prev)}
                className="h-[34px] px-3 bg-[#E08E0B] hover:bg-[#c97f0a] text-white text-xs font-medium rounded flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                title="Menu Aksi"
              >
                <IoMdSettings className="text-base" />
                <span className="font-medium">Aksi</span>
                <span className="text-[10px] ml-0.5 leading-none">▼</span>
              </button>

              {isAksiOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 z-50 animate-fade-in">
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Set Tgl. Jatuh Tempo")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Set Tgl. Jatuh Tempo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Set Dispensasi")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Set Dispensasi
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Batal Dispensasi")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Batal Dispensasi
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Kirim Notifikasi")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Kirim Notifikasi
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Kirim Email")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Kirim Email
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Update Data Tagihan")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Update Data Tagihan
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAksiItemClick("Import")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer block"
                  >
                    Import
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabel Tagihan */}
        <div className="mb-4">
          <TagihanTable
            data={filteredData}
            loading={loading}
            onSelectionChange={setSelectedTagihan}
            onView={(item) => {
              navigate(`${ROUTES.TRANSAKSI.DETAIL_TAGIHAN}?id=${item.id}`);
            }}
            onDelete={handleRowDeleteClick}
          />
        </div>

        {/* Bottom Legend Card (Data dari referensiStore) */}
        <InformasiJenisTagihanCard
          jenisTagihan={referensi.jenisTagihanDetails || []}
          className="mt-6 rounded-md"
        />
      </div>

      {/* Modal Informasi Hapus jika belum centang data (Gambar 1) */}
      <InformasiModal
        isOpen={isDeleteInfoModalOpen}
        onClose={() => setIsDeleteInfoModalOpen(false)}
        title="Informasi"
        message={infoModalMessage}
        buttonText="Oke"
      />

      {/* Modal Konfirmasi Hapus untuk Tombol Hapus Atas & Tombol Hapus Baris Tabel */}
      <KonfirmasiModal
        isOpen={isKonfirmasiModalOpen}
        onClose={() => {
          setIsKonfirmasiModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi"
        message={konfirmasiMessage}
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
        loading={deleteLoading}
      />

      {/* 1. Modal Set Tgl. Jatuh Tempo (Gambar 1) */}
      <SetTanggalModal
        isOpen={isJatuhTempoModalOpen}
        onClose={() => setIsJatuhTempoModalOpen(false)}
        onSubmit={handleSetJatuhTempo}
        title="Set Tgl. Jatuh Tempo"
        label="Tgl. Jatuh Tempo"
        buttonText="Set Tgl. Jatuh Tempo"
      />

      {/* 2. Modal Set Tgl. Akhir Dispensasi (Gambar 2) */}
      <SetTanggalModal
        isOpen={isDispensasiModalOpen}
        onClose={() => setIsDispensasiModalOpen(false)}
        onSubmit={handleSetDispensasi}
        title="Set Tgl. Akhir Dispensasi"
        label="Tgl. Akhir Dispensasi"
        buttonText="Set Tgl. Akhir Dispensasi"
      />

      {/* 3. Modal Batal Dispensasi (Gambar 3) */}
      <KonfirmasiModal
        isOpen={isBatalDispensasiModalOpen}
        onClose={() => setIsBatalDispensasiModalOpen(false)}
        onConfirm={handleUnsetDispensasi}
        title="Konfirmasi"
        message="Apakah anda yakin akan melakukan unset dispensasi ?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* 4. Modal Kirim Notifikasi (Gambar 4) */}
      <KonfirmasiModal
        isOpen={isKirimNotifikasiModalOpen}
        onClose={() => setIsKirimNotifikasiModalOpen(false)}
        onConfirm={handleConfirmKirimNotifikasi}
        title="Konfirmasi"
        message="Apakah anda yakin akan mengirim notifikasi tagihan ?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* 5. Modal Kirim Email (Gambar 5) */}
      <KonfirmasiModal
        isOpen={isKirimEmailModalOpen}
        onClose={() => setIsKirimEmailModalOpen(false)}
        onConfirm={handleConfirmKirimEmail}
        title="Konfirmasi"
        message="Apakah anda yakin akan mengirimkan email detail tagihan ?"
        cancelText="Batalkan"
        confirmText="Ya, Yakin"
      />

      {/* 6. Modal Update Data Tagihan (Template Download & Upload Excel) */}
      <UpdateDataTagihanModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdateDataTagihan}
        templateUrl="/templates/template_update_tagihan.xls"
        templateFileName="template_update_tagihan.xls"
      />

      {/* 7. Modal Import Transaksi (Template Download & Upload Excel) */}
      <ImportTransaksiModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportTransaksi}
        templateUrl="/templates/template_import_tagihan.xlsx"
        templateFileName="template_import_tagihan.xlsx"
      />
    </>
  );
}
