import React, { useState } from "react";
import ComplexTable, { type ColumnDef, type FooterConfig } from "../../../components/tables/ComplexTable";
import { IoCalendarOutline } from "react-icons/io5";

interface TagihanTableProps {
  data?: any[];
  loading?: boolean;
}

const TagihanTable: React.FC<TagihanTableProps> = ({ data = [], loading = false }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [totalBayar, setTotalBayar] = useState<string>("0,00");
  const [periodePembayaran, setPeriodePembayaran] = useState<string>("2024 Genap");
  const [metodePembayaran, setMetodePembayaran] = useState<string>("Kasir BASK UIKA");
  const [tanggalBayar, setTanggalBayar] = useState<string>("29-06-2025");
  const [mataUang, setMataUang] = useState<string>("IDR");

  const tableData = Array.isArray(data) ? data : [];
  const isEmpty = tableData.length === 0;

  // Kolom tabel
  const columns: ColumnDef[] = [
    {
      id: "no",
      header: "No.",
      accessor: (_, index) => index + 1,
      className: "text-center",
      width: "50px",
    },
    {
      id: "kodeTagihan",
      header: "Kode Tagihan",
      accessor: (row) => <span className="text-green-600 font-medium">{row.kodeTagihan}</span>,
    },
    {
      id: "periode",
      header: "Periode",
      accessor: (row) => row.periode,
      className: "text-center",
    },
    {
      id: "jenisTagihan",
      header: "Jenis Tagihan",
      accessor: (row) => (
        <div>
          <span className="font-bold">{row.jenisTagihanKode}</span>
          <span className="block text-sm text-gray-600">{row.jenisTagihanDesc}</span>
        </div>
      ),
    },
    {
      id: "nominal",
      header: "Nominal",
      accessor: (row) => formatCurrency(row.nominal),
      className: "text-right",
    },
    {
      id: "denda",
      header: "Denda",
      accessor: (row) => formatCurrency(row.denda),
      className: "text-right",
    },
    {
      id: "potongan",
      header: "Potongan",
      accessor: (row) => formatCurrency(row.potongan),
      className: "text-right",
    },
    {
      id: "pembayaran",
      header: "Pembayaran",
      accessor: (row) => formatCurrency(row.pembayaran),
      className: "text-right",
    },
    {
      id: "subTotal",
      header: "Sub Total",
      accessor: (row) => formatCurrency(row.subTotal),
      className: "text-right font-medium",
    },
    {
      id: "nominalBayar",
      header: "Nominal Bayar",
      accessor: (row) => <input type="text" value={formatCurrency(row.subTotal)} className="w-full border border-gray-300 rounded px-2 py-1 text-right" />,
    },
    //checkbox
    {
      id: "select",
      header: (
        <input
          type="checkbox"
          checked={selectedRows.length === data.length && data.length > 0}
          onChange={() => {
            if (selectedRows.length === data.length) {
              setSelectedRows([]);
            } else {
              setSelectedRows(data.map((_, index) => index));
            }
          }}
          className="form-checkbox h-4 w-4 text-green-600"
        />
      ),
      accessor: (row, index) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(index)}
          onChange={() => {
            setSelectedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
          }}
          className="form-checkbox h-4 w-4 text-green-600"
        />
      ),
      className: "text-center",
      width: "50px",
    },
  ];

  // Format angka sebagai currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Footer untuk total tagihan
  const footerConfig: FooterConfig[] = [
    {
      cells: [
        { content: "", colSpan: 8 },
        {
          content: "Total Tagihan",
          className: "font-medium text-right",
        },
        {
          content: (
            <div className="relative">
              <input type="text" value="0" className="w-full border border-gray-300 rounded px-2 py-1 text-right" readOnly />
            </div>
          ),
        },
      ],
    },
  ];

  // Konten tambahan untuk form pembayaran
  const additionalContent = (
    <div className="mt-4 grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <div className="text-blue-600">Periode Pembayaran</div>
        <select value={periodePembayaran} onChange={(e) => setPeriodePembayaran(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5">
          <option value="2024 Genap">2024 Genap</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="text-blue-600">Metode Pembayaran</div>
        <select value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5">
          <option value="Kasir BASK UIKA">Kasir BASK UIKA</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="text-blue-600">
          Tanggal Bayar <span className="text-red-500">*</span>
        </div>
        <div className="relative">
          <input type="date" value={tanggalBayar} onChange={(e) => setTanggalBayar(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 pr-8 cursor-pointer" />
          <IoCalendarOutline className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-blue-600">Mata Uang</div>
        <select value={mataUang} onChange={(e) => setMataUang(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5">
          <option value="IDR">IDR</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="text-blue-600">
          Total Bayar <span className="text-red-500">*</span>
        </div>
        <input type="text" value={totalBayar} onChange={(e) => setTotalBayar(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 text-right" />
      </div>

      <div className="space-y-2">
        <div className="text-blue-600">Saldo Pembayaran</div>
        <input type="text" className="w-full border border-gray-300 rounded px-2 py-1.5 text-right" readOnly />
      </div>
    </div>
  );

  // Tombol Bayar
  const actionButtons = (
    <div className="mt-4 flex justify-end">
      <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center hover:bg-green-700">
        <span className="mr-1">✓</span> BAYAR TAGIHAN
      </button>
    </div>
  );

  return (
    <div>
      <ComplexTable
        columns={columns}
        data={tableData}
        className="border-collapse"
        headerClassName="text-xs"
        rowClassName="text-xs"
        emptyMessage="Tidak ada data tagihan"
        footer={!isEmpty ? footerConfig : []}
        additionalContent={
          !isEmpty ? (
            <>
              {additionalContent}
              {actionButtons}
            </>
          ) : null
        }
      />
    </div>
  );
};

export default TagihanTable;
