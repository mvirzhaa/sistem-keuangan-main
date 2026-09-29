import React, { useState } from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";

interface AturanAkademik {
  id: string;
  kode: string;
  nama: string;
  event: boolean;
  syaratPembayaran: boolean;
}

interface AturanAkademikTableProps {
  selectable?: boolean;
  onSelectionChange?: (selectedItems: AturanAkademik[]) => void;
}

const AturanAkademikTable: React.FC<AturanAkademikTableProps> = ({
  selectable = false,
  onSelectionChange,
}) => {
  // Sample data
  const aturanAkademikData: AturanAkademik[] = [
    {
      id: "1",
      kode: "CUTI",
      nama: "Mengambil Cuti",
      event: true,
      syaratPembayaran: true,
    },
    {
      id: "2",
      kode: "DAU",
      nama: "Daftar Ulang",
      event: false,
      syaratPembayaran: true,
    },
    {
      id: "3",
      kode: "FNL",
      nama: "Finalisasi Pendaftar",
      event: true,
      syaratPembayaran: false,
    },
    {
      id: "4",
      kode: "KHS",
      nama: "Melihat KHS",
      event: false,
      syaratPembayaran: true,
    },
    {
      id: "5",
      kode: "KRS",
      nama: "Pengambilan KRS reguler (Gasal/Genap)",
      event: true,
      syaratPembayaran: true,
    },
    {
      id: "6",
      kode: "KRSSP",
      nama: "Pengambilan KRS Semester Pendek",
      event: true,
      syaratPembayaran: true,
    },
    {
      id: "7",
      kode: "MHS",
      nama: "Generate Mahasiswa",
      event: false,
      syaratPembayaran: true,
    },
    {
      id: "8",
      kode: "PRESENSI",
      nama: "Presensi mahasiswa",
      event: false,
      syaratPembayaran: true,
    },
    {
      id: "9",
      kode: "PROPOSAL",
      nama: "Mengambil Proposal",
      event: true,
      syaratPembayaran: true,
    },
    {
      id: "10",
      kode: "SELEKSI",
      nama: "Seleksi Pendaftaran",
      event: true,
      syaratPembayaran: false,
    },
    {
      id: "11",
      kode: "SKRIPSI",
      nama: "Mengambil Skripsi",
      event: true,
      syaratPembayaran: true,
    },
    {
      id: "12",
      kode: "UAS",
      nama: "Mengikuti UAS",
      event: false,
      syaratPembayaran: true,
    },
    {
      id: "13",
      kode: "UTS",
      nama: "Mengikuti UTS",
      event: false,
      syaratPembayaran: true,
    },
    {
      id: "14",
      kode: "WSD",
      nama: "Mengikuti Wisuda",
      event: true,
      syaratPembayaran: false,
    },
  ];

  // Define columns for ListTable
  const columns: Column<AturanAkademik>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "15%",
      className: "font-medium",
    },
    {
      key: "nama",
      header: "Nama",
      width: "45%",
    },
    {
      key: "event",
      header: "Event",
      width: "20%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          {item.event ? (
            <span className="text-green-600 text-lg">✓</span>
          ) : (
            <span className="text-red-600 text-lg">✕</span>
          )}
        </div>
      ),
    },
    {
      key: "syaratPembayaran",
      header: "Syarat Pembayaran",
      width: "20%",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          {item.syaratPembayaran ? (
            <span className="text-green-600 text-lg">✓</span>
          ) : (
            <span className="text-red-600 text-lg">✕</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto text-xs">
      <ListTable
        data={aturanAkademikData}
        columns={columns}
        rowKey={(item) => item.id}
        selectable={selectable}
        onSelectionChange={onSelectionChange}
        headerClassName="bg-blue-900 text-white text-base text-xs"
        showFooter={false}
        emptyMessage="Tidak ada data aturan akademik"
      />
    </div>
  );
};

export default AturanAkademikTable;
