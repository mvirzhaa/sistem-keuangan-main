import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import Dropdown from "../../../components/inputs/Dropdown";
import DatePicker from "../../../components/inputs/DatePicker";

export interface JenisTagihanRow {
  id: string;
  kode: string;
  jenisTagihan: string;
  bulanAwal?: string;
  bulanAkhir?: string;
  tanggalJatuhTempo?: string;
}

const bulanOptions = [
  "-- Pilih Bulan Awal --",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const initialData: JenisTagihanRow[] = [
  { id: "1", kode: "3207", jenisTagihan: "Alumni (FH)" },
  { id: "2", kode: "2017", jenisTagihan: "BIMBINGAN SKRIPSI (FKIP)" },
  {
    id: "3",
    kode: "2019",
    jenisTagihan: "BIMBINGAN SKRIPSI LEWAT WAKTU (FKIP)",
  },
  { id: "4", kode: "4085", jenisTagihan: "Biaya Buku Panduan Skripsi" },
  { id: "5", kode: "1061", jenisTagihan: "Biaya Pemeliharaan Ijazah" },
  { id: "6", kode: "1119", jenisTagihan: "Biaya Pendaftaran Rusunawa" },
];

const PengaturanJenisTagihanTable: React.FC = () => {
  const [data, setData] = useState<JenisTagihanRow[]>(initialData);

  const handleChange = (id: string, field: string, value: string) => {
    setData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const columns: Column<JenisTagihanRow>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "10%",
      className: "text-center font-bold",
      render: (item) => <span>{item.kode}</span>,
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      width: "30%",
      render: (item) => (
        <span className="font-semibold">{item.jenisTagihan}</span>
      ),
    },
    {
      key: "bulanAwal",
      header: "Bulan Awal",
      width: "20%",
      render: (item) => (
        <Dropdown
          options={bulanOptions}
          defaultValue={item.bulanAwal || ""}
          onChange={(v) => handleChange(item.id, "bulanAwal", v)}
          className="w-full"
        />
      ),
    },
    {
      key: "bulanAkhir",
      header: "Bulan Akhir",
      width: "20%",
      render: (item) => (
        <Dropdown
          options={bulanOptions}
          defaultValue={item.bulanAkhir || ""}
          onChange={(v) => handleChange(item.id, "bulanAkhir", v)}
          className="w-full"
        />
      ),
    },
    {
      key: "tanggalJatuhTempo",
      header: "Tanggal Jatuh Tempo",
      width: "20%",
      render: (item) => (
        <DatePicker
          value={item.tanggalJatuhTempo || ""}
          onChange={(v) => handleChange(item.id, "tanggalJatuhTempo", v)}
          placeholder="dd-mm-yyyy"
          className="w-full"
        />
      ),
    },
  ];

  return (
    <div className="text-xs w-full">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="bg-blue-900 text-white text-xs"
        rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
        showFooter={false}
        emptyMessage="Tidak ada data jenis tagihan"
      />
    </div>
  );
};

export default PengaturanJenisTagihanTable;
