import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/routes/routes";
import FilterDataGenerateTagihanCard, {
  type FilterValues,
} from "../components/FilterDataGenerateTagihanCard";
import TagihanMahasiswaTable from "../components/TagihanMahasiswaTable";
import GenerateTagihanActionModal from "../components/GenerateTagihanActionModal";

export default function TagihanMahasiswaPage() {
  document.title = "Generate Tagihan Mahasiswa";
  const navigate = useNavigate();

  const [currentFilters, setCurrentFilters] = useState<FilterValues>(() => {
    try {
      const saved = localStorage.getItem("saved_filter_generate_tagihan_mahasiswa");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      frekuensi: "Tiap Transaksi",
      periodeTagihan: "2025 Genap",
      periodeMasuk: "-- Semua Periode Masuk --",
      gelombang: "-- Semua Gelombang --",
      jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
      sistemKuliah: "-- Semua Sistem Kuliah --",
      unitKerja: "Universitas Ibn Khaldun",
    };
  });

  // State untuk modal generate / cancel
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "generate" | "cancel";
    item?: any;
  }>({
    isOpen: false,
    mode: "generate",
  });

  const tagihanColumns = [
    { code: "1018", name: "UKT" },
    { code: "1160", name: "Biaya Praktikum" },
    { code: "1220", name: "Biaya PKKMB" },
    { code: "1250", name: "Biaya KKN" },
    { code: "2042", name: "Biaya Wisuda" },
    { code: "2043", name: "Biaya Yudisium" },
    { code: "2045", name: "Biaya UAS Susulan" },
    { code: "2046", name: "Biaya UTS Susulan" },
    { code: "2048", name: "Biaya Legalisir" },
    { code: "2049", name: "Biaya Transkrip" },
    { code: "3202", name: "Denda Keterlambatan" },
    { code: "3203", name: "Denda Buku" },
    { code: "3204", name: "Denda Lainnya" },
    { code: "6158", name: "Sumbangan" },
    { code: "6162", name: "Asrama" },
    { code: "7123", name: "Ujian Pendadaran" },
    { code: "7124", name: "Ujian Proposal" },
    { code: "7133", name: "Sidang Skripsi" },
    { code: "7135", name: "Seminar" },
    { code: "7136", name: "Sidang Tesis" },
    { code: "1061", name: "SPP" },
  ];

  function generateDummyValues(columns: { code: string }[]) {
    const values: Record<string, number> = {};
    columns.forEach((col) => {
      values[col.code] = 0;
    });
    return values;
  }

  const dummyData = useMemo(() => [
    {
      id: "uik",
      name: "Universitas Ibn Khaldun",
      type: "universitas" as const,
      values: generateDummyValues(tagihanColumns),
      totalTagihan: 0,
      denda: 0,
      potongan: 0,
      lunas: 0,
      jumlahTagihan: 0,
      children: [
        {
          id: "ft",
          name: "Fakultas Teknik",
          type: "fakultas" as const,
          values: generateDummyValues(tagihanColumns),
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [
            {
              id: "ti",
              name: "Teknik Informatika",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "ts",
              name: "Teknik Sipil",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "te",
              name: "Teknik Elektro",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "tm",
              name: "Teknik Mesin",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
          ],
        },
        {
          id: "fkip",
          name: "Fakultas Keguruan dan Ilmu Pendidikan",
          type: "fakultas" as const,
          values: generateDummyValues(tagihanColumns),
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [
            {
              id: "pai",
              name: "Pendidikan Agama Islam",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "pgsd",
              name: "Pendidikan Guru Sekolah Dasar",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "pbi",
              name: "Pendidikan Bahasa Inggris",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
          ],
        },
        {
          id: "fh",
          name: "Fakultas Hukum",
          type: "fakultas" as const,
          values: generateDummyValues(tagihanColumns),
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [
            {
              id: "ilmuhukum",
              name: "Ilmu Hukum",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
          ],
        },
        {
          id: "feb",
          name: "Fakultas Ekonomi dan Bisnis",
          type: "fakultas" as const,
          values: generateDummyValues(tagihanColumns),
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [
            {
              id: "manajemen",
              name: "Manajemen",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "akuntansi",
              name: "Akuntansi",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "bisnisdigital",
              name: "Bisnis Digital",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "perbankan",
              name: "Perbankan dan Keuangan Digital",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
          ],
        },
        {
          id: "fai",
          name: "Fakultas Agama Islam",
          type: "fakultas" as const,
          values: generateDummyValues(tagihanColumns),
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [
            {
              id: "kpi",
              name: "Komunikasi dan Penyiaran Islam",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
            {
              id: "as",
              name: "Ahwal Al-Syakhshiyyah",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
          ],
        },
        {
          id: "fikes",
          name: "Fakultas Ilmu Kesehatan",
          type: "fakultas" as const,
          values: generateDummyValues(tagihanColumns),
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [
            {
              id: "kesmas",
              name: "Kesehatan Masyarakat",
              type: "program" as const,
              values: generateDummyValues(tagihanColumns),
              totalTagihan: 0,
              denda: 0,
              potongan: 0,
              lunas: 0,
              jumlahTagihan: 0,
            },
          ],
        },
      ],
    },
  ], []);

  // Filter tabel berdasarkan unit kerja yang dipilih di filter
  const filteredData = useMemo(() => {
    const selectedUnit = currentFilters.unitKerja;
    if (
      !selectedUnit ||
      selectedUnit === "Universitas Ibn Khaldun" ||
      selectedUnit.includes("Semua")
    ) {
      return dummyData;
    }

    const uni = dummyData[0];
    if (uni && uni.children) {
      const matchedFaculty = uni.children.find(
        (fac) =>
          fac.name.toLowerCase() === selectedUnit.toLowerCase() ||
          selectedUnit.toLowerCase().includes(fac.name.toLowerCase()) ||
          fac.name.toLowerCase().includes(selectedUnit.toLowerCase()),
      );
      if (matchedFaculty) {
        return [matchedFaculty];
      }

      for (const fac of uni.children) {
        if (fac.children) {
          const matchedProgram = fac.children.find(
            (prog) =>
              prog.name.toLowerCase() === selectedUnit.toLowerCase() ||
              selectedUnit.toLowerCase().includes(prog.name.toLowerCase()) ||
              prog.name.toLowerCase().includes(selectedUnit.toLowerCase()),
          );
          if (matchedProgram) {
            return [matchedProgram];
          }
        }
      }
    }

    return dummyData;
  }, [currentFilters.unitKerja, dummyData]);

  // Aksi 1 (Pensil): Navigasi ke halaman Detail Monitoring Generate Tagihan Mahasiswa
  const handleDetail = (item: any) => {
    navigate(ROUTES.GENERATE.DETAIL_MONITORING_TAGIHAN_MAHASISWA, {
      state: {
        item,
        frekuensi: currentFilters.frekuensi,
        periodeTagihan: currentFilters.periodeTagihan,
      },
    });
  };

  // Aksi 2 (Ceklis Hijau): Buka Modal Generate Tagihan
  const handleOpenGenerateModal = (item: any) => {
    setModalState({
      isOpen: true,
      mode: "generate",
      item,
    });
  };

  // Aksi 3 (Silang Merah): Buka Modal Batalkan Tagihan
  const handleOpenCancelModal = (item: any) => {
    setModalState({
      isOpen: true,
      mode: "cancel",
      item,
    });
  };

  // Konfirmasi dari modal
  const handleModalConfirm = (
    _selectedItems: string[],
    _mode: "generate" | "cancel",
  ) => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">
          Generate Tagihan Mahasiswa
        </h1>
      </div>

      {/* Card Filter */}
      <div>
        <FilterDataGenerateTagihanCard
          storageKey="saved_filter_generate_tagihan_mahasiswa"
          onFilter={(filters) => {
            setCurrentFilters(filters);
          }}
        />
      </div>

      {/* Wrapper Tabel: bg-white */}
      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-4 mt-4 bg-white">
        <TagihanMahasiswaTable
          data={filteredData}
          columns={tagihanColumns}
          onDetail={handleDetail}
          onGenerate={handleOpenGenerateModal}
          onCancel={handleOpenCancelModal}
        />
      </div>

      {/* Modal Aksi Reusable */}
      <GenerateTagihanActionModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        mode={modalState.mode}
        frekuensi={currentFilters.frekuensi}
        unitName={modalState.item?.name}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
