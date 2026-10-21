import React, { useState, useEffect } from "react";
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
  tanggalTerbitTagihan?: string;
}

interface PengaturanJenisTagihanTableProps {
  periode?: string;
}

const bulanAwalOptions = [
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

const bulanAkhirOptions = [
  "-- Pilih Bulan Akhir --",
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
  { id: "2", kode: "9800", jenisTagihan: "Biaya Awal Masuk - Pasca" },
  { id: "3", kode: "PPG", jenisTagihan: "Biaya Awal Perkuliahan" },
  { id: "4", kode: "4085", jenisTagihan: "Biaya Buku Panduan Skripsi" },
  { id: "5", kode: "2056", jenisTagihan: "Biaya Kuliah Mandiri" },
  { id: "6", kode: "1061", jenisTagihan: "Biaya Pemeliharaan Ijazah" },
  { id: "7", kode: "1119", jenisTagihan: "Biaya Pendaftaran Rusunawa" },
];

const getStoredDataForPeriode = (periodeKey: string): JenisTagihanRow[] => {
  const stored = localStorage.getItem(`jenis_tagihan_data_${periodeKey}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  return initialData;
};

const PengaturanJenisTagihanTable: React.FC<
  PengaturanJenisTagihanTableProps
> = ({ periode = "2024 Genap" }) => {
  const [data, setData] = useState<JenisTagihanRow[]>(() =>
    getStoredDataForPeriode(periode),
  );

  useEffect(() => {
    setData(getStoredDataForPeriode(periode));
  }, [periode]);

  const handleChange = (id: string, field: string, value: string) => {
    setData((prev) => {
      const next = prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]:
                value === "-- Pilih Bulan Awal --" ||
                value === "-- Pilih Bulan Akhir --"
                  ? ""
                  : value,
            }
          : row,
      );
      localStorage.setItem(
        `jenis_tagihan_data_${periode}`,
        JSON.stringify(next),
      );
      return next;
    });
  };

  const columns: Column<JenisTagihanRow>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "8%",
      className: "text-center font-bold",
      render: (item) => <span>{item.kode}</span>,
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      width: "26%",
      render: (item) => (
        <span className="font-semibold">{item.jenisTagihan}</span>
      ),
    },
    {
      key: "bulanAwal",
      header: "Bulan Awal",
      width: "16%",
      render: (item) => (
        <Dropdown
          options={bulanAwalOptions}
          value={item.bulanAwal || "-- Pilih Bulan Awal --"}
          defaultValue={item.bulanAwal || "-- Pilih Bulan Awal --"}
          onChange={(v) => handleChange(item.id, "bulanAwal", v)}
          className="w-full"
        />
      ),
    },
    {
      key: "bulanAkhir",
      header: "Bulan Akhir",
      width: "16%",
      render: (item) => (
        <Dropdown
          options={bulanAkhirOptions}
          value={item.bulanAkhir || "-- Pilih Bulan Akhir --"}
          defaultValue={item.bulanAkhir || "-- Pilih Bulan Akhir --"}
          onChange={(v) => handleChange(item.id, "bulanAkhir", v)}
          className="w-full"
        />
      ),
    },
    {
      key: "tanggalJatuhTempo",
      header: "Tanggal Jatuh Tempo",
      width: "17%",
      render: (item) => (
        <DatePicker
          value={item.tanggalJatuhTempo || ""}
          onChange={(v) => handleChange(item.id, "tanggalJatuhTempo", v)}
          placeholder="dd-mm-yyyy"
          className="w-full"
        />
      ),
    },
    {
      key: "tanggalTerbitTagihan",
      header: "Tanggal Terbit Tagihan",
      width: "17%",
      render: (item) => (
        <DatePicker
          value={item.tanggalTerbitTagihan || ""}
          onChange={(v) => handleChange(item.id, "tanggalTerbitTagihan", v)}
          placeholder="dd-mm-yyyy"
          className="w-full"
        />
      ),
    },
  ];

  return (
    <div className="text-xs w-full overflow-x-auto">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="text-white text-xs whitespace-nowrap"
        rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
        showFooter={false}
        emptyMessage="Tidak ada data jenis tagihan"
      />
    </div>
  );
};

export default PengaturanJenisTagihanTable;
