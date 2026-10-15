import React, { useState } from "react";
import ComplexTable, {
  type ColumnDef,
  type FooterConfig,
} from "../../../components/tables/ComplexTable";
import { IoCalendarOutline } from "react-icons/io5";

interface TagihanTableProps {
  data?: any[];
  loading?: boolean;
}

const TagihanTable: React.FC<TagihanTableProps> = ({
  data = [],
  loading = false,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [totalBayar, setTotalBayar] = useState<string>("0,00");
  const [periodePembayaran, setPeriodePembayaran] =
    useState<string>("2026 Ganjil");
  const [metodePembayaran, setMetodePembayaran] =
    useState<string>("Kasir BASK UIKA");
  const [tanggalBayar, setTanggalBayar] = useState<string>("13-10-2026");
  const [channel, setChannel] = useState<string>("Kasir BASK UIKA");
  const [mataUang, setMataUang] = useState<string>("IDR");

  const tableData = Array.isArray(data) ? data : [];
  const isEmpty = tableData.length === 0;

  // Format angka sebagai currency Indonesia
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Kolom tabel
  const columns: ColumnDef[] = [
    {
      id: "no",
      header: "No.",
      accessor: (_, index) => index + 1,
      className: "text-center",
      width: "45px",
    },
    {
      id: "kodeTagihan",
      header: "Kode Tagihan",
      accessor: (row) => (
        <span className="text-[#10ac84] font-semibold hover:underline cursor-pointer">
          {row.kodeTagihan}
        </span>
      ),
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
        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-gray-900">
            {row.jenisTagihanKode}
          </span>
          <span className="text-gray-700">{row.jenisTagihanDesc}</span>
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
      accessor: (_, index) => (
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-2 py-1 text-right text-xs focus:outline-none focus:border-blue-500"
          placeholder=""
        />
      ),
      className: "w-36",
    },
    {
      id: "select",
      header: (
        <input
          type="checkbox"
          checked={selectedRows.length === tableData.length && tableData.length > 0}
          onChange={() => {
            if (selectedRows.length === tableData.length) {
              setSelectedRows([]);
            } else {
              setSelectedRows(tableData.map((_, index) => index));
            }
          }}
          className="form-checkbox h-4 w-4 text-emerald-600 rounded cursor-pointer"
        />
      ),
      accessor: (_, index) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(index)}
          onChange={() => {
            setSelectedRows((prev) =>
              prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
            );
          }}
          className="form-checkbox h-4 w-4 text-emerald-600 rounded cursor-pointer"
        />
      ),
      className: "text-center",
      width: "45px",
    },
  ];

  // Footer untuk total tagihan
  const footerConfig: FooterConfig[] = [
    {
      className: "bg-white border-t border-gray-200",
      cells: [
        { content: "", colSpan: 8, className: "border-none" },
        {
          content: "Total Tagihan",
          className: "font-bold text-gray-800 text-right pr-4 border-none text-xs",
        },
        {
          content: (
            <div className="relative">
              <input
                type="text"
                value="0"
                className="w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 text-right text-xs font-medium text-gray-700"
                readOnly
              />
            </div>
          ),
          className: "border-none",
        },
        { content: "", className: "border-none" },
      ],
    },
  ];

  // Konten form pembayaran di bawah tabel
  const additionalContent = (
    <div className="mt-4 border-t border-amber-200/80 pt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom 1: Periode & Metode */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-blue-800 mb-1">
              Periode Pembayaran
            </label>
            <select
              value={periodePembayaran}
              onChange={(e) => setPeriodePembayaran(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="2026 Ganjil">2026 Ganjil</option>
              <option value="2026 Genap">2026 Genap</option>
              <option value="2025 Ganjil">2025 Ganjil</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-800 mb-1">
              Metode Pembayaran
            </label>
            <select
              value={metodePembayaran}
              onChange={(e) => setMetodePembayaran(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="Kasir BASK UIKA">Kasir BASK UIKA</option>
              <option value="Bank Syariah Indonesia">Bank Syariah Indonesia</option>
              <option value="Bank Amanah Ummah">Bank Amanah Ummah</option>
            </select>
          </div>
        </div>

        {/* Kolom 2: Tanggal & Channel */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-blue-800 mb-1">
              Tanggal Bayar <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={tanggalBayar}
                onChange={(e) => setTanggalBayar(e.target.value)}
                className="w-full border border-gray-300 rounded pl-8 pr-3 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500"
              />
              <IoCalendarOutline className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-800 mb-1">
              Channel <span className="text-red-500">*</span>
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="Kasir BASK UIKA">Kasir BASK UIKA</option>
            </select>
          </div>
        </div>

        {/* Kolom 3: Mata Uang, Total Bayar, Saldo */}
        <div className="space-y-3">
          <div className="flex space-x-3 items-end">
            <div className="w-1/3">
              <label className="block text-xs font-semibold text-blue-800 mb-1">
                Mata Uang
              </label>
              <select
                value={mataUang}
                onChange={(e) => setMataUang(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="IDR">IDR</option>
              </select>
            </div>

            <div className="w-2/3">
              <label className="block text-xs font-semibold text-gray-800 mb-1 text-right">
                Total Bayar <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={totalBayar}
                onChange={(e) => setTotalBayar(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-right text-xs text-gray-700 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1 text-right">
              Saldo Pembayaran
            </label>
            <input
              type="text"
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-1.5 text-right text-xs text-gray-700 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Tombol Bayar Tagihan */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2.5 px-6 rounded shadow-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <span>✔</span>
          <span>BAYAR TAGIHAN</span>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <ComplexTable
        columns={columns}
        data={tableData}
        className="border-collapse"
        headerClassName="text-xs bg-[#0f4c81] text-white font-semibold py-2.5"
        rowClassName="text-xs"
        emptyMessage="Tidak ada data tagihan"
        footer={!isEmpty ? footerConfig : []}
        additionalContent={!isEmpty ? additionalContent : null}
      />
    </div>
  );
};

export default TagihanTable;
