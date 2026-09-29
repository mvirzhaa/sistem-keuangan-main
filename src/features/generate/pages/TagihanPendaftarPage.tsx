import FilterDataGenerateTagihanCard from "../components/FilterDataGenerateTagihanCard";
import TagihanPendaftarTable from "../components/TagihanPendaftarTable";

export default function TagihanPendaftarPage() {
  document.title = "Generate Tagihan Pendaftar";

  const tagihanColumns = [{ code: "1200", name: "Biaya Pendaftaran" }];

  // Data dummy untuk universitas, fakultas, dan program studi
  const dummyData = [
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
          children: [],
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
          children: [],
        },
        {
          id: "fts",
          name: "Fakultas Teknik dan Sains",
          type: "fakultas" as const,
          values: { "1200": 0 },
          totalTagihan: 0,
          denda: 0,
          potongan: 0,
          lunas: 0,
          jumlahTagihan: 0,
          children: [],
        },
      ],
    },
  ];

  const handleGenerate = (item: any) => {
    console.log("Generate tagihan pendaftar untuk:", item.name);
  };

  return (
    <>
      <div className="flex items-baseline space-x-3 mb-4">
        <h1 className="text-2xl font-medium">Generate Tagihan Pendaftar</h1>
      </div>
      <div>
        <FilterDataGenerateTagihanCard />
      </div>
      <div className="container shadow-lg rounded border-t-green-800 border-t-4 p-4 mt-4">
        <TagihanPendaftarTable data={dummyData} columns={tagihanColumns} onGenerate={handleGenerate} />
      </div>
    </>
  );
}
