import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/routes/routes";
import FilterDataGenerateTagihanCard, {
  type FilterValues,
} from "../components/FilterDataGenerateTagihanCard";
import TagihanPendaftarTable from "../components/TagihanPendaftarTable";

export default function TagihanPendaftarPage() {
  document.title = "Generate Tagihan Pendaftar";
  const navigate = useNavigate();

  const [currentFilters, setCurrentFilters] = useState<FilterValues>(() => {
    try {
      const saved = localStorage.getItem("saved_filter_generate_tagihan_pendaftar");
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

  const tagihanColumns = [{ code: "1200", name: "Biaya Pendaftaran" }];

  // Data dummy untuk universitas, fakultas, dan program studi
  const dummyData = useMemo(() => [
    {
      id: "uik",
      name: "Universitas Ibn Khaldun",
      type: "universitas" as const,
      values: { "1200": 0 },
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
          values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
          values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
          values: { "1200": 0 },
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
              values: { "1200": 0 },
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
          values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
          values: { "1200": 0 },
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
              values: { "1200": 0 },
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
              values: { "1200": 0 },
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
          values: { "1200": 0 },
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
              values: { "1200": 0 },
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

  // Filter data tabel berdasarkan unit kerja yang dipilih di filter
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

  // Aksi Klik di Tabel: Navigasi ke Halaman Detail Monitoring Generate Tagihan Pendaftar
  const handleDetail = (item: any) => {
    navigate(ROUTES.GENERATE.DETAIL_MONITORING_TAGIHAN_PENDAFTAR, {
      state: {
        item,
        frekuensi: currentFilters.frekuensi,
        periodeTagihan: currentFilters.periodeTagihan,
      },
    });
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium text-gray-900">
          Generate Tagihan Pendaftar
        </h1>
      </div>

      <div>
        <FilterDataGenerateTagihanCard
          storageKey="saved_filter_generate_tagihan_pendaftar"
          onFilter={(filters) => {
            setCurrentFilters(filters);
          }}
        />
      </div>

      <div className="container shadow-md rounded-md border-t-green-800 border-t-4 p-4 mt-4 bg-white">
        <TagihanPendaftarTable
          data={filteredData}
          columns={tagihanColumns}
          onDetail={handleDetail}
          onGenerate={handleDetail}
        />
      </div>
    </>
  );
}
