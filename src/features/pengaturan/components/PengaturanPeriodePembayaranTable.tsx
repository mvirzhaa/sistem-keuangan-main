import React, { useState, useRef, useMemo } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoPencil, IoSave, IoCalendarOutline } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";

export interface PeriodePembayaranRow {
  id: string;
  kode: string;
  namaPeriode: string;
  tglAwalKuliah: string;
  tglAkhirKuliah: string;
  aktif: boolean;
  tglAwalPembayaran?: string;
  tglAkhirPembayaran?: string;
}

interface PengaturanPeriodePembayaranTableProps {
  filterField?: string;
  searchQuery?: string;
}

const STORAGE_KEY = "pengaturan_periode_pembayaran_data";

const initialData: PeriodePembayaranRow[] = [
  {
    id: "1",
    kode: "20272",
    namaPeriode: "2027 Genap",
    tglAwalKuliah: "1 Februari 2028",
    tglAkhirKuliah: "31 Juli 2028",
    aktif: false,
    tglAwalPembayaran: "01-02-2028",
    tglAkhirPembayaran: "31-07-2028",
  },
  {
    id: "2",
    kode: "20252",
    namaPeriode: "2025 Genap",
    tglAwalKuliah: "16 Feb 2026",
    tglAkhirKuliah: "13 Jun 2026",
    aktif: false,
    tglAwalPembayaran: "",
    tglAkhirPembayaran: "",
  },
  {
    id: "3",
    kode: "20251",
    namaPeriode: "2025 Ganjil",
    tglAwalKuliah: "15 Sep 2025",
    tglAkhirKuliah: "17 Jan 2026",
    aktif: false,
    tglAwalPembayaran: "01-12-2024",
    tglAkhirPembayaran: "31-12-2024",
  },
  {
    id: "4",
    kode: "20242",
    namaPeriode: "2024 Genap",
    tglAwalKuliah: "10 Feb 2025",
    tglAkhirKuliah: "14 Jun 2025",
    aktif: true,
    tglAwalPembayaran: "03-02-2025",
    tglAkhirPembayaran: "31-08-2025",
  },
  {
    id: "5",
    kode: "20241",
    namaPeriode: "2024 Ganjil",
    tglAwalKuliah: "17 Sep 2024",
    tglAkhirKuliah: "4 Jan 2025",
    aktif: false,
    tglAwalPembayaran: "02-01-2024",
    tglAkhirPembayaran: "30-11-2024",
  },
];

const toIsoDate = (val?: string): string => {
  if (!val) return "";
  const trimmed = val.trim();
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const parts = trimmed.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length <= 2 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
    if (parts[0].length === 4) {
      return `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
    }
  }
  return "";
};

const fromIsoDate = (val?: string): string => {
  if (!val) return "";
  const trimmed = val.trim();
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-");
    return `${d.padStart(2, "0")}-${m.padStart(2, "0")}-${y}`;
  }
  return val;
};

interface DateInputCellProps {
  value: string;
  onChange: (val: string) => void;
}

const DateInputCell: React.FC<DateInputCellProps> = ({ value, onChange }) => {
  const pickerRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    try {
      pickerRef.current?.showPicker();
    } catch {
      pickerRef.current?.focus();
    }
  };

  return (
    <div className="relative flex items-center border border-gray-300 rounded bg-white overflow-hidden text-xs h-8 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <button
        type="button"
        onClick={handleOpenPicker}
        className="h-full px-2 text-gray-500 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
        title="Buka kalender"
      >
        <IoCalendarOutline size={15} />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="dd-mm-yyyy"
        className="w-full h-full px-2 py-1 text-xs text-gray-800 bg-transparent outline-none font-medium whitespace-nowrap"
      />
      <input
        ref={pickerRef}
        type="date"
        value={toIsoDate(value)}
        onChange={(e) => {
          if (e.target.value) {
            onChange(fromIsoDate(e.target.value));
          }
        }}
        style={{
          position: "fixed",
          top: "-1000px",
          left: "-1000px",
          opacity: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
};

const PengaturanPeriodePembayaranTable: React.FC<
  PengaturanPeriodePembayaranTableProps
> = ({ filterField = "-- Semua --", searchQuery = "" }) => {
  const [data, setData] = useState<PeriodePembayaranRow[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!parsed.some((p: PeriodePembayaranRow) => p.kode === "20272")) {
            return initialData;
          }
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialData;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    tglAwalPembayaran?: string;
    tglAkhirPembayaran?: string;
  }>({});

  const handleStartEdit = (item: PeriodePembayaranRow) => {
    setEditingId(item.id);
    setEditValues({
      tglAwalPembayaran: item.tglAwalPembayaran || "",
      tglAkhirPembayaran: item.tglAkhirPembayaran || "",
    });
  };

  const handleSave = (id: string) => {
    setData((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, ...editValues } : item,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setEditingId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase().trim();

    return data.filter((item) => {
      if (filterField === "Kode") {
        return item.kode.toLowerCase().includes(q);
      }
      if (filterField === "Nama Periode") {
        return item.namaPeriode.toLowerCase().includes(q);
      }
      return (
        item.kode.toLowerCase().includes(q) ||
        item.namaPeriode.toLowerCase().includes(q) ||
        item.tglAwalKuliah.toLowerCase().includes(q) ||
        item.tglAkhirKuliah.toLowerCase().includes(q) ||
        (item.tglAwalPembayaran &&
          item.tglAwalPembayaran.toLowerCase().includes(q)) ||
        (item.tglAkhirPembayaran &&
          item.tglAkhirPembayaran.toLowerCase().includes(q))
      );
    });
  }, [data, filterField, searchQuery]);

  const columns: Column<PeriodePembayaranRow>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "8%",
      className: "text-center font-bold",
      render: (item) => <span>{item.kode}</span>,
    },
    {
      key: "namaPeriode",
      header: "Nama Periode",
      width: "14%",
      render: (item) => <span>{item.namaPeriode}</span>,
    },
    {
      key: "tglAwalKuliah",
      header: "Tanggal Awal Kuliah",
      width: "15%",
      render: (item) => <span>{item.tglAwalKuliah}</span>,
    },
    {
      key: "tglAkhirKuliah",
      header: "Tanggal Akhir Kuliah",
      width: "15%",
      render: (item) => <span>{item.tglAkhirKuliah}</span>,
    },
    {
      key: "aktif",
      header: "Aktif?",
      width: "6%",
      className: "text-center",
      render: (item) =>
        item.aktif ? (
          <span className="text-green-600 text-lg font-bold">✔</span>
        ) : (
          <span className="text-red-600 text-lg font-bold">✖</span>
        ),
    },
    {
      key: "tglAwalPembayaran",
      header: "Tanggal Awal Pembayaran",
      width: "18%",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <DateInputCell
              value={editValues.tglAwalPembayaran || ""}
              onChange={(val) =>
                setEditValues((prev) => ({
                  ...prev,
                  tglAwalPembayaran: val,
                }))
              }
            />
          );
        }
        return <span>{item.tglAwalPembayaran || ""}</span>;
      },
    },
    {
      key: "tglAkhirPembayaran",
      header: "Tanggal Akhir Pembayaran",
      width: "18%",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <DateInputCell
              value={editValues.tglAkhirPembayaran || ""}
              onChange={(val) =>
                setEditValues((prev) => ({
                  ...prev,
                  tglAkhirPembayaran: val,
                }))
              }
            />
          );
        }
        return <span>{item.tglAkhirPembayaran || ""}</span>;
      },
    },
    {
      key: "aksi",
      header: "Aksi",
      width: "6%",
      className: "text-center",
      render: (item) => {
        if (editingId === item.id) {
          return (
            <div className="flex items-center justify-center space-x-1.5">
              <button
                type="button"
                onClick={() => handleSave(item.id)}
                className="p-1.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white rounded cursor-pointer transition-colors shadow-xs"
                title="Simpan"
              >
                <IoSave size={16} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 bg-[#f39c12] hover:bg-[#e08e0b] active:bg-[#d68000] text-white rounded cursor-pointer transition-colors shadow-xs"
                title="Batal"
              >
                <IoMdRefresh size={16} />
              </button>
            </div>
          );
        }
        return (
          <button
            type="button"
            onClick={() => handleStartEdit(item)}
            className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer transition-colors shadow-xs"
            title="Ubah Tanggal Pembayaran"
          >
            <IoPencil size={16} />
          </button>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto text-xs">
      <ListTable
        data={filteredData}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="text-white whitespace-nowrap"
        rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
        showFooter={true}
        emptyMessage="Tidak ada data periode pembayaran"
      />
    </div>
  );
};

export default PengaturanPeriodePembayaranTable;
