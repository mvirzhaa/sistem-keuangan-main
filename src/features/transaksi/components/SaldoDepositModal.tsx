import React, { useState, useEffect, useMemo, useCallback } from "react";
import BaseModal from "../../../components/modal/BaseModal";
import { IoClose } from "react-icons/io5";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import transaksiApi, {
  type SaldoDepositMahasiswaItem,
} from "../services/transaksi.api";

interface SaldoDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SaldoDepositModal({
  isOpen,
  onClose,
}: SaldoDepositModalProps) {
  const [data, setData] = useState<SaldoDepositMahasiswaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await transaksiApi.getSaldoDepositMahasiswa();
      if (res && res.data && res.data.length > 0) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Gagal memuat saldo deposit mahasiswa:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setSearchQuery("");
    }
  }, [isOpen, fetchData]);

  // Format rupiah currency decimal
  const formatCurrencyDecimal = (val?: number | null) => {
    if (val === null || val === undefined) return "0,00";
    return `${val.toLocaleString("id-ID")},00`;
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();
    return data.filter(
      (item) =>
        item.nim?.toLowerCase().includes(q) ||
        item.nama?.toLowerCase().includes(q) ||
        item.prodi?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  // Total saldo deposit
  const totalSaldo = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + (curr.saldo || 0), 0);
  }, [filteredData]);

  const columns: Column<SaldoDepositMahasiswaItem>[] = useMemo(
    () => [
      {
        key: "no",
        header: "No.",
        className: "text-center text-sm py-3",
        width: "60px",
        render: (item, idx) => item.no ?? idx + 1,
      },
      {
        key: "nim",
        header: "NIM",
        className: "text-center font-mono text-sm py-3",
        sortable: true,
      },
      {
        key: "nama",
        header: "Nama",
        className: "text-left text-sm py-3 font-medium",
        sortable: true,
      },
      {
        key: "prodi",
        header: "Program Studi",
        className: "text-left text-sm py-3",
        sortable: true,
      },
      {
        key: "saldo",
        header: "Saldo Deposit",
        className: "text-right font-medium text-sm py-3",
        sortable: true,
        render: (item) => formatCurrencyDecimal(item.saldo),
      },
    ],
    []
  );

  const footerRow = (
    <tr className="bg-[#f8fafc] text-sm text-gray-900 border-t border-slate-300">
      <td
        colSpan={4}
        className="p-3 text-right font-bold text-gray-800 border-r border-slate-300 pr-4 text-sm"
      >
        Total
      </td>
      <td className="p-3 text-right font-bold text-gray-900 border-slate-300 pr-3 text-sm">
        {formatCurrencyDecimal(totalSaldo)}
      </td>
    </tr>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-4xl"
      className="p-6 sm:p-7 rounded-2xl max-h-[90vh] flex flex-col"
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Saldo Deposit Mahasiswa
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-[#2b3a67] hover:text-[#182346] p-1 transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4 shrink-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari NIM, Nama, atau Program Studi..."
          className="w-full px-3.5 py-2.5 text-sm border border-emerald-500 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-gray-400 bg-white"
        />
      </div>

      {/* ListTable without pagination, with Total row, text-sm, and blue bottom border */}
      <div className="w-full bg-white rounded-md overflow-hidden border border-slate-300 border-b-[3px] border-b-[#004b87] overflow-y-auto max-h-[55vh]">
        <ListTable<SaldoDepositMahasiswaItem>
          data={filteredData}
          columns={columns}
          rowKey={(item) => item.id || item.nim}
          selectable={false}
          showFooter={false}
          footerRow={footerRow}
          pageSize={1000}
          className="w-full text-sm"
          headerClassName="text-sm font-semibold"
          loading={loading}
          emptyMessage="Tidak ada data saldo deposit mahasiswa"
        />
      </div>
    </BaseModal>
  );
}
