import FilterDataGenerateTagihanCard from "../components/FilterDataGenerateTagihanCard";
import TagihanMahasiswaTable from "../components/TagihanMahasiswaTable";

export default function TagihanMahasiswaPage() {
  document.title = "Generate Tagihan Mahasiswa";

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

  const dummyData = [
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
      ],
    },
  ];

  function generateDummyValues(columns: { code: string }[]) {
    const values: Record<string, number> = {};
    columns.forEach((col) => {
      values[col.code] = 0;
    });
    return values;
  }

  const handleGenerate = (item: any) => {
    console.log("Generate tagihan untuk:", item.name);
  };

  const handleApprove = (item: any) => {
    console.log("Approve tagihan untuk:", item.name);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Generate Tagihan Mahasiswa</h1>
      </div>
      <div>
        <FilterDataGenerateTagihanCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <TagihanMahasiswaTable data={dummyData} columns={tagihanColumns} onGenerate={handleGenerate} onApprove={handleApprove} onRemove={() => {}} />
      </div>
    </>
  );
}
