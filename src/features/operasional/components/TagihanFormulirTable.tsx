import React, { useState } from "react";
import ComplexTable, { type ColumnDef, type FooterConfig } from "../../../components/tables/ComplexTable";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

// Interface untuk data tagihan formulir
interface TagihanFormulirItem {
  id: string;
  kode: string;
  periode: string;
  tanggal: string;
  jatuhTempo: string;
  jenis: string;
  nominal: number;
  nominalPotongan: number;
  nominalBayar?: number;
}

interface TagihanFormulirTableProps {
  data?: TagihanFormulirItem[];
  loading?: boolean;
  onBayarTagihan?: (selectedItems: string[], paymentData: PaymentData) => void;
}

interface PaymentData {
  metodePembayaran: string;
  tanggalBayar: string;
  bank: string;
  totalBayar: string;
}

const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const TagihanFormulirTable: React.FC<TagihanFormulirTableProps> = ({ data = [], loading = false, onBayarTagihan }) => {
  const tableData = Array.isArray(data) ? data : [];
  const isEmpty = !tableData.length;

  // State untuk baris yang dipilih
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // State untuk form pembayaran
  const [metodePembayaran, setMetodePembayaran] = useState<string>("Kasir BASK UIKA");
  const [tanggalBayar, setTanggalBayar] = useState<string>(new Date().toISOString().split("T")[0]);
  const [bank, setBank] = useState<string>("");
  const [totalBayar, setTotalBayar] = useState<string>("");

  // Hitung total
  const totalTagihan = data.reduce((sum, item) => sum + item.nominal, 0);
  const saldoDeposit = 0;
  const saldoPembayaran = totalBayar ? parseFloat(totalBayar.replace(/[^\d]/g, "")) - totalTagihan + saldoDeposit : 0;

  // Handle pilih baris
  const handleRowSelect = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  // Handle pilih semua baris
  const handleToggleAll = () => {
    if (selectedRows.length === data.length && data.length > 0) {
      setSelectedRows([]);
    } else {
      setSelectedRows(Array.from({ length: data.length }, (_, i) => i));
    }
  };

  // Handle bayar tagihan
  const handleBayarTagihan = () => {
    if (onBayarTagihan) {
      const selectedItems = selectedRows.map((index) => data[index].id);
      onBayarTagihan(selectedItems, {
        metodePembayaran,
        tanggalBayar,
        bank,
        totalBayar,
      });
    }
  };

  // Definisi kolom tabel
  const columns: ColumnDef[] = [
    {
      id: "no",
      header: "No.",
      accessor: (_, index) => index + 1,
      width: "50px",
      className: "text-center",
    },
    {
      id: "kode",
      header: "Kode",
      accessor: (row) => <span className="text-green-600 font-medium">{row.kode}</span>,
    },
    {
      id: "periode",
      header: "Periode",
      accessor: (row) => row.periode,
    },
    {
      id: "tanggal",
      header: "Tanggal",
      accessor: (row) => row.tanggal,
    },
    {
      id: "jatuhTempo",
      header: "Jatuh Tempo",
      accessor: (row) => {
        const isOverdue = new Date(row.jatuhTempo) < new Date();
        return <div className={`${isOverdue ? "bg-red-600 text-white text-center py-0.5 px-2 rounded" : ""}`}>{row.jatuhTempo}</div>;
      },
    },
    {
      id: "jenis",
      header: "Jenis",
      accessor: (row) => row.jenis,
    },
    {
      id: "nominal",
      header: "Nominal",
      accessor: (row) => formatRupiah(row.nominal),
      className: "text-right",
    },
    {
      id: "nominalPotongan",
      header: "Nominal Potongan",
      accessor: (row) => formatRupiah(row.nominalPotongan || 0),
      className: "text-right",
    },
    {
      id: "nominalBayar",
      header: "Nominal Bayar",
      accessor: (row) => <input type="text" value={formatRupiah(row.nominalBayar || row.nominal - (row.nominalPotongan || 0))} readOnly className="w-full border border-gray-300 rounded px-2 py-1 text-right" />,
    },
    {
      id: "select",
      header: <input type="checkbox" checked={selectedRows.length === data.length && data.length > 0} onChange={handleToggleAll} className="form-checkbox h-4 w-4" />,
      accessor: (_, rowIndex) => <input type="checkbox" checked={selectedRows.includes(rowIndex)} onChange={() => handleRowSelect(rowIndex)} className="form-checkbox h-4 w-4" />,
      width: "50px",
      className: "text-center",
    },
  ];

  // Definisi footer tabel
  const footer: FooterConfig[] = [
    {
      cells: [
        {
          content: "Total Tagihan",
          colSpan: 8,
          align: "right",
          className: "font-medium",
        },
        {
          content: <input type="text" value={formatRupiah(totalTagihan)} readOnly className="w-full border border-gray-300 rounded px-2 py-1 text-right" />,
          colSpan: 1,
        },
        {
          content: "",
          colSpan: 1,
        },
      ],
    },
    {
      cells: [
        {
          content: "Saldo Deposit",
          colSpan: 8,
          align: "right",
          className: "font-medium",
        },
        {
          content: <input type="text" value={formatRupiah(saldoDeposit)} readOnly className="w-full border border-gray-300 rounded px-2 py-1 text-right" />,
          colSpan: 1,
        },
        {
          content: "",
          colSpan: 1,
        },
      ],
    },
  ];

  // Konten tambahan untuk form pembayaran
  const additionalContent = (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <select value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5">
            <option value="Kasir BASK UIKA">Kasir BASK UIKA</option>
          </select>
        </div>

        <div className="relative">
          <input type="date" value={tanggalBayar} onChange={(e) => setTanggalBayar(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5 pr-8 cursor-pointer" />
          <IoCalendarOutline className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        <div>
          <select value={bank} onChange={(e) => setBank(e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1.5">
            <option value="">-- Pilih Bank --</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2"></div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">Total Bayar</div>
            <div className="w-3/5 ml-2">
              <input
                type="text"
                value={totalBayar}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d]/g, "");
                  setTotalBayar(value);
                }}
                className="w-full border border-gray-300 rounded px-2 py-1 text-right"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-medium">Saldo Pembayaran</div>
            <div className="w-3/5 ml-2">
              <input type="text" value={formatRupiah(saldoPembayaran)} readOnly className="w-full border border-gray-300 rounded px-2 py-1 text-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={handleBayarTagihan} className={`bg-green-600 text-white py-2 px-4 rounded uppercase font-medium hover:bg-green-700 transition-colors ${isEmpty ? "hidden" : ""}`} disabled={isEmpty}>
          <IoMdCheckmark className="inline-block mr-2" />
          Bayar Tagihan Formulir
        </button>
      </div>

      <ComplexTable
        columns={columns}
        data={loading ? [] : tableData}
        isSelectable={false}
        emptyMessage={loading ? "Memuat data..." : "Tidak ada data tagihan formulir"}
        footer={!isEmpty ? footer : []}
        additionalContent={!isEmpty ? additionalContent : null}
      />
    </div>
  );
};

export default TagihanFormulirTable;
